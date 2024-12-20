import React, { useState } from 'react'
import LoginIcon from "../assest/signin.gif"
import { FaEye } from "react-icons/fa"; 
import { FaEyeSlash } from "react-icons/fa"; 
import { Link, useNavigate } from 'react-router-dom';
import summaryApi from '../common';
import { toast } from 'react-toastify';

const Login = () => { 

    const[showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()


    const[data, setData] = useState({
        email:"",
        password:""
    })

   const handleOnChange = (e) => {
    const {name, value} = e.target

    setData((prev) => {
        return {
            ...prev,
            [name]:value
        }
    })
   }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const dataResponse = await fetch(summaryApi.singIn.url, {
            method: summaryApi.singIn.method,
            credentials:'include',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })

        const dataApi = await dataResponse.json()
        if (dataApi.success) {
            toast.success(dataApi.message) 
            navigate('/')
        }
        if (dataApi.error) {
            toast.error(dataApi.message)
        }
    }

  return (
   <section id='login'> 
   <div className='mx-auto container p-4'>
    <div className='bg-white p-5 w-full max-w-sm mx-auto rounded-sm'>
            <div className='w-20 h-20 mx-auto rounded-full overflow-hidden'>
                <img src={LoginIcon} alt='Login-Icon' /> 
            </div> 

            <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}> 
                <div className='grid'>
                    <label>
                        Email :
                    </label>  
                    <div className='bg-slate-100 p-2'>
                    <input name='email' onChange={handleOnChange} value={data.email} type='email' placeholder='enter email' className='w-full h-full outline-none bg-transparent'/> 
                    </div>
                </div> 
                <div>
                    <label>
                        Password :
                    </label>  
                    <div className='bg-slate-100 p-2 flex'>
                    <input name='password' onChange={handleOnChange} value={data.password} type={showPassword?"text":"password"} placeholder='enter password' className='w-full h-full outline-none bg-transparent'/>  
                    <div className='cursor-pointer text-xl' onClick={() => setShowPassword((prev) => !prev)}>
                        <span> 
                            {
                                showPassword?(<FaEyeSlash/>):(<FaEye/>)
                            }

                        </span>
                    </div> 
                   
                    </div> 
                    <Link to={"/forgot-password"} className='w-fit block ml-auto hover:underline hover:text-red-600'>
                    Forgot Password ?
                    </Link>
                </div> 
                <button className='bg-red-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6 hover:bg-red-700'>Login</button>
            </form>
              <p className='my-5'>Don't have account ? <Link to={"/sign-up"} className='text-red-600 hover:underline hover:text-red-700'>Sign up</Link> </p>                  

    </div>
   </div>
    </section>
  )
}

export default Login
