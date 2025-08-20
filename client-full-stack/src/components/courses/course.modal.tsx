"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Loader2, Plus, Trash, Trash2 } from "lucide-react";
import { useCreateCourse } from "@/hooks/use-courses";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

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
  category: z.string().min(2, "Category is required"),
  max_students: z.number().positive("Must be greater than 0"),
  is_free: z.boolean(),
  price: z.number().nonnegative().optional(),
  discount: z.number().min(0).max(100).optional(),
  certificate_available: z.boolean(),
  chapters: z.array(
    z.object({
     
      title: z.string().min(1, "Chapter title required"),
      videoCount: z.number().nonnegative(),
      totalDuration: z.number().nonnegative(),
      lessons: z.array(
        z.object({
          title: z.string().min(1, "Lesson title required"),
          duration: z.number().nonnegative(),
          isPreview: z.boolean().optional(),
        })
      ),
    })
  ),
  notes: z.array(
    z.object({
      id: z.string(),
      value: z.string().min(1, "Notes is required"),
    })
  ),
});

export type AddCourseSchema = z.infer<typeof formSchema>;

interface Props {
  refetch: () => void;
}
export function AddCourseDialog({ refetch }: Props) {
  const [open, setOpen] = useState<boolean>(false);

  const { mutate, isPending } = useCreateCourse();

  const form = useForm<AddCourseSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      course_name: "",
      course_code: "",
      duration: 0,
      levels: undefined,
      course_description: "",
      category: "",
      max_students: 0,
      is_free: false,
      price: undefined,
      discount: undefined,
      certificate_available: false,
      chapters: [
        {
          title: "",
          videoCount: 0,
          totalDuration: 0,
          lessons: [
            { title: "", duration: 0, isPreview: false },
          ],
        },
      ],
      notes: [{ id: uuidv4(), value: "" }],
    },
  });
  const { control } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "chapters",
  });

  const {
    fields: notes_fields,
    append: notes_append,
    remove: notes_remove,
  } = useFieldArray({
    control,
    name: "notes",
  });
  const onSubmit = (values: AddCourseSchema) => {
    // Ensure free courses have no price or discount
    const payload = {
      ...values,
      price: values.is_free ? undefined : values.price,
      discount: values.is_free ? undefined : values.discount,
    };

    mutate(
      { data: payload },
      {
        onSuccess: () => {
          refetch();
          setOpen(false);
          form.reset();
        },
        onError: () => {
          setOpen(true);
        },
      }
    );
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Course
        </Button>
      </SheetTrigger>

      <SheetContent className="sm:max-w-5xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Add New Course</SheetTitle>
          <SheetDescription>
            Fill in the details for the new course. Click save when you're done.
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 p-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
              {/* Course Name */}
              <FormField
                control={form.control}
                name="course_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Web Development 101"
                        {...field}
                      />
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
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={Levels.Beginner}>
                          Beginner
                        </SelectItem>
                        <SelectItem value={Levels.Intermediate}>
                          Intermediate
                        </SelectItem>
                        <SelectItem value={Levels.Advanced}>
                          Advanced
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Category */}
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Programming" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Max Students */}
              <FormField
                control={form.control}
                name="max_students"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Max Students</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        placeholder="e.g. 50"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
              {/* Is Free */}
              <FormField
                control={form.control}
                name="is_free"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(checked) =>
                          field.onChange(Boolean(checked))
                        }
                      />
                    </FormControl>
                    <FormLabel>Is Free</FormLabel>
                  </FormItem>
                )}
              />

              {/* Price */}
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price (₹)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="e.g. 499"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        disabled={form.watch("is_free")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Discount */}
              <FormField
                control={form.control}
                name="discount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Discount (%)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        max={100}
                        placeholder="e.g. 10"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        disabled={form.watch("is_free")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Certificate Available */}
              <FormField
                control={form.control}
                name="certificate_available"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(checked) =>
                          field.onChange(Boolean(checked))
                        }
                      />
                    </FormControl>
                    <FormLabel>Certificate Available</FormLabel>
                  </FormItem>
                )}
              />
            </div>

            {/* Chapters Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Chapters</h3>

              {fields.map((chapter, chapterIndex) => (
                <div
                  key={chapter.id}
                  className="border p-4 rounded-lg space-y-4"
                >
                  {/* Chapter Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name={`chapters.${chapterIndex}.title`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Chapter Title</FormLabel>
                          <FormControl>
                            <Input
                              placeholder={`Chapter ${chapterIndex + 1}`}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`chapters.${chapterIndex}.videoCount`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Video Count</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min={0}
                              {...field}
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`chapters.${chapterIndex}.totalDuration`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Total Duration</FormLabel>
                          <FormControl>
                            <Input
                            type="number"
                              min={0}
                              {...field}
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Lessons Section */}
                  <div className="space-y-3">
                    <h4 className="font-medium">Lessons</h4>

                    <FormField
                      control={form.control}
                      name={`chapters.${chapterIndex}.lessons`}
                      render={() => {
                        const {
                          fields: lessonFields,
                          append: appendLesson,
                          remove: removeLesson,
                        } = useFieldArray({
                          control,
                          name: `chapters.${chapterIndex}.lessons`,
                        });

                        return (
                          <div className="space-y-3">
                            {lessonFields.map((lesson, lessonIndex) => (
                              <div
                                key={lesson.id}
                                className="border p-3 rounded-lg grid grid-cols-1 sm:grid-cols-3 gap-3 items-end"
                              >
                                <FormField
                                  control={form.control}
                                  name={`chapters.${chapterIndex}.lessons.${lessonIndex}.title`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Lesson Title</FormLabel>
                                      <FormControl>
                                        <Input
                                          placeholder="Lesson title"
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <FormField
                                  control={form.control}
                                  name={`chapters.${chapterIndex}.lessons.${lessonIndex}.duration`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Duration</FormLabel>
                                      <FormControl>
                                        <Input
                                          type="number"
                              min={0}
                              {...field}
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <div className="flex justify-end">
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeLesson(lessonIndex)}
                                  >
                                    <Trash2 />
                                  </Button>
                                </div>
                              </div>
                            ))}

                            <Button
                              type="button"
                              variant="outline"
                              onClick={() =>
                                appendLesson({
                                  title: "",
                                  duration: 0,
                                  isPreview: false,
                                })
                              }
                            >
                              + Add Lesson
                            </Button>
                          </div>
                        );
                      }}
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => remove(chapterIndex)}
                    >
                      <Trash2 />
                    </Button>
                  </div>
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  append({
                    title: "",
                    videoCount: 0,
                    totalDuration: 0,
                    lessons: [
                      {
                        title: "",
                        duration: 0,
                        isPreview: false,
                      },
                    ],
                  })
                }
              >
                + Add Chapter
              </Button>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Notes</h3>

              {notes_fields.map((item, index) => (
                <div key={item.id} className="border p-4 rounded-lg">
                  <div className="grid grid-cols-1 gap-4">
                    {/* Notes */}
                    <FormField
                      control={form.control}
                      name={`notes.${index}.value`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Notes</FormLabel>
                          <FormControl>
                            <Input
                              placeholder={`Notes ${index + 1}`}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Remove Button aligned right */}
                  <div className="flex justify-end mt-3">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => notes_remove(index)}
                      className="w-fit"
                    >
                      <Trash2 />
                    </Button>
                  </div>
                </div>
              ))}

              {/* Add Notes Button */}
              <Button
                type="button"
                onClick={() => notes_append({ id: uuidv4(), value: "" })}
                variant="outline"
              >
                + Add Notes
              </Button>
            </div>

            <SheetFooter>
              <div className="flex justify-end items-baseline gap-4">
                <SheetClose asChild>
                  <Button variant="outline">Cancel</Button>
                </SheetClose>
                <Button type="submit" disabled={isPending}>
                  {isPending ? (
                    <>
                      Saving <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                    </>
                  ) : (
                    "Save Course"
                  )}
                </Button>
              </div>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
