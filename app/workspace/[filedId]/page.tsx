'use client'

import React from 'react'
import WorkspaceHeader from '../_components/WorkspaceHeader'
import EditorComponent from '../_components/EditorComponent'
import Editor from '../_components/Editor'
import { useParams } from 'next/navigation'

export default function page() {
const param = useParams();
console.log(param)

  return (
    <div>
      <WorkspaceHeader/>
      <div className='flex w-[95%] mx-auto'>
        <div className='w-[45%] mx-auto h-screen mt-20'>
           add here a edior
           <EditorComponent/>
        </div>
        <div className='w-[45%] h-screen mt-20'>
          add here e whiteboard
          {/* <Editor/> */}
        </div>
      </div>
    </div>
  )
}
