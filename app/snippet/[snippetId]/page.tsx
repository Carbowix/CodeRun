import { getAuthSession } from '@/app/api/auth/[...nextauth]/route';
import SnippetToolbar from '@/components/snippet/snippet-toolbar';
import SnippetWindow from '@/components/snippet/snippet-window';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';

export default async function ResumePage({
  params,
}: {
  params: { snippetId: string };
}) {
  const userSession = await getAuthSession();
  const snippetData = await prisma.snippet.findUnique({
    where: { id: params.snippetId },
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
  });

  if (!snippetData) return notFound();
  if (!snippetData.isPublic && snippetData.userId !== userSession?.user.id)
    return notFound();
  const guestMode = snippetData.isPublic && !userSession;

  return (
    <div className="w-screen h-screen bg-[#131112] text-white flex flex-col overflow-y-scroll">
      <SnippetToolbar
        guestMode={guestMode}
        snippetId={snippetData.id}
        snippetTitle={snippetData.title}
        currentLanguageId={snippetData.codingLanguage}
        currentTheme={snippetData.theme}
      />
      <SnippetWindow guestMode={guestMode} snippetData={snippetData} />
    </div>
  );
}
