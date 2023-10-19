'use client';
import { FormEvent, useState } from 'react';
import LoadingDots from '../loading-dots';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function NewSnippet() {
  const [loading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleNewResumeRequest = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const response = await fetch('/api/snippet/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        snippetTitle: event.currentTarget.snippetTitle.value,
        codeLanguage: event.currentTarget.codeLanguage.value,
        isPublic: event.currentTarget.publicToggle.checked,
      }),
    });

    if (response.status === 200) {
      const { message, resumeId } = await response.json();
      toast.success(message);
      router.push('/snippet/' + resumeId);
    } else {
      toast.error('Error has occured, try again later!');
      setIsLoading(false);
    }
  };
  return (
    <div className="w-full md:w-[60%] lg:w-[30%] p-4 flex flex-col gap-y-4 bg-[#60656f] shadow rounded">
      <h2 className="text-xl">Create A New Code Snippet</h2>
      <hr className="style-six" />
      <form
        onSubmit={handleNewResumeRequest}
        className="flex flex-col space-y-4 px-4 py-8 sm:px-16"
      >
        <div>
          <label htmlFor="snippetTitle" className="block text-xs uppercase">
            Title
          </label>
          <input
            id="snippetTitle"
            name="snippetTitle"
            type="text"
            placeholder="Javascript Snippet"
            required
            className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-black placeholder-gray-400 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-black sm:text-sm"
          />
        </div>
        <div>
          <button
            id="dropdownDefaultButton"
            data-dropdown-toggle="dropdown"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
          >
            Select a lanaguage
            <svg
              className="w-2.5 h-2.5 ml-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>

          <div
            id="dropdown"
            className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
          >
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownDefaultButton"
            >
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Settings
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Earnings
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Sign out
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              id="publicToggle"
              name="publicToggle"
              type="checkbox"
              value=""
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm font-medium ">Public</span>
          </label>
        </div>
        <button
          disabled={loading}
          className={`${
            loading
              ? 'cursor-not-allowed border-gray-200 bg-gray-100'
              : 'border-blue-500 bg-blue-500 text-white hover:bg-white hover:text-black'
          } flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none`}
        >
          {loading ? <LoadingDots color="#808080" /> : <p>Create</p>}
        </button>
      </form>
    </div>
  );
}
