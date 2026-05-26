"use client";
import React, { ReactElement } from "react";

export default function Button({
  children,
  className,
  onClick,
}: {
  children: string | ReactElement;
  className?: string;
  onClick?: () => void;
}): React.ReactElement {
  return (
    <button
      onClick={onClick}
      className={`group relative inline-flex items-center justify-center gap-2 cursor-pointer
        px-8 py-3 rounded-xl font-semibold text-base tracking-wide
        bg-[#0d0a05] text-amber-400
        border border-amber-500/40
        shadow-[0_0_16px_rgba(251,191,36,0.08)]
        transition-all duration-300 ease-out
        hover:border-amber-400/80
        hover:shadow-[0_0_28px_rgba(251,191,36,0.25)]
        hover:scale-[1.04]
        active:scale-[0.97]
        overflow-hidden
        ${className ?? ""}`}
    >
      {/* subtle inner glow sweep on hover */}
      <span
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300
          bg-[radial-gradient(ellipse_at_center,rgba(251,191,36,0.08)_0%,transparent_70%)]"
        aria-hidden
      />

      {/* download icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4 shrink-0 transition-transform duration-300 group-hover:translate-y-0.5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 3v13M7 11l5 5 5-5" />
        <path d="M5 21h14" />
      </svg>

      <span className="relative z-10">{children}</span>
    </button>
  );
}
