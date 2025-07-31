import Image from "next/image";

export default function Home() {
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
                                className="border border-gray-500 bg-[#0f172a] text-white px-3 py-2 rounded-md w-full"
                            />
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                                Upload
                            </button>
                        </div>
                        <textarea
                            className="border border-gray-500 bg-[#0f172a] text-white rounded-md w-full h-full p-3 resize-none"
                            placeholder="Paste your resume here 👇"
                        ></textarea>
                    </div>

                    {/* Job Description Section */}
                    <div className="bg-[#1e293b] rounded-xl shadow-md p-6 w-[48%] flex flex-col">
                        <h3 className="text-3xl font-semibold mb-4 text-center">Job Description</h3>
                        <p className="text-lg text-gray-400 mb-2">
                            Paste the job description you're looking for here.'
                        </p>
                        <textarea
                            className="border border-gray-500 bg-[#0f172a] text-white rounded-md w-full h-full p-3 resize-none"
                            placeholder="Got a job in mind? Paste its description below so we can help you match your resume perfectly! 👇"
                        ></textarea>
                    </div>
                </div>

                {/* Analysis Type Cards */}
                <div className=" bg-[#0f172a] flex flex-row justify-center items-stretch gap-6 p-6 w-[85%] mx-auto rounded-lg">
                    <div className="w-[85%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-8">
                        {/* Card 1 */}
                        <div className="bg-[#1e293b] rounded-lg shadow-md px-6 py-4 flex flex-col items-center text-center hover:bg-[#334155] transition">
                            <div className="text-4xl mb-3">🎯</div>
                            <h4 className="text-lg font-semibold mb-1">Match Percentage</h4>
                            <p className="text-sm text-gray-400">See how well your resume matches</p>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-[#1e293b] rounded-lg shadow-md px-6 py-4 flex flex-col items-center text-center hover:bg-[#334155] transition">
                            <div className="text-4xl mb-3">📄</div>
                            <h4 className="text-lg font-semibold mb-1">Resume Analyzer</h4>
                            <p className="text-sm text-gray-400">Detailed resume analysis</p>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-[#1e293b] rounded-lg shadow-md px-6 py-4 flex flex-col items-center text-center hover:bg-[#334155] transition">
                            <div className="text-4xl mb-3">💡</div>
                            <h4 className="text-lg font-semibold mb-1">Improvement Suggestions</h4>
                            <p className="text-sm text-gray-400">Get personalized recommendations</p>
                        </div>

                        {/* Card 4 */}
                        <div className="bg-[#1e293b] rounded-lg shadow-md px-6 py-4 flex flex-col items-center text-center hover:bg-[#334155] transition">
                            <div className="text-4xl mb-3">🔍</div>
                            <h4 className="text-lg font-semibold mb-1">Missing Keywords</h4>
                            <p className="text-sm text-gray-400">Find missing important keywords</p>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}
