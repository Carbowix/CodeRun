import { z } from 'zod';
import { getAuthSession } from '../../auth/[...nextauth]/route';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const userSession = await getAuthSession();
    if (!userSession)
      return Response.json({ message: 'Unauthorized access' }, { status: 401 });
    const body = await req.json();
    const { codingLanguage, snippetId } = z
      .object({ codingLanguage: z.number(), snippetId: z.string() })
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
          codingLanguage: codingLanguage,
          code: '',
        },
      });
      return Response.json(
        { message: 'Successfuly updated coding language' },
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
