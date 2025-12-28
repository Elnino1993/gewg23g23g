"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const links = [
  {
    title: "Instagram",
    url: "https://instagram.com/username",
    icon: "📸",
  },
  {
    title: "Telegram",
    url: "https://t.me/username",
    icon: "✈️",
  },
]

export default function LandingPage() {
  useEffect(() => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready()
      window.Telegram.WebApp.expand()
    }
  }, [])

  const handleLinkClick = (url: string) => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
    const isAndroid = /android/i.test(navigator.userAgent)

    // Метод 1: Для iOS - создаем скрытую ссылку и кликаем по ней
    if (isIOS) {
      // Попытка 1: Telegram WebApp API для iOS
      if (window.Telegram?.WebApp?.openLink) {
        window.Telegram.WebApp.openLink(url)
        return
      }

      // Попытка 2: Создаем временную ссылку и программно кликаем
      const link = document.createElement("a")
      link.href = url
      link.target = "_blank"
      link.rel = "noopener noreferrer"
      link.style.display = "none"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      // Попытка 3: Если не сработало, используем window.location с задержкой
      setTimeout(() => {
        if (document.hasFocus()) {
          window.location.href = url
        }
      }, 500)
      return
    }

    // Метод 2: Для Android - Intent схема
    if (isAndroid) {
      if (window.Telegram?.WebApp?.openLink) {
        window.Telegram.WebApp.openLink(url)
        return
      }

      const intentUrl = `intent://${url.replace(/^https?:\/\//, "")}#Intent;scheme=https;action=android.intent.action.VIEW;end;`
      window.location.href = intentUrl
      return
    }

    // Метод 3: Универсальный fallback для остальных платформ
    if (window.Telegram?.WebApp?.openLink) {
      window.Telegram.WebApp.openLink(url)
      return
    }

    const newWindow = window.open(url, "_blank", "noopener,noreferrer")

    if (!newWindow) {
      window.location.href = url
    }
  }

  return (
    <main className="min-h-screen bg-[#F3EEE8] flex items-center justify-center p-4">
      <div className="w-full max-w-[680px] mx-auto py-12">
        <div className="flex flex-col items-center mb-8">
          <Avatar className="h-24 w-24 mb-5 ring-2 ring-white shadow-lg">
            <AvatarImage src="/images/photo-2025-12-28-14-01-53.jpg" alt="@hillarysweet" />
            <AvatarFallback className="text-2xl">HS</AvatarFallback>
          </Avatar>

          <h1 className="text-xl font-semibold text-black">@hillarysweet</h1>
        </div>

        <div className="px-4">
          <Button
            onClick={() => handleLinkClick("https://onlyfans.com/hillary_sweets/c110")}
            className="w-full h-auto py-4 px-6 text-base font-medium bg-white hover:bg-gray-50 text-black border-0 shadow-sm rounded-full transition-all duration-200 hover:shadow-md"
          >
            <svg className="h-6 w-6 mr-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z"
                fill="#00AFF0"
              />
              <path
                d="M12 6C8.69 6 6 8.69 6 12C6 15.31 8.69 18 12 18C15.31 18 18 15.31 18 12C18 8.69 15.31 6 12 6ZM12 16C9.79 16 8 14.21 8 12C8 9.79 9.79 8 12 8C14.21 8 16 9.79 16 12C16 14.21 14.21 16 12 16Z"
                fill="white"
              />
            </svg>
            <span className="flex-1 text-center">OnlyFans</span>
          </Button>
        </div>

        <p className="text-xs text-gray-600 text-center mt-12 px-4">Присоединяйтесь к hillarysweet на Linktree</p>

        <div className="flex items-center justify-center gap-3 mt-6 text-xs text-gray-500">
          <button className="hover:underline">Cookie Preferences</button>
          <span>•</span>
          <button className="hover:underline">Report</button>
          <span>•</span>
          <button className="hover:underline">Privacy</button>
        </div>
      </div>
    </main>
  )
}
