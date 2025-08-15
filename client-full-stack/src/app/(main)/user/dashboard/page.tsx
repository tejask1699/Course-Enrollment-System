"use client";
import { DashboardCard } from "@/components/dashboard/dashboard-card";
import { Button } from "@/components/ui/button";
import { Plus, BookOpen, User, Layers, FileText } from "lucide-react";

export default function StudenDashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Heading */}
      <h1 className="text-2xl font-bold">Student Dashboard</h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard
          title="Total Courses"
          icon={<BookOpen className="text-blue-600" />}
          count={12}
        />
        <DashboardCard
          title="Total Students"
          icon={<User className="text-green-600" />}
          count={87}
        />
        <DashboardCard
          title="Enrollments"
          icon={<FileText className="text-purple-600" />}
          count={150}
        />
        <DashboardCard
          title="Categories"
          icon={<Layers className="text-orange-600" />}
          count={5}
        />
      </div>

      {/* Course Management */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Courses</h2>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Course
          </Button>
        </div>
        {/* Replace with actual component */}
        <div className="border rounded-lg p-4 text-sm text-muted-foreground">
          [Course list goes here]
        </div>
      </div>

      {/* Category Management */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Categories</h2>
          <Button variant="secondary">
            <Plus className="mr-2 h-4 w-4" />
            Add Category
          </Button>
        </div>
        {/* Replace with actual component */}
        <div className="border rounded-lg p-4 text-sm text-muted-foreground">
          [Category list goes here]
        </div>
      </div>

      {/* Recent Enrollments */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Recent Enrollments</h2>
        <div className="border rounded-lg p-4 text-sm text-muted-foreground">
          [Recent enrollment data goes here]
        </div>
      </div>
    </div>
  );
}
