export type TaxType = {
    id?: string | number | undefined
    name: string
    description?: string
    value: number
}

export type TemplateType = {
    id?: string | number | undefined
    name: string
    html?: string
}

export const emailTemplateData = [
    {
        "id": 2,
        "name": "Appointment Confirmation",
        "html": "<p class=\"ql-align-center\">Appointment Confirmation</p><p class=\"ql-align-center\"><br></p><p>Dear {{patient_name}},</p><p><br></p><p>Thank you for booking a Telehealth appointment with us.</p><p><br></p><p>Below are the details of your appointment:</p><p><br></p><p>Doctor: {{ doctor }}</p><p>Date: {{ appointment_date }}</p><p>Time: {{ appointment_time }}</p><p>Clinic: {{ clinic_name }}</p><p>Appointment Type: {{ appointment_type }}</p><p><br></p><p>If you need to make any changes to your appointment, please contact us:</p><p>Email: {{ clinic_email }}</p><p>Phone: {{ clinic_number }}</p><p><br></p><p>We look forward to seeing you!</p><p><br></p><p>Warm regards,&nbsp;</p><p><br></p><p>{{ clinic_name }}</p><p><br></p><p class=\"ql-align-center\">© 2025 {{ clinic_name }}. All rights reserved.&nbsp;{{ clinic_address }}</p>",
        "created_at": "2025-04-25T03:15:17.447Z",
        "updated_at": "2025-04-25T03:15:17.447Z"
    }
]

export const smsTemplateData = [
    {
        "id": 1,
        "name": "Booking Confirmation",
        "text": "Hi {{name}}, your appointment at {{clinic_name}} with Dr. {{doctor}} on {{date}} at {{time}} is confirmed! Call {{clinic_number}} if you need help.",
        "created_at": "2025-04-25T04:49:57.922Z",
        "updated_at": "2025-04-25T04:49:57.922Z"
    }
]