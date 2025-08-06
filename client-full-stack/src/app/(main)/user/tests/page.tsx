import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Brain, Clock, CheckCircle, AlertCircle, Play } from 'lucide-react'

export default function PracticeTestsPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Practice Tests</h1>
          <p className="text-muted-foreground">Quizzes and assessments</p>
        </div>
      </div>
      
      {/* Test Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Brain className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">8</div>
            <p className="text-sm text-muted-foreground">Available Tests</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">5</div>
            <p className="text-sm text-muted-foreground">Completed</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <AlertCircle className="h-8 w-8 text-orange-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">3</div>
            <p className="text-sm text-muted-foreground">Pending</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">87%</div>
            <p className="text-sm text-muted-foreground">Average Score</p>
          </CardContent>
        </Card>
      </div>

      {/* Available Tests */}
      <Card>
        <CardHeader>
          <CardTitle>Available Tests</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Brain className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium">React Components Quiz</h4>
                <p className="text-sm text-muted-foreground">Test your knowledge of React components</p>
                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>15 minutes</span>
                  </div>
                  <span>10 questions</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-green-100 text-green-700">Available</Badge>
              <Button>
                <Play className="h-4 w-4 mr-2" />
                Start Test
              </Button>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Brain className="h-6 w-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium">JavaScript Fundamentals</h4>
                <p className="text-sm text-muted-foreground">Basic JavaScript concepts and syntax</p>
                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>20 minutes</span>
                  </div>
                  <span>15 questions</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-green-100 text-green-700">Available</Badge>
              <Button>
                <Play className="h-4 w-4 mr-2" />
                Start Test
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Results */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Results</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium">HTML & CSS Basics</h4>
                <p className="text-sm text-muted-foreground">Completed 2 days ago</p>
                <div className="mt-2">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span>Score: 92%</span>
                    <span>9/10 correct</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
              </div>
            </div>
            <Button variant="outline" size="sm">View Details</Button>
          </div>
          
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium">Git Version Control</h4>
                <p className="text-sm text-muted-foreground">Completed 1 week ago</p>
                <div className="mt-2">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span>Score: 85%</span>
                    <span>17/20 correct</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
              </div>
            </div>
            <Button variant="outline" size="sm">View Details</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
