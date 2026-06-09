import type { SVGProps } from "react";
import type { IconName } from "@/lib/content";

type IconProps = SVGProps<SVGSVGElement> & { name: IconName };

const paths: Record<IconName, JSX.Element> = {
  shield: (
    <path d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3z" />
  ),
  chart: (
    <>
      <path d="M4 19h16" />
      <path d="M7 16V9" />
      <path d="M12 16V5" />
      <path d="M17 16v-4" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M15.5 8.5l-2 5-5 2 2-5 5-2z" />
    </>
  ),
  scroll: (
    <>
      <path d="M6 4h10a2 2 0 0 1 2 2v11a3 3 0 0 1-3 3H7" />
      <path d="M6 4a2 2 0 0 0-2 2v1h4" />
      <path d="M16 20a3 3 0 0 0 3-3v-1h-9v1a3 3 0 0 1-3 3" />
    </>
  ),
  scale: (
    <>
      <path d="M12 3v18" />
      <path d="M7 21h10" />
      <path d="M5 7h14" />
      <path d="M5 7l-2.5 5a2.5 2.5 0 0 0 5 0L5 7z" />
      <path d="M19 7l-2.5 5a2.5 2.5 0 0 0 5 0L19 7z" />
    </>
  ),
  gem: (
    <>
      <path d="M6 4h12l3 5-9 11L3 9l3-5z" />
      <path d="M3 9h18" />
      <path d="M9 4l-1 5 4 11 4-11-1-5" />
    </>
  ),
};

export function Icon({ name, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
