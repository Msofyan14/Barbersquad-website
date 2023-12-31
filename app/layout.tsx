import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import { ModalLandingPageProvider } from "@/components/modal-landing-page/modal-landing-page-provider";
import { openSans } from "@/components/ui/fonts";
export const metadata: Metadata = {
  title: "Barbersquad",
  description: "Barbersquad Pioneer of Grooming Industry in Cikarang",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${openSans.className} antialiased`}>
        <Toaster position="top-center" richColors />
        {children}
        <ModalLandingPageProvider />
      </body>
    </html>
  );
}
