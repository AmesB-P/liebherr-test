"use client"
import { options } from "./api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth/next"
import {useRouter} from "next/navigation";
import {login} from "@/server_actions/login";
import {useState} from "react";
import {cookies} from "next/headers";

export default function Home()  {
  // const session = await getServerSession(options)
  // console.log("session" , session)
  const router = useRouter()
  const [username , setUserName] = useState("")
  const [password , setPassword] = useState("")
  const submitLogin = async (event: any)=>{
    event.preventDefault()
    const user = await login({username , password})

    if(user){
      router.push('/Orders')
    }else{
      alert("wrong username or password!!")
    }
  }
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
              className="mx-auto h-10 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Username
              </label>
              <div className="mt-2">
                <input
                    id="username"
                    name="username"
                    type="text"
                    // autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e)=>setUserName(e.target.value)} value={username}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                {/*<div className="text-sm">*/}
                {/*  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">*/}
                {/*    Forgot password?*/}
                {/*  </a>*/}
                {/*</div>*/}
              </div>
              <div className="mt-2">
                <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e)=>setPassword(e.target.value)} value={password}
                />
              </div>
            </div>

            <div>
              <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={submitLogin}
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
