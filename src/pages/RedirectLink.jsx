import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import UseFetch from '../hooks/UseFetch'
import { getLongUrl, storeClicks } from '../DB/ApiUrls'
import { BarLoader } from 'react-spinners'

const RedirectLink = () => {
  const {id}= useParams()

  const {loading , data, fn}= UseFetch(getLongUrl,id);

  const {loading:loadingStats, fn:fnStats}=UseFetch(storeClicks,{
    id:data?.id,
    originalUrl: data?.original_url
  })

  useEffect(() => {
    fn();
  }, [])
  useEffect(() => {
   if(!loading && data){
    fnStats()
   }
  }, [loading])
  
  if(loading || loadingStats){
    return(
      <>
      <BarLoader width={'100%'} color='white'/>
      <br />
      Redirecting...
      </>
    )
  }
  

  return null
}

export default RedirectLink