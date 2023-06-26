'use client'
import axios, { AxiosError} from "axios"
import { FormEvent, useState } from "react"
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";


export default function RegisterPage(){


  const [ error, setError ] = useState();
  const router = useRouter()


  const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
     
    const formData = new FormData(e.currentTarget);//extraer los props de los inputs
    //const email = formData.get('email')
    //const password = formData.get('password')
   // const fullname = formData.get('fullname')
   try {
    const signupResponse = await axios.post('api/auth/signup',{
      email: formData.get('email'),
      password: formData.get('password'),
      fullname: formData.get('email')
    });
      console.log(signupResponse);

    const res = await signIn('credentials',{
      email: signupResponse.data.email,
      password:formData.get('password'),
      redirect: false,
    })

    if (res?.ok) return router.push('/dashboard');

    console.log(res)
    
   } catch (error) {
    console.log(error)
    if (error instanceof AxiosError){
      setError(error.response?.data.message)
    }
   } 
   
  };
  return(
    <div className=" justify-center h-[calc(100vh-4rem)] flex items-center">
    <form onSubmit={handleSubmit}>
      {error && <div className="bg-red-500 text-white p-2 mb-2">{error}</div>}
      <h1 className="text-4xl font-bold mb-3" >Signup</h1>
      <input 
      type="text" 
      placeholder="your name" 
      name="fullname" 
      className="bg-zinc-800 text-white px-4 py-2 block mb-2"/>
      <input type="email" 
      placeholder="email" 
      name="email" 
      className="bg-zinc-800 text-white px-4 py-2 block mb-2"/>
      <input 
      type="password" 
      placeholder="********" 
      name="password" 
      className="bg-zinc-800 text-white px-4 py-2 block mb-2"/>
      <button className="bg-red-300 px-4 py-2">
        Register
      </button>
    </form>
    </div>
  )
}