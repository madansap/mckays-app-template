"use client"

import { useEffect, useState } from "react"
import { Edit, Copy, Download } from "lucide-react"
import Image from "next/image"

const Output: React.FC = () => {
  const title = "The 9 UX Laws Every Designer Needs to Know"
  const subtitle =
    "Essential principles for creating better software, websites, and user experiences."
  const [displayedContent, setDisplayedContent] = useState("")
  const [showIcons, setShowIcons] = useState(false)
  const [isTyping, setIsTyping] = useState(true)

  const content = `
• **Law of Proximity**: Group related items together and separate unrelated ones for better information organization.

• **Law of Similarity**: Use similar colors, shapes, or other visual cues for related elements to increase usability and reduce confusion.

• **Hick's Law**: Limit the number of options presented to users to avoid overwhelming them and maintain a balanced, productive user experience.

• **Miller's Law**: Keep the number of elements on each screen to a minimum and use search, filtering, and the Serial Position Effect to help users find and remember information.

• **Serial Position Effect**: Place important elements at the beginning or end of a user flow, where they are more likely to be noticed and remembered.

• **Aesthetic-Usability Effect**: Create visually appealing interfaces, as users will perceive them as more usable.

• **Pareto Principle**: Focus on the 20% of factors that have the biggest impact on overall results in user research, usability testing, and design iterations.

• **Jacob's Law**: Consider users' past experiences and expectations when designing new product experiences.

• **Tesler's Law**: Accept the inherent complexity of applications and work to make them as simple and straightforward as possible.
`

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
      <h3 className="mb-3 text-xl font-medium text-gray-600">{subtitle}</h3>
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
