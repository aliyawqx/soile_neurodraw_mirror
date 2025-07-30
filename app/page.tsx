import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Palette, TrendingUp } from "lucide-react"
import { SanaLogo } from "@/components/sana-logo"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-50 to-purple-100">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white/80 backdrop-blur-sm">
        <Link className="flex items-center justify-center" href="#">
          <SanaLogo size={24} className="mr-2" />
          <span className="text-xl font-bold text-purple-800">Sana</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:text-purple-600 transition-colors" href="/about">
            О проекте
          </Link>
          <Link className="text-sm font-medium hover:text-purple-600 transition-colors" href="/progress">
            Прогресс
          </Link>
        </nav>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 gap-8">
        <div className="max-w-2xl text-center space-y-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/80 backdrop-blur-sm border border-purple-200 mb-4">
            <SanaLogo size={48} />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-purple-800 sm:text-5xl md:text-6xl">Sana</h1>
          <p className="text-xl text-purple-700 max-w-lg mx-auto">Ты рисуешь — а мы видим, что чувствует твой мозг</p>
          <p className="text-purple-600 max-w-2xl mx-auto">
            Интерактивное приложение для детей и подростков с особенностями развития. Рисуй нейролинии и получай мягкую
            обратную связь о своем эмоциональном состоянии.
          </p>
        </div>

        <div className="flex flex-col gap-4 min-[400px]:flex-row">
          <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700 text-white">
            <Link href="/draw">
              <Palette className="h-4 w-4 mr-2" />
              Начать рисовать
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-purple-300 text-purple-700 hover:bg-purple-50 bg-transparent"
          >
            <Link href="/progress">
              <TrendingUp className="h-4 w-4 mr-2" />
              Мой прогресс
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mt-12">
          <div className="bg-white/60 backdrop-blur-sm p-6 rounded-lg border border-purple-200">
            <div className="w-12 h-12 bg-white/80 rounded-lg flex items-center justify-center mb-4 border border-purple-100">
              <SanaLogo size={24} />
            </div>
            <h3 className="font-semibold text-purple-800 mb-2">Нейроанализ</h3>
            <p className="text-purple-700 text-sm">
              ИИ анализирует твои рисунки и мягко отражает эмоциональное состояние
            </p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm p-6 rounded-lg border border-purple-200">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Palette className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-purple-800 mb-2">Интерактивное рисование</h3>
            <p className="text-purple-700 text-sm">
              Рисуй нейролинии и получай подсказки для активации разных зон мозга
            </p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm p-6 rounded-lg border border-purple-200">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-purple-800 mb-2">Отслеживание прогресса</h3>
            <p className="text-purple-700 text-sm">Наблюдай за изменениями своего внутреннего мира день за днем</p>
          </div>
        </div>
      </main>
      <footer className="border-t bg-white/80 backdrop-blur-sm py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-purple-600 md:text-left">
            © 2024 Sana. Все права защищены.
          </p>
        </div>
      </footer>
    </div>
  )
}
