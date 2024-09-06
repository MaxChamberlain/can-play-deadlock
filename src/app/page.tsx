'use client'
import Image from 'next/image'
import DeadlockLogo from './assets/deadlock-logo.webp'
import DeadlockImage from './assets/deadlock-image.png'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import dayjs, { Dayjs } from 'dayjs'
import tz from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { useEffect, useState } from 'react'
import ServerItem from '@/components/ui/server-item'

export type Server = {
  name: string
  command: string
  open_times: {
    weekdays: [number, number]
    weekends: [number, number]
  }
  timezone: string
  isOpen?: boolean
  nextCloseTime?: Dayjs
  nextOpenTime?: Dayjs
  currentTimeInTimezone: Dayjs
  closesIn?: string
  opensIn?: string
}

export default function Home() {
  dayjs.extend(tz)
  dayjs.extend(utc)
  const servers: Server[] = [
    {
      name: 'North America',
      command: 'citadel_region_override 0',
      open_times: {
        weekdays: [17, 6],
        weekends: [13, 6]
      },
      timezone: 'America/New_York',
      currentTimeInTimezone: dayjs().utc().tz('America/New_York')
    },
    {
      name: 'Oceania',
      command: 'citadel_region_override 5',
      open_times: {
        weekdays: [14, 2],
        weekends: [10, 2]
      },
      timezone: 'Australia/Sydney',
      currentTimeInTimezone: dayjs().utc().tz('Australia/Sydney')
    },
    {
      name: 'Europe',
      command: 'citadel_region_override 1',
      open_times: {
        weekdays: [14, 2],
        weekends: [10, 2]
      },
      timezone: 'Europe/London',
      currentTimeInTimezone: dayjs().utc().tz('Europe/London')
    },
    {
      name: 'Asia',
      command: 'citadel_region_override 2',
      open_times: {
        weekdays: [16, 4],
        weekends: [12, 4]
      },
      timezone: 'Asia/Tokyo',
      currentTimeInTimezone: dayjs().utc().tz('Asia/Tokyo')
    },
    {
      name: 'South America',
      command: 'citadel_region_override 3',
      open_times: {
        weekdays: [16, 4],
        weekends: [12, 4]
      },
      timezone: 'America/Sao_Paulo',
      currentTimeInTimezone: dayjs().utc().tz('America/Sao_Paulo')
    }
  ]
  const [serversData, setServersdata] = useState(servers)
  const setServerData = () => {
    const time = dayjs().utc()
    servers.forEach((server) => {
      const serverData = getServerData(server, time)
      server.isOpen = serverData.isOpen
      server.nextCloseTime = serverData.nextCloseTime
      server.nextOpenTime = serverData.nextOpenTime
      server.currentTimeInTimezone = serverData.currentTimeInTimezone
      server.opensIn = serverData.opensIn
      server.closesIn = serverData.closesIn
    })
    setServersdata([...servers])
  }
  useEffect(() => {
    setServerData()
    const interval = setInterval(() => {
      setServerData()
    }, 1000)
    return () => clearInterval(interval)
  }, [setServerData])
  const [currentTab, setCurrentTab] = useState('0')
  return (
    <main className='w-screen min-h-screen'>
      <Image
        src={DeadlockImage}
        alt='Deadlock'
        layout='fill'
        objectFit='cover'
        className='absolute inset -z-10 blur-md opacity-10'
      />
      <div className='flex items-end w-full max-w-6xl p-4 mx-auto mt-48 justify-center gap-8'>
        <Image src={DeadlockLogo} alt='Deadlock' width={200} height={200} />
        <div>
          <h1 className='text-6xl font-bold text-white'>
            Can I Play Deadlock?
          </h1>
          <p className='text-base text-white'>
            Check if you can play Deadlock in your region, and switch to a
            region where you can play.
          </p>
        </div>
      </div>
      <p className='text-lg font-semibold text-white mt-8 text-center'>
        Check if you can play Deadlock in your region, and switch to a region
        where you can play.
      </p>
      <Tabs
        className='w-full max-w-6xl mx-auto mt-8'
        value={currentTab}
        onValueChange={(value) => setCurrentTab(value)}
      >
        <TabsList className='w-full justify-evenly bg-black/5 backdrop-blur-lg'>
          {serversData.map((server, index) => (
            <>
              <TabsTrigger
                key={server.name}
                value={String(index)}
                className={`w-full rounded-none data-[state=active]:bg-white/10 
                    ${server.isOpen ? 'bg-white/10' : 'bg-white/10 opacity-40'}
                  `}
              >
                <div
                  className={`w-1.5 h-1.5 rounded-full mr-2 ${
                    server.isOpen ? 'bg-green-500' : 'bg-red-500'
                  }`}
                />
                <span
                  className={`
                    ${
                      Number(currentTab) === index
                        ? 'text-white'
                        : 'text-white/50'
                    }
                  `}
                >
                  {server.name}
                </span>
              </TabsTrigger>
              {index < serversData.length - 1 && (
                <div className='w-px h-7 bg-white/20' />
              )}
            </>
          ))}
        </TabsList>
        {serversData.map((server, index) => (
          <TabsContent
            key={server.name}
            value={String(index)}
            className='text-white'
          >
            <ServerItem server={serversData[index]} />
          </TabsContent>
        ))}
      </Tabs>
    </main>
  )
}

function getServerData(server: Server, currentTime: Dayjs) {
  const currentTimeInTimezone = currentTime.tz(server.timezone)
  const currentDayOfWeek = currentTimeInTimezone.day()

  // Adjust open times based on the day of the week (weekdays or weekends)
  let openTimes = server.open_times.weekdays
  if (
    currentDayOfWeek === 5 ||
    currentDayOfWeek === 6 ||
    currentDayOfWeek === 0
  ) {
    openTimes = server.open_times.weekends
  }

  // Create the full opening and closing times
  const openTime = dayjs()
    .utc()
    .tz(server.timezone)
    .set('hour', openTimes[0])
    .set('minute', 0)
    .set('second', 0)

  let closeTime = dayjs()
    .utc()
    .tz(server.timezone)
    .set('hour', openTimes[1])
    .set('minute', 0)
    .set('second', 0)

  // Handle closing time that spills over into the next day (e.g., closes at 2 AM)
  if (openTimes[1] <= openTimes[0]) {
    console.log(server.name, closeTime.format('h A'))
    closeTime = closeTime.add(1, 'day')
  }

  // Check if the server is currently open
  const isOpen =
    currentTimeInTimezone.isAfter(openTime) &&
    currentTimeInTimezone.isBefore(closeTime)

  // Calculate the next opening and closing times
  let nextOpenTime = openTime
  let nextCloseTime = closeTime

  // If the server is currently closed, calculate the next open time
  if (!isOpen) {
    if (currentTimeInTimezone.isAfter(closeTime)) {
      // Server is closed, and it's after today's closing time
      nextOpenTime = nextOpenTime.add(1, 'day')
      nextCloseTime = nextOpenTime
        .add(1, 'day')
        .set('hour', openTimes[1])
        .set('minute', 0)
    }
  }

  // Calculate the time until the next opening
  const opensIn =
    nextOpenTime.diff(currentTimeInTimezone, 'minutes') >= 60
      ? `${nextOpenTime.diff(currentTimeInTimezone, 'hours')} hours`
      : `${nextOpenTime.diff(currentTimeInTimezone, 'minutes')} minutes`

  // Calculate the time until the next closing (only if the server is open)
  const closesIn =
    nextCloseTime.diff(currentTimeInTimezone, 'minutes') >= 60
      ? `${nextCloseTime.diff(currentTimeInTimezone, 'hours')} hours`
      : `${nextCloseTime.diff(currentTimeInTimezone, 'minutes')} minutes`

  return {
    isOpen,
    nextCloseTime,
    nextOpenTime,
    opensIn,
    closesIn,
    currentTimeInTimezone
  }
}
