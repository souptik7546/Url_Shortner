import React, { useEffect, useState } from 'react'
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from './ui/input'
import { Button } from './ui/button'
import { BeatLoader } from "react-spinners";
import { Error } from './Error';
import * as yup from 'yup'
import UseFetch from '../hooks/UseFetch';
import {  signUp } from '../DB/apiAuth';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { UrlState } from '../Context';

export default function Signup() {
    const navigate= useNavigate()
    let [searchParams] =useSearchParams()
    const longLink= searchParams.get('createNew')
    const [formData, setformData] = useState({
      name:"",  
      email:"",
        password:"",
        profilepic: null
    })
    const [errors, seterrors] = useState([])
    const handleInputChannge=(e)=>{
      const {name, value, files}=  e.target;
      setformData((prevState)=>({...prevState, 
        [name]: files? files[0] : value}))
    }

   const {data, loading, error, fn:fnSignup}= UseFetch(signUp,formData)
  const{ fetchUsers}= UrlState()

   useEffect(() => {
    console.log(data);
    
     if(error === null &&data){
        navigate(`/dashboard?${longLink ? `createNew${longLink}`:''}`)
        fetchUsers();
     }
   }, [loading,error])
   

    const handleSignup= async()=>{
        seterrors([]);
        try {
            const schema= yup.object().shape({
              name: yup.string().required("Name is required") ,
                email: yup.string().email('invalid Email').required('Email is required'),
                password: yup.string().min(6,'Password should be of length 6').required('Password is required'),
                profilepic: yup.mixed().required('profile pic is required')
            })
            await schema.validate(formData, {abortEarly:false})
            await fnSignup();

        } catch (e) {
            
            const newErrors={};
            e.inner.forEach((err)=>{
                
                
                newErrors[err.path]= err.message;
            })
            seterrors(newErrors)
        }
    }

    // useEffect(() => {
    //  console.log(errors);
     
    // }, [errors])
    

    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Signup </CardTitle>
                    <CardDescription>Create an account if you haven't already</CardDescription>
                     {error && <Error message={error.message}/>}
                       

                    <CardAction>Card Action</CardAction>
                </CardHeader>
                <CardContent className='space-y-2'>
                  <div className='space-y-1'>
                        <Input name='name' type='text' placeholder='Enter your name' onChange={handleInputChannge}/>
                        {errors.name?  <Error message={errors.name}/>:''}
                       
                    </div>
                    <div className='space-y-1'>
                        <Input name='email' type='email' placeholder='Enter email' onChange={handleInputChannge}/>
                        {errors.email?  <Error message={errors.email}/>:''}
                       
                    </div>
                    <div className='space-y-1'>
                        <Input name='password' type='password' placeholder='Enter password' onChange={handleInputChannge}/>
                        {errors.password?  <Error message={errors.password}/>:''}

                    </div>
                    <div className='space-y-1'>
                        <Input name='profilepic' type='file' accept='image/*' placeholder="choose your file" onChange={handleInputChannge}/>
                        {errors.profilepic ?  <Error message={errors.profilepic}/>:''}
                       
                    </div>
                </CardContent>
                <CardFooter>
                    <Button onClick={handleSignup}>
                     {loading ? <BeatLoader size={10} color='gray'/> : "Create Account"}
                        
                    </Button>
                 </CardFooter>
            </Card>
        </div>
    )
}
