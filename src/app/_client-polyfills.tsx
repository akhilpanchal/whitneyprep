"use client";

import { useEffect, useState } from "react";

export default function ClientPolyfills({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && !("ResizeObserver" in window)) {
      window.ResizeObserver = require("@juggle/resize-observer").ResizeObserver;
    }

    setReady(true); // ensure we only render children after patching
  }, []);

  return ready ? <>{children}</> : null;
}
