import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import { Copy, Delete, Download, Trash } from 'lucide-react'
import UseFetch from '../hooks/UseFetch'
import { deleteUrl } from '../DB/ApiUrls'
import { BeatLoader } from 'react-spinners'

function LinkCard({ url, fetchUrls }) {
    const downloadImage= ()=>{
        const imageUrl=url?.qr;
        const fileName=url?.title;
        const anchor=document.createElement('a');
        anchor.href=imageUrl;
        anchor.download= fileName;
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor)
    }

    const{loading:loadingDelete, fn:fnDelete}=UseFetch(deleteUrl,url?.id)
    return (
        <div className='flex flex-col md:flex-row gap-6 border p-4 bg-gray-900 rounded-lg'>
            <img src={url?.qr} alt="qr code" className='h-32 object-contain ring ring-blue-500 self-start' />
            <Link to={`/link/${url?.id}`} className='flex flex-col flex-1 '>
                <span className='text-3xl font-extrabold hover:underline cursor-pointer'>{url?.title}</span>
                <span className='text-2xl text-blue-500 font-bold hover:underline cursor-pointer'>
                    https://trimmer.in/{url?.custom_url ? url?.custom_url : url.short_url}
                </span>
                <span className='flex items-center gap-1 hover:underline cursor-pointer'>{url?.original_url}</span>
                <span className='flex items-end font-extralight text-sm flex-1'>{new Date(url?.created_at).toLocaleString()}</span>
            </Link>
            <div className='flex gap-2 '>
                <Button variant='ghost' onClick={() =>
                    navigator.clipboard.writeText(`https://trimmer.in/${url.short_url}`)
                }>
                    <Copy />
                </Button>

                <Button variant='ghost' onClick={downloadImage}>
                    <Download />
                </Button>

                <Button variant='ghost' onClick={()=> fnDelete().then(()=> fetchUrls())}>
                    {loadingDelete?<BeatLoader size={5} color='white'/>:< Trash />} 
                </Button>
            </div>
        </div>
    )
}

export default LinkCard