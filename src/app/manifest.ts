import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "NSUT Hub",
    short_name: "NSUT Hub",
    description: "Everything happening at NSUT. One place.",
    start_url: "/",
    display: "standalone",
    background_color: "#0b0b12",
    theme_color: "#0b0b12",
    icons: [
      { src: "/icons/icon-192.svg", sizes: "192x192", type: "image/svg+xml" },
      { src: "/icons/icon-512.svg", sizes: "512x512", type: "image/svg+xml" },
      { src: "/icons/icon.svg", sizes: "512x512", type: "image/svg+xml", purpose: "maskable" },
    ],
  };
}
