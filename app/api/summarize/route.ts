import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const textInput = formData.get("text") as string;

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");
    // Using the model you confirmed works for you
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    let promptParts: any[] = [];
    
    // 1. Define the System Instruction
    const systemPrompt = `You are an expert script reader. Summarize the provided screenplay.
    Structure your answer with these headers:
    - **Logline**: A one-sentence summary.
    - **Main Characters**: A list of key players.
    - **Synopsis**: A concise summary of the plot points.`;

    promptParts.push(systemPrompt);

    // 2. Handle File (The Modern Way: Native PDF Support)
    if (file) {
      console.log("Processing PDF natively with Gemini:", file.name);
      
      // Convert file to Base64
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const base64Data = buffer.toString("base64");

      // Send the PDF directly to the model
      promptParts.push({
        inlineData: {
          data: base64Data,
          mimeType: "application/pdf",
        },
      });
    } 
    // 3. Handle Text
    else if (textInput) {
      console.log("Processing text input...");
      promptParts.push(`Screenplay Text:\n${textInput.slice(0, 30000)}`);
    } else {
      return NextResponse.json({ error: "No text or file provided" }, { status: 400 });
    }

    // 4. Generate
    const result = await model.generateContent(promptParts);
    const response = await result.response;
    const summary = response.text();

    return NextResponse.json({ summary });

  } catch (error: any) {
    console.error("SERVER ERROR:", error);
    return NextResponse.json(
      { error: "AI Error: " + error.message },
      { status: 500 }
    );
  }
}