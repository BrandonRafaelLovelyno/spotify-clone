import React from 'react'
import Header from '@/components/Header'
import SearchInput from '@/components/SearchInput';
import getSongsByTitle from '@/helpers/getSongsByTitle';
import { title } from 'process';
import SearchContent from './components/SearchContent';

interface Props{
    params:{
        title:string;
    }
}

export const revalidate=0;

const Search:React.FC<Props>= async ({params:{title:string}}) => {
    const songs=await getSongsByTitle(title)
  return (
    <main className='h-full flex flex-col w-full overflow-y-auto pb-'>
        <Header>
            <h1 className='font-bold text-white text-2xl'>Search song!</h1>
        </Header>
        <div className='px-5 flex-1 flex flex-col pb-5'>
            <SearchInput/>
            <div className='flex-1'>
                <SearchContent
                songs={songs}
                />
            </div>
        </div>
    </main>
  )
}

export default Search
