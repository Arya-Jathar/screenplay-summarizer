import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const text = body.text;

    if (!text || typeof text !== "string") {
      return NextResponse.json(
        { error: "No text provided." },
        { status: 400 }
      );
    }

    const prompt = `Summarize this screenplay. Identify the main characters, the core conflict, and the plot resolution: ${text}`;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const summary = response.text();

    return NextResponse.json({ summary });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to generate summary." },
      { status: 500 }
    );
  }
}
