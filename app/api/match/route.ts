import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import {NextRequest, NextResponse} from "next/server";
import { db } from "@/firebase/admin";
import pdf from "pdf-parse";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();

        const file = formData.get("resume") as File | null;
        const jobDescription = formData.get("jobDescription") as string;
        const type = formData.get("type") as string;
        // const userId=formData.get("userId") as string;

        //dummy
        const resumeText = "This is a dummy extracted resume text with skills React, Node.js, AWS.";
        const jobDescriptionText = jobDescription?.trim() ||
            "The job requires full-stack development skills with React, Node.js, AWS.";

        if (!file || !jobDescription) {
            return NextResponse.json({error: "Missing resume or job description"}, {status: 400});
        }

        const prompt = `
You are an AI Resume Evaluator.
Analyze the resume against the job description.

Rules:
- Respond only with analysis for type: "${type}".
- Return plain text (no JSON, no code fences).
- Be clear and concise.

Input:
Resume: ${resumeText}
Job Description: ${jobDescriptionText}
`;

        const { text: geminiResponse } = await generateText({
            model: google("gemini-2.0-flash-001", {
                apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
            }),
            prompt,
        });

        function extractJson(text: string) {
            try {
                const match = text.match(/{[\s\S]*}/);
                if (match) return JSON.parse(match[0]);
                return { raw: text };
            } catch {
                return { raw: text };
            }
        }

        let cleanResponse = geminiResponse
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .replace(/\\n/g, "")         // remove escaped \n
            .replace(/\n/g, "")          // remove actual newlines
            .replace(/\\"/g, '"')        // fix escaped quotes
            .trim();

        let parsed = extractJson(cleanResponse);
        // parsed = enforceType(type, parsed, resumeText);

        return NextResponse.json({ success: true, analysis: parsed });

    } catch (error: any) {
        console.error("API /match Gemini Error:", error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}


// let analysis=extractJson(cleanResponse);
        // try {
        //     analysis = JSON.parse(cleanResponse);
        // } catch {
        //     analysis = { raw: cleanResponse };
        // }





        //Convert uploaded file to Buffer
        // const arrayBuffer = await file.arrayBuffer();
        // const buffer = Buffer.from(arrayBuffer);
        // if (buffer.length === 0) {
        //     return NextResponse.json({ error: "Uploaded file is empty" }, { status: 400 });
        // }

        //extract pdf text
        // const pdfData = await pdf(buffer);
        // const resumeText=pdfData.text;



    //     // ✅ Mock analysis based on type
    //     let analysis: any = {};
    //     if (type === "matchPercentage") {
    //         analysis = { match: "85%", details: "Dummy match calculated successfully." };
    //     } else if (type === "resumeAnalyzer") {
    //         analysis = { summary: "Dummy resume analysis", extractedText: resumeText };
    //     } else if (type === "improvementSuggestions") {
    //         analysis = { suggestions: ["Add more projects", "Include quantified achievements"] };
    //     } else if (type === "missingKeywords") {
    //         analysis = { missing: ["Docker", "Kubernetes"] };
    //     }
    //
    //     return NextResponse.json({ success: true, analysis });
    // } catch (error: any) {
    //     console.error("API /match error:", error);
    //     return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    // }


