"use client"
import {useState} from 'react'
import {usePathname} from 'next/navigation'
import Navbar from './Navbar'
import Footer from './Footer'
import Login from  './Login'
import { useAppContext } from '../context/AppContext'

export default function LayoutWrapper({ children}) {
    const pathname = usePathname()

    const {showLogin} = useAppContext()
    const isOwnerPath = pathname.startsWith('/owner')

    return (
        <>
        {showLogin && <Login/>}

        {!isOwnerPath && <Navbar/>}
        {children}
        {!isOwnerPath && <Footer/>}
        </>
    )
}