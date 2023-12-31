import type { Metadata } from "next";
import "../../globals.css";
import { Toaster } from "sonner";
import { NavbarDashboard } from "@/components/dashboard/navbarDashboard";
import { SideBar } from "@/components/dashboard/side-bar";
import { getCurrentUser } from "@/hooks/getCurrentUser";
import { openSans } from "@/components/ui/fonts";
import { BottomBar } from "@/components/dashboard/bottom-bar";
import { ModalProvider } from "@/components/dashboard/modal/modal-provider";
import { EdgeStoreProvider } from "@/lib/edgestore";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <section className={`${openSans.className} antialiased flex`}>
      <Toaster position="top-center" richColors />
      <SideBar />
      <main className="flex flex-col w-full ">
        <EdgeStoreProvider>
          <NavbarDashboard currentUser={currentUser.name} />
          {children}
          <ModalProvider />
        </EdgeStoreProvider>
      </main>
      <BottomBar />
    </section>
  );
}
