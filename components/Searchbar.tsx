'use client'

import React, { useEffect, useState } from 'react'
import { Input } from './ui/input'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import {useDebounce} from '@/lib/useDebounce'
import {topics} from '@/constants'


const Searchbar = () => {
  const [search, setSearch] = useState('');
  const router = useRouter(); 
  const pathname = usePathname();

  const debouncedValue = useDebounce(search, 500);

  useEffect(() => {
    if(debouncedValue) {
      router.push(`/discover?search=${debouncedValue}`)
    } else if (!debouncedValue && pathname === '/discover') router.push('/discover')
  }, [router, pathname, debouncedValue])

  return (
    <div>
      <div className="relative mt-8 block">
        <Input 
          className="input-class py-6 pl-12 focus-visible:ring-offset-orange-1"
          placeholder='Search for podcasts'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onLoad={() => setSearch('')}
          />
        <Image 
          src="/icons/search.svg"
          alt="search"
          height={20}
          width={20}
          className="absolute left-4 top-3.5"
          />
      </div>

      <div className='topics p-4'>
        {topics.map(({name, id}) => (
          <button key={id} 
          className='text-white-1 p-2 px-3 m-2 
            hover:border-orange-1 border-2 border-gray-400 rounded-lg'
          onClick={()=> setSearch(name)}
          >{name}</button>
        ))}
      </div>

    </div>
  )
}

export default Searchbar