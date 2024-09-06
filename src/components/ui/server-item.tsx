import { type Server } from '@/app/page'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from './table'
import dayjs, { Dayjs } from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

export default function ServerItem({ server }: { server: Server }) {
  dayjs.extend(utc)
  dayjs.extend(timezone)
  return (
    <div className='w-full max-w-6xl mx-auto bg-black rounded-xl p-4'>
      <h1 className='text-4xl font-bold inline-block'>{server.name}</h1>
      {server.isOpen ? (
        <p className='text-base -translate-y-1 text-white/70 inline-block ml-4'>
          Open
        </p>
      ) : (
        <p className='text-base -translate-y-1  text-white/70 inline-block ml-4'>
          Closed
        </p>
      )}
      <div className='mt-4'>
        Current time: {server.currentTimeInTimezone.format('h:mm A')} (
        {server.timezone})
      </div>
      <div className='mb-4'>
        {server.isOpen
          ? `Closes ${dayjs(server.nextCloseTime).format('h:mm A')} (${
              server.closesIn
            } from now)`
          : `Opens ${dayjs(server.nextOpenTime).format('h:mm A')} (${
              server.opensIn
            } from now)`}
      </div>
      <div>
        Press <code>F7</code> in game and paste this code to switch to this
        server:
      </div>
      <div
        className='bg-white/10 rounded-lg p-4 cursor-pointer'
        onClick={() => {
          navigator.clipboard.writeText(server.command)
        }}
      >
        <code className='text-white'>{server.command}</code>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-1/4'>Day</TableHead>
            <TableHead className='w-1/4'>Times</TableHead>
            <TableHead className='w-1/2'></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Monday</TableCell>
            <TableCell>
              {dayjs()
                .utc()
                .tz(server.timezone)
                .set('hour', server.open_times.weekdays[0])
                .format('h A')}{' '}
              &nbsp;-&nbsp;
              {dayjs()
                .utc()
                .tz(server.timezone)
                .set('hour', server.open_times.weekdays[1])
                .format('h A')}
            </TableCell>
            {server.currentTimeInTimezone.day() === 1 && (
              <TableCell>
                <div className='flex flex-col justify-center w-full items-center'>
                  <div className='w-full h-1 bg-blue-500/80 rounded-full relative'>
                    <div
                      className='h-1 bg-red-500 rounded-full absolute top-0 left-0'
                      style={{
                        width: `${
                          (100 *
                            (server.currentTimeInTimezone.hour() * 60 +
                              server.currentTimeInTimezone.minute() -
                              server.open_times.weekdays[0] * 60)) /
                          dayjs()
                            .utc()
                            .set('hour', server.open_times.weekdays[1])
                            .add(1, 'day')
                            .set('minute', 0)
                            .set('second', 0)
                            .diff(
                              dayjs()
                                .utc()
                                .set('hour', server.open_times.weekdays[0]),
                              'minutes'
                            )
                        }%`
                      }}
                    ></div>
                  </div>
                  <div className='w-full flex justify-between text-[10px] mt-0.5'>
                    <p>
                      {server.open_times.weekdays[0] % 12}{' '}
                      {server.open_times.weekdays[0] < 12 ? 'AM' : 'PM'}
                    </p>
                    <p>
                      {server.open_times.weekdays[1] % 12}{' '}
                      {server.open_times.weekdays[1] < 12 ? 'AM' : 'PM'}
                    </p>
                  </div>
                </div>
              </TableCell>
            )}
          </TableRow>
          <TableRow>
            <TableCell>Tuesday</TableCell>
            <TableCell>
              {dayjs()
                .utc()
                .tz(server.timezone)
                .set('hour', server.open_times.weekdays[0])
                .format('h A')}{' '}
              &nbsp;-&nbsp;
              {dayjs()
                .utc()
                .tz(server.timezone)
                .set('hour', server.open_times.weekdays[1])
                .format('h A')}
            </TableCell>
            {server.currentTimeInTimezone.day() === 2 && (
              <TableCell>
                <div className='flex flex-col justify-center w-full items-center'>
                  <div className='w-full h-1 bg-blue-500/80 rounded-full relative'>
                    <div
                      className='h-1 bg-red-500 rounded-full absolute top-0 left-0'
                      style={{
                        width: `${
                          (100 *
                            (server.currentTimeInTimezone.hour() * 60 +
                              server.currentTimeInTimezone.minute() -
                              server.open_times.weekdays[0] * 60)) /
                          dayjs()
                            .utc()
                            .set('hour', server.open_times.weekdays[1])
                            .add(1, 'day')
                            .set('minute', 0)
                            .set('second', 0)
                            .diff(
                              dayjs()
                                .utc()
                                .set('hour', server.open_times.weekdays[0]),
                              'minutes'
                            )
                        }%`
                      }}
                    ></div>
                  </div>
                  <div className='w-full flex justify-between text-[10px] mt-0.5'>
                    <p>
                      {server.open_times.weekdays[0] % 12}{' '}
                      {server.open_times.weekdays[0] < 12 ? 'AM' : 'PM'}
                    </p>
                    <p>
                      {server.open_times.weekdays[1] % 12}{' '}
                      {server.open_times.weekdays[1] < 12 ? 'AM' : 'PM'}
                    </p>
                  </div>
                </div>
              </TableCell>
            )}
          </TableRow>
          <TableRow>
            <TableCell>Wednesday</TableCell>
            <TableCell>
              {dayjs()
                .utc()
                .tz(server.timezone)
                .set('hour', server.open_times.weekdays[0])
                .format('h A')}{' '}
              &nbsp;-&nbsp;
              {dayjs()
                .utc()
                .tz(server.timezone)
                .set('hour', server.open_times.weekdays[1])
                .format('h A')}
            </TableCell>
            {server.currentTimeInTimezone.day() === 3 && (
              <TableCell>
                <div className='flex flex-col justify-center w-full items-center'>
                  <div className='w-full h-1 bg-blue-500/80 rounded-full relative'>
                    <div
                      className='h-1 bg-red-500 rounded-full absolute top-0 left-0'
                      style={{
                        width: `${
                          (100 *
                            (server.currentTimeInTimezone.hour() * 60 +
                              server.currentTimeInTimezone.minute() -
                              server.open_times.weekdays[0] * 60)) /
                          dayjs()
                            .utc()
                            .set('hour', server.open_times.weekdays[1])
                            .add(1, 'day')
                            .set('minute', 0)
                            .set('second', 0)
                            .diff(
                              dayjs()
                                .utc()
                                .set('hour', server.open_times.weekdays[0]),
                              'minutes'
                            )
                        }%`
                      }}
                    ></div>
                  </div>
                  <div className='w-full flex justify-between text-[10px] mt-0.5'>
                    <p>
                      {server.open_times.weekdays[0] % 12}{' '}
                      {server.open_times.weekdays[0] < 12 ? 'AM' : 'PM'}
                    </p>
                    <p>
                      {server.open_times.weekdays[1] % 12}{' '}
                      {server.open_times.weekdays[1] < 12 ? 'AM' : 'PM'}
                    </p>
                  </div>
                </div>
              </TableCell>
            )}
          </TableRow>
          <TableRow>
            <TableCell>Thursday</TableCell>
            <TableCell>
              {dayjs()
                .utc()
                .tz(server.timezone)
                .set('hour', server.open_times.weekdays[0])
                .format('h A')}{' '}
              &nbsp;-&nbsp;
              {dayjs()
                .utc()
                .tz(server.timezone)
                .set('hour', server.open_times.weekdays[1])
                .format('h A')}
            </TableCell>
            {server.currentTimeInTimezone.day() === 4 && (
              <TableCell>
                <div className='flex flex-col justify-center w-full items-center'>
                  <div className='w-full h-1 bg-blue-500/80 rounded-full relative'>
                    <div
                      className='h-1 bg-red-500 rounded-full absolute top-0 left-0'
                      style={{
                        width: `${
                          (100 *
                            (server.currentTimeInTimezone.hour() * 60 +
                              server.currentTimeInTimezone.minute() -
                              server.open_times.weekends[0] * 60)) /
                          dayjs()
                            .utc()
                            .set('hour', server.open_times.weekends[1])
                            .add(1, 'day')
                            .set('minute', 0)
                            .set('second', 0)
                            .diff(
                              dayjs()
                                .utc()
                                .set('hour', server.open_times.weekends[0]),
                              'minutes'
                            )
                        }%`
                      }}
                    ></div>
                  </div>
                  <div className='w-full flex justify-between text-[10px] mt-0.5'>
                    <p>
                      {server.open_times.weekends[0] % 12}{' '}
                      {server.open_times.weekends[0] < 12 ? 'AM' : 'PM'}
                    </p>
                    <p>
                      {server.open_times.weekends[1] % 12}{' '}
                      {server.open_times.weekends[1] < 12 ? 'AM' : 'PM'}
                    </p>
                  </div>
                </div>
              </TableCell>
            )}
          </TableRow>
          <TableRow>
            <TableCell>Friday</TableCell>
            <TableCell>
              {dayjs()
                .utc()
                .tz(server.timezone)
                .set('hour', server.open_times.weekends[0])
                .format('h A')}{' '}
              &nbsp;-&nbsp;
              {dayjs()
                .utc()
                .tz(server.timezone)
                .set('hour', server.open_times.weekends[1])
                .format('h A')}
            </TableCell>
            {server.currentTimeInTimezone.day() === 5 && (
              <TableCell>
                <div className='flex flex-col justify-center w-full items-center'>
                  <div className='w-full h-1 bg-blue-500/80 rounded-full relative'>
                    <div
                      className='h-1 bg-red-500 rounded-full absolute top-0 left-0'
                      style={{
                        width: `${
                          (100 *
                            (server.currentTimeInTimezone.hour() * 60 +
                              server.currentTimeInTimezone.minute() -
                              server.open_times.weekends[0] * 60)) /
                          dayjs()
                            .utc()
                            .set('hour', server.open_times.weekends[1])
                            .add(1, 'day')
                            .set('minute', 0)
                            .set('second', 0)
                            .diff(
                              dayjs()
                                .utc()
                                .set('hour', server.open_times.weekends[0]),
                              'minutes'
                            )
                        }%`
                      }}
                    ></div>
                  </div>
                  <div className='w-full flex justify-between text-[10px] mt-0.5'>
                    <p>
                      {server.open_times.weekends[0] % 12}{' '}
                      {server.open_times.weekends[0] < 12 ? 'AM' : 'PM'}
                    </p>
                    <p>
                      {server.open_times.weekends[1] % 12}{' '}
                      {server.open_times.weekends[1] < 12 ? 'AM' : 'PM'}
                    </p>
                  </div>
                </div>
              </TableCell>
            )}
          </TableRow>
          <TableRow>
            <TableCell>Saturday</TableCell>
            <TableCell>
              {dayjs()
                .utc()
                .tz(server.timezone)
                .set('hour', server.open_times.weekends[0])
                .format('h A')}{' '}
              &nbsp;-&nbsp;
              {dayjs()
                .utc()
                .tz(server.timezone)
                .set('hour', server.open_times.weekends[1])
                .format('h A')}
            </TableCell>
            {server.currentTimeInTimezone.day() === 6 && (
              <TableCell>
                <div className='flex flex-col justify-center w-full items-center'>
                  <div className='w-full h-1 bg-blue-500/80 rounded-full relative'>
                    <div
                      className='h-1 bg-red-500 rounded-full absolute top-0 left-0'
                      style={{
                        width: `${
                          (100 *
                            (server.currentTimeInTimezone.hour() * 60 +
                              server.currentTimeInTimezone.minute() -
                              server.open_times.weekends[0] * 60)) /
                          dayjs()
                            .utc()
                            .set('hour', server.open_times.weekends[1])
                            .add(1, 'day')
                            .set('minute', 0)
                            .set('second', 0)
                            .diff(
                              dayjs()
                                .utc()
                                .set('hour', server.open_times.weekends[0]),
                              'minutes'
                            )
                        }%`
                      }}
                    ></div>
                  </div>
                  <div className='w-full flex justify-between text-[10px] mt-0.5'>
                    <p>
                      {server.open_times.weekends[0] % 12}{' '}
                      {server.open_times.weekends[0] < 12 ? 'AM' : 'PM'}
                    </p>
                    <p>
                      {server.open_times.weekends[1] % 12}{' '}
                      {server.open_times.weekends[1] < 12 ? 'AM' : 'PM'}
                    </p>
                  </div>
                </div>
              </TableCell>
            )}
          </TableRow>
          <TableRow>
            <TableCell>Sunday</TableCell>
            <TableCell>
              {dayjs()
                .utc()
                .tz(server.timezone)
                .set('hour', server.open_times.weekends[0])
                .format('h A')}{' '}
              &nbsp;-&nbsp;
              {dayjs()
                .utc()
                .tz(server.timezone)
                .set('hour', server.open_times.weekends[1])
                .format('h A')}
            </TableCell>
            {server.currentTimeInTimezone.day() === 0 && (
              <TableCell>
                <div className='flex flex-col justify-center w-full items-center'>
                  <div className='w-full h-1 bg-blue-500/80 rounded-full relative'>
                    <div
                      className='h-1 bg-red-500 rounded-full absolute top-0 left-0'
                      style={{
                        width: `${
                          (100 *
                            (server.currentTimeInTimezone.hour() * 60 +
                              server.currentTimeInTimezone.minute() -
                              server.open_times.weekends[0] * 60)) /
                          dayjs()
                            .utc()
                            .set('hour', server.open_times.weekends[1])
                            .add(1, 'day')
                            .set('minute', 0)
                            .set('second', 0)
                            .diff(
                              dayjs()
                                .utc()
                                .set('hour', server.open_times.weekends[0]),
                              'minutes'
                            )
                        }%`
                      }}
                    ></div>
                  </div>
                  <div className='w-full flex justify-between text-[10px] mt-0.5'>
                    <p>
                      {server.open_times.weekends[0] % 12}{' '}
                      {server.open_times.weekends[0] < 12 ? 'AM' : 'PM'}
                    </p>
                    <p>
                      {server.open_times.weekends[1] % 12}{' '}
                      {server.open_times.weekends[1] < 12 ? 'AM' : 'PM'}
                    </p>
                  </div>
                </div>
              </TableCell>
            )}
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}
