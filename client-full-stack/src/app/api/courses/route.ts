import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      orderBy: { created_at: "desc" },
    });

    return NextResponse.json(courses, { status: 200 });
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

export async function POST(req: NextRequest) {
  try {
    const {
      course_name,
      course_code,
      duration,
      levels,
      course_description,
      category,
      max_students,
      is_free,
      price,
      discount,
      certificate_available,
      chapters,
      notes
    } = await req.json();

    if (!course_code || !course_name) {
      return NextResponse.json(
        { message: "Course Name and Code is required" },
        { status: 400 }
      );
    }

    const course = await prisma.course.findFirst({
      where: { course_code },
    });

    if (course) {
      return NextResponse.json(
        { message: "This course Already exist" },
        { status: 400 }
      );
    }

    const newCourse = await prisma.course.create({
      data: {
        course_name,
        course_code,
        duration,
        levels,
        course_description,
        category,
        max_students,
        is_free,
        price,
        discount,
        certificate_available,
        chapters,
        notes
      },
    });

    return NextResponse.json(
      {
        message: "Course Create Successfully",
        course: {
          course_name: newCourse.course_name,
          course_code: newCourse.course_code,
          duration: newCourse.duration,
          levels: newCourse.levels,
          course_description: newCourse.course_description,
        },
      },
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
