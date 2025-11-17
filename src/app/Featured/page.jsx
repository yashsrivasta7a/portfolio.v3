"use client"
import React from 'react'
import Card from '@/components/Card.jsx'

function FeaturedPage() {
  return (
  <div>
  <div className="satoshi5 text-3xl mt-10 tracking-widest items-center flex justify-center mb-6">
    FEATURED PROJECTS
  </div>

  <div className="grid grid-cols-2 gap-10 mx-40">
    <Card size="sm" className="col-span-2" />
    <Card size="lg"  />
    <Card size="lg" />
  </div>
</div>

    
  )
}

export default FeaturedPage