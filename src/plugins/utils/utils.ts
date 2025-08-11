import dayjs, { Dayjs } from 'dayjs'

export function snakeObjectToCamelObject<T, U>(obj: T): U {
    const camelObj: any = {}
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            if (key[0] !== '_') {
                const camelKey = key.replace(/_([a-z])/g, (_match, p1) => p1.toUpperCase())
                camelObj[camelKey] = obj[key]
            }
        }
    }
    return camelObj
}

export const mapShiftsToDays = (days: any, record: any) => {
    const mapped: Record<string, any> = {};
    const { apply_on_days, type, start_time, end_time } = record;

    for (let i = 0; i < days.length; i++) {
        const day = days[i];

        if (apply_on_days.includes(day)) {
            let colSpan = 1;
            // Hitung span jika hari berikutnya juga termasuk
            while (
                i + colSpan < days.length &&
                apply_on_days.includes(days[i + colSpan])
            ) {
                colSpan++;
            }

            mapped[day] = {
                type,
                time: `${start_time[0]} - ${end_time[0]}`, // gunakan jam pertama
                colSpan,
            };

            // tandai hari setelahnya untuk diskip
            for (let j = 1; j < colSpan; j++) {
                mapped[days[i + j]] = { skip: true };
            }

            i += colSpan - 1; // lewati yang sudah masuk span
        }
    }

    return mapped;
};

export const getDatesByDay = (
    start: dayjs.Dayjs | null,
    end: dayjs.Dayjs | null,
    days: string[]
) => {
    const result: Record<string, string> = {};

    let baseDate = dayjs(); // default hari ini
    let weekStart = baseDate.startOf('week').add(1, 'day'); // start dari Senin minggu ini

    if (start && end) {
        // Kalau ada range yang dipilih, pakai start-nya aja dan lanjut 6 hari ke depan
        for (let i = 0; i < days.length; i++) {
            const date = start.clone().add(i, 'day');
            result[days[i]] = date.format('MMM DD, YYYY');
        }
    } else {
        // Kalau belum pilih range, pakai minggu berjalan
        for (let i = 0; i < days.length; i++) {
            const date = weekStart.clone().add(i, 'day');
            result[days[i]] = date.format('MMM DD, YYYY');
        }
    }

    return result;
};

export const getTimeDiffInMinutes = (start: string, end: string): number => {
    const [startH, startM] = start.split(":").map(Number);
    const [endH, endM] = end.split(":").map(Number);
    const startTotal = startH * 60 + startM;
    const endTotal = endH * 60 + endM;
    return endTotal - startTotal;
}

export const formatTime = (secs: number) => {
    const h = String(Math.floor(secs / 3600)).padStart(2, "0");
    const m = String(Math.floor((secs % 3600) / 60)).padStart(2, "0");
    const s = String(secs % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
};

export const getDayShort = (dayName: string) => {
    return new Intl.DateTimeFormat('en-US', { weekday: 'short' })
        .format(new Date(dayName + ' 2023-01-01'));
};

console.log(getDayShort('Monday')); // Mon


// Format waktu
export const dateFormats = [
    { label: 'YYYY-MM-DD', value: 'YYYY-MM-DD' },
    { label: 'DD-MM-YYYY', value: 'DD-MM-YYYY' },
    { label: 'MM-DD-YYYY', value: 'MM-DD-YYYY' },
    { label: 'DD/MM/YYYY', value: 'DD/MM/YYYY' },
    { label: 'MM/DD/YYYY', value: 'MM/DD/YYYY' },
    { label: 'YYYY/MM/DD', value: 'YYYY/MM/DD' },
    { label: 'DD MMM YYYY', value: 'DD MMM YYYY' },
    { label: 'MMM DD, YYYY', value: 'MMM DD, YYYY' },
]

export const timeFormats = [
    { label: 'HH:mm (24-hour)', value: 'HH:mm' },
    { label: 'hh:mm A (12-hour)', value: 'hh:mm A' },
    { label: 'HH:mm:ss (24-hour with seconds)', value: 'HH:mm:ss' },
    { label: 'hh:mm:ss A (12-hour with seconds)', value: 'hh:mm:ss A' },
]

// Timezone
export const timezones = [
    { label: 'Asia/Jakarta (GMT+7)', value: 'Asia/Jakarta' },
    { label: 'Asia/Singapore (GMT+8)', value: 'Asia/Singapore' },
    { label: 'Asia/Tokyo (GMT+9)', value: 'Asia/Tokyo' },
    { label: 'Europe/London (GMT+0)', value: 'Europe/London' },
    { label: 'Europe/Paris (GMT+1)', value: 'Europe/Paris' },
    { label: 'America/New_York (GMT-5)', value: 'America/New_York' },
    { label: 'America/Los_Angeles (GMT-8)', value: 'America/Los_Angeles' },
    { label: 'Australia/Sydney (AEST/AEDT)', value: 'Australia/Sydney' },
    { label: 'Australia/Melbourne (AEST/AEDT)', value: 'Australia/Melbourne' },
    // { label: 'Australia/Brisbane (AEST)', value: 'Australia/Brisbane' },
    // { label: 'Australia/Perth (AWST)', value: 'Australia/Perth' },
    // { label: 'Australia/Adelaide (ACST/ACDT)', value: 'Australia/Adelaide' },
    // { label: 'Australia/Darwin (ACST)', value: 'Australia/Darwin' },
    // { label: 'Australia/Hobart (AEST/AEDT)', value: 'Australia/Hobart' },
    // { label: 'Australia/Broken_Hill (ACST/ACDT)', value: 'Australia/Broken_Hill' },
    // { label: 'Australia/Lord_Howe (LHST/LHDT)', value: 'Australia/Lord_Howe' }
]

export const defaultTimes: Record<string, { start: string; end: string }[]> = {
    monday: [
        { start: '8:00am', end: '12:00pm' },
        { start: '1:00pm', end: '4:00pm' },
    ],
    tuesday: [
        { start: '8:00am', end: '12:00pm' },
        { start: '1:00pm', end: '4:00pm' },
    ],
    wednesday: [
        { start: '8:00am', end: '12:00pm' },
        { start: '1:00pm', end: '4:00pm' },
    ],
    thursday: [
        { start: '8:00am', end: '12:00pm' },
        { start: '1:00pm', end: '4:00pm' },
    ],
    friday: [
        { start: '8:00am', end: '11:45am' },
        { start: '1:15pm', end: '4:00pm' },
    ],
    saturday: [
        { start: '8:00am', end: '12:00pm' },
        { start: '1:00pm', end: '2:00pm' },
    ],
    sunday: [
        { start: '', end: '' },
        { start: '', end: '' },
    ],
};
