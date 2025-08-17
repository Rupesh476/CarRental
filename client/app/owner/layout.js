"use client"
import React, { useState, useEffect } from 'react'
import NavbarOwner from '../components/owner/NavbarOwner'
import Sidebar from '../components/owner/Sidebar'
import { useAppContext } from '../context/AppContext'

const Layout = ({ children }) => {
  const { isOwner, router, loading } = useAppContext()

  const [hasMounted, setHasMounted] = useState(false)

  
  useEffect(() => {
    setHasMounted(true)
  }, [])

  useEffect(() => {
    if (hasMounted && !loading && !isOwner) {
      router.push('/')
    }
  }, [hasMounted, isOwner, loading, router])

  if (!hasMounted) {
    // During server render and hydration phase, render nothing or minimal UI
    return null
  }

  if (loading) {
    return <div className="p-6 text-center">Loading dashboard...</div>
  }

  return (
    <div className='flex flex-col min-h-screen'>
      <NavbarOwner />
      <div className='flex flex-1'>
        <Sidebar />
        <main className='flex-1 p-4'>{children}</main>
      </div>
    </div>
  )
}

export default Layout