"use client";

import dynamic from "next/dynamic";
import { useState, useRef, useCallback } from "react";
import { TrialButton } from "./ui/TrialButton";

// Dynamically import Monaco Editor to avoid SSR issues
const Editor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full text-white/40" style={{ backgroundColor: 'transparent', fontFamily: "'Fira Code', monospace" }}>
      Loading editor...
    </div>
  ),
});

const defaultCpp = `#include <iostream>
using namespace std;

int main() {
    cout << "Hello Robotics Club" << endl;
    
    for (int i = 1; i <= 5; i++) {
        cout << "Robot #" << i << " online!" << endl;
    }
    
    return 0;
}`;

const defaultC = `#include <stdio.h>

int main() {
    printf("Hello Robotics Club\\n");
    
    for (int i = 1; i <= 5; i++) {
        printf("Robot #%d online!\\n", i);
    }
    
    return 0;
}`;

interface EditorCodeProps {
  onRunResult: (result: { output: string; type: "success" | "error" | "idle" }) => void;
  isRunning: boolean;
  setIsRunning: (running: boolean) => void;
}

export default function EditorCode({ onRunResult, isRunning, setIsRunning }: EditorCodeProps) {
  const [language, setLanguage] = useState<"cpp" | "c">("cpp");
  const [code, setCode] = useState(defaultCpp);
  const editorRef = useRef<unknown>(null);

  const handleEditorMount = useCallback((editor: unknown) => {
    editorRef.current = editor;
  }, []);

  const handleLanguageChange = (lang: "cpp" | "c") => {
    setLanguage(lang);
    setCode(lang === "cpp" ? defaultCpp : defaultC);
  };

  const runCode = async () => {
    setIsRunning(true);
    onRunResult({ output: "Compiling & running...", type: "idle" });

    try {
      const res = await fetch("/api/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, language }),
      });

      const data = await res.json();

      if (!res.ok) {
        onRunResult({ output: data.error || "Server error", type: "error" });
      } else if (data.success) {
        onRunResult({ output: data.output, type: "success" });
      } else {
        onRunResult({ output: data.output, type: "error" });
      }
    } catch {
      onRunResult({ output: "Network error. Could not reach the execution server.", type: "error" });
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="relative z-10 w-full h-full flex flex-col">
      {/* Editor Card - Sharp framed style */}
      <div
        className="relative w-full h-full flex flex-col overflow-hidden"
        style={{
          backgroundColor: '#020510',
        }}
      >
        {/* Header bar */}
        <div
          className="flex items-center justify-between border-b px-3 py-1.5 shrink-0"
          style={{
            borderColor: 'rgba(0, 80, 200, 0.12)',
            backgroundColor: 'rgba(2, 6, 20, 0.8)',
          }}
        >
          <div className="flex items-center gap-3">
           
            {/* Language tabs */}
            <div className="flex items-center gap-1.5 ml-3" style={{ fontFamily: "'Fira Code', monospace" }}>
              {(["cpp", "c"] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => handleLanguageChange(lang)}
                  className="group relative rounded-full p-px overflow-hidden transition-all duration-300"
                  style={{
                    background: language === lang
                      ? 'linear-gradient(135deg, #2255aa, #4488ff, #66aaff)'
                      : 'transparent',
                  }}
                >
                  {/* Animated glow blob — only on active tab */}
                  {language === lang && (
                    <>
                      <span className="absolute inset-0 rounded-full overflow-hidden">
                        <span className="inset-0 absolute pointer-events-none select-none">
                          <span
                            className="block -translate-x-1/2 -translate-y-1/3 size-16 blur-xl"
                            style={{
                              background: 'linear-gradient(135deg, #2255aa, #4488ff, #88ccff)',
                              animation: '10s ease-in-out 0s infinite alternate none running border-glow-translate',
                            }}
                          />
                        </span>
                      </span>
                      <span
                        className="inset-0 absolute pointer-events-none select-none"
                        style={{ animation: '10s ease-in-out 0s infinite alternate none running border-glow-translate' }}
                      >
                        <span
                          className="block z-0 h-full w-10 blur-xl -translate-x-1/2 rounded-full"
                          style={{
                            background: 'linear-gradient(135deg, #2255aa, #4488ff, #88ccff)',
                            animation: '10s ease-in-out 0s infinite alternate none running border-glow-scale',
                          }}
                        />
                      </span>
                    </>
                  )}
                  <span
                    className="flex items-center justify-center relative z-[1] rounded-full px-3 py-1.5 transition-all duration-300"
                    style={{
                      background: language === lang ? 'rgba(2, 5, 16, 0.9)' : 'transparent',
                    }}
                  >
                    <span
                      className={`text-xs transition-all duration-300 ${
                        language === lang
                          ? 'text-blue-200'
                          : 'text-white/30 group-hover:text-white/50'
                      }`}
                    >
                      {lang === 'cpp' ? 'main.cpp' : 'main.c'}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </div>

          <TrialButton
            onClick={runCode}
            disabled={isRunning}
            trailColor={isRunning ? "#66aaff" : "#4488ff"}
            blurColor={isRunning ? "#88ccff" : "#66aaff"}
          >
            <span className="flex items-center gap-2">
              {isRunning ? (
                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
              {isRunning ? 'Running...' : 'Run Code'}
            </span>
          </TrialButton>
        </div>

        {/* Editor area — fills remaining space */}
        <div className="flex-1 min-h-0" style={{ backgroundColor: 'transparent' }}>
          <Editor
            language={language === "cpp" ? "cpp" : "c"}
            value={code}
            height="100%"
            theme="vs-dark"
            onChange={(value) => setCode(value || "")}
            onMount={(editor, monaco) => {
              handleEditorMount(editor);
              monaco.editor.defineTheme('kali-transparent', {
                base: 'vs-dark',
                inherit: true,
                rules: [
                  { token: 'comment', foreground: '6A9955' },
                  { token: 'keyword', foreground: 'C586C0' },
                  { token: 'string', foreground: 'CE9178' },
                  { token: 'number', foreground: 'B5CEA8' },
                  { token: 'type', foreground: '4EC9B0' },
                ],
                colors: {
                  'editor.background': '#00000000',
                  'editor.lineHighlightBackground': '#ffffff06',
                  'editor.selectionBackground': '#0050c830',
                  'editorLineNumber.foreground': '#ffffff20',
                  'editorLineNumber.activeForeground': '#006eff',
                  'editor.selectionHighlightBackground': '#0050c815',
                  'editorCursor.foreground': '#006eff',
                  'editorGutter.background': '#00000000',
                },
              });
              monaco.editor.setTheme('kali-transparent');
            }}
            options={{
              selectOnLineNumbers: true,
              roundedSelection: false,
              cursorStyle: "line",
              automaticLayout: true,
              minimap: { enabled: false },
              fontSize: 12,
              lineHeight: 19,
              padding: { top: 8, bottom: 8 },
              scrollBeyondLastLine: false,
              scrollbar: {
                useShadows: false,
                vertical: "auto",
                horizontal: "auto",
                verticalScrollbarSize: 6,
                horizontalScrollbarSize: 6,
              },
              overviewRulerBorder: false,
              hideCursorInOverviewRuler: true,
              renderLineHighlight: "line",
              fontFamily: "'Fira Code', 'JetBrains Mono', 'Consolas', monospace",
              fontLigatures: true,
              lineNumbers: "on",
              glyphMargin: true,
              folding: true,
              lineDecorationsWidth: 16,
              lineNumbersMinChars: 3,
              cursorBlinking: "smooth",
              smoothScrolling: true,
            }}
          />
        </div>
        </div>
      </div>
    );
  }

