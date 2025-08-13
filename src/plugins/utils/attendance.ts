import dayjs from 'dayjs'
import { defaultTimes } from './utils'

export type AttendanceStatus =
    | 'off_day'
    | 'can_check_in'
    | 'can_start_break'
    | 'can_finish_break'
    | 'can_checkout'
    | 'working';

export const convertTo24 = (time: string) => {
    return dayjs(time, ['h:mma']).format('HH:mm');
}

export const getAttendanceStatus = (formData: any): AttendanceStatus => {
    const now = dayjs()
    const day = now.format('dddd').toLowerCase()
    const times = defaultTimes[day]

    if (!times || times.every(t => !t.start)) return 'off_day'

    // take current time, shift start and shift end per day
    const currentTime = now.format('HH:mm')
    const shift1 = times[0]
    const shift1Start = convertTo24(shift1.start)
    const shift1End = convertTo24(shift1.end)
    const shift2 = times[1]
    const shift2Start = convertTo24(shift2.start)
    const shift2End = convertTo24(shift2.end)

    //check_in flow -> photo, location, device is required

    console.log(currentTime, shift1Start, shift2Start)
    // checkin 08.00-12.00
    if (!formData.check_in_photo.length) {
        if (currentTime >= shift1Start && currentTime <= shift1End) {
            return 'can_check_in';
        }
    }
    // start break 12.00 -13.00
    if (currentTime >= shift1End && currentTime < shift2Start) {
        return 'can_start_break'
    }

    // finish break 13.00
    if (currentTime >= shift1End && currentTime < shift2Start) {
        return 'can_finish_break'
    }

    // checkout 16.00 ke atas
    if (currentTime >= shift2End) {
        return 'can_checkout'
    }
    return 'working'
}