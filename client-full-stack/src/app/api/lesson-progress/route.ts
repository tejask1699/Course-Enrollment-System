import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { studentId, lessonId, completed } = await req.json();

    if (!lessonId || !studentId || completed === undefined) {
      return NextResponse.json({ message: "Data is missing" }, { status: 400 });
    }

    const existingProgress = await prisma.lessonProgress.findUnique({
      where: {
        studentId_lessonId: { studentId, lessonId },
      },
    });
    if (existingProgress) {
      return NextResponse.json(
        { message: "This Lesson Already marked completed" },
        { status: 400 }
      );
    }

    const progress = await prisma.lessonProgress.create({
      data: {
        lessonId,
        studentId,
        completed,
        completedAt: new Date(),
      },
    });
    return NextResponse.json(
      {
        message: "Progress Updated",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
