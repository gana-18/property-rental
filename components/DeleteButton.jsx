'use client'
import React from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
const DeleteButton = ({id}) => {
    const router = useRouter()
    const handleDelete=async(id)=>{
        const confirmed = window.confirm("Are you sure you want to delete this property?")
        if(!confirmed){
            return
        }
        try {
            const res  = await fetch(`/api/properties/${id}`,{
                method:"DELETE"
            })
            if(res.status === 200){
                toast.success("Property deleted successfully")
                router.push("/properties")
            }
            else{
                toast.error("An error occurred. Please try again later.")
                return
            }
            
        } catch (error) {
            console.log(error)
            toast.error("An error occurred. Please try again later.")
        }
    }
  return (
    <button
    onClick={()=>handleDelete(id)}
        className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
        type="button"
    >
        Delete
    </button>
  )
}

export default DeleteButton
