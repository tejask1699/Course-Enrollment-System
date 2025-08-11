import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const student = await prisma.user.findMany({
      where: { role: "student" },
    });

    return NextResponse.json(student, { status: 200 });
  } catch (error) {
    console.error("Student Get Error:", error);
    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
