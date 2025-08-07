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

export type LeavePermitType = {
    id?: string | number | undefined
    employee_name: string
    role: string
    leave_type: string
    email: string
    status: string
    start_date: string
    end_date: string
    duration: string
    description: string
    attachment: string
}

export type EmployeeType = {
    id?: string | number | undefined
    employee_id: string
    employee_name: string
    email: string
    role: string
    joining_date: string
    status: string
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
        note: '',
        total_hours: '4h 00m'
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

export const leavePermitData: LeavePermitType[] = [
    {
        id: 1,
        employee_name: 'Marcella Indarwati',
        role: 'UI/UX Designer',
        leave_type: 'Annual Leave',
        email: 'marcella@gmail.com',
        status: 'Pending',
        start_date: '07:56 AM',
        end_date: '12:03 PM',
        duration: '4h 00m',
        description: 'Prepare Report',
        attachment: ''
    },
    {
        id: 2,
        employee_name: 'Marcella Indarwati',
        role: 'UI/UX Designer',
        leave_type: 'Sick Permit',
        email: 'marcella@gmail.com',
        status: 'Rejected',
        start_date: '07:56 AM',
        end_date: '12:03 PM',
        duration: '4h 00m',
        description: 'Prepare Desain',
        attachment: ''
    },
    {
        id: 3,
        employee_name: 'Marcella Indarwati',
        role: 'UI/UX Designer',
        leave_type: 'Early Leave',
        email: 'marcella@gmail.com',
        status: 'Approved',
        start_date: '07:56 AM',
        end_date: '12:03 PM',
        duration: '4h 00m',
        description: 'Prepare Desain',
        attachment: ''
    },
    {
        id: 4,
        employee_name: 'Marcella Indarwati',
        role: 'UI/UX Designer',
        leave_type: 'Bereavement Leave',
        email: 'marcella@gmail.com',
        status: 'Approved',
        start_date: '07:56 AM',
        end_date: '12:03 PM',
        duration: '4h 00m',
        description: 'Prepare Desain',
        attachment: ''
    },
    {
        id: 5,
        employee_name: 'Marcella Indarwati',
        role: 'UI/UX Designer',
        leave_type: 'Personal Permit',
        email: 'marcella@gmail.com',
        status: 'Approved',
        start_date: '07:56 AM',
        end_date: '12:03 PM',
        duration: '4h 00m',
        description: 'Prepare Desain',
        attachment: ''
    }
]

export const employeeData = [
    {
        id: 1,
        employee_id: '2198087',
        employee_name: 'Marcella Indarwati',
        role: 'UI/UX Designer',
        email: 'marcella@gmail.com',
        joining_date: 'June 02, 2025',
        status: 'Active',
    },
    {
        id: 2,
        employee_id: '2198088',
        employee_name: 'Yuliana Dwi',
        role: 'Front End Developer',
        email: 'yuliana@gmail.com',
        joining_date: 'June 02, 2025',
        status: 'Leave',
    },
    {
        id: 3,
        employee_id: '2198089',
        employee_name: 'Lili Purnama',
        role: 'Back End Developer',
        email: 'lili@gmail.com',
        joining_date: 'June 02, 2025',
        status: 'Resign',
    }
]