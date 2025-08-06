import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Award, Star, Target } from 'lucide-react'

export default function AchievementsPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Achievements</h1>
          <p className="text-muted-foreground">Your badges and certificates</p>
        </div>
      </div>
      
      {/* Achievement Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Trophy className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">12</div>
            <p className="text-sm text-muted-foreground">Total Badges</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Award className="h-8 w-8 text-purple-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">3</div>
            <p className="text-sm text-muted-foreground">Certificates</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Star className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">850</div>
            <p className="text-sm text-muted-foreground">Points Earned</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Target className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">95%</div>
            <p className="text-sm text-muted-foreground">Completion Rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Achievements */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Achievements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex items-center gap-4 p-4 border rounded-lg">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <Trophy className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium">Quick Learner</h4>
                <p className="text-sm text-muted-foreground">Completed 3 lessons in one day</p>
                <Badge variant="secondary" className="mt-1">New</Badge>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-4 border rounded-lg">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Award className="h-6 w-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium">React Master</h4>
                <p className="text-sm text-muted-foreground">Completed React Fundamentals</p>
                <Badge variant="secondary" className="mt-1">Certificate</Badge>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-4 border rounded-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Star className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium">Perfect Score</h4>
                <p className="text-sm text-muted-foreground">100% on JavaScript quiz</p>
                <Badge variant="secondary" className="mt-1">Excellence</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* All Badges */}
      <Card>
        <CardHeader>
          <CardTitle>All Badges</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4 lg:grid-cols-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="text-center p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Trophy className="h-8 w-8 text-white" />
                </div>
                <h4 className="font-medium text-sm">Badge {i + 1}</h4>
                <p className="text-xs text-muted-foreground">Achievement description</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
