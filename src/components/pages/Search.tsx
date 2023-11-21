import React from 'react'
import { useDebounce } from "use-debounce";

function Search() {
  const [inputValue, setInputValue] = React.useState("");
  const [debouncedValue] = useDebounce(inputValue, 500);

  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  }

  return (
    <>
      <div className='bg-zinc-900 py-[32px] flex justify-center'>
        <input type="text" placeholder='Search...' className='py-1 w-[900px] text-3xl font-semibold bg-transparent border-b-2 transition-colors border-b-zinc-600 focus:border-b-[var(--red)] outline-none' value={inputValue} onChange={handleInputChange} />
      </div>
    </>
  )
}

export default Search