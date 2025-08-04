"use client";

import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import AuthFooter from "@/components/auth/auth-footer";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
  role: "admin" | "student";
}

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<RegisterData>();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const onSubmit = async (data: RegisterData) => {
    setLoading(true);
    const formattedData = {
      username: data.name,
      password: data.password,
      email: data.email,
      role: data.role
    };

    try {
      const res = await fetch(`/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });

      if (res.ok) {
        const Userdata = await res.json();
        localStorage.setItem("token", Userdata.token);
        setLoading(false);
        toast.success("Registered successfully");
        router.push("/dashboard");
      } else {
        const errorData = await res.json();
        setLoading(false);
        toast.error(errorData.message || "Registration failed");
      }
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "An unexpected error occurred. Please try again.";
      setLoading(false);
      toast.error(message);
    }
  };

  const password = watch("password");

  return (
    <div className="flex flex-col items-center justify-center h-[100vh] bg-gray-50">
      <Card className="w-[400px] p-6">
        <CardContent>
          <h1 className="text-2xl font-semibold text-center mb-6">Register</h1>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="space-y-4">
              {/* Full Name Field */}
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  className={`${errors.name ? "border-red-500" : ""}`}
                  {...register("name", {
                    required: "Full Name is required",
                    minLength: {
                      value: 2,
                      message: "Full Name must be at least 2 characters",
                    },
                  })}
                />
                {errors.name && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className={`${errors.email ? "border-red-500" : ""}`}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Please enter a valid email address",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="relative">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className={`${errors.password ? "border-red-500" : ""}`}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-8 text-gray-500 hover:text-gray-700 focus:outline-none"
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
                {errors.password && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="relative">
                <Label htmlFor="confirm_password">Confirm Password</Label>
                <Input
                  id="confirm_password"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  className={`${errors.confirm_password ? "border-red-500" : ""
                    }`}
                  {...register("confirm_password", {
                    required: "Confirm Password is required",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-8 text-gray-500 hover:text-gray-700 focus:outline-none"
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
                {errors.confirm_password && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.confirm_password.message}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <Label htmlFor="Role">Role</Label>
                <Controller
                  name="role"
                  control={control}
                  rules={{ required: "Please select Role" }}
                  render={() => (
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a Role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Role</SelectLabel>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="student">Student</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full text-white bg-gradient-to-r from-blue-600 via-sky-500 to-teal-400 hover:from-blue-700 hover:to-teal-500"
              >
                {loading ? (
                  <>
                    Register
                    <Loader2 className="animate-spin" />
                  </>
                ) : (
                  "Register"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
        <AuthFooter type="register" />
      </Card>
    </div>
  );
};

export default Register;
