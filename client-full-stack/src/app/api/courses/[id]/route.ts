import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const courseId = params.id


        const course = prisma.course.findUnique({
            where: { id: courseId }
        })
        if (!course) return NextResponse.json({ error: "Course not found" }, { status: 404 });

        const formattedData = {
            ...course,
            // durationFormatted: `${course.duration} ${course.duration === 1 ? "week" : "weeks"}`,
        }
        return NextResponse.json(formattedData, { status: 200 })
    } catch (error) {
        console.log("Internal Server Error")
        return NextResponse.json(
            {
                message: "Internal Server Error",

            },
            { status: 500 }
        );
    }
}