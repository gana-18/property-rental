'use client'
import {useEffect, useState,userEffect} from 'react'
import { useParams } from 'next/navigation'
import { fetchProperty } from '@/utils/requests'
import PropertyHeaderImage from '@/components/PropertyHeaderImage'
import Link from 'next/link'
import PropertyDetails from '@/components/PropertyDetails'
import {FaBackward} from "react-icons/fa"
import LoadingPage from '@/app/loading'
import PropertyImages from '@/components/PropertyImages'
import BookmarkButton from '@/components/BookmarkButton'
import ShareButtons from '@/components/ShareButtons'
import PropertyContactForm from '@/components/PropertyContactForm'
const PropertyPage = () => {
  const {id}=useParams()
  const [property,setProperty]=useState(null)
  const [loading,setLoading]=useState(true)
  useEffect(()=>{
    const getProperty =async()=>{
      if(!id){
        return
      }
      try {
        const property=await fetchProperty(id)
        setProperty(property)
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
    if(property === null){
      getProperty()
    }
  },[id,property])
  return (
    <>
      {!loading && property && (<>
        <PropertyHeaderImage image={property?.images[0]}/>
        <section>
          <div className="container m-auto py-6 px-6">
            <Link
              href="/properties"
              className="text-blue-500 hover:text-blue-600 flex items-center"
            >
            <FaBackward className="mr-2"></FaBackward> Back to Properties
            </Link>
          </div>
        </section>
        <section className="bg-blue-50">
      <div className="container m-auto py-10 px-6">
        <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
          <PropertyDetails property={property} />
          <aside className="space-y-4">       
            <BookmarkButton property={property} />
            <ShareButtons property={property} />
            <PropertyContactForm property={property} />
          </aside>
        </div>
      </div>
    </section>
    <PropertyImages images={property.images} />
      </>)}
      {loading ?<LoadingPage/>:null}
    </>
  )
}

export default PropertyPage
