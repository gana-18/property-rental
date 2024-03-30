import React from 'react'
import Hero from '@/components/Hero'
import InfoBoxes from '@/components/InfoBoxes'
import HomeProperties from '@/components/HomeProperties'
import Featured from '@/components/Featured'
const HomePage = () => {
  return (
    <>
      <Hero />
      <InfoBoxes />
      <Featured />
      <HomeProperties />
    </>
  )
}

export default HomePage