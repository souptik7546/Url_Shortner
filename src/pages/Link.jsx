import  { useEffect } from 'react'
import { UrlState } from '../Context'
import { useNavigate, useParams } from 'react-router-dom';
import UseFetch from '../hooks/UseFetch';
import { deleteUrl, getUrl } from '../DB/ApiUrls';
import { getClicksForUrl } from '../DB/apiClicks';
import { BarLoader, BeatLoader } from 'react-spinners';
import { Copy, Download, Trash } from 'lucide-react';
import { Button } from '../components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Location from '../components/Location';
import DeviceStats from '../components/DeviceStats';

export const Link = () => {

  const downloadImage = () => {
    const imageUrl = url?.qr;
    const fileName = url?.title;
    const anchor = document.createElement('a');
    anchor.href = imageUrl;
    anchor.download = fileName;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor)
  }

  const { user } = UrlState();
  const { id } = useParams();
  const navigate = useNavigate()

  const { loading, data: url, fn, error } = UseFetch(getUrl, { id, user_id: user?.id })
  const { loading: loadingStats, data: stats, fn: fnStats } = UseFetch(getClicksForUrl, id)

  const { loading: loadingDelete, fn: fnDelete } = UseFetch(deleteUrl, id)
  useEffect(() => {
    fn();
    fnStats();
  }, [])

  if (error) {
    navigate('/dashboard')
  }

  let link = ''
  if (url) {
    link = url?.custom_url ? url?.custom_url : url.short_url;
  }

  return (
    <>
      {
        (loading || loadingStats) && (<BarLoader className='mb-4' width={"100%"} color='white' />)
      }
      <div className='flex flex-col gap-8 sm:flex-row justify-between'>
        <div className='flex flex-col items-start gap-8 rounded-lg sm:w-2/5'>
          <span className="text-6xl font-extrabold hover:underline cursor-pointer">{url?.title}</span>
          <a href={`https://url-shortner-m023g7bue-souptiks-projects-bbb4a6e8.vercel.app/${link}`} className="text-3xl sm:text-4xl text-blue-400 font-bold hover:underline cursor-pointer"> https://trimrr.in/{link}</a>
          <a href={url?.original_url} className="flex items-center gap-1 hover:underline cursor-pointer">{url?.original_url}</a>
          <span className="flex items-end font-extralight text-sm">{new Date(url?.created_at).toLocaleString()}</span>
          <div className='flex gap-2 '>
            <Button variant='ghost' onClick={() =>
              navigator.clipboard.writeText(`https://trimmer.in/${url.short_url}`)
            }>
              <Copy />
            </Button>

            <Button variant='ghost' onClick={downloadImage}>
              <Download />
            </Button>

            <Button variant='ghost' onClick={() => fnDelete()}>
              {loadingDelete ? <BeatLoader size={5} color='white' /> : < Trash />}
            </Button>
          </div>
          <img src={url?.qr} alt="qr code" className='h-60 object-contain ring ring-blue-500 self-start' />
        </div>

        <Card className='sm:w-3/5'>
          <CardHeader>
            <CardTitle className='text-4xl font-extrabold'>Stats</CardTitle>


          </CardHeader>
          {stats && stats?.length ? <CardContent className='flex flex-col gap-6'>
            <Card>
              <CardHeader>
                <CardTitle>Total Clicks</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{stats?.length}</p>
              </CardContent>
            </Card>
            <CardTitle>Location Data:</CardTitle>
            <Location stats={stats}/>
            <CardTitle>Device Info:</CardTitle>
            <DeviceStats stats={stats}/>
          </CardContent> :
            <CardContent>
              {loadingStats === false ? 'No Statistics Yet' : "Loading Statistics..."}
            </CardContent>
          }
        </Card>
      </div>

    </>
  )
}
