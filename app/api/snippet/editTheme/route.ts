import { z } from 'zod';
import { getAuthSession } from '../../auth/[...nextauth]/route';
import prisma from '@/lib/prisma';
export async function POST(req: Request) {
  try {
    const userSession = await getAuthSession();
    if (!userSession)
      return Response.json({ message: 'Unauthorized access' }, { status: 401 });
    const body = await req.json();
    const { theme, snippetId } = z
      .object({ theme: z.string(), snippetId: z.string() })
      .parse(body);
    const snippet = await prisma.snippet.findUnique({
      where: {
        id: snippetId,
      },
      include: {
        user: {
          select: {
            id: true,
          },
        },
      },
    });

    if (snippet) {
      if (snippet.userId !== userSession.user.id)
        return Response.json(
          { message: 'Unauthorized access' },
          { status: 401 }
        );
      await prisma.snippet.update({
        where: { id: snippetId },
        data: {
          theme: theme,
        },
      });
      return Response.json(
        { message: 'Successfuly updated theme to ' + theme },
        { status: 200 }
      );
    }
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
