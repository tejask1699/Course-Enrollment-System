-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('admin', 'student');

-- CreateEnum
CREATE TYPE "public"."Levels" AS ENUM ('Beginner', 'Intermediate', 'Advanced');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "public"."Role" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Course" (
    "id" TEXT NOT NULL,
    "course_name" TEXT NOT NULL,
    "course_code" TEXT NOT NULL,
    "levels" "public"."Levels" NOT NULL,
    "course_description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "public"."User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Course_course_code_key" ON "public"."Course"("course_code");
