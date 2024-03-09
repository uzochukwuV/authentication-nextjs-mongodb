'use client'

import React, { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation';
const contentType = 'application/json';



export const Form = ()=> {
    const router = useRouter()
    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=> {
        e.preventDefault()

        const {value, name} = e.target;

        setUser({...user, [name]: value})


    }
    const postData =async (form: { email: String, password: String})=> {
        try {
            const res = await fetch('/api/auth/login', {
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

        const data = postData(user);
        
       data.then((res)=>{
        console.log(res);
        router.push('/');
        
       }
       )
       
        
        
    }
    return (
        <>
        <form className='max-w-md mx-auto p-8 shadow-sm' onSubmit={handleSubmit}>
        
        <label htmlFor="name">Email</label>
        <input
        className="block border w-full mb-8 p-4 "
          type="email"
          maxLength={30}
          name="email"
          value={user.email}
          onChange={handleChange}
          required
        />

<label htmlFor="name">Password</label>
        <input
        className="block border w-full mb-8 p-4 "
          type="text"
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