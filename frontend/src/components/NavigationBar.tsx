import { useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import NavigationBarIcon from "./NavigationBarIcon";

export default function NavigationBar() {
  const tabs = [
    { label: "Home", to: "/", end: true },
    { label: "Blog", to: "/blog" },
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState({ left: 0, width: 0 });
  const location = useLocation();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const activeEl = container.querySelector(
      ".nav-item.active"
    ) as HTMLElement | null;

    if (!activeEl) return;

    setStyle({
      left: activeEl.offsetLeft,
      width: activeEl.offsetWidth,
    });
  }, [location.pathname]);

  return (
    <nav
      ref={containerRef}
      className="relative flex items-center gap-6 h-full px-4 "
    >
      {tabs.map((tab) => (
        <NavigationBarIcon key={tab.to} {...tab} />
      ))}

      {/* shared underline */}
      <span
        className="
          absolute bottom-0 h-0.5
          bg-gray-asparagus-900
          transition-all duration-400 ease-out
        "
        style={{
          left: style.left,
          width: style.width,
        }}
      />
    </nav>
  );
}
