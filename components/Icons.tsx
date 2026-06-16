import type { SVGProps } from "react";
import type { IconName } from "@/lib/content";

type IconProps = SVGProps<SVGSVGElement> & { name: IconName };

const paths: Record<IconName, JSX.Element> = {
  // Cash flow — rising trend with circulating arrows
  cashflow: (
    <>
      <path d="M4 18l5-5 3 3 7-8" />
      <path d="M17 8h3v3" />
      <path d="M4 21h16" />
    </>
  ),
  // Profit & pricing — coins / stacked value
  profit: (
    <>
      <ellipse cx="12" cy="6" rx="7" ry="3" />
      <path d="M5 6v6c0 1.66 3.13 3 7 3s7-1.34 7-3V6" />
      <path d="M5 12v6c0 1.66 3.13 3 7 3s7-1.34 7-3v-6" />
    </>
  ),
  // Funding & banks — bank / pillared building
  funding: (
    <>
      <path d="M3 9l9-5 9 5" />
      <path d="M4 9v8" />
      <path d="M9 9v8" />
      <path d="M15 9v8" />
      <path d="M20 9v8" />
      <path d="M3 20h18" />
    </>
  ),
  // Reporting & systems — dashboard panel
  reporting: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18" />
      <path d="M8 13v4" />
      <path d="M12 12v5" />
      <path d="M16 14v3" />
    </>
  ),
  // Risk & governance - shielded check
  governance: (
    <>
      <path d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  // Growth & strategy — target with rising arrow
  growth: (
    <>
      <circle cx="11" cy="13" r="7" />
      <path d="M11 13l5-5" />
      <path d="M14 5h4v4" />
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
