import dayjs from 'dayjs'
import { defaultTimes } from './utils'

export type AttendanceStatus =
    | 'off_day'
    | 'checkin'
    | 'start_break'
    | 'finish_break'
    | 'checkout'
    | 'working'
    | 'done';

export const convertTo24 = (time: string) => {
    return dayjs(time, ['h:mma']).format('HH:mm');
}

// export const getAttendanceStatus = (formData: any): AttendanceStatus => {
//     const now = dayjs()
//     const day = now.format('dddd').toLowerCase()
//     const times = defaultTimes[day]
//     const durationWork = 8 //contoh untuk hari ini jumat, jumlah jam kerja ini diambil dari settingan fulltime capacity
//     if (!times || times.every(t => !t.start)) return 'off_day'

//     // take current time based on working time per day, shift start and shift end per day
//     const currentTime = now.format('HH:mm')
//     const shift1 = times[0]
//     const shift1Start = convertTo24(shift1.start)
//     const shift1End = convertTo24(shift1.end)
//     const shift2 = times[1]
//     const shift2Start = convertTo24(shift2.start)
//     const shift2End = convertTo24(shift2.end)

//     //check_in flow -> photo, location, device is required

//     // console.log(currentTime, shift1Start, shift2Start, shift1, shift2, times)
//     // checkin 08.00-12.00
//     if (formData.is_checkin == false) {
//         if (currentTime >= shift1Start && currentTime <= shift1End) {
//             return 'can_check_in';
//         }
//     }
//     // start break 12.00 -13.00
//     if (formData.is_start_break == false) {
//         if (currentTime >= shift1End && currentTime < shift2Start) {
//             return 'can_start_break'
//         }
//     }

//     // finish break 13.00
//     if (formData.is_finish_break == false) {
//         if (currentTime >= shift1End && currentTime <= shift2End) {
//             return 'can_finish_break'
//         }
//     }

//     // checkout 16.00 ke atas
//     if (formData.is_checkout == false) {
//         if (currentTime >= shift2End) {
//             return 'can_checkout'
//         }
//     }

//     return 'working'
// }

export const getAttendanceStatus = (formData: any): AttendanceStatus => {
    const now = dayjs().get('day')
    const durationWork = now >= 1 && now <= 5 ? 8 : (now == 6 ? 4 : 0) //contoh untuk hari ini jumat, jumlah jam kerja ini diambil dari settingan employee type capacity

    const workDuration = formData.work_duration
    const lastStatus = formData.last_status

    switch (lastStatus) {
        case undefined:
        case null:
            return 'checkin'
        case 'checkin':
            return 'start_break'
        case 'start_break':
            return 'finish_break'
        case 'finish_break':
            return 'checkout'
        case 'checkout':
            return 'checkin'

        default:
            return 'checkin'
    }
}

export const calculateOvertime = (workedDuration: number, day: number) => {
    const maxDuration = day >= 1 && day <= 5 ? 8 : (day === 6 ? 4 : 0);
    return workedDuration > maxDuration ? workedDuration - maxDuration : 0;
};

