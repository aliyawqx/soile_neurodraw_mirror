"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Lightbulb } from "lucide-react"

interface AIGuidanceProps {
  drawingMetrics: {
    lineSpeed: number
    lineSharpness: number
    colorIntensity: number
    patternRepetition: number
  }
}

export function AIGuidance({ drawingMetrics }: AIGuidanceProps) {
  const [currentSuggestion, setCurrentSuggestion] = useState("")
  const [suggestionHistory, setSuggestionHistory] = useState<string[]>([])

  const suggestions = [
    "Попробуй добавить плавные линии. Это помогает успокоиться.",
    "А что, если соединить эти части? Это помогает собрать мысли.",
    "Добавь немного ярких цветов в центр. Это активирует творческое мышление.",
    "Нарисуй спираль от центра. Это помогает сосредоточиться.",
    "Попробуй провести несколько параллельных линий. Это структурирует мысли.",
    "Нарисуй что-то круглое. Круглые ��ормы активируют центры удовольствия в мозге.",
    "Добавь немного фиолетового цвета. Фиолетовый помогает успокоиться и сосредоточиться.",
    "Попробуй рисовать зигзагообразные линии. Это стимулирует активность мозга.",
    "Нарисуй что-то, что соединяет левую и правую части рисунка. Это улучшает взаимодействие полушарий.",
    "Добавь немного зеленого. Зеленый цвет помогает расслабиться и снять напряжение.",
  ]

  // Generate a suggestion based on current metrics
  useEffect(() => {
    const { lineSpeed, lineSharpness, colorIntensity } = drawingMetrics

    const getContextualSuggestion = () => {
      if (lineSharpness > 70) {
        return "Попробуй рисовать более плавные, округлые линии. Это поможет снизить тревожность."
      } else if (lineSpeed > 70) {
        return "Попробуй рисовать медленнее, наслаждаясь каждым движением. Это поможет успокоиться."
      } else if (colorIntensity < 30) {
        return "Добавь яркие цвета в свой рисунок. Это поможет выразить эмоции и активировать мозг."
      } else {
        // Random suggestion if no specific context
        return suggestions[Math.floor(Math.random() * suggestions.length)]
      }
    }

    // Only change suggestion occasionally to avoid constant changes
    const shouldChangeSuggestion = Math.random() > 0.7
    if (shouldChangeSuggestion || !currentSuggestion) {
      const newSuggestion = getContextualSuggestion()
      setCurrentSuggestion(newSuggestion)
      setSuggestionHistory((prev) => [newSuggestion, ...prev].slice(0, 5))
    }
  }, [drawingMetrics, currentSuggestion])

  return (
    <div className="space-y-4">
      <Card className="bg-gradient-to-r from-purple-100 to-purple-200 border-purple-300">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <Lightbulb className="h-4 w-4 text-white" />
            </div>
            <p className="italic text-purple-800 font-medium">{currentSuggestion}</p>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-purple-800">Предыдущие подсказки:</h3>
        <ul className="space-y-1 text-sm text-purple-700">
          {suggestionHistory.slice(1).map((suggestion, index) => (
            <li key={index} className="flex items-start gap-2">
              <div className="w-1 h-1 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
              {suggestion}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
