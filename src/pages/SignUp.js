import React, { useState } from 'react'
import LoginIcon from "../assest/signin.gif"
import { FaAws, FaEye } from "react-icons/fa"; 
import { FaEyeSlash } from "react-icons/fa"; 
import { json, Link, useNavigate } from 'react-router-dom';
import imageToBaseString from '../helpers/imageToBaseString.js';
import summaryApi from '../common/index.js';
import { toast } from 'react-toastify';

const SignUp = () => { 
    
    const[showPassword, setShowPassword] = useState(false)
    const[showConfirmPassword, setShowConfirmPassword] = useState(false)

    const[data, setData] = useState({
        email:"",
        password:"",
        name:"",
        confirmPassword:"",
        profilePic:""
    })

    const navigate = useNavigate()

   const handleOnChange = (e) => {
    const {name, value} = e.target

    setData((prev) => {
        return {
            ...prev,
            [name]:value
        }
    })
   }

   const handleImageUpload = async (e) => {
    const file = e.target.files[0] 
    const imageUpload = await imageToBaseString(file)
    setData((prev) => {
        return {
            ...prev,
            profilePic:imageUpload
        }
    })
   }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (data.password === data.confirmPassword) {
            const dataResponse = await fetch(summaryApi.singup.url, {
                method: summaryApi.singup.method,
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(data)
            })

            const dataAPI = await dataResponse.json(); 
            if(dataAPI.success){
                toast.success(dataAPI.message) 
                navigate("/login")
            }
            else 
            {
                toast.error(dataAPI.message)
            }
          
        } else {
            toast.error("Please check password and confirm password!")
        }
    }
  return (
    <section id='singup'> 
    <div className='mx-auto container p-4'>
     <div className='bg-white p-5 w-full max-w-sm mx-auto rounded-sm'>
             <div className='w-20 h-20 mx-auto relative rounded-full overflow-hidden'> 
                <div>
                <img src={data.profilePic || LoginIcon} alt='Login-Icon' /> 
                </div> 
                <form> 
                    <label> 
                    <div className='text-xs bg-opacity-75 cursor-pointer bg-slate-200 text-center pt-2 pb-4 absolute w-full bottom-0'>
                             Upload Photo
                         </div>
                    <input type='file' className='hidden' onChange={handleImageUpload}/> 
                    </label>
                </form>
               
             </div> 
 
             <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>  

             <div className='grid'>
                     <label>
                         Name :
                     </label>  
                     <div className='bg-slate-100 p-2'>
                     <input required name='name' onChange={handleOnChange} value={data.name} type='text' placeholder='enter your name' className='w-full h-full outline-none bg-transparent'/> 
                     </div>
                 </div> 

                 <div className='grid'>
                     <label>
                         Email :
                     </label>  
                     <div className='bg-slate-100 p-2'>
                     <input required name='email' onChange={handleOnChange} value={data.email} type='email' placeholder='enter email' className='w-full h-full outline-none bg-transparent'/> 
                     </div>
                 </div> 
                 <div>
                     <label>
                         Password :
                     </label>  
                     <div className='bg-slate-100 p-2 flex'>
                     <input required name='password' onChange={handleOnChange} value={data.password} type={showPassword?"text":"password"} placeholder='enter password' className='w-full h-full outline-none bg-transparent'/>  
                     <div className='cursor-pointer text-xl' onClick={() => setShowPassword((prev) => !prev)}>
                         <span> 
                             {
                                 showPassword?(<FaEyeSlash/>):(<FaEye/>)
                             }
 
                         </span>
                     </div> 
                    
                     </div> 
                    
                 </div> 
                 <div>
                     <label>
                        Confirm Password :
                     </label>  
                     <div className='bg-slate-100 p-2 flex'>
                     <input required name='confirmPassword' onChange={handleOnChange} value={data.confirmPassword} type={showConfirmPassword?"text":"password"} placeholder='enter confirm password' className='w-full h-full outline-none bg-transparent'/>  
                     <div className='cursor-pointer text-xl' onClick={() => setShowConfirmPassword((prev) => !prev)}>
                         <span> 
                             {
                                 showConfirmPassword?(<FaEyeSlash/>):(<FaEye/>)
                             }
 
                         </span>
                     </div> 
                    
                     </div> 
                    
                 </div> 
                 <button className='bg-red-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6 hover:bg-red-700'>Sign Up</button>
             </form>
               <p className='my-5'>Already have account ? <Link to={"/login"} className='text-red-600 hover:underline hover:text-red-700'>Login</Link> </p>                  
 
     </div>
    </div>
     </section>
  )
}

export default SignUp
