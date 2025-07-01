import React, { useEffect, useRef, useState } from 'react'
import { UrlState } from '../Context'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Error } from './Error'
import { Card } from './ui/card'
import * as yup from "yup"
import { QRCode } from 'react-qrcode-logo'
import UseFetch from '../hooks/UseFetch'
import { createUrl } from '../DB/ApiUrls'
import { BeatLoader } from 'react-spinners'


function CreateLink() {
    const { user } = UrlState() 
    const navigate = useNavigate();
    const ref= useRef();
    const [searchParams, setsearchParams] = useSearchParams('')
    const longLink = searchParams.get("createNew")
    console.log(longLink);
    

    const [errors, seterrors] = useState({})
    const [formValues, setformValues] = useState({
        title: "",
        longUrl: longLink ? longLink : "",
        customUrl: ""
    })

    const schema = yup.object().shape({
        title: yup.string().required("title is required"),
        longUrl: yup.string().url("must be a valid url").required("Long url is required"),
        customUrl: yup.string()
    })
    const handleChange = (e) => {
        setformValues({ ...formValues, [e.target.id]: e.target.value })
    }
const {loading,error,data,fn:fnCreateUrl}=UseFetch(createUrl,{...formValues, user_id:user.id})


    useEffect(() => {
      if(error===null &&data){
        navigate(`/link/${data[0].id}`)
      }
    }, [error,data])
    


    

    const createNewLink= async()=>{
        seterrors([]);
        try {
           await schema.validate(formValues,{abortEarly:false})
           const canvas=ref.current.canvasRef.current;
           const blob= await new Promise((resolve) => canvas.toBlob(resolve))
           await fnCreateUrl(blob)
        } catch (e) {
            const newErrors={}

            e?.inner?.forEach((err)=>{newErrors[err.path]=err.message})
            seterrors(newErrors);
        }
    }

    return (
        <Dialog defaultOpen={longLink}
            onOpenChange={(res) => { if (!res) setsearchParams({}) }}>
            <DialogTrigger>
                <Button variant='destructive'>Create new Link</Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-md'>
                <DialogHeader>
                    <DialogTitle className='font-bold text-2xl'>Create New</DialogTitle>

                </DialogHeader>
                {formValues?.longUrl && <QRCode value={formValues?.longUrl} size={250} ref={ref}/>}

                <Input id='title' placeholder="Short Link's Title" value={formValues.title} onChange={handleChange} />
                {errors.title && <Error message={errors.title} />}
                <Input id='longUrl' placeholder="Enter your LONGGGGG URL" value={formValues.longUrl} onChange={handleChange} />
                 {errors.longUrl && <Error message={errors.longUrl} />}
                <div className='flex items-center gap-2'>
                    <Card className='p-2'>trimmer.in</Card> /
                    <Input id='customUrl' placeholder="Custom Link (optional)" value={formValues.customUrl} onChange={handleChange} />

                </div>

                 {error && <Error message={error.message} />}
                <DialogFooter className='sm:justify-start'>
                    <Button disabled={loading} variant='destructive' onClick={createNewLink}>Create</Button>
                    {loading ? <BeatLoader size={10} color='white'/>:''}
                </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}

export default CreateLink