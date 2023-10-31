import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Toast from "@/components/Toast";

export const metadata: Metadata = {
  title: "Tuner | Dashboard",
  description:
    "Tuner helps you fine-tune GPT Models on your own data - no code required.",
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
      <main className="pt-16">{children}</main>
    </>
  );
}
