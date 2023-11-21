import React from 'react'
import { useDebounce } from "use-debounce";
import { getRequest } from '../../axios/axiosClient';

function Search() {
  const [inputValue, setInputValue] = React.useState("");
  const [debouncedValue] = useDebounce(inputValue, 1000);

  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  }

  React.useEffect(() => {
    if (debouncedValue !== "") {
      getRequest(`anime?q=${debouncedValue}`)
        .then(({ data }) => {
          console.log(data);
        })
    }
  }, [debouncedValue])

  return (
    <div className='bg-zinc-900 py-[32px] flex justify-center'>
      <input type="text" placeholder='Search...' className='py-1 w-[900px] text-3xl font-semibold bg-transparent border-b-2 transition-colors border-b-zinc-600 focus:border-b-[var(--red)] outline-none' value={inputValue} onChange={handleInputChange} />
    </div>
  )
}

export default Search