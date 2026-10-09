import { zoomAtlasView, type AtlasCoordinate, type AtlasView } from './atlasGeometry';

type GestureOptions = {
  getView: () => AtlasView;
  onView: (view: AtlasView) => void;
  onActive: (active: boolean) => void;
  minZoom: number;
  maxZoom: number;
};
type Contact = { point: AtlasCoordinate; origin: AtlasCoordinate };
type SafariGesture = Event & { scale: number; clientX: number; clientY: number };

/** One input surface for mouse wheels, trackpads, touch and pens. */
export function attachAtlasGestures(svg: SVGSVGElement, options: GestureOptions) {
  const contacts = new Map<number, Contact>();
  let pending: AtlasView | null = null;
  let frame: number | null = null;
  let idle: ReturnType<typeof setTimeout> | undefined;
  let active = false;
  let moved = false;
  let suppressClick = false;
  let safariScale: number | null = null;
  const view = () => pending ?? options.getView();
  const activate = () => {
    clearTimeout(idle);
    if (!active) { active = true; options.onActive(true); }
  };
  const flush = () => {
    if (frame !== null) cancelAnimationFrame(frame);
    frame = null;
    if (pending) options.onView(pending);
    pending = null;
  };
  const finish = () => {
    clearTimeout(idle);
    flush();
    if (active) { active = false; options.onActive(false); }
  };
  const schedule = (next: AtlasView) => {
    pending = next;
    if (frame === null) frame = requestAnimationFrame(flush);
  };
  // SVG coordinates include the responsive viewBox offset, unlike client pixels.
  const position = (event: { clientX: number; clientY: number }): AtlasCoordinate => {
    const matrix = svg.getScreenCTM()?.inverse();
    return matrix
      ? [matrix.a * event.clientX + matrix.c * event.clientY + matrix.e,
         matrix.b * event.clientX + matrix.d * event.clientY + matrix.f]
      : [event.clientX, event.clientY];
  };
  const zoom = (factor: number, anchor: AtlasCoordinate) => {
    activate();
    schedule(zoomAtlasView(view(), factor, options.minZoom, options.maxZoom, anchor));
  };
  const wheel = (event: WheelEvent) => {
    event.preventDefault();
    if (contacts.size || safariScale !== null || !event.deltaY) return;
    const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? svg.clientHeight : 1;
    // Trackpad pinch is delivered as Ctrl+wheel in Chromium/Firefox.
    const exponent = -event.deltaY * unit * (event.ctrlKey ? .008 : .002);
    zoom(Math.exp(Math.max(-.7, Math.min(.7, exponent))), position(event));
    idle = setTimeout(finish, 160);
  };
  const capture = (id: number) => {
    if (!svg.hasPointerCapture(id)) svg.setPointerCapture(id);
  };
  const down = (event: PointerEvent) => {
    if (event.button !== 0) return;
    if (!contacts.size) {
      finish();
      moved = false;
      suppressClick = false;
    }
    const point = position(event);
    contacts.set(event.pointerId, { point, origin: point });
    if (contacts.size > 1) {
      moved = true;
      suppressClick = true;
      activate();
      contacts.forEach((_, id) => capture(id));
    }
  };
  const move = (event: PointerEvent) => {
    const contact = contacts.get(event.pointerId);
    if (!contact) return;
    const previous = [...contacts.values()].slice(0, 2).map(item => item.point);
    const point = position(event);
    const from = moved ? contact.point : contact.origin;
    contact.point = point;
    if (contacts.size === 1) {
      const screenScale = svg.getScreenCTM()?.a ?? 1;
      if (!moved && Math.hypot(point[0] - from[0], point[1] - from[1]) * screenScale < 4) return;
      moved = true;
      suppressClick = true;
      capture(event.pointerId);
      activate();
      const current = view();
      schedule({ ...current, x: current.x + point[0] - from[0], y: current.y + point[1] - from[1] });
    } else {
      const next = [...contacts.values()].slice(0, 2).map(item => item.point);
      const midpoint = (pair: AtlasCoordinate[]): AtlasCoordinate => [(pair[0][0] + pair[1][0]) / 2, (pair[0][1] + pair[1][1]) / 2];
      const distance = (pair: AtlasCoordinate[]) => Math.hypot(pair[0][0] - pair[1][0], pair[0][1] - pair[1][1]);
      const before = midpoint(previous), after = midpoint(next);
      const factor = distance(previous) > 0 ? distance(next) / distance(previous) : 1;
      const scaled = zoomAtlasView(view(), factor, options.minZoom, options.maxZoom, before);
      schedule({ ...scaled, x: scaled.x + after[0] - before[0], y: scaled.y + after[1] - before[1] });
    }
  };
  const up = (event: PointerEvent) => {
    if (!contacts.delete(event.pointerId)) return;
    flush();
    if (svg.hasPointerCapture(event.pointerId)) svg.releasePointerCapture(event.pointerId);
    if (!contacts.size) finish();
  };
  const leave = (event: PointerEvent) => { if (!moved) up(event); };
  const click = (event: MouseEvent) => {
    if (suppressClick && event.detail !== 0) {
      event.preventDefault();
      event.stopPropagation();
      suppressClick = false;
    }
  };
  const doubleClick = (event: MouseEvent) => {
    if ((event.target as Element).closest('[role="button"]')) return;
    event.preventDefault();
    zoom(event.shiftKey ? .5 : 2, position(event));
    idle = setTimeout(finish, 160);
  };
  // Safari's trackpad API predates Pointer Events. Prevent page zoom only here.
  const gestureStart = (event: Event) => {
    event.preventDefault();
    safariScale = (event as SafariGesture).scale || 1;
    activate();
  };
  const gestureChange = (event: Event) => {
    event.preventDefault();
    const gesture = event as SafariGesture;
    if (safariScale === null || gesture.scale <= 0) return;
    zoom(gesture.scale / safariScale, position(gesture));
    safariScale = gesture.scale;
  };
  const gestureEnd = (event: Event) => {
    event.preventDefault();
    safariScale = null;
    finish();
  };

  // React's delegated wheel listener is passive; a local listener must cancel
  // page scrolling/browser zoom while the pointer is inside this map only.
  svg.addEventListener('wheel', wheel, { passive: false });
  svg.addEventListener('pointerdown', down);
  svg.addEventListener('pointermove', move);
  svg.addEventListener('pointerup', up);
  svg.addEventListener('pointercancel', up);
  svg.addEventListener('lostpointercapture', up);
  svg.addEventListener('pointerleave', leave);
  svg.addEventListener('click', click, true);
  svg.addEventListener('dblclick', doubleClick);
  svg.addEventListener('gesturestart', gestureStart, { passive: false });
  svg.addEventListener('gesturechange', gestureChange, { passive: false });
  svg.addEventListener('gestureend', gestureEnd, { passive: false });
  return () => {
    clearTimeout(idle);
    if (frame !== null) cancelAnimationFrame(frame);
    svg.removeEventListener('wheel', wheel);
    svg.removeEventListener('pointerdown', down);
    svg.removeEventListener('pointermove', move);
    svg.removeEventListener('pointerup', up);
    svg.removeEventListener('pointercancel', up);
    svg.removeEventListener('lostpointercapture', up);
    svg.removeEventListener('pointerleave', leave);
    svg.removeEventListener('click', click, true);
    svg.removeEventListener('dblclick', doubleClick);
    svg.removeEventListener('gesturestart', gestureStart);
    svg.removeEventListener('gesturechange', gestureChange);
    svg.removeEventListener('gestureend', gestureEnd);
    contacts.forEach((_, id) => { if (svg.hasPointerCapture(id)) svg.releasePointerCapture(id); });
  };
}
