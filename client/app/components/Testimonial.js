import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import Image from 'next/image'
import {motion} from 'framer-motion'

const Testimonial = () => {

     const dummyTestimonialData = [
        {
            name: 'Emma Rodriguez',
            location: 'Barcelona, spain',
            image: assets.testimonial_image_1,
            testimonial: "I've rented cars from various companies, but the experience with CarRental was exceptional."
        },
        {
            name: 'John Smith',
            location: 'New York, USA',
            image: assets.testimonial_image_2,
            testimonial: "CarRental made my trip so much easier. The car was delivered right to my door, and the customer service was fantastic!"
        },
        {
            name: 'Ava Johnson',
            location: 'Sudney, Australia',
            image: assets.testimonial_image_1,
            testimonial: "I highly recommend CarRental!. The fleet is amazing, and I always feel like I'm getting the best deal with with excellent services. "
        },
    ]


  return (
    <div className='px-6 sm:px-16 lg:px-44 py-28'>
            
            <Title titlr='What Our Customer Say' subTitle="Discover why discerning travelers choose stayVenture for their luxury accomodations around the world." />
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18'>
                {dummyTestimonialData.map((testimonial, index) => (
                    <motion.div
                    initial={{opacity:0, y:40}}
                    whileInView={{opacity:1, y: 0}}
                    transition={{ duration: 0.6, delay: index * 0.2, ease:'easeOut'}}
                    key={index} className='p-8 m-4 max-w-xs rounded-lg bg-[#FDFDFE] shadow-lg border border-gray-100 hover:-translate-y-1 transition-all duration-500 cursor-pointer'>
                    
                        <div className='flex items-center gap-4'>
                            <Image  src={testimonial.image} className='w-12 object-contain rounded-full' alt={testimonial.name} />
                            <div className=' text-gray-600'>
                                <h3 className='font-playfair text-xl'>{testimonial.name}</h3>
                                <p className=' text-gray-500'>{testimonial.location}</p>
                            </div>
                        </div>
                    
                    <div className='flex items-center gap-1 mt-4' >
                        {Array(5).fill(0).map((_, index) => (
                            <Image key={index} src={assets.star_icon} alt='star-icon' />
                        ))}
                    </div>
                    <p className='text-gray-500 max-w-90 mt-4 font-light'>{testimonial.testimonial}</p>
                    </motion.div>
                    
                ))}
            </div>
        </div>
  )
}

export default Testimonial