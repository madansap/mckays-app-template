"use server"

import { ActionState } from "@/types"

export async function summarizeUrlAction(url: string): Promise<ActionState<string>> {
  try {
    console.log("Summarizing URL:", url); // Log the URL being summarized
    console.log("OpenAI API Key:", process.env.OPENAI_API_KEY); // Log the API key for debugging

    const requestBody = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Summarize the content from this URL: ${url}`
        }
      ],
    };

    console.log("Request Body:", JSON.stringify(requestBody)); // Log the request body

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify(requestBody),
    });

    console.log("Response Status:", response.status); // Log the response status

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error details:", errorData); // Log error details
      throw new Error(errorData.error?.message || "Failed to fetch summary");
    }

    const data = await response.json();
    console.log("Response Data:", data); // Log the response data

    const summary = data.choices[0].message.content; // Extract the summary from the response
    return {
      isSuccess: true,
      message: "Summary fetched successfully",
      data: summary,
    };
  } catch (error) {
    console.error("Error summarizing URL:", error);
    return { isSuccess: false, message: "Failed to summarize URL" };
  }
} 