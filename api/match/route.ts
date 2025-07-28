// import { NextResponse } from 'next/server';
// import { PDFExtract } from 'pdf.js-extract';
// import OpenAI from "openai";
// import { Readable } from 'stream';
// import pdf from "pdf-parse";
//
// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY,
// });
//
// export async function POST(req: Request) {
//     const formData = await req.formData();
//     const file = formData.get("resume") as File;
//     const jd = formData.get("jd") as string;
//
//     if (!file || !jd) return NextResponse.json({ error: "Missing data" }, { status: 400 });
//
//     const buffer = Buffer.from(await file.arrayBuffer());
//
//     const pdfText = await pdf(buffer).then(data => data.text);
//
//     const completion = await openai.chat.completions.create({
//         model: "gpt-4",
//         messages: [
//             { role: "system", content: "You are a resume matcher assistant." },
//             { role: "user", content: `Compare this resume:\n\n${pdfText}\n\nwith this job description:\n\n${jd}\n\nReturn a match score out of 100 and list the missing skills.` },
//         ],
//     });
//
//     const output = completion.choices[0].message.content;
//
//     return NextResponse.json({ match_result: output });
// }
