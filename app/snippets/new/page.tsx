import { redirect } from 'next/navigation';
import { db } from '@/db';

export default function SnippetCreatePage() {
  async function createSnippet(formData: FormData) {
    // server action, old way needs to create an api to accept form data
    'use server';

    // fields validation
    const title = formData.get('title') as string;
    const code = formData.get('code') as string;

    // create a new record in database
    const snippet = await db.snippet.create({
      data: {
        title,
        code,
      },
    });
    console.log(snippet);

    // redirect to snippet detail page
    redirect('/');
  }

  return (
    <form action={createSnippet}>
      <h3 className='font-bold m-3'>Create a Snippet</h3>
      <div className='flex flex-col gap-4'>
        <div className='flex gap-4'>
          <label htmlFor='title' className='w-12'>
            Title
          </label>
          <input
            name='title'
            className='border rounded p-2 w-full'
            id='title'
            type='text'
          />
        </div>
        <div className='flex gap-4'>
          <label htmlFor='code' className='w-12'>
            Code
          </label>
          <textarea
            name='code'
            className='border rounded p-2 w-full'
            id='code'
          ></textarea>
        </div>
        <button type='submit' className='rounded p-2 bg-blue-200'>
          Create
        </button>
      </div>
    </form>
  );
}
