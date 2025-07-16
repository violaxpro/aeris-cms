export type AddressType = {
    person: string
    company?: string
    first_address: string
    second_address?: string
    country: string
    state: string
    city: string
    post_code: string
}

export type TradeAccountType = {
    company_name?: string
    company_address?: string
    license_type?: string
    license_number?: string
    abn_number?: string
    trade_status?: string
}

export type UserType = {
    id?: number | string | undefined
    firstname: string
    lastname: string
    email: string
    phone: string
    roles: string
    password: string
    confirm_password?: string
    price_level: string
    credit?: string
    permission?: string
    address: AddressType
    trade_account?: TradeAccountType
    orders_history: string[]
    created: {
        name: string
        date: string
    }
    last_login: string
}

export const dummyUser = [
    {
        id: 1,
        firstname: "John",
        lastname: "Doe",
        email: "john.doe@example.com",
        phone: "+1 234 567 890",
        roles: "customer",
        password: "SecureP@ssw0rd!",
        confirm_password: "SecureP@ssw0rd!",
        price_level: "Retail",
        credit: "1000",
        permission: "read-only",
        address: {
            person: "John Doe",
            company: "Doe Enterprises",
            first_address: "123 Main Street",
            second_address: "Suite 456",
            country: "USA",
            state: "California",
            city: "Los Angeles",
            post_code: "90001"
        },
        trade_account: {
            company_name: "Doe Enterprises",
            company_address: "123 Main Street, Suite 456, Los Angeles, CA 90001",
            license_type: "Business License",
            license_number: "LIC123456",
            abn_number: "ABN789012",
            trade_status: "Active"
        },
        orders_history: [
            "ORD12345",
            "ORD67890",
            "ORD24680"
        ],
        created: {
            name: 'Admin',
            date: "2023-12-14T11:29:01.000000Z"
        },
        last_login: "2023-12-14T11:29:01.000000Z"
    }

]