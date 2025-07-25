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

export type OvertimeType = {
    id?: string | number | undefined
    overtime_date: string
    employee_name: string
    position: string
    email: string
    status: string
    start_time: string
    end_time: string
    duration: string
    description: string
    attachment: string
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


export const overtimeData = [
    {
        id: 1,
        overtime_date: '29 June, 2025',
        employee_name: 'Marcella Indarwati',
        position: 'UI/UX Designer',
        email: 'marcella@gmail.com',
        status: 'Pending',
        start_time: '07:56 AM',
        end_time: '12:03 PM',
        duration: '4h 00m',
        description: 'Prepare Report',
        attachment: ''
    },
    {
        id: 2,
        overtime_date: '29 June, 2025',
        employee_name: 'Marcella Indarwati',
        position: 'UI/UX Designer',
        email: 'marcella@gmail.com',
        status: 'Rejected',
        start_time: '07:56 AM',
        end_time: '12:03 PM',
        duration: '4h 00m',
        description: 'Prepare Desain',
        attachment: ''
    }
]