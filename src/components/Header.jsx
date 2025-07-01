import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LinkIcon, ListIcon, LogOut } from 'lucide-react'
import { UrlState } from '../Context'
import UseFetch from '../hooks/UseFetch'
import { logout } from '../DB/apiAuth'
import { BarLoader } from 'react-spinners'

export default function Header() {
    const navigate = useNavigate()
 
    const {user,fetchUsers}= UrlState()
    const{loading,fn:fnLogout}=UseFetch(logout)


    return (<>
    
        <nav className='p-4 flex justify-between items-center'>
            <Link to={'/'}>
                <img src="./public/logo.png" alt="logo" className='h-16' />
            </Link>
            {!user ? <Button onClick={() => navigate('/auth')}>
                Login
            </Button> : <DropdownMenu>
                <DropdownMenuTrigger className='w-8 rounded-full overflow-hidden'>
                    <Avatar>
                        <AvatarImage src={user.user_metadata.profilepic} className="object-contain"/>
                        <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>{user?.user_metadata?.name}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <Link to={'/dashboard'} className='flex'>
                        <LinkIcon className='mr-2 h-2 w-5'/> My Links
                        </Link>
                        </DropdownMenuItem>
                    <DropdownMenuItem className='text-red-700 '>
                        <LogOut className='text-red-700 ' />
                        <span onClick={()=>{
                            fnLogout().then(()=>{
                                fetchUsers();
                                navigate('/')
                            })

                            
                        }}>
                            Logout
                        </span>
                        </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>}
        </nav>
                        {loading && <BarLoader className='mb-4' width={'100%'} color='white'/>}
        
        </>)
}
