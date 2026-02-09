"use client"

import React, { useEffect } from "react"
import Editor, { loader, OnMount } from "@monaco-editor/react"

interface CodeEditorProps {
    code: string
    onChange: (value: string) => void
    readOnly?: boolean
}

export const CodeEditor = ({ code, onChange, readOnly = false }: CodeEditorProps) => {

    const handleEditorDidMount: OnMount = (editor, monaco) => {
        // Define custom theme
        monaco.editor.defineTheme('cred-dark', {
            base: 'vs-dark',
            inherit: true,
            rules: [
                { token: 'keyword', foreground: 'FF6B9D', fontStyle: 'bold' },
                { token: 'type', foreground: '00D9A3' },
                { token: 'number', foreground: 'FFA500' },
                { token: 'comment', foreground: '666666', fontStyle: 'italic' },
                { token: 'string', foreground: 'FFD700' },
                { token: 'operator', foreground: '8B5CF6' },
            ],
            colors: {
                'editor.background': '#1a1a1a',
                'editor.lineHighlightBackground': '#2a2a2a',
                'editorLineNumber.foreground': '#444444',
                'editorLineNumber.activeForeground': '#00D9A3',
            }
        })

        // Additional Verilog language configuration if needed
        // Monaco already has basic Verilog support, but we can enhance it
    }

    return (
        <div className="rounded-xl overflow-hidden border border-white/10 shadow-lg">
            <Editor
                height="300px"
                language="verilog"
                value={code}
                theme="cred-dark"
                onChange={(value) => onChange(value || "")}
                onMount={handleEditorDidMount}
                options={{
                    readOnly,
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: 'on',
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    padding: { top: 16, bottom: 16 },
                    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                }}
            />
        </div>
    )
}
