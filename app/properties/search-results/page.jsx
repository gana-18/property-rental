'use client'
import { useState,useEffect } from "react"
import { useSearchParams } from "next/navigation"
import PropertyCard from "@/components/PropertyCard"
import LoadingPage from "@/app/loading"
import { toast } from "react-toastify"
import Link from "next/link"
import { FaArrowAltCircleLeft } from "react-icons/fa"
const searchResultPage = () => {
    const searchParams = useSearchParams()
    const [properties, setProperties] = useState([])
    const [loading, setLoading] = useState(true)
    const location = searchParams.get('location')
    const propertyType = searchParams.get('propertyType')
    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const res = await fetch(`/api/properties/search?location=${location}&propertyType=${propertyType}`)
            const data = await res.json()
            setProperties(data.properties)
            setLoading(false)
            } catch (error) {
                console.log(error)
                toast.error("Internal Server Error")
                setLoading(false)
            }
            
        }
        fetchProperties()
    }, [location, propertyType])
    const propertyCards = properties.map((property) => {
        return <PropertyCard key={property._id} property={property} />
    })
  return (
    <>
    {loading?(<LoadingPage/>):(
        <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto">
            <Link href="/properties" className="flex items-center text-blue-500 hover:underline mb-3">
            <FaArrowAltCircleLeft className="mr-2 mb-1" />Back to Properties
            </Link>
            <h2 className="text-2xl font-bold text-blue-500 mb-6 text-center">
            Search Results for "{location}"
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.length==0?(<p>No properties found!!</p>):(
                propertyCards
            )}
            </div>
        </div>
        </section>
    )}
    </>
  )
}

export default searchResultPage
