import Image from 'next/image'
import DeadlockLogo from './assets/deadlock-logo.png'
import ListItem from './components/list-item'

export type Server = {
  name: string
  command: string
  open_times: {
    weekdays: [number, number]
    weekends: [number, number]
  }
  timezone: string
}

const servers: Server[] = [
  {
    name: 'North America',
    command: 'citadel_region_override 0',
    open_times: {
      weekdays: [17, 6],
      weekends: [13, 6]
    },
    timezone: 'America/New_York'
  },
  {
    name: 'Oceania',
    command: 'citadel_region_override 5',
    open_times: {
      weekdays: [14, 2],
      weekends: [10, 2]
    },
    timezone: 'Australia/Sydney'
  },
  {
    name: 'Europe',
    command: 'citadel_region_override 1',
    open_times: {
      weekdays: [14, 2],
      weekends: [10, 2]
    },
    timezone: 'Europe/London'
  },
  {
    name: 'Asia',
    command: 'citadel_region_override 2',
    open_times: {
      weekdays: [16, 4],
      weekends: [12, 4]
    },
    timezone: 'Asia/Tokyo'
  },
  {
    name: 'South America',
    command: 'citadel_region_override 3',
    open_times: {
      weekdays: [16, 4],
      weekends: [12, 4]
    },
    timezone: 'America/Sao_Paulo'
  }
]

export default function Home() {
  return (
    <div className='min-h-screen w-screen pb-20 gap-16 bg-black font-[family-name:var(--font-geist-sans)]'>
      <main className='flex flex-col items-center sm:items-start container mx-auto pt-4 max-w-3xl'>
        <div className='flex items-center gap-4 w-full justify-between bg-white p-4 pb-0 rounded-t-lg'>
          <h1 className='font-bold text-2xl'>Can I play deadlock?</h1>
          <Image
            className='dark:invert'
            src={DeadlockLogo}
            alt='Next.js logo'
            width={48}
            height={48}
            priority
          />
        </div>
        <div className='flex items-center gap-4 w-full  bg-blue-100 p-4 justify-center'>
          <p className='text-sm opacity-80'>
            Press&nbsp;
            <code className='py-1 px-2 rounded-lg bg-black/10'>F7</code>&nbsp;
            in game to open the console and enter a command to switch to a
            region
          </p>
        </div>
        {servers.map((server, i) => (
          <ListItem key={server.name} server={server} i={i} servers={servers} />
        ))}
      </main>
    </div>
  )
}
