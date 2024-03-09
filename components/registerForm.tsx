'use client'

import React, { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation';
const contentType = 'application/json';


export const Form = ()=> {
    const router = useRouter()
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        image: '',
        age: 5
    })
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=> {
        e.preventDefault()

        const {value, name} = e.target;

        setUser({...user, [name]: value})


    }
    const postData =async (form: {name: String, email: String, password: String})=> {
        try {
            const res = await fetch('/api/auth/register', {
                headers: {
                    Accept: contentType,
                    "Content-Type": contentType,
                  },
                  body: JSON.stringify(form),
                method: 'POST'
            })
            if(!res.ok){
                throw new Error(res.status.toString())
            }
            return await res.json()
        } catch (error) {
            console.log(error);
            
        }
    }
    const handleSubmit = (e: FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        console.log(user);
        
        const data = postData(user);
        
       data.then((res)=>{
        if(res.status === "success"){
            router.push('/auth/login')
        }
       }
       )
       
        
        
    }
    return (
        <>
        <form className='max-w-md mx-auto p-8 shadow-sm' onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
        className="block border w-full mb-8 p-4 "
          type="text"
          maxLength={30}
          name="name"
          value={user.name}
          onChange={handleChange}
          required
        />
        <label htmlFor="email">email</label>
        <input
        className="block border w-full mb-8 p-4 "
          type="email"
          maxLength={30}
          name="email"
          value={user.email}
          onChange={handleChange}
          required
        />
        <label htmlFor="image">Image</label>
        <input
        className="block border w-full mb-8 p-4 "
          type="text"
         
          name="image"
          value={user.image}
          onChange={handleChange}
          required
        />

<label htmlFor="name">Password</label>
        <input
        className="block border w-full mb-8 p-4 "
          type="password"
          maxLength={20}
          name="password"
          value={user.password}
          onChange={handleChange}
          required
        />

        <button type='submit' className='button w-full border hover:outline bg-slate-800 text-white hover:border-white p-4 transition-all duration-50'>Submit</button>

        </form>
        </>
    )
}