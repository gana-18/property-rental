'use client'
import {useState,useEffect} from 'react'
import { toast } from 'react-toastify'
import PropertyCard from '@/components/PropertyCard'
import LoadingPage from '@/app/loading'
const SavedPage = () => {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch('/api/bookmarks',{method:'GET'})
        const data = await res.json()
        if (res.status===200) {
          setProperties(data)
          setLoading(false)
        } else {
          toast.error(data)
          setLoading(false)
        }
      } catch (error) {
        console.log(error)
        toast.error('Internal Server Error')
        setLoading(false)
      }
    }
    fetchProperties()
  }, [])
  const property = properties.map((property) => {
    return <PropertyCard key={property._id} property={property} />
})
  return (
    <>
    {loading? <LoadingPage/>:(
      <section className="px-4 py-6">
         <div className="container-xl lg:container m-auto px-4 py-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {property.length==0?(<p>No properties found!!</p>):(
                property
              )}
            </div>
         </div>
      </section>  
    )}
    </>
  )
}

export default SavedPage
