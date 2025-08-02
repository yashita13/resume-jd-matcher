"use client";
import { useState } from "react";

export default function ResumeMatcher() {
    const [resumeFile, setResumeFile] = useState<File | null>(null);
    const [jdText, setJdText] = useState("");
    const [analysis, setAnalysis] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [selectedType, setSelectedType] = useState<string>("");

    const analyzeResume = async (type: string) => {
        if (!resumeFile || !jdText) {
            alert("Please upload a resume and paste the job description first!");
            return;
        }

        setLoading(true);
        setSelectedType(type);

        try {
            const formData = new FormData();
            formData.append("resume", resumeFile);
            formData.append("jobDescription", jdText);
            formData.append("userId", "demo-user");
            formData.append("type", type);

            const response = await fetch("/api/match", { method: "POST", body: formData });

            if (!response.ok) {
                const text = await response.text();
                console.error("API Error Response:", text);
                throw new Error("API returned an error");
            }

            const data = await response.json();
            setAnalysis(data.analysis);
        } catch (err) {
            console.error("Analyze Resume Error:", err);
            alert("Analysis failed. Check console for details.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <h1 className="text-4xl font-bold mt-6 mb-3 flex flex-col items-center">Resume-JD Matcher</h1>
            <p className="text-lg font-medium text-gray-500 flex flex-col items-center">Powered by AI, built for job seekers—Empower your next Resume shortlisting process.</p>

            <div className=" p-8 min-h-screen text-white">
                <div className="flex flex-row justify-center items-stretch gap-6 p-6 w-[90%] mx-auto">
                    {/* Resume Upload Section */}
                    <div className="bg-[#1e293b] rounded-xl shadow-md p-6 w-[48%] flex flex-col">
                        <h3 className="text-3xl font-semibold mb-6 text-center">Upload Your Document</h3>
                        <div className="flex flex-row items-center space-x-4 mb-4">
                            <input
                                type="file"
                                accept="application/pdf"
                                onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                                className="border border-gray-500 bg-[#0f172a] text-white px-3 py-2 rounded-md w-full"
                            />
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                                Upload
                            </button>
                        </div>
                        {/*<textarea*/}
                        {/*    className="border border-gray-500 bg-[#0f172a] text-white rounded-md w-full h-full p-3 resize-none"*/}
                        {/*    placeholder="Paste your resume here 👇"*/}
                        {/*></textarea>*/}
                    </div>

                    {/* Job Description Section */}
                    <div className="bg-[#1e293b] rounded-xl shadow-md p-6 w-[48%] flex flex-col">
                        <h3 className="text-3xl font-semibold mb-4 text-center">Job Description</h3>
                        <p className="text-lg text-gray-400 mb-2">
                            Paste the job description you're looking for here.'
                        </p>
                        <textarea
                            className="border border-gray-500 bg-[#0f172a] text-white rounded-md w-full h-full p-3 resize-none"
                            placeholder="Paste job description here..."
                            value={jdText}
                            onChange={(e) => setJdText(e.target.value)}
                        />
                    </div>
                </div>

                {/* ✅ Analysis Type Cards */}
                <div className="bg-[#0f172a] flex flex-row justify-center items-stretch gap-6 p-6 w-[85%] mx-auto rounded-lg">
                    <div className="w-[85%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-8">
                        {[
                            { type: "matchPercentage", icon: "🎯", title: "Match Percentage", desc: "See how well your resume matches" },
                            { type: "resumeAnalyzer", icon: "📄", title: "Resume Analyzer", desc: "Detailed resume analysis" },
                            { type: "improvementSuggestions", icon: "💡", title: "Improvement Suggestions", desc: "Get personalized recommendations" },
                            { type: "missingKeywords", icon: "🔍", title: "Missing Keywords", desc: "Find missing important keywords" }
                        ].map((card) => (
                            <div
                                key={card.type}
                                onClick={() => analyzeResume(card.type)}
                                className="cursor-pointer bg-[#1e293b] rounded-lg shadow-md px-6 py-4 flex flex-col items-center text-center hover:bg-[#334155] transition"
                            >
                                <div className="text-4xl mb-3">{card.icon}</div>
                                <h4 className="text-lg font-semibold mb-1">{card.title}</h4>
                                <p className="text-sm text-gray-400">{card.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ✅ Show Analysis Below UI */}
                {loading && <p className="text-center text-lg">Analyzing...</p>}

                {analysis && (
                    <div className="bg-gray-900 p-6 rounded-lg w-[85%] mx-auto mt-6">
                        <h2 className="text-2xl font-bold mb-4">{selectedType.replace(/([A-Z])/g, " $1")}</h2>
                        <pre className="whitespace-pre-wrap text-gray-300">{JSON.stringify(analysis, null, 2)}</pre>
                    </div>
                )}
            </div>
        </>
    );
}