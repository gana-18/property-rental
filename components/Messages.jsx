'use client'
import {useState,useEffect} from 'react'
import LoadingPage from '@/app/loading'
import Message from './Message'
const Messages = () => {
    const [loading, setLoading] = useState(true)
    const [Messages, setMessages] = useState([])

    useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await fetch('/api/messages')
                if(res.status===200){
                   const data = await res.json()
                    setMessages(data)
                    setLoading(false)
                }
            } catch (error) {
                console.log(error)
                setLoading(false)
            }
        }
        getMessages()
    }, [])
    const MessageCards=Messages.map((message)=>{
       return <Message key={message._id} message={message}/>
    })
  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-24 max-w-6xl">
        <div
          className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0"
        >
          <h1 className="text-3xl font-bold mb-4">Your Messages</h1>

          <div className="space-y-4">
            {loading ? (
              <LoadingPage />
            ) : (
              <>
                {MessageCards.length === 0 ? (
                  <p className="text-gray-600">No messages yet</p>
                ) : (
                  MessageCards
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Messages
