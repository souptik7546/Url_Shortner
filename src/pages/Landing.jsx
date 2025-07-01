import React, { useState } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Button } from '../components/ui/button'
import { useNavigate } from 'react-router-dom'


export default function Landing() {
    const [longUrl, setlongUrl] = useState('')
    const navigate = useNavigate();
    const handleShorten= (e)=>{
        e.preventDefault();
        if(longUrl){
             navigate(`/auth?createNew=${longUrl}`)
        }
      
        
    }

  return (
    <div className='flex flex-col items-center'>
        <h2 className='my-10 sm:my-16 text-3xl sm:text-6xl lg:text-7xl text-white text-center font-extrabold'>The only url Shortner <br /> You'll ever need 😉</h2>
        <form onSubmit={handleShorten} className='sm:h-14 flex flex-col sm:flex-row w-full md:w-2/4 gap-2'>
           <Input type='url' placeholder='Enter your Longggggg URL!' //
           onChange={ (e)=>setlongUrl(e.target.value) }
           className='h-full flex-1 py-4 px-4'
           value={longUrl}/>
        <Button className='h-full' type='submit' variant="destructive">Shorten!</Button> 
        </form>
        <img src="./public/banner1.jpg" alt="" className='w-full my-11 md:px-16' />
        
        <Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>
      Yes. It adheres to the WAI-ARIA design pattern.
    </AccordionContent>
  </AccordionItem>
</Accordion>
    </div>
  )
}
