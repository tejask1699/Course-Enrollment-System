"use client";

import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Play } from "lucide-react";
import testsDataJson from "@/data/test.json";
import { useSubmitTest } from "@/hooks/use-courses";
import toast from "react-hot-toast";

interface Question {
  id: string;
  question: string;
  options: string[];
  answer: string;
}

type TestsData = Record<string, Question[]>;

const testsData = testsDataJson as TestsData;

interface TestDialogProps {
  courseCode: string;
  courseId: string
  studentId: string
}

export function TestDialog({ courseCode, courseId, studentId }: TestDialogProps) {
  const questions = testsData[courseCode] || [];
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [open, setOpen] = useState(false);

  const handleSelect = (questionId: string, option: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const {mutate,isPending} = useSubmitTest()
  const handleSubmit = () => {
    const score = questions.reduce((acc, q) => {
      return acc + (answers[q.id] === q.answer ? 1 : 0);
    }, 0);
    const formattedData = {
      studentId,
      courseId,
      completed: true,
      score,
      completedAt: new Date()
    }
    mutate({ data: formattedData },
      {
        onSuccess: () => {
          toast.success(`Test submitted! You scored ${score}/${questions.length}`);
          setOpen(false);
        },
        onError: () => {
          toast.error("Failed to submit test. Please try again.");
        },
      }
    )

    console.log("Selected Answers:", answers);
    console.log("Score:", score, "/", questions.length);

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Play className="h-4 w-4 mr-2" />
          Start Test
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Test: {courseCode}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 max-h-[70vh] overflow-y-auto p-2">
          {questions.length > 0 ? (
            questions.map((q, idx) => (
              <div key={q.id} className="border rounded-lg p-4">
                <p className="font-medium mb-2">
                  {idx + 1}. {q.question}
                </p>
                <RadioGroup
                  value={answers[q.id] || ""}
                  onValueChange={(val) => handleSelect(q.id, val)}
                >
                  {q.options.map((opt, i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <RadioGroupItem value={opt} id={`${q.id}-${i}`} />
                      <Label htmlFor={`${q.id}-${i}`}>{opt}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            ))
          ) : (
            <p className="text-muted-foreground">
              No questions for this course.
            </p>
          )}
        </div>

        <DialogFooter className="flex justify-end gap-3 mt-4">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSubmit} disabled={isPending}>
            {isPending ? "Submitting..." : "Submit Test"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
