import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Toast from "@/components/Toast";

export const metadata: Metadata = {
  title: "CBK Whitelabel",
};

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <Toast />
      <main className="pt-16 bg-zinc-50 min-h-screen">{children}</main>
    </>
  );
}
