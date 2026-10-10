import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { attachAtlasGestures } from './atlasGestures';
import type { AtlasView } from './atlasGeometry';

// Exercise the native event adapter as well as its geometry, including bursts
// arriving before React's next render and captured multi-pointer transitions.
class MapSurface extends EventTarget {
  clientHeight = 400;
  captured = new Set<number>();
  getScreenCTM() {
    return { a: .5, inverse: () => ({ a: 2, b: 0, c: 0, d: 2, e: -200, f: -100 }) };
  }
  setPointerCapture(id: number) { this.captured.add(id); }
  hasPointerCapture(id: number) { return this.captured.has(id); }
  releasePointerCapture(id: number) { this.captured.delete(id); }
  closest() { return null; }
  emit(type: string, values: Record<string, unknown> = {}) {
    const event = Object.assign(new Event(type, { cancelable: true }), {
      clientX: 200, clientY: 150, button: 0, pointerId: 1,
      deltaY: 0, deltaMode: 0, ctrlKey: false, detail: 1, ...values,
    });
    this.dispatchEvent(event);
    return event;
  }
}

let dispose: (() => void) | undefined;
beforeEach(() => {
  vi.useFakeTimers();
  vi.stubGlobal('requestAnimationFrame', (callback: () => void) => setTimeout(callback, 16));
  vi.stubGlobal('cancelAnimationFrame', (id: ReturnType<typeof setTimeout>) => clearTimeout(id));
});
afterEach(() => { dispose?.(); vi.useRealTimers(); vi.unstubAllGlobals(); });
function setup() {
  const svg = new MapSurface();
  let view: AtlasView = { zoom: 1, x: 0, y: 0 };
  const active = vi.fn();
  const updates = vi.fn((next: AtlasView) => { view = next; });
  dispose = attachAtlasGestures(svg as unknown as SVGSVGElement, {
    getView: () => view, onView: updates, onActive: active, minZoom: .5, maxZoom: 4,
  });
  return { svg, view: () => view, active, updates };
}

describe('direct map gestures', () => {
  it('accumulates wheel input at the cursor in a scaled, offset SVG without page scrolling', () => {
    const { svg, view, active } = setup();
    expect(svg.emit('wheel', { deltaY: -100 }).defaultPrevented).toBe(true);
    svg.emit('wheel', { deltaY: -100 });
    vi.advanceTimersByTime(16);
    const result = view();
    expect(result.zoom).toBeCloseTo(Math.exp(.4));
    // Client (200,150) maps to SVG (200,200); that location stays under the cursor.
    expect(200 * result.zoom + result.x).toBeCloseTo(200);
    expect(200 * result.zoom + result.y).toBeCloseTo(200);
    expect(active.mock.calls).toEqual([[true]]);
    vi.advanceTimersByTime(160);
    expect(active.mock.calls).toEqual([[true], [false]]);
  });

  it('normalizes line/page wheels, supports Ctrl+wheel pinch and clamps zoom', () => {
    const { svg, view } = setup();
    svg.emit('wheel', { deltaY: -1, deltaMode: 1 });
    svg.emit('wheel', { deltaY: -1, deltaMode: 2 });
    svg.emit('wheel', { deltaY: -10, ctrlKey: true });
    vi.advanceTimersByTime(16);
    expect(view().zoom).toBeCloseTo(Math.exp(.032 + .7 + .08));
    for (let i = 0; i < 10; i++) svg.emit('wheel', { deltaY: -1000 });
    vi.advanceTimersByTime(16);
    expect(view().zoom).toBe(4);
    for (let i = 0; i < 10; i++) svg.emit('wheel', { deltaY: 1000 });
    vi.advanceTimersByTime(16);
    expect(view().zoom).toBe(.5);
  });

  it('pinches and translates around both fingers, then continues one-finger drag without a jump', () => {
    const { svg, view } = setup();
    svg.emit('pointerdown', { pointerId: 1, clientX: 150 });
    svg.emit('pointerdown', { pointerId: 2, clientX: 250 });
    svg.emit('pointermove', { pointerId: 1, clientX: 100 });
    svg.emit('pointermove', { pointerId: 2, clientX: 300 });
    vi.advanceTimersByTime(16);
    expect(view()).toEqual({ zoom: 2, x: -200, y: -200 });
    svg.emit('pointerup', { pointerId: 2 });
    svg.emit('pointermove', { pointerId: 1, clientX: 110 });
    svg.emit('pointerup', { pointerId: 1 });
    expect(view()).toEqual({ zoom: 2, x: -180, y: -200 });
    expect(svg.captured.size).toBe(0);
    expect(svg.emit('click').defaultPrevented).toBe(true);
  });

  it('keeps taps clickable, but suppresses selection after a drag', () => {
    const { svg, view } = setup();
    svg.emit('pointerdown');
    svg.emit('pointermove', { clientX: 202 });
    svg.emit('pointerup');
    expect(view()).toEqual({ zoom: 1, x: 0, y: 0 });
    expect(svg.emit('click').defaultPrevented).toBe(false);
    svg.emit('pointerdown');
    svg.emit('pointermove', { clientX: 240 });
    svg.emit('pointerup');
    expect(view().x).toBe(80);
    expect(svg.emit('click').defaultPrevented).toBe(true);
    expect(svg.emit('click', { detail: 0 }).defaultPrevented).toBe(false);
  });

  it('recovers after a cancelled pinch and removes listeners/pending work on unmount', () => {
    const { svg, view, active, updates } = setup();
    svg.emit('pointerdown');
    svg.emit('pointerdown', { pointerId: 2, clientX: 250 });
    svg.emit('pointercancel', { pointerId: 2 });
    svg.emit('pointercancel');
    expect(active.mock.calls).toEqual([[true], [false]]);
    svg.emit('pointerdown');
    svg.emit('pointermove', { clientX: 230 });
    dispose?.();
    expect(svg.captured.size).toBe(0);
    vi.runAllTimers();
    expect(updates).not.toHaveBeenCalled();
    expect(svg.emit('wheel', { deltaY: -100 }).defaultPrevented).toBe(false);
    expect(view().zoom).toBe(1);
  });

  it('supports Safari pinch and double-click with Shift to zoom out', () => {
    const { svg, view } = setup();
    svg.emit('gesturestart', { scale: 1 });
    svg.emit('gesturechange', { scale: 1.5 });
    svg.emit('gesturechange', { scale: 2 });
    svg.emit('wheel', { deltaY: -100 }); // No duplicate pinch stream.
    svg.emit('gestureend');
    expect(view()).toEqual({ zoom: 2, x: -200, y: -200 });
    svg.emit('dblclick');
    vi.advanceTimersByTime(16);
    expect(view().zoom).toBe(4);
    svg.emit('dblclick', { shiftKey: true });
    vi.advanceTimersByTime(16);
    expect(view().zoom).toBe(2);
  });
});
