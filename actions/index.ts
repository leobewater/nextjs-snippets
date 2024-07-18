'use server';

import { redirect } from 'next/navigation';
import { db } from '@/db';

export async function editSnippet(id: number, code: string) {
  // console.log(id, code);
  await db.snippet.update({
    where: { id },
    data: { code },
  });

  redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id: number) {
  await db.snippet.delete({
    where: { id },
  });

  redirect('/');
}

// using formState, also good for non-js
export async function createSnippet(
  formState: { message: string },
  formData: FormData
) {
  const title = formData.get('title');
  const code = formData.get('code');

  // field validation
  if (typeof title !== 'string' || title.length < 3) {
    return {
      message: 'Title must be longer',
    };
  }

  if (typeof code !== 'string' || code.length < 10) {
    return {
      message: 'Code must be longer',
    };
  }

  // create a new record in database
  const snippet = await db.snippet.create({
    data: {
      title,
      code,
    },
  });
  // console.log(snippet);

  // redirect to snippet detail page
  redirect('/');
}
