"use client"
import React,{useState,useContext} from 'react'
import { assets } from '../assets/assets'
import Image from 'next/image'
import Link from 'next/link'
import {menuLinks} from '../assets/assets'
import {usePathname} from 'next/navigation'
import {useRouter} from 'next/navigation'
import {useAppContext} from '../context/AppContext'
import {toast} from 'react-hot-toast'
import {motion} from 'motion/react'

const Navbar = () => {

    const {baseURL, setShowLogin, user, logout, token, isOwner, setIsOwner} = useAppContext()

    const pathname = usePathname()
    const [open, setOpen] = useState(false)
    const router = useRouter()
    const MotionImage = motion(Image)

    const changeRole = async () => {
        try {
            const res = await fetch(`${baseURL}/api/owner/change-role`, {
                method:'POST',
                headers: {
                    Authorization: token ,
                    'Content-Type': 'application/json'
                },
            })
            const data = await res.json()
            if (data.success) {
                setIsOwner(true)
                toast.success(data.message)
            } else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

return (
    <motion.div 
    initial={{y: -20, opacity: 0}}
    animate={{y: 0, opacity: 1}}
    transition={{duration: 0.5}}
    className={`flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 text-gray-600 border-b border-borderColor 
    relative transition-all ${pathname === "/" && "bg-light" } `}>
        <Link href='/'>
        <MotionImage whileHover={{scale: 1.05}} src={assets.logo} alt='logo' width={120} height={40}/>
        </Link>
        
        <div className={`max-sm:fixed max-sm:h-screen max-sm:w-full max-sm:top-16 max-sm:border-t
        border-borderColor right-0 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 max-sm:p-4 
        transition-all duration-300 z-50 ${pathname === "/" ? "bg-light" : "bg-white"}
        ${open ? "max-sm:translate-x-0" : "max-sm:translate-x-full"}`}>
            {menuLinks.map((link,index) => (
                <Link key={index} href={link.path} >
                {link.name}
                </Link>
            ))}

            <div className='hidden lg:flex items-center text-sm gap-2 border borderColor px-3 rounded-full max-w-56'>
                <input type="text" placeholder='Search products' className='py-1.5 w-full bg-transparent outline-none 
                placeholder-gray-500'  />
                <Image src={assets.search_icon} alt="search" />
            </div>

            <div className='flex max-sm:flex-col items-start sm:items-center gap-6' >
                <button onClick={() => isOwner ? router.push('/owner') : changeRole()} className='cursor-pointer'>{isOwner ? 'Dashboard': 'List Cars'}</button>
                <button onClick={() => {user ? logout() : setShowLogin(true)}} className='cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition-all text-white rounded-lg'>{user? 'Logout' : 'Login'}</button>
            </div>
        </div>

        <button className='sm:hidden cursor-pointer' aria-label='Menu' onClick={() => setOpen(!open)} >
            <Image src={open? assets.close_icon : assets.menu_icon } alt='' />
        </button>
    </motion.div>
)
}

export default Navbar