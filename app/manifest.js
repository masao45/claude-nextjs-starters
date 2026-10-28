export default function manifest() {
  return {
    name: "Next Starter",
    short_name: "Next Starter",
    description: "Next.js + Tailwind + shadcn 보일러플레이트",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#18181b",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  }
}
