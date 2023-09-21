import Header from '@/components/Header'
import ListItem from '@/components/ListItem'


export default function Home() {
  return(
    <main>
    <Header>
      <p className='text-xl font-bold mt-5'>Welcome Back!</p>
      <div className='grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4'>
      <ListItem href='/playlist/liked' image='/images/liked.png' text='Liked Song' key={`liked song button`}/>
      </div>
    </Header>
    <div className='mt-3 px-5'>
      <p className='font-semibold text-white text-2xl'>Newest songs</p>
      <p className='font-semibold text-neutral-400 text-md'>List of the song</p>
    </div>
    </main>
  )
}
