"use client"
import React,{useState,useEffect} from 'react'
import Title from '../../components/owner/Title'
import Image from 'next/image'
import {assets} from '../../assets/assets'
import {useAppContext} from '../../context/AppContext'
import {toast} from 'react-hot-toast'

const Page = () => {

  const {isOwner, baseURL, token, currency} = useAppContext()

  const [cars, setCars] = useState([])

  const fetchOwnerCars = async () => {
    try {
      const res = await fetch(`${baseURL}/api/owner/cars`,{
      method:'GET',
      headers:{'Authorization':token},
    });
    const data = await res.json()
    if (data.success) {
      setCars(data.cars)
    } else{
      toast.error(data.message)
    }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const toggleAvailability = async (carId) => {
    try {
      console.log("Toggling car ID:", carId);
      const res = await fetch(`${baseURL}/api/owner/toggle-car`,{
      method:'POST',
      headers:{
        'Authorization':token,
        'Content-Type':'application/json',
      },
    body: JSON.stringify({carId})
    });

    const data = await res.json()
    if (data.success) {
      toast.success(data.message)
      fetchOwnerCars()
    } else{
      toast.error(data.message)
    }
    } catch (error) {
      toast.error(error.message)
    }
  }

  
  const deleteCar = async (carId) => {
    try {
      const confirm = window.confirm('Are you sure you want to delete this car')
      if(!confirm) return null

      const res = await fetch(`${baseURL}/api/owner/delete-car`,{
      method:'POST',
      headers:{
        'Authorization':token,
        'Content-Type': 'application/json',
      },
    body: JSON.stringify({carId})
    });

    const data = await res.json()
    if (data.success) {
      toast.success(data.message)
      fetchOwnerCars()
    } else{
      toast.error(data.message)
    }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    isOwner && fetchOwnerCars()
  },[isOwner])


  return (
    <div className='px-4 pt-10 md:px-2 w-full'>

      <Title title='Manage Cars' subTitle='View all listed cars, update thier details,
      or remove them from the booking platform.' />

      <div className='max-w-3xl w-full rounded-md overflow-hidden border border-borderColor mt-6'>

        <table className='w-full border-collapse text-left text-sm text-gray-600'>
          <thead className='text-gray-500'>
            <tr>
              <th className='p-3 font-medium'>Car</th>
              <th className='p-3 font-medium max-md:hidden'>Category</th>
              <th className='p-3 font-medium'>Price</th>
              <th className='p-3 font-medium max-md:hidden'>Status</th>
              <th className='p-3 font-medium'>Actions</th>
            </tr>
          </thead>

          <tbody>
            {cars.map((car,index) => (
              <tr key={index} className='border-t border-borderColor' >
                <td className='p-3 flex items-center gap-3'>
                  <Image src={car.image} alt='' width={300} height={200} className='h-12 w-20  aspect-square rounded-md object-cover' /> 
                  <div className='max-md:hidden'>
                    <p className='font-medium'>{car.brand} {car.model}</p>
                    <p className='text-xs text-gray-500'>{car.seating_capacity} / {car.transmission}</p>
                  </div>
                </td>

                <td className='p-3 max-md:hidden'>{car.category}</td>
                <td className='p-3'>{currency} {car.pricePerDay}/day</td>

              <td className='p-3 max-md:hidden'>
                <span className={`px-3 py-1 rounded-full text-xs 
                  ${car.isAvailable ? 'bg-green-100 text-green-500' : 'bg-red-100 text-red-500'}`}>
                    {car.isAvailable ? "Available" : "Unavailable"}
                </span>
              </td>

              <td className='flex items-center p-3'>
                <Image onClick={()=> toggleAvailability(car._id)} src={car.isAvailable ? assets.eye_close_icon : assets.eye_icon } alt=''
                className='cursor-pointer'  />
                <Image onClick={()=> deleteCar(car._id)} src={assets.delete_icon} alt='' className='cursor-pointer' />
              </td>
              
              </tr>
            ))}
          </tbody>

        </table>

      </div>


    </div>
  )
}

export default Page