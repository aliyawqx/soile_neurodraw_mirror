"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, Brain, TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { EmotionalGraph } from "@/components/emotional-graph"
import { DrawingHistory } from "@/components/drawing-history"

export default function ProgressPage() {
  const [drawings, setDrawings] = useState<any[]>([])
  const [emotionalData, setEmotionalData] = useState<any[]>([])

  useEffect(() => {
    // Load saved drawings from localStorage
    const savedDrawings = localStorage.getItem("neuroDrawings")
    if (savedDrawings) {
      const parsedDrawings = JSON.parse(savedDrawings)
      setDrawings(parsedDrawings)

      // Generate emotional data from drawings
      const emotionalPoints = parsedDrawings.map((drawing: any) => ({
        date: drawing.date,
        calmness: drawing.metrics.lineSharpness < 50 ? 100 - drawing.metrics.lineSharpness : 50,
        energy: drawing.metrics.lineSpeed,
        focus: 100 - drawing.metrics.patternRepetition,
        emotion:
          drawing.metrics.colorIntensity > 70 ? "excited" : drawing.metrics.colorIntensity > 40 ? "balanced" : "calm",
      }))

      setEmotionalData(emotionalPoints)
    }
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white/80 backdrop-blur-sm">
        <Link href="/" className="flex items-center mr-4 text-blue-600 hover:text-blue-800 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Назад
        </Link>
        <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
        <span className="text-xl font-bold text-blue-900">Мой прогресс</span>
      </header>

      <main className="flex-1 p-4 md:p-6 space-y-6">
        <Card className="bg-white/80 backdrop-blur-sm border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-900 flex items-center">
              <Brain className="h-5 w-5 mr-2" />
              Эмоциональная кривая
            </CardTitle>
            <CardDescription className="text-blue-700">
              Визуализация твоего эмоционального состояния на основе рисунков
            </CardDescription>
          </CardHeader>
          <CardContent>
            <EmotionalGraph data={emotionalData} />
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-900 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              История рисунков
            </CardTitle>
            <CardDescription className="text-blue-700">Твои сохраненные нейрорисунки и их анализ</CardDescription>
          </CardHeader>
          <CardContent>
            <DrawingHistory drawings={drawings} />
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
