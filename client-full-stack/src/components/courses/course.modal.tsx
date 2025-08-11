"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useCreateCourse } from "@/hooks/use-courses";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export enum Levels {
    Beginner = "Beginner",
    Intermediate = "Intermediate",
    Advanced = "Advanced",
}

const formSchema = z.object({
    course_name: z.string().min(2, "Course name must be at least 2 characters"),
    course_code: z.string().min(2, "Course code must be at least 2 characters"),
    duration: z.number().positive("Duration must be greater than 0"),
    levels: z.string(),
    course_description: z
        .string()
        .min(10, "Description must be at least 10 characters"),
});

export type AddCourseSchema = z.infer<typeof formSchema>;


export interface CourseSchema{
    id:string 
    course_name:string 
    course_code:string 
    duration:number 
    levels:Levels
    created_at:string
}
export function AddCourseDialog() {
    const { mutate } = useCreateCourse();

    const form = useForm<AddCourseSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            course_name: "",
            course_code: "",
            duration: 0,
            levels: undefined,
            course_description: "",
        },
    });

    const onSubmit = (values: AddCourseSchema) => {
        console.log("Submitting", values);
        mutate({ data: values });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Course
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-5xl">
                <DialogHeader>
                    <DialogTitle>Add New Course</DialogTitle>
                    <DialogDescription>
                        Fill in the details for the new course. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            {/* Course Name */}
                            <FormField
                                control={form.control}
                                name="course_name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Course Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g. Web Development 101" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Course Code */}
                            <FormField
                                control={form.control}
                                name="course_code"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Course Code</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g. WD101" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Duration */}
                            <FormField
                                control={form.control}
                                name="duration"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Duration (in weeks)</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                min={1}
                                                placeholder="e.g. 10"
                                                {...field}
                                                onChange={(e) => field.onChange(Number(e.target.value))}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Level */}
                            <FormField
                                control={form.control}
                                name="levels"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Level</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select level" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value={Levels.Beginner}>Beginner</SelectItem>
                                                <SelectItem value={Levels.Intermediate}>
                                                    Intermediate
                                                </SelectItem>
                                                <SelectItem value={Levels.Advanced}>Advanced</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Description */}
                        <FormField
                            control={form.control}
                            name="course_description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Course Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            className="min-h-[150px]"
                                            placeholder="Write a brief course description..."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Save Course</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
