import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { studentId, courseId, completed, score, completedAt } = await req.json()

        if (!studentId || !courseId || completed === undefined) {
            return NextResponse.json(
                { message: "Data is missing" },
                { status: 400 }
            )
        }

        // const existingTest = await prisma.test.findUnique(
        //     {
        //         where: {
        //             studentId_courseId: { studentId, courseId }
        //         }
        //     }
        // )

        // if (existingTest) {
        //     return NextResponse.json(
        //         { message: "Student already completed test" },
        //         { status: 400 }
        //     );
        // }

        await prisma.test.create({
            data: {
                studentId,
                courseId,
                completed,
                score,
                completedAt
            }
        })

        return NextResponse.json(
            { message: "Test completed successfully" },
            { status: 201 }
        )
    } catch (error) {
        return NextResponse.json(
            { message: "Internal Serve Error" },
            { status: 500 }
        )
    }
}