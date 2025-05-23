import "./globals.css";
import { Outfit } from "next/font/google";
import Provider from "./provider";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "../components/ui/sonner";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "ClarifAI",
  description: "Generated by create next app",
  icons: {
    icon: "/favicon.ico", // Path to your favicon
  },
};


export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en"> {/* ✅ Wrap the entire layout in <html> */}
        <body className={outfit.className} suppressHydrationWarning={true}>
          <Provider>
            {children}
          </Provider>
          <Toaster/>
        </body>
      </html>
    </ClerkProvider>
  );
}
