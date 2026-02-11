"use client";

import { useEffect, useRef } from "react";
import MonacoEditor, { OnMount } from "@monaco-editor/react";

interface EditorProps {
  language: string;
  code: string;
  onChange: (value: string | undefined) => void;
  theme?: string;
  readOnly?: boolean;
}

import { lintCode, Diagnostic } from "@/lib/ide/linter";

// ... (existing helper function usually, but I'll assume EditorProps is consistent)

export default function Editor({ language, code, onChange, readOnly = false }: Omit<EditorProps, 'theme'> & { theme?: string }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editorRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const monacoRef = useRef<any>(null);

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
    
    // Define a custom theme that matches the app's aesthetic
    monaco.editor.defineTheme('cyber-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '6272a4' },
        { token: 'keyword', foreground: 'ff79c6' },
        { token: 'string', foreground: 'f1fa8c' },
        { token: 'number', foreground: 'bd93f9' },
        { token: 'type', foreground: '8be9fd' },
      ],
      colors: {
        'editor.background': '#020202', // Matches app bg
        'editor.foreground': '#f8f8f2',
        'editorCursor.foreground': '#00f0ff',
        'editor.lineHighlightBackground': '#101015',
        'editorLineNumber.foreground': '#444444',
        'editorIndentGuide.background': '#222222',
        'editorIndentGuide.activeBackground': '#444444',
      }
    });
    
    monaco.editor.setTheme('cyber-dark');
  };

  useEffect(() => {
    if (editorRef.current && monacoRef.current) {
      const model = editorRef.current.getModel();
      if (model) {
        monacoRef.current.editor.setModelLanguage(model, language === 'c' ? 'c' : 'cpp');
      }
    }
  }, [language]);

  // Integrated simple linter using shared logic
  useEffect(() => {
    if (monacoRef.current && editorRef.current && code) {
      const model = editorRef.current.getModel();
      if (!model) return;

      const diagnostics = lintCode(code);
      const markers = diagnostics.map((d: Diagnostic) => ({
        severity: d.severity === 'error' ? monacoRef.current.MarkerSeverity.Error : monacoRef.current.MarkerSeverity.Warning,
        message: d.message,
        startLineNumber: d.line,
        startColumn: d.column,
        endLineNumber: d.line,
        endColumn: d.column + 5 // Approximate length highlighting
      }));

      monacoRef.current.editor.setModelMarkers(model, 'owner', markers);
    }
  }, [code, language]);

  return (
    <div className="h-full w-full overflow-hidden rounded-lg border border-white/5 bg-[#020202]">
      <MonacoEditor
        height="100%"
        width="100%"
        language={language === 'c' ? 'c' : 'cpp'}
        value={code}
        onChange={onChange}
        onMount={handleEditorDidMount}
        theme="cyber-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 13,
          fontFamily: "'JetBrains Mono', 'Fira Code', Consolas, monospace",
          lineHeight: 22,
          scrollBeyondLastLine: false,
          smoothScrolling: true,
          cursorBlinking: "smooth",
          cursorSmoothCaretAnimation: "on",
          padding: { top: 16, bottom: 16 },
          readOnly: readOnly,
          renderLineHighlight: "all",
          contextmenu: true,
          folding: true,
          glyphMargin: false, // Save horizontal space
          lineNumbersMinChars: 3,
        }}
      />
    </div>
  );
}
