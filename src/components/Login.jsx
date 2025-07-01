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
import { login } from '../DB/apiAuth';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { UrlState } from '../Context';

export default function Login() {
    const navigate= useNavigate()
    let [searchParams] =useSearchParams()
    const longLink= searchParams.get('createNew')
    const [formData, setformData] = useState({email:"",
        password:""
    })
    const [errors, seterrors] = useState([])
    const handleInputChannge=(e)=>{
      const {name, value}=  e.target;
      setformData((prevState)=>({...prevState, [name]:value}))
    }

   const {data, loading, error, fn:fnLogin}= UseFetch(login,formData)
  const{ fetchUsers}= UrlState()

   useEffect(() => {
    console.log(data);
    
     if(error === null &&data){
        navigate(`/dashboard?${longLink ? `createNew=${longLink}`:''}`)
        fetchUsers();
     }
   }, [data,error])
   

    const handleLogin= async()=>{
        seterrors([]);
        try {
            const schema= yup.object().shape({
                email: yup.string().email('invalid Email').required('Email is required'),
                password: yup.string().min(6,'Password should be of length 6').required('Password is required')
            })
            await schema.validate(formData, {abortEarly:false})
            await fnLogin();

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
                    <CardTitle>Login </CardTitle>
                    <CardDescription>to your account if you already have one</CardDescription>
                     {error && <Error message={error.message}/>}
                       

                    <CardAction>Card Action</CardAction>
                </CardHeader>
                <CardContent className='space-y-2'>
                    <div className='space-y-1'>
                        <Input name='email' type='email' placeholder='Enter email' onChange={handleInputChannge}/>
                        {errors.email?  <Error message={errors.email}/>:''}
                       
                    </div>
                    <div className='space-y-1'>
                        <Input name='password' type='password' placeholder='Enter password' onChange={handleInputChannge}/>
                        {errors.password?  <Error message={errors.password}/>:''}

                    </div>
                </CardContent>
                <CardFooter>
                    <Button onClick={handleLogin}>
                     {loading ? <BeatLoader size={10} color='gray'/> : "Login"}
                        
                    </Button>
                 </CardFooter>
            </Card>
        </div>
    )
}
