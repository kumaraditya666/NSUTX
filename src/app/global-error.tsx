"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}): React.JSX.Element {
  return (
    <html lang="en">
      <body>
        <div role="alert" style={{ padding: 32, textAlign: "center" }}>
          <h2>Something went wrong</h2>
          <button type="button" onClick={reset}>Try again</button>
        </div>
      </body>
    </html>
  );
}
