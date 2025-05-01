import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { Search, Share } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

export default function DashboardHeader() {
  const { user } = useKindeBrowserClient()
  // console.log(user)

  return (
    <div className="flex justify-end w-full px-4 py-2">
      <div className="flex items-center gap-4">
        <Input placeholder="Search" className="w-[250px]" />
        <div className="rounded-2xl overflow-hidden">
          <Image
            alt="user logo"
            width={40}
            height={40}
            src={user?.picture || "/default-avatar.png"} // fallback image optional
          />
        </div>
        <Button className="flex items-center gap-2">
          <Share size={16} />
          Invite
        </Button>
      </div>
    </div>
  )
}
