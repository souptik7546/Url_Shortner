import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LogIn } from 'lucide-react';
import Login from '../components/Login';
import Signup from '../components/Signup';
import { UrlState } from '../Context';

export const Auth = () => {
  const [searchParams] =useSearchParams();
  const longLink= searchParams.get('createNew');
  const navigate =useNavigate();
  const {isAuthenticated,loading}=UrlState();

  useEffect(() => {
   if(isAuthenticated && !loading){
    navigate(`/dashboard?${longLink ? `createNew=${longLink}`:''}`)
   }
  }, [isAuthenticated, loading])
  



  return (
    <div className='mt-20 flex flex-col items-center gap-10'>
    
      <h1 className='text-5xl font-extrabold'> 
        {longLink? "Hold up! Login First to continue the process..." :"Login / Singup" }
      </h1>
      <Tabs defaultValue="login" className="w-[400px]">
  <TabsList className='grid w-full grid-cols-2'>
    <TabsTrigger value="login">Login</TabsTrigger>
    <TabsTrigger value="signup">Signup</TabsTrigger>
  </TabsList>
  <TabsContent value="login"><Login/></TabsContent>
  <TabsContent value="signup"><Signup/></TabsContent>
</Tabs>
    </div>
  )
}
