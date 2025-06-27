import Link from "next/link"
import { ArrowLeft, Brain, Heart, Target, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white/80 backdrop-blur-sm">
        <Link href="/" className="flex items-center mr-4 text-blue-600 hover:text-blue-800 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Назад
        </Link>
        <Brain className="h-6 w-6 mr-2 text-blue-600" />
        <span className="text-xl font-bold text-blue-900">О проекте</span>
      </header>

      <main className="flex-1 p-4 md:p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-blue-900">Soile NeuroDraw Mirror</h1>
            <p className="text-xl text-blue-700">Интерфейс к собственному мозгу через искусство</p>
          </div>

          <Card className="bg-white/80 backdrop-blur-sm border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-900">Что это такое?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-blue-800">
              <p>
                Soile NeuroDraw Mirror — это интерактивное приложение, где ребёнок или подросток с особенностями
                развития рисует нейролинии, а искусственный интеллект:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>подсказывает формы и цвета для активации разных зон мозга</li>
                <li>анализирует рисунок и мягко отражает эмоциональное и когнитивное состояние</li>
                <li>помогает сформировать привычку к самонаблюдению и саморегуляции</li>
              </ul>
              <p className="font-medium text-blue-900">Это не арт-терапия. Это интерфейс к собственному мозгу.</p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white/80 backdrop-blur-sm border-blue-200">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-2">
                  <Brain className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-blue-900">Этап 1: Нейрорисование</CardTitle>
              </CardHeader>
              <CardContent className="text-blue-800">
                <p>
                  Ребёнок рисует нейролинии, формы и добавляет цвет. В процессе звучит лёгкий голос ИИ с подсказками для
                  успокоения и концентрации.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-blue-200">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-2">
                  <Heart className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-blue-900">Этап 2: Зеркало</CardTitle>
              </CardHeader>
              <CardContent className="text-blue-800">
                <p>
                  ИИ анализирует ритм, тип линий, повторы и выбор цвета. Мягко показывает эмоциональное состояние и
                  предлагает способы саморегуляции.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-blue-200">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-2">
                  <Target className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-blue-900">Этап 3: Прогресс</CardTitle>
              </CardHeader>
              <CardContent className="text-blue-800">
                <p>
                  ИИ сравнивает рисунки по дням и показывает эмоциональную кривую. Дети учатся осознавать изменения
                  своего внутреннего мира.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-white/80 backdrop-blur-sm border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-900 flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Для кого это приложение?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-blue-800">
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">Основная аудитория:</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Дети и подростки с особенностями развития</li>
                  <li>Дети с трудностями эмоциональной регуляции</li>
                  <li>Подростки, изучающие свой внутренний мир</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">Также полезно для:</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Родителей, желающих лучше понимать своих детей</li>
                  <li>Педагогов и психологов в работе с детьми</li>
                  <li>Всех, кто интересуется связью творчества и эмоций</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-bold mb-2">Начни свое путешествие к самопознанию</h3>
              <p className="mb-4">Каждый рисунок — это окно в твой внутренний мир. Давай исследуем его вместе.</p>
              <Link
                href="/draw"
                className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors"
              >
                Начать рисовать
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
