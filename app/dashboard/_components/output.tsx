"use client"

import { useEffect, useState } from "react"
import { Edit, Copy, Download } from "lucide-react"
import Image from "next/image"

interface OutputProps {
  title: string
  content: string
}

const Output: React.FC<OutputProps> = ({ title, content }) => {
  const [displayedContent, setDisplayedContent] = useState("")
  const [showIcons, setShowIcons] = useState(false)
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    let index = 0
    const typingSpeed = Math.max(30, 3000 / content.length) // Adjusted typing speed for 3-4 seconds
    const typingInterval = setInterval(() => {
      if (index < content.length) {
        setDisplayedContent(prev => prev + content[index])
        index++
      } else {
        clearInterval(typingInterval)
        setIsTyping(false)
        setShowIcons(true) // Show icons after typing is complete
      }
    }, typingSpeed)

    return () => clearInterval(typingInterval)
  }, [content])

  return (
    <div className="relative rounded-lg border border-gray-300 p-6 shadow-sm transition-all duration-300 ease-in-out">
      {/* Thinking nudge with rotating image */}
      {isTyping && (
        <div className="absolute left-0 top-0 ml-2 mt-2">
          <Image
            src="/circle.png"
            alt="Thinking"
            width={24}
            height={24}
            className="animate-spin"
          />
        </div>
      )}
      <h2
        className={`mb-1 text-2xl font-semibold ${isTyping ? "mt-6" : "mt-3"}`}
      >
        {title}
      </h2>
      <p className="text-base text-gray-800">{displayedContent}</p>

      {/* Icons at the bottom */}
      {showIcons && (
        <div className="mt-6 flex items-center justify-between">
          <div className="flex space-x-2">
            <button className="text-gray-600 hover:text-gray-800">
              <Edit size={16} />
            </button>
            <button className="text-gray-600 hover:text-gray-800">
              <Copy size={16} />
            </button>
          </div>
          <button className="text-gray-600 hover:text-gray-800">
            <Download size={16} />
          </button>
        </div>
      )}
    </div>
  )
}

export default Output
