import prisma from '@/lib/prisma';
import { z } from 'zod';
import { getAuthSession } from '../../auth/[...nextauth]/route';
import { getLanguageById, helloWorldPrograms } from '@/lib/util';

export async function POST(req: Request) {
  try {
    const userSession = await getAuthSession();
    if (!userSession)
      return Response.json({ message: 'Unauthorized access' }, { status: 401 });
    const body = await req.json();
    const { snippetTitle, isPublic, codeLanguage } = z
      .object({
        snippetTitle: z.string(),
        codeLanguage: z.number(),
        isPublic: z.boolean(),
      })
      .parse(body);
    const user = await prisma.user.findFirst({
      where: {
        id: userSession.user.id,
      },
    });

    if (user) {
      const helloWorldProgram =
        helloWorldPrograms[getLanguageById(codeLanguage)?.value as string];
      console.log(helloWorldProgram);
      const newSnippet = await prisma.snippet.create({
        data: {
          title: snippetTitle,
          isPublic: isPublic,
          codingLanguage: codeLanguage,
          code: helloWorldProgram,
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
