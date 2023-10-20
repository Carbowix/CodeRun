'use client';
import { defineTheme } from '@/lib/util';
import Editor from '@monaco-editor/react';
import { useState } from 'react';
interface SnippetEditorProps {
  theme: string;
  code: string;
  codeHighlight: string;
  guestMode: boolean;
  onCodeChange: (code: string) => void;
}
export default function SnippetEditor({
  theme,
  code,
  codeHighlight,
  onCodeChange,
  guestMode,
}: SnippetEditorProps) {
  if (typeof window !== 'undefined') {
    // Dont ask me why but it works lol...
    defineTheme(theme);
  }
  const [currentCode, setCurrentCode] = useState(code);
  const handleEditorChange = (value: string | undefined) => {
    setCurrentCode(value as string);
    onCodeChange(currentCode);
  };
  return (
    <div className="w-full h-[80%]">
      <Editor
        width={`100%`}
        height={'100%'}
        language={codeHighlight}
        theme={theme}
        value={currentCode}
        onChange={handleEditorChange}
        options={{
          readOnly: guestMode,
          hideCursorInOverviewRuler: guestMode,
          overviewRulerBorder: false,
        }}
      />
    </div>
  );
}
