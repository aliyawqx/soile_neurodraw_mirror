"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { SanaLogo } from "@/components/sana-logo"

interface FeedbackPanelProps {
  drawingMetrics: {
    lineSpeed: number
    lineSharpness: number
    colorIntensity: number
    patternRepetition: number
  }
  onClose: () => void
}

export function FeedbackPanel({ drawingMetrics, onClose }: FeedbackPanelProps) {
  const { lineSpeed, lineSharpness, colorIntensity, patternRepetition } = drawingMetrics

  // Determine emotional state based on metrics
  const getEmotionalState = () => {
    if (lineSharpness > 70 && lineSpeed > 60) {
      return {
        state: "тревожный",
        description:
          "Похоже, сегодня ты немного тревожен. У тебя много острых углов и быстрых линий. Это нормально — давай попробуем сделать линию, которая выходит наружу.",
      }
    } else if (lineSharpness < 30 && lineSpeed < 40) {
      return {
        state: "спокойный",
        description:
          "Ты рисовал очень мягко и неторопливо. Похоже, ты спокоен. Хочешь добавить энергию через яркие цвета?",
      }
    } else if (patternRepetition > 70) {
      return {
        state: "сосредоточенный",
        description:
          "Твой рисунок показывает много повторяющихся элементов. Ты очень сосредоточен и методичен сегодня.",
      }
    } else if (colorIntensity > 70) {
      return {
        state: "энергичный",
        description: "Яркие цвета в твоем рисунке говорят о высокой энергии и энтузиазме. Ты полон идей!",
      }
    } else {
      return {
        state: "уравновешенный",
        description: "Твой рисунок показывает хороший баланс между энергией и спокойствием. Ты в гармонии с собой.",
      }
    }
  }

  const emotionalState = getEmotionalState()

  return (
    <Card className="relative bg-white/90 backdrop-blur-sm border-purple-200">
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-2 text-purple-600 hover:text-purple-800"
        onClick={onClose}
      >
        <X className="h-4 w-4" />
      </Button>
      <CardHeader>
        <CardTitle className="text-purple-800 flex items-center">
          <SanaLogo size={20} className="mr-2" />
          Анализ твоего рисунка
        </CardTitle>
        <CardDescription className="text-purple-700">Что говорит твой рисунок о твоем состоянии</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
          <h3 className="font-medium text-purple-800">Твое состояние: {emotionalState.state}</h3>
          <p className="text-sm text-purple-700 mt-1">{emotionalState.description}</p>
        </div>

        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm text-purple-700">
              <span>Скорость линий</span>
              <span>{lineSpeed}%</span>
            </div>
            <div className="h-2 bg-purple-100 rounded-full mt-1">
              <div
                className="h-full bg-purple-500 rounded-full transition-all duration-300"
                style={{ width: `${lineSpeed}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm text-purple-700">
              <span>Резкость линий</span>
              <span>{lineSharpness}%</span>
            </div>
            <div className="h-2 bg-purple-100 rounded-full mt-1">
              <div
                className="h-full bg-purple-600 rounded-full transition-all duration-300"
                style={{ width: `${lineSharpness}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm text-purple-700">
              <span>Интенсивность цвета</span>
              <span>{colorIntensity}%</span>
            </div>
            <div className="h-2 bg-purple-100 rounded-full mt-1">
              <div
                className="h-full bg-purple-400 rounded-full transition-all duration-300"
                style={{ width: `${colorIntensity}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm text-purple-700">
              <span>Повторяемость паттернов</span>
              <span>{patternRepetition}%</span>
            </div>
            <div className="h-2 bg-purple-100 rounded-full mt-1">
              <div
                className="h-full bg-purple-700 rounded-full transition-all duration-300"
                style={{ width: `${patternRepetition}%` }}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
