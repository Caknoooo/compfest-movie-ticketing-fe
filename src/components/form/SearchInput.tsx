import * as React from 'react';
import { FiSearch, FiXCircle } from 'react-icons/fi';

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
};

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  onClear,
}) => {
  return (
    <div className='relative mt-1 self-start'>
      <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
        <FiSearch className='text-lg text-base-gray' />
      </div>
      <input
        type='text'
        onChange={(e) => onChange(e.target.value)}
        value={value}
        className='flex w-full rounded-lg shadow-sm text-[15px] min-h-[2.25rem] py-0 px-9 md:min-h-[2.5rem] border-gray-300 focus:border-base-yellow focus:ring-base-yellow focus:outline-none'
        placeholder='Search...'
      />
      <div className='absolute inset-y-0 right-0 flex items-center pr-2'>
        <button type='button' className='p-1' onClick={onClear}>
          <FiXCircle className='text-xl text-base-gray' />
        </button>
      </div>
    </div>
  );
};

export default SearchInput;
