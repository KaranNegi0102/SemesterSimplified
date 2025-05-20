"use client";

// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { store } from "./redux/store";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <Toaster />
          {children}
        </Provider>
      </body>
    </html>
  );
}
