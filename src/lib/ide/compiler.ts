import { lintCode } from "./linter";
import { FileNode } from "@/components/ide/Sidebar";

export class VirtualCompiler {
    // Simulate compilation process
    static async compile(file: FileNode): Promise<{ success: boolean; logs: string[] }> {
        return new Promise((resolve) => {
            const logs: string[] = [];
            logs.push(`[SYSTEM] Initializing build environment...`);
            logs.push(`[CLANG] strict check enabled.`);

            const code = file.content || "";
            const diagnostics = lintCode(code);
            const errors = diagnostics.filter(d => d.severity === 'error');

            // Show diagnostics in logs
            diagnostics.forEach(d => {
                if (d.severity === 'error') {
                    logs.push(`[ERR] Line ${d.line}: ${d.message}`);
                } else {
                    logs.push(`[WARN] Line ${d.line}: ${d.message}`);
                }
            });

            if (errors.length > 0) {
                logs.push(`[ERR] Compilation failed with ${errors.length} error(s).`);
                // Simulate quick failure
                setTimeout(() => {
                    resolve({ success: false, logs });
                }, 300);
                return;
            }

            // Simple static checks simulation (kept for flavor, but linter covers most)
            if (code.includes("#include <stdio.h>") || code.includes("#include <iostream>")) {
                logs.push(`[CLANG] detailed analysis of includes... OK`);
            } else {
                logs.push(`[WARN] Standard I/O library missing?`);
            }

            setTimeout(() => {
                if (code.trim().length === 0) {
                    logs.push(`[ERR] Source file is empty.`);
                    resolve({ success: false, logs });
                    return;
                }

                if (code.includes("error")) {
                    logs.push(`[ERR] compilation terminated.`);
                    resolve({ success: false, logs });
                    return;
                }

                logs.push(`[CLANG] compiling ${file.name}...`);
                logs.push(`[LINK] generating wasm module...`);
                logs.push(`[SUCCESS] Build finished successfully (0.4s)`);
                resolve({ success: true, logs });
            }, 800);
        });
    }

    static async run(file: FileNode): Promise<string[]> {
        return new Promise((resolve) => {
            const output: string[] = [];
            const code = file.content || "";

            output.push(`[EXEC] Loading WASM module...`);

            // Very basic interpreter for demo purposes
            const lines = code.split('\n');
            lines.forEach(line => {
                if (line.includes('printf') || line.includes('cout')) {
                    // Extract string between quotes
                    const match = line.match(/"([^"]*)"/);
                    if (match) {
                        output.push(match[1].replace('\\n', ''));
                    }
                }
                else if (line.includes('move(')) {
                    const match = line.match(/move\(([^)]*)\)/);
                    const val = match ? match[1] : "??";
                    output.push(`[ROBOT] Moving ${val} units...`);
                }
                else if (line.includes('turn(')) {
                    const match = line.match(/turn\(([^)]*)\)/);
                    const val = match ? match[1] : "??";
                    output.push(`[ROBOT] Turning ${val} degrees...`);
                }
            });

            output.push(`[SYSTEM] Program exited with code 0`);
            setTimeout(() => resolve(output), 500);
        });
    }
}

// NOTE: For a real "tiny clang.wasm", you would integrate something like:
// import { createWasmClang } from "wasm-clang";
// const compiler = await createWasmClang({ wasmUrl: '/clang.wasm' });
// const result = await compiler.compile(file.content);
// Alternatively, "tcc-wasm" (Tiny C Compiler) is much lighter (~2MB) and might be suitable for embedded/simulation logic.
