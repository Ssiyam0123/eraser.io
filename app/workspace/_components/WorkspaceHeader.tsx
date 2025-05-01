import { Button } from '@/components/ui/button'
import { Link } from 'lucide-react'
import React from 'react'

export default function WorkspaceHeader() {
  return (
    <div className='flex justify-between w-[90%] mx-auto pt-10'>
        <div className='text-center flex items-center justify-center text-xl'>
            file Name
        </div>

        <div>
            <Button>Share <Link/></Button>
        </div>
    </div>
  )
}
