import Link from "next/link"
import { ArrowLeft, Heart, Target, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SanaLogo } from "@/components/sana-logo"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-50 to-purple-100">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white/80 backdrop-blur-sm">
        <Link href="/" className="flex items-center mr-4 text-purple-600 hover:text-purple-800 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Назад
        </Link>
        <SanaLogo size={20} className="mr-2" />
        <span className="text-xl font-bold text-purple-800">О проекте</span>
      </header>

      <main className="flex-1 p-4 md:p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/80 backdrop-blur-sm border border-purple-200 mb-4">
              <SanaLogo size={40} />
            </div>
            <h1 className="text-4xl font-bold text-purple-800">Sana</h1>
            <p className="text-xl text-purple-700">Интерфейс к собственному мозгу через искусство</p>
          </div>

          <Card className="bg-white/80 backdrop-blur-sm border-purple-200">
            <CardHeader>
              <CardTitle className="text-purple-800">Что это такое?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-purple-700">
              <p>
                Sana — это интерактивное приложение, где ребёнок или подросток с особенностями развития рисует
                нейролинии, а искусственный интеллект:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>подсказывает формы и цвета для активации разных зон мозга</li>
                <li>анализирует рисунок и мягко отражает эмоциональное и когнитивное состояние</li>
                <li>помогает сформировать привычку к самонаблюдению и саморегуляции</li>
              </ul>
              <p className="font-medium text-purple-800">Это не арт-терапия. Это интерфейс к собственному мозгу.</p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white/80 backdrop-blur-sm border-purple-200">
              <CardHeader>
                <div className="w-12 h-12 bg-white/80 rounded-lg flex items-center justify-center mb-2 border border-purple-100">
                  <SanaLogo size={24} />
                </div>
                <CardTitle className="text-purple-800">Этап 1: Нейрорисование</CardTitle>
              </CardHeader>
              <CardContent className="text-purple-700">
                <p>
                  Ребёнок рисует нейролинии, формы и добавляет цвет. В процессе звучит лёгкий голос ИИ с подсказками для
                  успокоения и концентрации.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-purple-200">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-2">
                  <Heart className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle className="text-purple-800">Этап 2: Зеркало</CardTitle>
              </CardHeader>
              <CardContent className="text-purple-700">
                <p>
                  ИИ анализирует ритм, тип линий, повторы и выбор цвета. Мягко показывает эмоциональное состояние и
                  предлагает способы саморегуляции.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-purple-200">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-2">
                  <Target className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle className="text-purple-800">Этап 3: Прогресс</CardTitle>
              </CardHeader>
              <CardContent className="text-purple-700">
                <p>
                  ИИ сравнивает рисунки по дням и показывает эмоциональную кривую. Дети учатся осознавать изменения
                  своего внутреннего мира.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-white/80 backdrop-blur-sm border-purple-200">
            <CardHeader>
              <CardTitle className="text-purple-800 flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Для кого это приложение?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-purple-700">
              <div>
                <h3 className="font-semibold text-purple-800 mb-2">Основная аудитория:</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Дети и подростки с особенностями развития</li>
                  <li>Дети с трудностями эмоциональной регуляции</li>
                  <li>Подростки, изучающие свой внутренний мир</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-purple-800 mb-2">Также полезно для:</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Родителей, желающих лучше понимать своих детей</li>
                  <li>Педагогов и психологов в работе с детьми</li>
                  <li>Всех, кто интересуется связью творчества и эмоций</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-bold mb-2">Начни свое путешествие к самопознанию</h3>
              <p className="mb-4">Каждый рисунок — это окно в твой внутренний мир. Давай исследуем его вместе.</p>
              <Link
                href="/draw"
                className="inline-flex items-center px-6 py-3 bg-white text-purple-600 rounded-lg font-medium hover:bg-purple-50 transition-colors"
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
