'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { db } from '@/db';

export async function editSnippet(id: number, code: string) {
  // console.log(id, code);
  await db.snippet.update({
    where: { id },
    data: { code },
  });

  // On-Demand caching - dump cached data for particular path such as homepage
  revalidatePath(`/snippets/${id}`);

  redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id: number) {
  await db.snippet.delete({
    where: { id },
  });

  // On-Demand caching - dump cached data for particular path such as homepage
  revalidatePath('/');

  redirect('/');
}

// using formState, also good for non-js
export async function createSnippet(
  formState: { message: string },
  formData: FormData
) {
  try {
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

    const snippet = await db.snippet.create({
      data: {
        title,
        code,
      },
    });

    // console.log(snippet);
    // throw new Error('Failed to save to database.');
  } catch (err: unknown) {
    // return form action objects with message instead of throwing error here
    if (err instanceof Error) {
      return {
        message: err.message,
      };
    } else {
      return {
        message: 'Something went wrong...',
      };
    }
  }

  // On-Demand caching - dump cached data for particular path such as homepage
  revalidatePath('/');

  // redirect to snippet detail page, redirect must be outside of try catch
  redirect('/');
}
