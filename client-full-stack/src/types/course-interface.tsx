export interface EnrollCourse {
  userId: string;
  courseId: string;
}

export interface lessonProgessSchema {
    studentId:string
    lessonId:string
    completed:boolean
  }

  export interface SubmitTestSchema {
    studentId:string
    courseId:string
    completed:boolean
    score:number
  }