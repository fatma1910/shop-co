import Sidebar from "../components/Sidebar";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export default function layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <SidebarProvider>
        <Sidebar />
        <main className="w-[100%] overflow-hidden">
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
        )
  }