import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const courseId = (await params).id;

    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include:{
        chapters:{
          include:{
            lessons:{
              include:{
                LessonProgress:true
              }
            }
          }
        }
        
      }
    });
    if (!course)
      return NextResponse.json({ error: "Course not found" }, { status: 404 });

   
    const formattedData = {
      ...course,
    };
    return NextResponse.json(formattedData, { status: 200 });
  } catch (error) {
    console.log("Internal Server Error");
    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
