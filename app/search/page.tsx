import React from 'react'
import Header from '@/components/Header'
import SearchInput from '@/components/SearchInput';
import getSongsByTitle from '@/helpers/getSongsByTitle';
import SearchContent from './components/SearchContent';

interface Props{
    searchParams:{
        title:string;
    }
}

export const revalidate=0;

const SearchPage:React.FC<Props>= async ({searchParams}) => {
    const songs=await getSongsByTitle(searchParams.title)
  return (
    <main className='h-full flex flex-col w-full overflow-y-auto pb-5'>
        <Header>
            <h1 className='font-bold text-white text-2xl'>Search song!</h1>
        </Header>
        <div className='px-5 flex-1 flex flex-col pb-5'>
            <SearchInput/>
            <div className='flex-1 pl-2'>
                <SearchContent
                songs={songs}
                />
            </div>
        </div>
    </main>
  )
}

export default SearchPage
