"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Download, Eraser, Undo, Redo, Save } from "lucide-react"
import Link from "next/link"
import { FeedbackPanel } from "@/components/feedback-panel"
import { AIGuidance } from "@/components/ai-guidance"
import { ColorPalette } from "@/components/color-palette"
import { useDrawing } from "@/hooks/use-drawing"
import { SanaLogo } from "@/components/sana-logo"

export default function DrawPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [brushSize, setBrushSize] = useState(5)
  const [currentColor, setCurrentColor] = useState("#522859")
  const [showFeedback, setShowFeedback] = useState(false)
  const [drawingMetrics, setDrawingMetrics] = useState({
    lineSpeed: 0,
    lineSharpness: 0,
    colorIntensity: 0,
    patternRepetition: 0,
  })

  const {
    startDrawing,
    draw,
    stopDrawing,
    clearCanvas,
    undo,
    redo,
    canUndo,
    canRedo,
    saveDrawing,
    drawingData,
    setColor,
    setBrush,
  } = useDrawing(canvasRef, setDrawingMetrics)

  useEffect(() => {
    if (setColor) {
      setColor(currentColor)
    }
  }, [currentColor, setColor])

  useEffect(() => {
    setBrush(brushSize)
  }, [brushSize, setBrush])

  const handleSave = () => {
    saveDrawing()
    setShowFeedback(true)
  }

  const handleDownload = () => {
    if (!canvasRef.current) return
    const link = document.createElement("a")
    link.download = `sana-drawing-${new Date().toISOString().slice(0, 10)}.png`
    link.href = canvasRef.current.toDataURL()
    link.click()
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-50 to-purple-100">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white/80 backdrop-blur-sm">
        <Link href="/" className="flex items-center mr-4 text-purple-600 hover:text-purple-800 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Назад
        </Link>
        <SanaLogo size={20} className="mr-2" />
        <span className="text-xl font-bold text-purple-800">Sana - Нейрорисование</span>
      </header>

      <main className="flex-1 flex flex-col md:flex-row p-4 gap-4">
        <div className="flex-1 flex flex-col gap-4">
          <Card className="p-4 flex-1 flex flex-col bg-white/80 backdrop-blur-sm border-purple-200">
            <div className="relative flex-1 border-2 border-purple-200 rounded-md overflow-hidden bg-white">
              <canvas
                ref={canvasRef}
                className="absolute top-0 left-0 w-full h-full cursor-crosshair"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
              />
            </div>
          </Card>

          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              onClick={undo}
              disabled={!canUndo}
              className="border-purple-300 text-purple-700 hover:bg-purple-50 bg-transparent"
            >
              <Undo className="h-4 w-4 mr-2" />
              Отменить
            </Button>
            <Button
              variant="outline"
              onClick={redo}
              disabled={!canRedo}
              className="border-purple-300 text-purple-700 hover:bg-purple-50 bg-transparent"
            >
              <Redo className="h-4 w-4 mr-2" />
              Повторить
            </Button>
            <Button
              variant="outline"
              onClick={clearCanvas}
              className="border-purple-300 text-purple-700 hover:bg-purple-50 bg-transparent"
            >
              <Eraser className="h-4 w-4 mr-2" />
              Очистить
            </Button>
            <Button
              variant="outline"
              onClick={handleDownload}
              className="border-purple-300 text-purple-700 hover:bg-purple-50 bg-transparent"
            >
              <Download className="h-4 w-4 mr-2" />
              Скачать
            </Button>
            <Button onClick={handleSave} className="bg-purple-600 hover:bg-purple-700 text-white">
              <Save className="h-4 w-4 mr-2" />
              Сохранить и анализировать
            </Button>
          </div>
        </div>

        <div className="w-full md:w-80 flex flex-col gap-4">
          <Tabs defaultValue="tools">
            <TabsList className="grid grid-cols-2 bg-purple-100">
              <TabsTrigger value="tools" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                Инструменты
              </TabsTrigger>
              <TabsTrigger
                value="guidance"
                className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
              >
                Подсказки ИИ
              </TabsTrigger>
            </TabsList>
            <TabsContent value="tools" className="space-y-4">
              <Card className="p-4 bg-white/80 backdrop-blur-sm border-purple-200">
                <h3 className="mb-3 text-sm font-medium text-purple-800">Размер кисти</h3>
                <div className="flex items-center gap-2">
                  <Slider
                    value={[brushSize]}
                    min={1}
                    max={20}
                    step={1}
                    onValueChange={(value) => setBrushSize(value[0])}
                    className="flex-1"
                  />
                  <span className="w-8 text-center text-purple-700 font-medium">{brushSize}</span>
                </div>
              </Card>
              <Card className="p-4 bg-white/80 backdrop-blur-sm border-purple-200">
                <h3 className="mb-3 text-sm font-medium text-purple-800">Цвет</h3>
                <ColorPalette currentColor={currentColor} onColorChange={setCurrentColor} />
              </Card>
            </TabsContent>
            <TabsContent value="guidance">
              <AIGuidance drawingMetrics={drawingMetrics} />
            </TabsContent>
          </Tabs>

          {showFeedback && <FeedbackPanel drawingMetrics={drawingMetrics} onClose={() => setShowFeedback(false)} />}
        </div>
      </main>
    </div>
  )
}
