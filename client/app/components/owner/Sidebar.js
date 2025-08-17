'use client'
import React, { useState } from 'react'
import { dummyUserData, ownerMenuLinks, assets } from '../../assets/assets'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { useAppContext } from '../../context/AppContext'
import { toast } from 'react-hot-toast'

const Sidebar = () => {
  const { user, token, fetchUser, baseURL } = useAppContext()
  const pathname = usePathname()
  const [image, setImage] = useState('')
  const [loading, setLoading] = useState(false)  // <-- loading state

  const updateImage = async () => {
    if (!image) return toast.error("Please select an image.")
    try {
      setLoading(true)  // start spinner
      const formData = new FormData()
      formData.append('image', image)

      const res = await fetch(`${baseURL}/api/owner/update-image`, {
        method: 'POST',
        headers: {
          Authorization: token,
        },
        body: formData,
      })

      const data = await res.json()
      if (data.success) {
        fetchUser()
        toast.success(data.message)
        setImage('')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)  // stop spinner
    }
  }

  return (
    <div className='relative min-h-screen md:flex flex-col items-center pt-8 max-w-13 md:max-w-60 w-full border-r border-borderColor text-sm'>
      <div className='group relative'>
        <label htmlFor="image">
          <Image
            src={
              image
                ? URL.createObjectURL(image)
                : user?.image ||
                  'https://images.unsplash.com/photo-163333275592-727a05c4013d?q=80&w=300'
            }
            alt=''
            width={56}
            height={56}
            className='h-9 md:h-14 w-9 md:w-14 rounded-full mx-auto'
          />
          <input
            type='file'
            id='image'
            accept='image/*'
            hidden
            onChange={(e) => setImage(e.target.files[0])}
            disabled={loading} // disable while loading
          />
          <div className='absolute hidden top-0 right-0 left-0 bottom-0 bg-black/10 rounded-full group-hover:flex items-center justify-center cursor-pointer'>
            <Image src={assets.edit_icon} alt='' />
          </div>
        </label>
      </div>

      {image && (
        <button
          onClick={updateImage}
          className='absolute top-0 right-0 flex p-2 gap-1 bg-primary/10 text-primary cursor-pointer'
          disabled={loading}  // disable button while loading
        >
          {loading ? (
            // simple spinner - you can replace with any spinner
            <svg
              className='animate-spin h-5 w-5 text-primary'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
            >
              <circle
                className='opacity-25'
                cx='12'
                cy='12'
                r='10'
                stroke='currentColor'
                strokeWidth='4'
              ></circle>
              <path
                className='opacity-75'
                fill='currentColor'
                d='M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z'
              ></path>
            </svg>
          ) : (
            <>
              Save <Image src={assets.check_icon} width={13} alt='' />
            </>
          )}
        </button>
      )}

      <p className='mt-2 text-base max-md:hidden'>{user?.name}</p>

      <div className='w-full'>
        {ownerMenuLinks.map((link, index) => (
          <Link
            key={index}
            href={link.path}
            className={`relative flex items-center gap-2 w-full py-3 pl-4 first:mt-6 
            ${
              link.path === pathname ? 'bg-primary/10 text-primary' : 'text-gray-600'
            }`}
          >
            <Image
              src={link.path === pathname ? link.coloredIcon : link.icon}
              alt='car icon'
            />
            <span className='max-md:hidden'> {link.name} </span>
            {link.path === pathname && (
              <div className='bg-primary w-1.5 h-8 rounded-l right-0 absolute'></div>
            )}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
