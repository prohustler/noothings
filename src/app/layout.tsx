import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "누띵즈 - 생활 꿀팁 & 정보",
  description: "읽고 나면 하나라도 정확히 알게 되는 글",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title="누띵즈 RSS 피드"
          href="/feed.xml"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
