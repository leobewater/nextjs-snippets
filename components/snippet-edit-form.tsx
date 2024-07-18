'use client';

import Editor from '@monaco-editor/react';
import type { Snippet } from '@prisma/client';
import { startTransition, useState } from 'react';
import * as actions from '@/actions';

interface SnippetEditFormProps {
  snippet: Snippet;
}

const SnippetEditForm = ({ snippet }: SnippetEditFormProps) => {
  const [code, setCode] = useState(snippet.code);

  function handleEditorChange(value: string = '') {
    // console.log('here is the new value:', value);
    setCode(value);
  }

  // bind() make a preloaded version with assigned arguments
  const editSnippetAction = actions.editSnippet.bind(null, snippet.id, code);

  return (
    <div>
      <Editor
        height='90vh'
        theme='vs-dark'
        defaultLanguage='javascript'
        defaultValue={code}
        options={{ minimap: { enabled: false } }}
        onChange={handleEditorChange}
      />
      <form action={editSnippetAction}>
        <button type='submit' className='p-2 border rounded'>
          Save
        </button>
      </form>
    </div>
  );
};

export default SnippetEditForm;
