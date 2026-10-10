import { useId } from "react";
import type { SVGProps } from "react";

export type BrandMarkProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered width and height; the speech mark has a square viewBox. */
  size?: number | string;
  /** Omit beside a visible wordmark; provide for a standalone meaningful mark. */
  title?: string;
};

/** Two interlocking speech forms with an open crossbar and a single speech tail. */
export function BrandMark({ size = 32, title, ...props }: BrandMarkProps) {
  const titleId = useId();
  const named = Boolean(
    title || props["aria-label"] || props["aria-labelledby"],
  );

  return (
    <svg
      width={size}
      height={size}
      viewBox="68 100 540 540"
      fill="currentColor"
      focusable="false"
      role={named ? "img" : undefined}
      aria-hidden={named ? undefined : true}
      aria-labelledby={title ? titleId : undefined}
      {...props}
    >
      {title && <title id={titleId}>{title}</title>}
      <path d="M383 346H289V261C251 267 220 296 220 339V419C220 456 244 486 281 499L288 514C253 525 224 529 197 523L100 561L130 493C108 471 98 442 98 405V345C98 301 116 270 151 244L262 169C312 135 383 168 383 223Z" />
      <path d="M383 243C412 229 433 225 449 226C521 226 578 283 578 354V421C578 464 561 495 526 519L415 582C362 615 289 582 289 527V415H383V500C421 493 449 462 449 425V341C449 302 424 268 383 255Z" />
    </svg>
  );
}

export default BrandMark;
