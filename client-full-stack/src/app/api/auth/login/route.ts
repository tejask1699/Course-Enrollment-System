import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const dummyUser = {
  email: "test@gmail.com",
  password: bcrypt.hashSync("password123", 10),
  userId: "234578"
}

const JWT_SERECT = process.env.JWT_SERECT || "yoursecretkey"
export async function POST(req: NextRequest) {
  try {
    const { user_email, user_password } = await req.json();

    if (!user_email || !user_password) {
      return NextResponse.json({ message: "Email and password required" })
    }

    if (user_email !== dummyUser.email) {
      return NextResponse.json({ message: "Invalid Email" }, { status: 401 })
    }
    const isMatch = await bcrypt.compare(user_password, dummyUser.password);

    if (!isMatch) {
      return NextResponse.json({ message: "Invalid Password" }, { status: 401 })
    }

    const token = jwt.sign({ userId: dummyUser.userId, email: dummyUser.email }, JWT_SERECT, { expiresIn: "1h" })

    return NextResponse.json({ message: "Login Successful", token }, { status: 200 })
  } catch (err) {
    console.error("Login Error", err)
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
  }
}