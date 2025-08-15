import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const studentId = searchParams.get("studentId");

    if (!studentId) {
      return NextResponse.json(
        { message: "studentId is required" },
        { status: 400 }
      );
    }

    const courses = await prisma.course.findMany({
      orderBy: { created_at: "desc" },
      include: {
        Enrollment: {
          where: { studentId },
          select: { id: true },
        },
      },
    });

    const result = courses.map((course) => ({
      ...course,
      enrolled: course.Enrollment.length > 0,
    }));

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
