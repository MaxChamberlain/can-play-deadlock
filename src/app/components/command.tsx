'use client'

import CopyIcon from '../assets/copy-icon.svg'
import Image from 'next/image'

export default function Command({ command }: { command: string }) {
  return (
    <code
      className='px-2 rounded-lg bg-white text-xs h-fit py-1 flex items-center gap-4 cursor-pointer'
      onClick={(e) => {
        navigator.clipboard.writeText(command)
        const target = e.currentTarget as HTMLElement
        target.style.opacity = '0.5'
        setTimeout(() => {
          target.style.opacity = '1'
        }, 5000)
      }}
    >
      {command}
      <Image
        src={CopyIcon}
        alt='Copy icon'
        width={16}
        height={16}
        className='dark:invert'
      />
    </code>
  )
}
