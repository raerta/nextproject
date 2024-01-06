import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import SideBar from "./_components/Navigation/SideBar";
import ModalWrapper from "./_components/Modal/ModalWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next.Js Project",
  description: "Developed By Ramazan Ertan",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StoreProvider>
      <html lang="en">
        <body className={inter.className}>
          <main className="flex justify-end">
            <SideBar />
            <div className="xl:w-5/6 w-full pl-2 pt-4">{children}</div>
          </main>
          <ModalWrapper/>
        </body>
      </html>
    </StoreProvider>
  );
}
