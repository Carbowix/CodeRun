'use client';
import { getLanguageById } from '@/lib/util';
import { Snippet } from '@prisma/client';
import SnippetEditor from './snippet-editor';
import { useState } from 'react';

interface SnippetWindowProps {
  guestMode: boolean;
  snippetData: Snippet & {
    user: {
      username: string;
    };
  };
}
export default function SnippetWindow({
  snippetData,
  guestMode,
}: SnippetWindowProps) {
  const [currentCode, setCurrentCode] = useState(snippetData.code);
  const codeHighlight = getLanguageById(snippetData.codingLanguage)?.value;
  const onCodeChange = (code: string) => {
    setCurrentCode(code);
  };
  return (
    <div className="w-full h-full flex flex-col">
      <SnippetEditor
        guestMode={guestMode}
        onCodeChange={onCodeChange}
        code={currentCode}
        codeHighlight={codeHighlight!}
        theme={snippetData.theme}
      />
    </div>
  );
}
