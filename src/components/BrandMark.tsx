import { useId } from "react";
import type { SVGProps } from "react";

export type BrandMarkProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered width and height; the geometry uses a 32 × 32 viewBox. */
  size?: number | string;
  /** Omit beside a visible wordmark; provide for a standalone meaningful mark. */
  title?: string;
};

/** Two facing speech/book strokes form an H, separated by a clear diagonal seam. */
export function BrandMark({ size = 32, title, ...props }: BrandMarkProps) {
  const titleId = useId();
  const named = Boolean(
    title || props["aria-label"] || props["aria-labelledby"],
  );

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="currentColor"
      focusable="false"
      role={named ? "img" : undefined}
      aria-hidden={named ? undefined : true}
      aria-labelledby={title ? titleId : undefined}
      {...props}
    >
      {title && <title id={titleId}>{title}</title>}
      <path d="M4 4H10V13H17.4L12.6 19H10V24L4 28V4Z" />
      <path d="M28 28H22V19H14.6L19.4 13H22V8L28 4V28Z" />
    </svg>
  );
}

export default BrandMark;
