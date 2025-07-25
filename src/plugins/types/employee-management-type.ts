export type AttendanceType = {
    id?: string | number | undefined
    employee_name: string
    position: string
    status: string
    check_in: string
    break: string
    finish_break: string
    check_out: string
    overtime: string
    note: string
}

export const attendanceData = [
    {
        id: 1,
        employee_name: 'Marcella Indarwati',
        position: 'UI/UX Designer',
        status: 'On Time',
        check_in: '07:56 AM',
        break: '12:03 PM',
        finish_break: '13:00 PM',
        check_out: '20:00 PM',
        overtime: '4h 00m',
        note: ''
    }
]