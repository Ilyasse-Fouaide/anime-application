import React from 'react'
import { useDebounce } from "use-debounce";
import { getRequest } from '../../axios/axiosClient';
import axios from 'axios';

function Search() {
  const [inputValue, setInputValue] = React.useState("");
  const [debouncedValue] = useDebounce(inputValue, 1000);

  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  }

  React.useEffect(() => {
    if (debouncedValue !== "") {
      let cancelToken;
      cancelToken = axios.CancelToken.source();
      getRequest(`anime?q=${debouncedValue}`, cancelToken.token)
        .then(({ data }) => {
          console.log(data);
        })
    }
  }, [debouncedValue])

  return (
    <>
      <div className='bg-zinc-900 px-6 py-5 md:py-7 lg:py-[32px] flex justify-center'>
        <div className='w-[900px]'>
          <input type="text" placeholder='Search...' className='py-1 w-full text-xl md:text-2xl lg:text-3xl font-semibold bg-transparent border-b-2 transition-colors border-b-zinc-600 focus:border-b-[var(--red)] outline-none' value={inputValue} onChange={handleInputChange} />
        </div>
      </div>
    </>
  )
}

export default Search