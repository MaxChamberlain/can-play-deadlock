'use client'
import dayjs from 'dayjs'
import tz from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { useEffect, useState } from 'react'
import Command from './command'
import WarnIcon from '../assets/warn-icon.svg'
import Image from 'next/image'
import { type Server } from '../page'

export default function ListItem({
  server,
  i,
  servers
}: {
  server: Server
  i: number
  servers: Server[]
}) {
  dayjs.extend(tz)
  dayjs.extend(utc)

  const [currentTimeInTimezone, setTime] = useState(
    dayjs().utc().tz(server.timezone)
  )

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(dayjs().utc().tz(server.timezone))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

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

  return (
    <div
      className={`flex flex-col w-full bg-white pb-6 pt-2 mt-[1px] ${
        i === servers.length - 1 ? 'rounded-b-lg' : 'border-b'
      } border-l-4 ${
        isOpen ? 'border-l-green-500' : 'border-l-red-500 text-[#808080]'
      }`}
    >
      <div className={`flex gap-4 w-full justify-between items-center px-4`}>
        <div className='flex gap-4 items-center'>
          <div
            className={`w-2 h-2 rounded-full ${
              isOpen ? 'bg-green-500' : 'bg-red-500'
            }`}
          />
          <p className='font-bold text-lg'>{server.name}</p>
        </div>
      </div>
      <div className='grid grid-cols-3 items-center gap-4'>
        <div className='col-span-2'>
          <div
            className={
              'border border-stone-200 rounded-t-lg bg-white w-11/12 mx-auto grid grid-cols-2 text-sm' +
              ([0, 5, 6].includes(currentDayOfWeek) ? ' opacity-50' : '')
            }
          >
            <div className='p-2 border-r border-stone-200'>
              Monday - Thursday
            </div>
            <div className='p-2'>
              {server.open_times.weekdays[0] % 12}{' '}
              {server.open_times.weekdays[0] < 12 ? 'AM' : 'PM'}
              &nbsp;-&nbsp;
              {server.open_times.weekdays[1] % 12}{' '}
              {server.open_times.weekdays[1] < 12 ? 'AM' : 'PM'}
              &nbsp;
            </div>
          </div>
          <div
            className={
              'border border-stone-200 rounded-b-lg bg-white w-11/12 mx-auto grid grid-cols-2 text-sm' +
              (![0, 5, 6].includes(currentDayOfWeek) ? ' opacity-50' : '')
            }
          >
            <div className='p-2 border-r border-stone-200'>Friday - Sunday</div>
            <div className='p-2'>
              {server.open_times.weekends[0] % 12}{' '}
              {server.open_times.weekends[0] < 12 ? 'AM' : 'PM'}
              &nbsp;-&nbsp;
              {server.open_times.weekends[1] % 12}{' '}
              {server.open_times.weekends[1] < 12 ? 'AM' : 'PM'}
              &nbsp;
            </div>
          </div>
        </div>
        <div>
          <div className='bg-white w-full flex justify-center text-sm'>
            <p className='px-2 py-1'>
              Current time: {currentTimeInTimezone.format('h:mm A')}
            </p>
          </div>
          <div className='bg-white w-full flex justify-center text-sm'>
            <p className='px-2 py-1'>
              <Image
                src={WarnIcon}
                alt='Warning icon'
                width={16}
                height={16}
                className='text-yellow-500 inline-block mr-2'
              />
              {isOpen ? `Closes in ${closesIn}` : `Opens in ${opensIn}`}
            </p>
          </div>
        </div>
      </div>
      <div className='flex items-center justify-center py-2 gap-2 mx-auto text-xs mt-2 -mb-6 bg-blue-100/50 w-full'>
        <p>Use the following command to switch to this server</p>
        <Command command={server.command} />
      </div>
    </div>
  )
}
