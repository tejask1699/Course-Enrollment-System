import type { Metadata } from "next";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/common/app-sidebar";
import HeaderProfile from "@/components/common/header-profile";
import { ReactQueryProvider } from "@/providers/react-query-provider";

export const metadata: Metadata = {
  title: "Course Enrollment System",
  description: "A system to manage course registrations, students, and instructors.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SidebarProvider>
      <ReactQueryProvider>
        <div className="flex min-h-screen">
          <AppSidebar />
          <main className="flex-1 p-6">
            <div className="flex justify-between">
              <SidebarTrigger />
              <HeaderProfile />
            </div>
            {children}
          </main>
        </div>
      </ReactQueryProvider>
    </SidebarProvider>
  );
}
