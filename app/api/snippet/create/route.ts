import prisma from '@/lib/prisma';
import { z } from 'zod';
import { getAuthSession } from '../../auth/[...nextauth]/route';

export async function POST(req: Request) {
  try {
    const userSession = await getAuthSession();
    if (!userSession)
      return Response.json({ message: 'Unauthorized access' }, { status: 401 });
    const body = await req.json();
    const { snippetTitle, isPublic, codeLanguage } = z
      .object({
        snippetTitle: z.string(),
        codeLanguage: z.string(),
        isPublic: z.boolean(),
      })
      .parse(body);
    const user = await prisma.user.findFirst({
      where: {
        id: userSession.user.id,
      },
    });

    if (user) {
      const newSnippet = await prisma.snippet.create({
        data: {
          title: snippetTitle,
          isPublic: isPublic,
          codeType: codeLanguage,
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      });

      if (newSnippet) {
        return Response.json(
          { message: 'Successfuly Created', snippetId: newSnippet.id },
          { status: 200 }
        );
      }
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
