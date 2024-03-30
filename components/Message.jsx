'use client'
import { useState,useEffect } from 'react'
import { toast } from 'react-toastify'
import { useGlobalContext } from '@/context/GlobalContext'
const Message = ({message}) => {
  const [isRead, setIsRead] = useState(message.read);
  const [isDeleted, setIsDeleted] = useState(false);
  const {setUnRead} = useGlobalContext()
  const handleReadClick = async () => {
    try {
      const res = await fetch(`/api/messages/${message._id}`, {
        method: "PUT",
      });
      if (res.status===200) {
        const {read}=await res.json()
        setIsRead(read);
        setUnRead(prev=>read?prev-1:prev+1)
        if(read)
        toast.success("Message marked as read");
        else
        toast.success("Message marked as Unread");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };
  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/messages/${message._id}`, {method: "DELETE"});
      if (res.status===200) {
        setIsDeleted(true);
        setUnRead(prev=>prev-1)
        toast.success("Message deleted");
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong");
    }
  }
  if(isDeleted) return null
  return (
    <div
    className="relative bg-white p-4 rounded-md shadow-md border border-gray-200"
  >
    {!isRead &&(
      <div
      className="absolute top-0 right-0 bg-yellow-500 text-white px-2 py-1 rounded-tl-md rounded-bl-md">New</div>
    )}
    <h2 className="text-xl mb-4">
      <span className="font-bold">Property Inquiry:</span>
      {" "}{message.property.name}
    </h2>
    <p className="text-gray-700">
      {message.body}
    </p>

    <ul className="mt-4">
      <li><strong>Name:</strong>{" "}{message.sender.username}</li>

      <li>
        <strong>Reply Email:</strong>
        <a href={`mailto:${message.email}`} className="text-blue-500"
          >{" "}{message.email}</a>
      </li>
      <li>
        <strong>Reply Phone:</strong>
        <a href={`tel:${message.phone}`} className="text-blue-500"
          >{" "}{message.phone}</a>
      </li>
      <li><strong>Received:</strong>{new Date(message.createdAt).toLocaleString()}</li>
    </ul>
    {!isRead ?(
      <button
      onClick={handleReadClick}
        className="mt-4 mr-3 bg-blue-500 text-white py-1 px-3 rounded-md"
      >
        Mark As Read
      </button>
    ):(
      <button
      onClick={handleReadClick}
        className="mt-4 mr-3 bg-green-500 text-white py-1 px-3 rounded-md"
      >
        Mark As Unread
      </button>
    
    )}
    <button onClick={handleDelete} className="mt-4 bg-red-500 text-white py-1 px-3 rounded-md">
      Delete
    </button>
  </div>
  )
}

export default Message
