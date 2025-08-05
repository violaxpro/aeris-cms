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