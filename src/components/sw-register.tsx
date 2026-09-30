"use client";

import * as React from "react";

export function SwRegister(): React.JSX.Element {
  React.useEffect(() => {
    if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // offline shell optional — app still works online
      });
    }
  }, []);
  return <></>;
}
