import React,{ Suspense } from 'react'
import Loader from '../../components/Loader'
import CarDetailPage from './CarDetailPage'

export default function Page() {
  return (
    <Suspense fallback={<Loader/>}>
      <CarDetailPage/>
    </Suspense>
  )
}