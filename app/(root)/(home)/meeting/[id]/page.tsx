'use client'
import Loader from '@/components/Loader'
import MeetingRoom from '@/components/MeetingRoom'
import MeetingSetup from '@/components/MeetingSetup'
import { useGetCallById } from '@/hooks/useGetCallById'
import { useUser } from '@clerk/nextjs'
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk'
import React, { useState } from 'react'

const Meeting = ({params }: {params : { id: string} }) => {
 
  const { user, isLoaded } = useUser()


  const [isSetupComplete, setIsSetupComplete] = useState(false)
  const { call, isCallLoading } = useGetCallById(params.id);

  if(!isLoaded || isCallLoading) return <Loader />

  if (!call)
    return (
      <p className="text-center text-3xl font-bold text-white">
        Call Not Found
      </p>
    );

  return (
    <div className='h-screen w-full'>
      <StreamCall call={call as any}>
        <StreamTheme>
          { !isSetupComplete ?
           (<MeetingSetup  setIsSetupComplete={setIsSetupComplete} />) 
          : 
          (<MeetingRoom />)}
        </StreamTheme>
      </StreamCall>
    </div>
  )
}

export default Meeting