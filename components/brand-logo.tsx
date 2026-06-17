import type { HTMLAttributes } from "react";

type BrandLogoProps = HTMLAttributes<HTMLSpanElement> & {
  size?: "sm" | "md" | "lg";
};

const sizeClasses = {
  sm: "text-2xl",
  md: "text-3xl",
  lg: "text-5xl",
};

export function BrandLogo({ size = "md", className = "", ...props }: BrandLogoProps) {
  return (
    <span
      aria-label="thxm"
      className={`inline-flex select-none items-baseline font-black tracking-[-0.08em] leading-none ${sizeClasses[size]} ${className}`}
      {...props}
    >
      <span className="text-[#3d4650]">th</span>
      <span className="text-[#ff8c00]">x</span>
      <span className="text-[#3d4650]">m</span>
    </span>
  );
}