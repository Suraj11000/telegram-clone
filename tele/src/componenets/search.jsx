import React, { useState, useRef } from 'react';
import { IoMdClose } from 'react-icons/io';
import Chats from './chats';

const Search = () => {
  const [searchText, setSearchText] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  const handleClearSearch = () => {
    setSearchText('');
    if (inputRef.current) {
      inputRef.current.blur();
    }
    setIsFocused(false);
  };

  return (
    <div className='bg-[#17212b]'>
      <div className=' px-4 py-2 sticky top-0 z-10 bg-[#17212b] '>
        <input
          ref={inputRef}
          type="text"
          placeholder='Search'
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className='bg-[#242f3d] rounded-full min-w-[14.2rem] w-[100%] py-[0.5rem] pl-4 pr-8 outline-none focus:ring-0 placeholder-opacity-50 placeholder-xs text-white caret-white'
          style={{ fontFamily: 'Roboto, sans-serif' }}
        />
        {(isFocused || searchText) && (
          <IoMdClose
            size={20}
            color="#768c9e"
            className="cursor-pointer absolute top-1/2 right-3 transform -translate-y-1/2"
            onMouseDown={(e) => e.preventDefault()}
            onClick={handleClearSearch}
          />
        )}
      </div>
      <Chats/>
    </div>
  );
}

export default Search;
