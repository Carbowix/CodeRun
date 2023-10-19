import { z } from 'zod';
import { getAuthSession } from '../../auth/[...nextauth]/route';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const userSession = await getAuthSession();
    if (!userSession)
      return Response.json({ message: 'Unauthorized access' }, { status: 401 });
    const body = await req.json();
    const { snippetId } = z.object({ snippetId: z.string() }).parse(body);

    const snippet = await prisma.snippet.findFirst({
      where: {
        AND: [{ id: snippetId }, { userId: userSession.user.id }],
      },
    });

    if (!snippet)
      return Response.json({ message: 'SnippetId invalid' }, { status: 404 });

    await prisma.snippet.delete({
      where: {
        id: snippetId,
      },
    });

    return Response.json({ message: 'Snippet deleted' }, { status: 200 });
  } catch (e) {
    console.log(e);
    if (e instanceof z.ZodError) {
      return Response.json(
        { message: 'Invalid request payload' },
        { status: 422 }
      );
    }

    return Response.json({ message: 'Invalid request' }, { status: 400 });
  }
}
