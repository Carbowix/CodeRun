import { getAuthSession } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';

export default async function ResumePage({
  params,
}: {
  params: { snippetId: string };
}) {
  const userSession = await getAuthSession();
  //if (!userSession) return notFound();
  const snippetData = await prisma.snippet.findUnique({
    where: { id: params.snippetId },
    include: {
      user: true,
    },
  });

  if (!snippetData) return notFound();
  if (!snippetData.isPublic && snippetData.userId !== userSession?.user.id)
    return notFound();
  return <h2>Hi, {snippetData.id}</h2>;
}
