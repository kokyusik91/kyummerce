import { IconHome, IconShoppingCart, IconUser } from '@tabler/icons-react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'

function Header() {
  const { data: session } = useSession()
  const router = useRouter()
  return (
    <div className="mt-12 mb-12">
      <div className="w-full flex h-50 items-center">
        <IconHome onClick={() => router.push('/')} />
        <span className="m-auto" />
        <IconShoppingCart className="mr-4" onClick={() => router.push('/cart')} />
        {session ? (
          <Image
            src={session.user?.image!}
            width={30}
            height={30}
            style={{ borderRadius: '50%' }}
            alt="유저 이미지"
            onClick={() => router.push('/my')}
          />
        ) : (
          <IconUser onClick={() => router.push('/auth/login')} />
        )}
      </div>
    </div>
  )
}

export default Header