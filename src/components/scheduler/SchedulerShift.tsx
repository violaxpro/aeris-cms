import React from "react";

const scheduleData = [
    {
        name: "Marcella Indarwati",
        role: "UI/UX Designer",
        shifts: {
            Monday: [{ time: "08:00 AM - 04:00 PM", shift: "Shift 1", color: "bg-blue-100" }],
            Friday: [{ time: "04:00 PM - 12:00 AM", shift: "Shift 2", color: "bg-orange-100" }]
        }
    },
    {
        name: "Yuliana Dwi",
        role: "Front End Developer",
        shifts: {
            Tuesday: [{ time: "12:00 AM - 08:00 AM", shift: "Shift 3", color: "bg-red-100" }],
            Thursday: [{ time: "08:00 AM - 04:00 PM", shift: "Shift 1", color: "bg-blue-100" }]
        }
    },
    {
        name: "Cahyo Nur",
        role: "Back End Developer",
        shifts: {
            Monday: [{ time: "04:00 PM - 12:00 AM", shift: "Shift 2", color: "bg-orange-100" }],
            Wednesday: [{ time: "12:00 AM - 08:00 AM", shift: "Shift 3", color: "bg-red-100" }],
            Friday: [{ time: "12:00 AM - 08:00 AM", shift: "Shift 3", color: "bg-red-100" }]
        }
    },
    {
        name: "Marcella Indarwati",
        role: "Product Designer",
        shifts: {
            Monday: [{ time: "08:00 AM - 04:00 PM", shift: "Shift 1", color: "bg-blue-100" }],
            Tuesday: [{ time: "04:00 PM - 12:00 AM", shift: "Shift 2", color: "bg-orange-100" }],
            Thursday: [{ time: "08:00 AM - 04:00 PM", shift: "Shift 1", color: "bg-blue-100" }]
        }
    },
    {
        name: "Yuliana Dwi",
        role: "Product Manager",
        shifts: {
            Tuesday: [{ time: "12:00 AM - 08:00 AM", shift: "Shift 3", color: "bg-red-100" }],
            Friday: [{ time: "04:00 PM - 12:00 AM", shift: "Shift 2", color: "bg-orange-100" }]
        }
    }
];

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function ScheduleTable() {
    return (
        <div className="p-4 overflow-auto">
            <table className="min-w-full border">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border px-4 py-2 text-left">EMPLOYEE NAME</th>
                        {days.map((day) => (
                            <th key={day} className="border px-4 py-2 text-center">
                                {day.toUpperCase()}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {scheduleData.map((employee: any, idx) => (
                        <tr key={idx}>
                            <td className="border px-4 py-2 align-top">
                                <div className="flex items-center space-x-2">
                                    <div className="w-8 h-8 bg-yellow-300 rounded-full flex items-center justify-center font-bold">
                                        {employee.name[0]}
                                    </div>
                                    <div>
                                        <div className="font-semibold">{employee.name}</div>
                                        <div className="text-sm text-gray-500">{employee.role}</div>
                                    </div>
                                </div>
                            </td>
                            {days.map((day) => (
                                <td key={day} className="border px-2 py-2 h-20 align-top">
                                    {employee.shifts[day]?.map((shift: any, sidx: number) => (
                                        <div
                                            key={sidx}
                                            className={`text-xs mb-1 p-1 rounded ${shift.color} text-center`}
                                        >
                                            <div className="font-bold">{shift.shift}</div>
                                            <div>{shift.time}</div>
                                        </div>
                                    )) || <div className="text-center text-gray-300">+</div>}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
} 
