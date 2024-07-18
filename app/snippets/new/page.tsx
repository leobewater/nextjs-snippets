'use client';

import { useFormState } from 'react-dom';
import * as actions from '@/actions';

export default function SnippetCreatePage() {
  // set up useFormState for fields validation, it's good for non-js too
  const [formState, action] = useFormState(actions.createSnippet, {
    message: '',
  });

  return (
    <form action={action}>
      <h3 className='font-bold my-3'>Create a Snippet</h3>
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

        {formState.message && <div className='my-2 p-2 bg-red-200 border rounded border-red-400'>{formState.message}</div>}

        <button type='submit' className='rounded p-2 bg-blue-200'>
          Create
        </button>
      </div>
    </form>
  );
}
