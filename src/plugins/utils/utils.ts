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
