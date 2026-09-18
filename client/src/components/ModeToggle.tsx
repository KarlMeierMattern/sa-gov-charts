import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

function ContrastIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      aria-hidden="true"
      className="text-foreground"
    >
      <circle
        cx="12"
        cy="12"
        r="8.5"
        stroke="currentColor"
        strokeWidth="1.25"
      />
      <line
        x1="12"
        y1="3.5"
        x2="12"
        y2="20.5"
        stroke="currentColor"
        strokeWidth="1.25"
      />
      <defs>
        <clipPath id="contrast-right-half">
          <path d="M12 3.5 A8.5 8.5 0 0 1 12 20.5 Z" />
        </clipPath>
        <pattern
          id="contrast-hatch"
          width="3"
          height="3"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="3"
            stroke="currentColor"
            strokeWidth="0.75"
          />
        </pattern>
      </defs>
      <rect
        x="12"
        y="3.5"
        width="8.5"
        height="17"
        fill="url(#contrast-hatch)"
        clipPath="url(#contrast-right-half)"
      />
    </svg>
  );
}

export function ModeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label={
        mounted && resolvedTheme === "dark"
          ? "Switch to light mode"
          : "Switch to dark mode"
      }
    >
      <ContrastIcon />
    </Button>
  );
}
