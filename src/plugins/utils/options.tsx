export const optionsType = [
    {
        label: 'Text',
        options: [
            { label: 'Field', value: 'FIELD' },
            { label: 'Textarea', value: 'TEXTAREA' },
        ],
    },
    {
        label: 'Select',
        options: [
            { label: 'Dropdown', value: 'DROPDOWN' },
            { label: 'Checkbox', value: 'CHECKBOX' },
            { label: 'Custom Checkbox', value: 'CUSTOM-CHECKBOX' },
            { label: 'Radio Button', value: 'RADIO-BUTTON' },
            { label: 'Custom Radio Button', value: 'CUSTOM-RADIO-BUTTON' },
            { label: 'Multiple Select', value: 'MULTIPLE-SELECT' },
        ],
    },
    {
        label: 'Date',
        options: [
            { label: 'Date', value: 'DATE' },
            { label: 'Date & Time', value: 'DATE-TIME' },
            { label: 'Time', value: 'TIME' },
        ],
    },
]

export const optionsPriceType = [
    { value: 'fixed', label: 'Fixed' },
    { value: 'percent', label: 'Percent' },
]