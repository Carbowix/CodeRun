'use client';
import { ArrowLeft, Home, PenSquare, X } from 'lucide-react';
import SnippetChangeTitle from './snippet-change-title';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  allLanguages,
  type selectValueProp,
  getLanguageById,
  monacoThemes,
  defineTheme,
} from '@/lib/util';
import Select from 'react-tailwindcss-select';
import LoadingDots from '../loading-dots';
import toast from 'react-hot-toast';

interface SnippetToolbarProps {
  guestMode: boolean;
  snippetTitle: string;
  snippetId: string;
  currentLanguageId: number;
  currentTheme: string;
}
export default function SnippetToolbar({
  guestMode,
  snippetTitle,
  snippetId,
  currentLanguageId,
  currentTheme,
}: SnippetToolbarProps) {
  const [showPanel, setShowPanel] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [theme, setTheme] = useState<selectValueProp>({
    id: 0,
    value: currentTheme,
    label: monacoThemes[currentTheme],
  });
  const [languageToChange, setLanguageToChange] = useState<selectValueProp>();
  const [currentLanguage, setCurrentLanguage] =
    useState<selectValueProp | null>(getLanguageById(currentLanguageId));
  const router = useRouter();
  const handleLanguageSelect = (value: any) => {
    if (!isSaving || !showPanel) {
      setLanguageToChange(value as selectValueProp);
      setShowPanel(true);
    }
  };

  const handleThemeChange = async (selectValue: any) => {
    if (!isSaving || showPanel) {
      setIsSaving(true);
      const response = await fetch('/api/snippet/editTheme', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          theme: (selectValue as selectValueProp).value,
          snippetId: snippetId,
        }),
      });
      if (response.status === 200) {
        const { message } = await response.json();
        toast.success(message);
        await defineTheme((selectValue as selectValueProp).value);
        setTheme(selectValue as selectValueProp);
        setIsSaving(false);
        router.refresh();
      } else {
        toast.error('Error has occured, try again later!');
        setIsSaving(false);
      }
    }
  };

  const handleChangeLanguage = async () => {
    if (!isSaving && languageToChange) {
      setIsSaving(true);
      const response = await fetch('/api/snippet/editLanguage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          snippetId: snippetId,
          codingLanguage: languageToChange.id,
        }),
      });

      if (response.status === 200) {
        const { message } = await response.json();
        toast.success(message);
        setCurrentLanguage(languageToChange);
        setIsSaving(false);
        setShowPanel(false);
        router.refresh();
      } else {
        toast.error('Error has occured, try again later!');
        setIsSaving(false);
      }
    }
  };
  return (
    <>
      <div className="w-full h-24 flex p-2 border-b-2 border-slate-400 justify-between items-center ">
        <div className="flex gap-x-2">
          <button
            disabled={isSaving || showPanel}
            onClick={() => router.push(guestMode ? '/' : '/dashboard')}
            className="w-12 h-12 rounded p-2 hover:bg-[#F7F7FF] hover:text-[#279AF1] transition-all duration-300 ease-in-out flex items-center justify-center relative"
          >
            {guestMode ? <Home /> : <ArrowLeft />}
          </button>
          <SnippetChangeTitle
            guestMode={guestMode}
            title={snippetTitle}
            snippetId={snippetId}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-2 w-1/3">
          <Select
            options={allLanguages}
            onChange={handleLanguageSelect}
            value={currentLanguage}
            placeholder="Select a language"
            primaryColor="blue"
            isDisabled={isSaving || showPanel || guestMode}
            isSearchable
          />
          <Select
            options={Object.entries(monacoThemes).map(
              ([themeId, themeName]) => ({
                label: themeName,
                value: themeId,
                key: themeId,
              })
            )}
            onChange={handleThemeChange}
            value={theme}
            placeholder="Select a theme"
            primaryColor="blue"
            isDisabled={isSaving || showPanel || guestMode}
            isSearchable
          />
        </div>
      </div>
      <div
        className={`${
          showPanel ? 'flex' : 'hidden'
        } absolute z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full md:w-[60%] lg:w-[40%] gap-y-4 p-4 flex-col items-center bg-[#60656f] shadow rounded`}
      >
        <div className="w-full flex justify-between items-start">
          <div className="flex flex-col gap-y-1">
            <h2 className="text-xl font-semibold">
              Are you sure you want to switch to a different language?
            </h2>
            <p className="text-md">
              Please note that this action will result in the removal of your
              current code
            </p>
          </div>
          <button
            onClick={() => setShowPanel(false)}
            className="hover:text-red-500 ease-in-out transition-all duration-200"
          >
            <X />
          </button>
        </div>
        <button
          disabled={isSaving}
          onClick={handleChangeLanguage}
          className={`${
            isSaving
              ? 'cursor-not-allowed border-gray-200 bg-gray-100'
              : 'border-blue-500 bg-blue-500 text-white hover:bg-white hover:text-black'
          } flex h-10 w-1/2 gap-x-1 items-center justify-center space-y-4 rounded-md border text-sm transition-all focus:outline-none`}
        >
          {isSaving ? (
            <LoadingDots color="#808080" />
          ) : (
            <>
              <PenSquare />
              Change
            </>
          )}
        </button>
      </div>
    </>
  );
}
