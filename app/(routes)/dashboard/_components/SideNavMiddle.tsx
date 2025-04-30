import { Blocks, Folder } from 'lucide-react'
import React from 'react'

export default function SideNavMiddle() {
  return (
    <div className='flex flex-col space-y-2 '>
        <div className='flex space-x-2 border-2 bg-gray-700 p-3 rounded-2xl mb-10'>
            <p><Blocks/></p>
            <p>ALL FILES</p>
        </div>
        <div className='flex justify-between w-[90%] mx-auto'>
            <p>TEAM FOLDERS</p>
            <p><Folder/></p>
        </div>
    </div>
  )
}
