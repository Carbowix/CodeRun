'use client';
import { getLanguageById } from '@/lib/util';
import { Snippet } from '@prisma/client';
import SnippetEditor from './snippet-editor';
import { useState } from 'react';
import { PenSquare } from 'lucide-react';
import LoadingDots from '../loading-dots';
import toast from 'react-hot-toast';

interface SnippetWindowProps {
  guestMode: boolean;
  snippetData: Snippet & {
    user: {
      username: string;
    };
  };
}

type consoleMessageType = 'info' | 'error';

export default function SnippetWindow({
  snippetData,
  guestMode,
}: SnippetWindowProps) {
  const [isCompiling, setIsCompiling] = useState(false);
  const [currentOutputType, setCurrentOutputType] =
    useState<consoleMessageType>(
      snippetData.lastOutputType as consoleMessageType
    );
  const [currentOutput, setCurrentOutput] = useState(snippetData.lastOutput);
  const [currentCode, setCurrentCode] = useState(snippetData.code);
  const codeHighlight = getLanguageById(snippetData.codingLanguage)?.value;
  const onCodeChange = (code: string) => {
    setCurrentCode(code);
  };

  const pushMessage = async (type: consoleMessageType, message: string) => {
    const response = await fetch('/api/snippet/editCode', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // snippetCode, snippetId, lastOutput, lastOutputType
      body: JSON.stringify({
        snippetCode: currentCode,
        snippetId: snippetData.id,
        lastOutput: message,
        lastOutputType: type,
      }),
    });
    if (response.status === 200) {
      setCurrentOutput(message);
      setCurrentOutputType(type);
      setIsCompiling(false);
    } else {
      setIsCompiling(false);
      toast.error('Failed to execute code due to server error');
    }

    return;
  };

  const checkStatus = async (token: string) => {
    const statusResponse = await fetch(
      process.env.NEXT_PUBLIC_RAPID_API_URL +
        '/' +
        token +
        '?base64_encoded=true&fields=*',
      {
        method: 'GET',
        headers: {
          'X-RapidAPI-Host': process.env.NEXT_PUBLIC_RAPID_API_HOST as string,
          'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPID_API_KEY as string,
        },
      }
    );

    if (statusResponse.ok) {
      const data = await statusResponse.json();
      const statusId: number = data.status?.id;

      if (statusId === 1 || statusId === 2) {
        // Still processing
        setTimeout(async () => {
          checkStatus(token);
        }, 2000);
        return;
      } else {
        switch (statusId) {
          case 6:
            return pushMessage('error', atob(data.compile_output));
          case 5:
            return pushMessage(
              'error',
              'Execution Time limit exceeded, there might be an infinite loop'
            );
          case 3:
            return pushMessage(
              'info',
              atob(data.stdout) !== null ? `${atob(data.stdout)}` : ''
            );
          default:
            return pushMessage('error', atob(data.stderr));
        }
      }
    }
  };

  const handleCodeCompile = async () => {
    if (!isCompiling) {
      setIsCompiling(true);
      console.log(process.env.NEXT_PUBLIC_RAPID_API_URL);
      const compileResponse = await fetch(
        process.env.NEXT_PUBLIC_RAPID_API_URL + '?base64_encoded=true&fields=*',
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'Content-Type': 'application/json',
            'X-RapidAPI-Host': process.env.NEXT_PUBLIC_RAPID_API_HOST as string,
            'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPID_API_KEY as string,
          },
          body: JSON.stringify({
            language_id: snippetData.codingLanguage,
            source_code: btoa(currentCode),
          }),
        }
      );
      console.log(compileResponse.status);
      if (compileResponse.ok) {
        const data = await compileResponse.json();
        console.log(data);
        if (data.token) {
          checkStatus(data.token);
        } else {
          setIsCompiling(false);
          toast.error('Something went wrong while compiling');
        }
      } else {
        setIsCompiling(false);
        toast.error('Something went wrong while compiling_2');
      }
    }
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
      <div className="flex flex-col gap-y-2 flex-grow bg-slate-700 border border-gray-600 overflow-y-scroll relative">
        {!guestMode && (
          <button
            disabled={isCompiling}
            onClick={handleCodeCompile}
            className={`${
              isCompiling
                ? 'cursor-not-allowed border-gray-200 bg-gray-100'
                : 'border-blue-500 bg-blue-500 text-white hover:bg-white hover:text-black'
            } flex h-10 p-2 my-1 gap-x-1 items-center justify-center space-y-4 rounded-md border text-sm transition-all focus:outline-none absolute bottom-0 right-0`}
          >
            {isCompiling ? (
              <LoadingDots color="#808080" />
            ) : (
              <>Save & Compile</>
            )}
          </button>
        )}

        {currentOutput && (
          <div
            className={`p-2 ${
              currentOutputType == 'info' ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {currentOutputType == 'error' ? '[ERROR]:' : '[OUTPUT]:'}{' '}
            {currentOutput}
          </div>
        )}
      </div>
    </div>
  );
}
