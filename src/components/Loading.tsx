import * as React from 'react';
import { ImSpinner8 } from 'react-icons/im';

export default function Loading() {
  return (
    <div className='min-h-screen grid place-items-center bg-base-dark text-base-subtle'>
      <ImSpinner8 className='mb-4 animate-spin text-4xl' />
    </div>
  );
}
