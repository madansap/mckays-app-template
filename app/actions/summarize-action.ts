"use server"

import { ActionState } from "@/types"

export async function summarizeUrlAction(
  url: string
): Promise<ActionState<string>> {
  try {
    const response = await fetch("YOUR_SUMMARIZATION_API_ENDPOINT", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ url })
    })

    if (!response.ok) {
      throw new Error("Failed to fetch summary")
    }

    const data = await response.json()
    return {
      isSuccess: true,
      message: "Summary fetched successfully",
      data: data.summary // Assuming the API returns a summary field
    }
  } catch (error) {
    console.error("Error summarizing URL:", error)
    return { isSuccess: false, message: "Failed to summarize URL" }
  }
}
