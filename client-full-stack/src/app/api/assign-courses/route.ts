import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
  try {
    const { userId, courseId } = await req.json();

    if (!userId || !courseId) {
      return NextResponse.json(
        { message: "userId and courseId is required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user || user.role !== "student") {
      return NextResponse.json(
        { message: "Invalid user or not a student" },
        { status: 400 }
      );
    }

    const course = await prisma.course.findUnique({ where: { id: courseId } });
    if (!course) {
      return NextResponse.json(
        { message: "Course not found" },
        { status: 404 }
      );
    }

    const existing = await prisma.enrollment.findUnique({
      where: { studentId_courseId: { studentId: userId, courseId } },
    });

    if (existing) {
      return NextResponse.json(
        { message: "Student already enrolled in this course" },
        { status: 400 }
      );
    }

    await prisma.enrollment.create({
      data: {
        studentId: userId,
        courseId: courseId,
        status: "enrolled",
      },
    });

    return NextResponse.json(
      { message: "Course assigned successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Register Error:", error);
    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
