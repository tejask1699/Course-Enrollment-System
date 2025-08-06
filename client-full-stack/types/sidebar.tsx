import {
  BookOpen,
  GraduationCap,
  Trophy,
  Calendar,
  Users,
  BarChart3,
  Shield,
  FileText,
  DollarSign,
  UserCheck,
  Brain
} from "lucide-react"


export const adminItems = [
  {
    title: "Admin Dashboard",
    url: "/admin/dashboard",
    icon: BarChart3,
    description: "Analytics & insights",
    badge: "Overview",
    gradient: "from-purple-500 to-indigo-600"
  },
  {
    title: "Manage Courses",
    url: "/admin/courses",
    icon: BookOpen,
    description: "Create & edit courses",
    count: 45,
    gradient: "from-blue-500 to-cyan-600"
  },
  {
    title: "Student Management",
    url: "/admin/students",
    icon: Users,
    description: "Enrolled students",
    count: 1234,
    gradient: "from-green-500 to-emerald-600"
  },
  {
    title: "Instructor Panel",
    url: "/admin/instructors",
    icon: UserCheck,
    description: "Manage instructors",
    count: 28,
    gradient: "from-orange-500 to-red-600"
  },
  {
    title: "Financial Reports",
    url: "/admin/finance",
    icon: DollarSign,
    description: "Revenue & payments",
    badge: "Updated",
    gradient: "from-yellow-500 to-orange-600"
  },
  {
    title: "System Settings",
    url: "/admin/settings",
    icon: Shield,
    description: "Platform configuration",
    gradient: "from-gray-500 to-slate-600"
  }
]

// Student-specific navigation items
export const studentItems = [
  {
    title: "Course Catalog",
    url: "/dashboard",
    icon: BookOpen,
    description: "Browse courses",
    badge: "New",
    gradient: "from-blue-500 to-purple-600"
  },
  {
    title: "My Learning",
    url: "/my-courses",
    icon: GraduationCap,
    description: "Current courses",
    progress: 65,
    gradient: "from-green-500 to-teal-600"
  },
  {
    title: "Class Schedule",
    url: "/schedule",
    icon: Calendar,
    description: "Upcoming classes",
    upcoming: 3,
    gradient: "from-orange-500 to-red-600"
  },
  {
    title: "Achievements",
    url: "/achievements",
    icon: Trophy,
    description: "Badges & certificates",
    count: 12,
    gradient: "from-yellow-500 to-orange-600"
  },
  {
    title: "Study Materials",
    url: "/materials",
    icon: FileText,
    description: "Notes & resources",
    badge: "Updated",
    gradient: "from-cyan-500 to-blue-600"
  },
  {
    title: "Practice Tests",
    url: "/tests",
    icon: Brain,
    description: "Quizzes & assessments",
    count: 8,
    gradient: "from-purple-500 to-violet-600"
  }
]

// Admin quick stats
export const adminStats = {
  totalStudents: 1234,
  totalCourses: 45,
  revenue: 89500,
  activeSessions: 156
}

// Student quick stats
export const studentStats = {
  coursesCompleted: 8,
  hoursLearned: 124,
  currentStreak: 7,
  certificates: 5
}
