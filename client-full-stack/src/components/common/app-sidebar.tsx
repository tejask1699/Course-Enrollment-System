"use client";

import { LogOut, Sparkles, Clock, Shield } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "../ui/button";
import { useRouter, usePathname } from "next/navigation";
import clsx from "clsx";
import { adminItems, studentItems } from "../../types/sidebar";
import { useEffect, useState } from "react";
import Link from "next/link";

export function AppSidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const [userRole, setUserRole] = useState<"admin" | "student">();

  useEffect(() => {
    const role = localStorage.getItem("role") as "admin" | "student";
    if (role) {
      setUserRole(role);
    }
  }, []);

  const isAdmin = userRole === "admin";
  const mainItems = isAdmin ? adminItems : studentItems;

  // Role-specific header content
  const getHeaderContent = () => {
    if (isAdmin) {
      return {
        title: "Course Enrollment System",
        subtitle: "Admin Dashboard",
        bgGradient: "from-purple-500 to-indigo-600",
      };
    }
    return {
      title: "Course Enrollment System",
      subtitle: "Student Portal",
      bgGradient: "from-blue-500 to-purple-600",
    };
  };

  // Role-specific stats display
  // const renderStats = () => {
  //   if (isAdmin) {
  //     return (
  //       <div className="grid grid-cols-2 gap-3 text-center">
  //         <div>
  //           <div className="text-xl font-bold">{adminStats.totalStudents}</div>
  //           <div className="text-xs opacity-80">Students</div>
  //         </div>
  //         <div>
  //           <div className="text-xl font-bold">{adminStats.totalCourses}</div>
  //           <div className="text-xs opacity-80">Courses</div>
  //         </div>
  //         <div>
  //           <div className="text-xl font-bold">${(adminStats.revenue / 1000).toFixed(0)}K</div>
  //           <div className="text-xs opacity-80">Revenue</div>
  //         </div>
  //         <div>
  //           <div className="text-xl font-bold flex items-center justify-center gap-1">
  //             {adminStats.activeSessions}
  //             <Video className="w-3 h-3" />
  //           </div>
  //           <div className="text-xs opacity-80">Live Sessions</div>
  //         </div>
  //       </div>
  //     )
  //   }

  //   return (
  //     <div className="grid grid-cols-3 gap-2 text-center">
  //       <div>
  //         <div className="text-xl font-bold">{studentStats.coursesCompleted}</div>
  //         <div className="text-xs opacity-80">Completed</div>
  //       </div>
  //       <div>
  //         <div className="text-xl font-bold">{studentStats.hoursLearned}</div>
  //         <div className="text-xs opacity-80">Hours</div>
  //       </div>
  //       <div>
  //         <div className="text-xl font-bold flex items-center justify-center gap-1">
  //           {studentStats.currentStreak}
  //           <Star className="w-3 h-3" />
  //         </div>
  //         <div className="text-xs opacity-80">Day Streak</div>
  //       </div>
  //     </div>
  //   )
  // }

  // Role-specific footer content
  const getFooterContent = () => {
    if (isAdmin) {
      return {
        label: "Admin session",
        value: "4h 12m",
        description: "Active today",
      };
    }
    return {
      label: "Study time today",
      value: "2h 45m",
      description: "Keep it up!",
    };
  };

  const headerContent = getHeaderContent();
  const footerContent = getFooterContent();

  return (
    <Sidebar className="w-70 bg-gradient-to-b from-slate-50 to-white border-r border-gray-200 min-h-screen shadow-lg">
      <SidebarContent className="flex flex-col justify-between h-full">
        <div className="space-y-6">
          {/* Header with Logo */}
          <div className="px-6 py-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 bg-gradient-to-r ${headerContent.bgGradient} rounded-xl flex items-center justify-center`}
              >
                {isAdmin ? (
                  <Shield className="w-6 h-6 text-white" />
                ) : (
                  <Sparkles className="w-6 h-6 text-white" />
                )}
              </div>
              <div>
                <h2 className="font-bold text-sm text-gray-900">
                  {headerContent.title}
                </h2>
                <div className="flex items-center gap-2">
                  <p className="text-xs text-gray-500">
                    {headerContent.subtitle}
                  </p>
                  {isAdmin && (
                    <span className="px-2 py-0.5 text-xs font-medium bg-purple-100 text-purple-700 rounded-full">
                      Admin
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          {/* <div className="px-6">
            <div className={`bg-gradient-to-r ${headerContent.bgGradient} rounded-2xl p-4 text-white`}>
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {isAdmin ? 'Platform Overview' : 'Your Progress'}
                </span>
              </div>
              {renderStats()}
            </div>
          </div> */}

          {/* Main Navigation */}
          <SidebarGroup>
            <SidebarGroupLabel className="px-6 py-2 text-sm font-semibold text-gray-600 uppercase tracking-wide">
              {isAdmin ? "Admin Panel" : "Learning Hub"}
            </SidebarGroupLabel>
            <SidebarGroupContent className="px-4">
              <SidebarMenu className="space-y-2">
                {mainItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.url}
                        className={clsx(
                          "group flex items-center gap-3 p-10 text-sm font-medium rounded-xl transition-all duration-200 relative overflow-hidden",
                          pathname.startsWith(item.url)
                            ? "bg-white shadow-md text-gray-900 border border-gray-200"
                            : "text-gray-700 hover:bg-white hover:shadow-sm"
                        )}
                      >
                        {/* Gradient background for active state */}
                        {pathname === item.url && (
                          <div
                            className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-5 rounded-xl`}
                          />
                        )}
                        <div
                          className={clsx(
                            "relative z-10 p-2 rounded-lg transition-colors",
                            pathname.startsWith(item.url)
                              ? `bg-gradient-to-r ${item.gradient} text-white`
                              : "bg-gray-100 text-gray-600 group-hover:bg-gray-200"
                          )}
                        >
                          <item.icon className="w-4 h-4" />
                        </div>

                        <div className="flex-1 relative z-10">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{item.title}</span>
                            {item.badge && (
                              <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
                                {item.badge}
                              </span>
                            )}
                            {/* {item.upcoming && (
                              <span className="px-2 py-0.5 text-xs font-medium bg-orange-100 text-orange-700 rounded-full">
                                {item.upcoming}
                              </span>
                            )} */}
                            {item.count && (
                              <span className="px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-700 rounded-full">
                                {item.count}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {item.description}
                          </p>
                          {/* {item.progress && (
                            <div className="mt-2">
                              <div className="flex justify-between text-xs text-gray-500 mb-1">
                                <span>Progress</span>
                                <span>{item.progress}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-1.5">
                                <div
                                  className={`bg-gradient-to-r ${item.gradient} h-1.5 rounded-full transition-all duration-300`}
                                  style={{ width: `${item.progress}%` }}
                                />
                              </div>
                            </div>
                          )} */}
                        </div>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Role-specific additional section */}
          {/* {isAdmin && (
            <SidebarGroup>
              <SidebarGroupLabel className="px-6 py-2 text-sm font-semibold text-gray-600 uppercase tracking-wide">
                Quick Actions
              </SidebarGroupLabel>
              <SidebarGroupContent className="px-4">
                <SidebarMenu className="space-y-1">
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="/admin/courses/new" className="flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg text-gray-600 hover:bg-white hover:shadow-sm transition-all">
                        <div className="p-1 rounded bg-green-100">
                          <Plus className="w-3 h-3 text-green-600" />
                        </div>
                        <span>Create Course</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="/admin/reports" className="flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg text-gray-600 hover:bg-white hover:shadow-sm transition-all">
                        <div className="p-1 rounded bg-blue-100">
                          <Database className="w-3 h-3 text-blue-600" />
                        </div>
                        <span>View Reports</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          )} */}
        </div>

        {/* Footer with enhanced logout */}
        <SidebarFooter className="p-6 border-t border-gray-100">
          <div className="mb-4 p-3 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
              <Clock className="w-3 h-3" />
              <span>{footerContent.label}</span>
            </div>
            <div className="text-lg font-bold text-gray-900">
              {footerContent.value}
            </div>
            {footerContent.description && (
              <div className="text-xs text-gray-500 mt-1">
                {footerContent.description}
              </div>
            )}
          </div>

          <Button
            variant="ghost"
            className="w-full justify-start text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors group"
            onClick={() => {
              router.push("/login");
              localStorage.clear();
            }}
          >
            <LogOut className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
            Sign Out
          </Button>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
