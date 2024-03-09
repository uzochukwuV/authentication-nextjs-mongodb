'use client'
import React, { Key, useEffect, useMemo, useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';

interface User {
    name: String;
    email: String;
    _id: String;
    image?: String;
    isAdmin: boolean
    likes?: String[];
    age?: number;
}

async function getUser(params:String) {
    const res = await fetch('/api/user', {
        method: 'POST',
        body: JSON.stringify({params}),
    })

    if(!res.ok){
        throw new Error('not found');
    }

    return res.json()
    
}

export default function userDetails({id}:{ id: string; }) {

   
    const [user, setUser] = useState<User>()

   
    

    const getData = async ()=> {
        const data = await getUser(id);
        console.log(data);
        
        setUser(data.data)
    }

    useEffect(() => {
        console.log(user);
        
    
      return () => {
        getData();
      }
    }, [])
    

  return (
    <div className='w-full '>
        <div>
            <Image src={`${user?.image || ""}`} alt='image' width={700} height={500} ></Image>
        </div>

        <div className='p-4'>
            <h1 className='text-5xl font-bold '>{user?.name} </h1>
            <p>{user?.email} </p>
        </div>
    </div>
  )
}
