// app/api/auth/login/route.ts
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

const JWT_SECRET = process.env.JWT_SECRET || "yoursecretkey"

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json({ message: "Email and password required" }, { status: 400 })
    }

    // Fetch user from DB
    const user = await prisma.user.findUnique({
      where: { email: email },
      select: {
        id: true,
        username: true,
        email: true,
        password: true,
        role: true
      }
    })

    if (!user) {
      return NextResponse.json({ message: "Invalid Email" }, { status: 401 })
    }

    // Compare hashed passwords
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return NextResponse.json({ message: "Invalid Password" }, { status: 401 })
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "3h" }
    )

    return NextResponse.json({ message: "Login Successful", token, id:user.id, name:user.username, role:user.role }, { status: 200 })
  } catch (err) {
    console.error("Login Error", err)
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
  }
}
