'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import AuthFooter from '@/components/auth/auth-footer'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

interface LoginData {
    email: string
    password: string
}
const Login = () => {
    const router = useRouter()
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<LoginData>()
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    const onSubmit = async (data: LoginData) => {
        setLoading(true)
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })

            if (res.status === 200) {
                const Userdata = await res.json()
                localStorage.setItem("token", Userdata.token)
                localStorage.setItem("userID", Userdata.id)
                localStorage.setItem("userName", Userdata.name)
                localStorage.setItem("role", Userdata.role)
                setLoading(false)
                toast.success("Login successful")
                Userdata.role === 'admin' ? router.push('/admin/dashboard') : router.push('/user/dashboard')

            } else {
                toast.error("Login failed. Please check your credentials.")
                setLoading(false)

            }
        } catch (error) {
            const message =
                error instanceof Error
                    ? error.message
                    : "An unexpected error occurred. Please try again."
            setLoading(false)

            toast.error(message)
        }
    }

    const handleQuickLogin = (role: "admin" | "student") => {
        const userData =
            role === "admin"
                ? { email: "t.kelaskar16@gmail.com", password: "123456" }
                : { email: "t13@gmail.com", password: "123456" }

        setValue('email', userData.email)
        setValue('password', userData.password)

        // handleSubmit(onSubmit)()
    }

    return (
        <div className="flex flex-col items-center justify-center h-[100vh] bg-gray-50">
            <Card className="w-[400px] p-6">
                <CardContent>
                    <h1 className="text-2xl font-semibold text-center mb-6">Login</h1>
                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <div className="space-y-4">
                            {/* Email Field */}
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    className={`${errors.email ? 'border-red-500' : ''}`}
                                    {...register('email', {
                                        required: 'Email is required',
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: 'Please enter a valid email address',
                                        },
                                    })}
                                />
                                {errors.email && (
                                    <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
                                )}
                            </div>

                            {/* Password Field with Toggle */}
                            <div className="relative">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Enter your password"
                                    className={`${errors.password ? 'border-red-500' : ''}`}
                                    {...register('password', {
                                        required: 'Password is required',
                                    })}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-8 text-gray-500 hover:text-gray-700 focus:outline-none"
                                    tabIndex={-1}
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                                {errors.password && (
                                    <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full text-white bg-gradient-to-r from-blue-600 via-sky-500 to-teal-400 hover:from-blue-700 hover:to-teal-500">
                                {loading ? (
                                    <>
                                        Login
                                        <Loader2 className='animate-spin' />
                                    </>
                                ) : (
                                    "Login"
                                )}
                            </Button>
                        </div>
                    </form>
                    <AuthFooter type="login" />

                    <div className="relative my-4">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">Or quick login as</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <Button variant="outline" onClick={() => handleQuickLogin("admin")}>
                            Admin Demo
                        </Button>
                        <Button variant="outline" onClick={() => handleQuickLogin("student")}>
                            Student Demo
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div >
    )
}

export default Login
