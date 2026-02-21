import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { code, language } = await req.json();

    // Map language to Piston API format
    const langMap: Record<string, { language: string; version: string }> = {
      cpp: { language: "c++", version: "10.2.0" },
      c: { language: "c", version: "10.2.0" },
    };

    const lang = langMap[language];
    if (!lang) {
      return NextResponse.json(
        { error: `Unsupported language: ${language}` },
        { status: 400 }
      );
    }

    const ext = language === "cpp" ? "cpp" : "c";

    // Use Piston API (free, no API key needed)
    const response = await fetch("https://emkc.org/api/v2/piston/execute", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        language: lang.language,
        version: lang.version,
        files: [
          {
            name: `main.${ext}`,
            content: code,
          },
        ],
        stdin: "",
        args: [],
        compile_timeout: 10000,
        run_timeout: 5000,
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      return NextResponse.json(
        { error: `Execution service error: ${text}` },
        { status: 500 }
      );
    }

    const result = await response.json();

    // Check for compile errors
    if (result.compile && result.compile.code !== 0) {
      return NextResponse.json({
        success: false,
        output: result.compile.stderr || result.compile.output || "Compilation failed",
        type: "error",
      });
    }

    // Check for runtime errors
    if (result.run && result.run.code !== 0) {
      return NextResponse.json({
        success: false,
        output: result.run.stderr || result.run.output || "Runtime error",
        type: "error",
      });
    }

    return NextResponse.json({
      success: true,
      output: result.run?.output || "Program executed with no output.",
      type: "success",
    });
  } catch (error) {
    console.error("Code execution error:", error);
    return NextResponse.json(
      { error: "Failed to execute code. Please try again." },
      { status: 500 }
    );
  }
}
