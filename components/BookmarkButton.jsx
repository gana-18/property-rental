'use clinet'
import {useState,useEffect} from 'react'
import { toast } from 'react-toastify'
import { useSession } from 'next-auth/react'
import {FaBookmark} from 'react-icons/fa'
const BookmarkButton = ({property}) => {
  const {data: session} = useSession()
  const userId=session?.user?.id
  const [isBookmarked,setIsBookmarked]=useState(false)

  useEffect(()=>{
    if(!userId) return;
    const checkBookmark=async()=>{
      try {
        const res = await fetch('/api/bookmarks/check',{
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify({propertyId:property._id})
        })
        if(res.status===200){
          const data = await res.json()
          setIsBookmarked(data.isBookmarked)
        }
      } catch (error) {
        console.log(error)
      }
    }
    checkBookmark()
  },[property._id,userId])

  const handleClick=async()=>{
    if(!userId){
      toast.error('Please sign in to bookmark properties')
      return;
    }
    try {
      const res = await fetch('/api/bookmarks',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({propertyId:property._id})
      })
      if(res.status===200){
        const data = await res.json()
        setIsBookmarked(data.isBookmarked)
        toast.success(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong')
    }
  }
  return (
    <>
    {isBookmarked?(
      <button onClick={handleClick}
      className="bg-green-500 hover:bg-green-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center">
      <FaBookmark className="mr-2"/> Remove Bookmark
      </button>
    ):(
      <button onClick={handleClick}
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center">
      <FaBookmark className="mr-2"/> Add Bookmark
      </button>
    )}
  </>
  )
}

export default BookmarkButton
