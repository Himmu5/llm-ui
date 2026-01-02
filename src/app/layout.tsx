import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FinanceAI - Financial Data Analysis",
  description: "AI-powered financial analysis platform for company reports, 10-K filings, and financial statements",
  keywords: ["financial analysis", "AI", "company reports", "10-K", "financial statements", "stock analysis"],
  authors: [{ name: "FinanceAI" }],
  openGraph: {
    title: "FinanceAI - Financial Data Analysis",
    description: "AI-powered financial analysis platform",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📊</text></svg>" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
