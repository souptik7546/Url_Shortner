import React, { useEffect } from 'react'
import { BarLoader } from 'react-spinners'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { useState } from 'react'
import { Filter } from 'lucide-react'
import { Error } from '../components/Error'
import UseFetch from '../hooks/UseFetch'
import { getUrls } from '../DB/ApiUrls'
import { UrlState } from '../Context'
import { getClicksUrls } from '../DB/apiClicks'
import LinkCard from '../components/LinkCard'
import CreateLink from '../components/CreateLink'


export const Dashboard = () => {

  const [searchQuery, setsearchQuery] = useState('');
  const{user}=UrlState()
  const{data:urls, loading, error, fn:fnUrls}=UseFetch(getUrls,user?.id)
  const{loading:loadingClicks, data:clicks,fn:fnClicks}=UseFetch(getClicksUrls,
    urls?.map((url)=> url.id)
  )
  useEffect(() => {
    fnUrls()
  }, []);

  useEffect(() => {
    if(urls?.length){
      fnClicks()
    }
  }, [urls?.length])

  const filteredUrls=urls?.filter((url)=> url.title.toLowerCase().includes(searchQuery.toLowerCase()))  
  

  return (
    <div className='flex flex-col gap-8'>
      {
        (loading||loadingClicks) && <BarLoader width={'100%'} color='white' />
      }
      <div className='grid grid-cols-2 gap-4'>
        <Card>
          <CardHeader>
            <CardTitle>Links Created</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{urls?.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{clicks?.length}</p>
          </CardContent>
        </Card>
      </div>
      <div className='flex justify-between'>
        <h1 className='text-4xl font-extrabold'>My Links</h1>
        {/* <Button>Create Link</Button> */}
        <CreateLink/>
      </div>
      <div className='relative '>
        <Input type='text' placeholder='Filter Links' value={searchQuery} onChange={(e)=>setsearchQuery(e.target.value)}/>
        <Filter className='absolute top-2 right-2 p-1 '/>
      <Error message={error?.message} />
      {(filteredUrls||[]).map((url,id)=>{
        return <LinkCard key={id} url={url} fetchUrls={fnUrls}/>

      }
       
      ) }
      </div>
    </div>
  )
}
