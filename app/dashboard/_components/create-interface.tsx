"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Paperclip, Image, Video, ImageDown } from "lucide-react"
import NextImage from "next/image"

export default function CreateInterface() {
  return (
    <div className="bg-background flex min-h-screen w-full items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        {/* Main Content */}
        <main className="space-y-8">
          {/* Logo and Title */}
          <div className="space-y-4 text-center">
            <div className="relative mx-auto size-16">
              <NextImage
                src="/logo.png"
                alt="EverArt Logo"
                width={64}
                height={64}
                className="rounded-full bg-orange-100"
              />
            </div>
            <h1 className="text-2xl font-semibold">
              What will you summarize today?
            </h1>
          </div>

          <div className="space-y-4">
            {/* Input Field */}
            <div className="relative">
              <Input
                placeholder="Enter your url...."
                className="rounded-2xl px-12 py-8 text-lg"
              />
              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <Paperclip className="text-muted-foreground size-5" />
              </div>
              <Button
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2"
              >
                <Send className="size-5" />
              </Button>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-center gap-1.5">
              <Button
                variant="outline"
                className="border-muted-foreground/20 flex h-10 flex-row items-center gap-2 whitespace-nowrap rounded-full px-4"
              >
                <Image className="size-5 shrink-0" />
                Create images
              </Button>
              <Button
                variant="outline"
                className="border-muted-foreground/20 flex h-10 flex-row items-center gap-2 whitespace-nowrap rounded-full px-4"
              >
                <Video className="size-5 shrink-0" />
                Create Videos
              </Button>
              <Button
                variant="outline"
                className="border-muted-foreground/20 flex h-10 flex-row items-center gap-2 whitespace-nowrap rounded-full px-4"
              >
                <ImageDown className="size-5 shrink-0" />
                Swap background
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
