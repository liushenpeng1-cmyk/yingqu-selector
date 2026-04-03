import type { Metadata } from "next";
import { Noto_Sans_SC, DM_Sans } from "next/font/google";
import "./globals.css";

const notoSansSC = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-cn",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-en",
});

export const metadata: Metadata = {
  title: "英区大发明家·选校器 — 留学选校智能匹配",
  description: "输入你的成绩，30秒智能匹配全球 70+ 所院校。覆盖英国、澳洲、香港、新加坡、美国、加拿大。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={`h-full antialiased ${notoSansSC.variable} ${dmSans.variable}`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
