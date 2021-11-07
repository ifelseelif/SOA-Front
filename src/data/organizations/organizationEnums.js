export const organizationEnums = [
    {
        value: 'id',
        label: 'id',
    },
    {
        value: 'name',
        label: 'name',
    },
    {
        value: 'fullName',
        label: 'full name',
    },
    {
        value: 'type',
        label: 'type',
    },
    {
        value: 'postalAddress.zipCode',
        label: 'postal address zipCode',
    },
    {
        value: 'town.x',
        label: 'town x',
    },
    {
        value: 'town.y',
        label: 'town y',
    },
    {
        value: 'town.z',
        label: 'town z',
    },
    {
        value: 'actions',
        label: 'actions',
    }
];

export const organizationFields = [
    {
        value: 'id',
        label: 'id',
        inputType: 'number'
    },
    {
        value: 'name',
        label: 'name',
        inputType: 'text'
    },
    {
        value: 'fullName',
        label: 'full name',
        inputType: 'text'
    },
    {
        value: 'type',
        label: 'type',
        inputType: 'enum'
    },
    {
        value: 'postalAddress.zipCode',
        label: 'postal address zipCode',
        inputType: 'number'
    },
    {
        value: 'town.x',
        label: 'town x',
        inputType: 'number'
    },
    {
        value: 'town.y',
        label: 'town y',
        inputType: 'number'
    },
    {
        value: 'town.z',
        label: 'town z',
        inputType: 'number'
    }
];

export const OrganizationProperties = {
    id: 'id',
    name: 'name',
    fullName: 'fullName',
    type: 'type',
    zipCode: 'postalAddress.zipCode',
    x: 'postalAddress.town.x',
    y: 'postalAddress.town.y',
    z: 'postalAddress.town.z',
}

