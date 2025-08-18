import React, { Suspense } from "react"
import CarsList from "./CarsList"

export default function CarsPage() {
  return (
    <Suspense fallback={<p className="text-center py-20">Loading cars...</p>}>
      <CarsList />
    </Suspense>
  )
}
