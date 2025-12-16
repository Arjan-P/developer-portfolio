import { NavLink } from "react-router-dom";
import type { ReactNode } from "react";

interface NavbarIconProps {
  to: string;
  icon?: ReactNode;
  label?: string;
  end?: boolean;
}

export default function NavigationBarIcon({
  to,
  icon,
  label,
  end = false,
}: NavbarIconProps) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `
        nav-item
        relative flex flex-col items-center justify-center
        h-full px-3 text-gray-asparagus-900
        ${isActive ? "font-semibold active" : "opacity-70"}
        `
      }
    >
      <span className="text-2xl">{icon}</span>
      {label && <span className="text-xl mt-0.5">{label}</span>}
    </NavLink>
  );
}
