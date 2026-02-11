"use client";

import { useState } from "react";
import Sidebar, { FileNode } from "@/components/ide/Sidebar";
import Editor from "@/components/ide/Editor";
import Terminal from "@/components/ide/Terminal";
import { Play, Square, Loader2 } from "lucide-react";
import { VirtualCompiler } from "@/lib/ide/compiler";

// Initial file structure
const initialFiles: FileNode[] = [
  {
    id: "root",
    name: "Project",
    type: "folder",
    children: [
      {
        id: "main",
        name: "main.c",
        type: "file",
        language: "c",
        content: `#include <stdio.h>
#include "robot.h"

int main() {
    printf("Initializing Robot Systems...\\n");
    
    // Calibrate sensors
    robot_init();
    
    printf("Moving forward 10 steps...\\n");
    move(10);
    
    printf("Turning right 90 degrees...\\n");
    turn(90);
    
    printf("Mission Complete!\\n");
    return 0;
}`
      },
      {
        id: "robot_h",
        name: "robot.h",
        type: "file",
        language: "h",
        content: `// Robot Header Definition
void robot_init();
void move(int steps);
void turn(int degrees);`
      }
    ]
  }
];

export default function IDEPage() {
  const [files, setFiles] = useState<FileNode[]>(initialFiles);
  const [activeFileId, setActiveFileId] = useState<string>("main");
  const [isRunning, setIsRunning] = useState(false);
  const [isCompiling, setIsCompiling] = useState(false);
  const [logs, setLogs] = useState<string[]>(["[SYSTEM] Environment Ready.", "[INFO] Clang 16.0.0 (WASM) Loaded."]);

  // Helper to find file by ID recursively
  const findFile = (nodes: FileNode[], id: string): FileNode | undefined => {
    for (const node of nodes) {
      if (node.id === id) return node;
      if (node.children) {
        const found = findFile(node.children, id);
        if (found) return found;
      }
    }
    return undefined;
  };

  const activeFile = findFile(files, activeFileId);

  const handleUpdateFile = (val: string | undefined) => {
    if (val === undefined || !activeFile) return;
    
    const updateNodes = (nodes: FileNode[]): FileNode[] => {
      return nodes.map (node => {
        if (node.id === activeFileId) return { ...node, content: val };
        if (node.children) return { ...node, children: updateNodes(node.children) };
        return node;
      });
    };
    
    setFiles(updateNodes(files));
  };

  const handleRun = async () => {
    if (!activeFile) return;
    setIsCompiling(true);
    setLogs(["[SYSTEM] Starting build process..."]);
    
    // 1. Compile
    const buildResult = await VirtualCompiler.compile(activeFile);
    setLogs(prev => [...prev, ...buildResult.logs]);
    setIsCompiling(false);
    
    if (buildResult.success) {
        // 2. Run
        setIsRunning(true);
        const runOutput = await VirtualCompiler.run(activeFile);
        setLogs(prev => [...prev, ...runOutput]);
        setIsRunning(false);
    }
  };

  return (
    <main className="h-screen w-full flex flex-col bg-black/90 text-white overflow-hidden">
       {/* Top Bar */}
       <div className="h-12 border-b border-white/5 flex items-center justify-between px-4 bg-black/40">
           <div className="flex items-center gap-4">
               <h1 className="text-sm font-bold font-display tracking-widest uppercase text-white/80">
                   Life-Robo <span className="text-cyber-cyan">IDE</span>
               </h1>
               <div className="h-4 w-[1px] bg-white/10" />
               <span className="text-xs text-gray-500 font-mono">{activeFile?.name || "No file open"}</span>
           </div>
           
           <div className="flex items-center gap-2">
               <button 
                onClick={handleRun}
                disabled={isRunning || isCompiling}
                className={`flex items-center gap-2 px-4 py-1.5 rounded text-[10px] font-bold uppercase tracking-widest transition-all
                    ${isRunning || isCompiling ? 'bg-white/5 text-gray-500' : 'bg-cyber-cyan text-black hover:bg-white hover:shadow-[0_0_15px_rgba(255,255,255,0.4)]'}
                `}
               >
                   {isCompiling ? (
                       <Loader2 size={12} className="animate-spin" />
                   ) : isRunning ? (
                       <Square size={12} fill="currentColor" />
                   ) : (
                       <Play size={12} fill="currentColor" />
                   )}
                   {isCompiling ? "Building..." : isRunning ? "Running..." : "Run Code"}
               </button>
           </div>
       </div>

       {/* Main Layout */}
       <div className="flex-1 flex min-h-0">
           {/* Sidebar */}
           <Sidebar 
             files={files} 
             activeFileId={activeFileId} 
             onSelectFile={setActiveFileId} 
             onNewFile={() => {}} 
           />
           
           {/* Center Content */}
           <div className="flex-1 flex flex-col min-w-0">
               {/* Editor Area */}
               <div className="flex-1 min-h-0 bg-transparent">
                   {activeFile ? (
                       <Editor 
                         language={activeFile.language || 'c'}
                         code={activeFile.content || ""}
                         onChange={handleUpdateFile}
                       />
                   ) : (
                       <div className="h-full flex items-center justify-center text-gray-600 font-mono text-sm">
                           Select a file to edit
                       </div>
                   )}
               </div>
               
               {/* Terminal Area */}
               <div className="h-1/3 min-h-[150px] max-h-[400px] shrink-0">
                   <Terminal logs={logs} />
               </div>
           </div>
       </div>
    </main>
  );
}
