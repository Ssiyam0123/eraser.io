import { Button } from '@/components/ui/button'
import { Link, Save } from 'lucide-react'
import React, { useState } from 'react'


type Props = {
  setcommandToSave: (value: boolean) => void;
};

export default function WorkspaceHeader({setcommandToSave}: Props ) {
  // const [save, setsave] = useState<boolean>(false)
  
  return (
    <div className='flex justify-between w-[90%] mx-auto pt-10'>
        <div className='text-center flex items-center justify-center text-xl'>
            file Name
        </div>

        <div className='space-x-3'>
          <Button onClick={()=> setcommandToSave(true)}>Svae <Save/></Button>
            <Button>Share <Link/></Button>
            
        </div>
    </div>
  )
}
