export interface Diagnostic {
    message: string;
    line: number;
    column: number;
    severity: 'error' | 'warning';
}

export function lintCode(code: string): Diagnostic[] {
    const diagnostics: Diagnostic[] = [];
    const lines = code.split('\n');

    lines.forEach((line, index) => {
        const trimmed = line.trim();
        if (trimmed.length === 0 || trimmed.startsWith('//') || trimmed.startsWith('#')) return;

        // Very basic missing semicolon check
        // If line ends with ) or word/number/string, and doesn't end with ; or { or } or ,
        if (
            !trimmed.endsWith(';') &&
            !trimmed.endsWith('{') &&
            !trimmed.endsWith('}') &&
            !trimmed.endsWith(',') &&
            !trimmed.endsWith(':') &&
            !trimmed.includes('if') &&
            !trimmed.includes('else') &&
            !trimmed.includes('for') &&
            !trimmed.includes('while') &&
            !trimmed.includes('#include') &&
            !trimmed.includes('main') // main function signature usually doesn't have ;
        ) {
            // diagnostics.push({
            //   message: "Expected ';' at end of declaration",
            //   line: index + 1,
            //   column: line.length + 1,
            //   severity: 'error'
            // });
            // Commented out because false positives are annoying in regex linting
        }

        // Check for "void main" which is often invalid in standard C/C++ but users use it
        if (trimmed.includes('void main')) {
            diagnostics.push({
                message: "'main' must return 'int'",
                line: index + 1,
                column: line.indexOf('void main') + 1,
                severity: 'warning'
            });
        }
    });

    // Check for includes
    if (!code.includes('#include <stdio.h>') && !code.includes('#include <iostream>') && !code.includes('#include "robot.h"')) {
        diagnostics.push({
            message: "Missing standard library or robot header",
            line: 1,
            column: 1,
            severity: 'warning'
        });
    }

    return diagnostics;
}
