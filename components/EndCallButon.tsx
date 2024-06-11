import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk';
import React from 'react'
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

const EndCallButon = () => {
 const call = useCall();
 const router = useRouter()

 const { useLocalParticipant } = useCallStateHooks();
 const localparticipant = useLocalParticipant();

 const isMeetingOwner = localparticipant && call?.state.createdBy && localparticipant.userId ===
 call.state.createdBy.id;

 if(!isMeetingOwner) return null
        
  return (
    <Button className='bg-red-500'
     onClick={async () => { await call.endCall();
        router.push('/');
    }}>
        End Call for everyone
    </Button>
  )
}

export default EndCallButon