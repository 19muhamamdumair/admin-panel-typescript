import { environment } from "../environments/environment"
export const group_Role = [
    
    {
        id : 1,
        name : "Admin Role",
        checked:true,
        permissions_groups : [
            {
                permission_group_id : 1,
                checked:true,
                permissions : [1,2,3]
            },
            {
                permission_group_id : 2,
                checked:true,
                permissions : [1,2,3]
            }
        ]
    },
    {
        id : 2,
        name : "User Role 1",
        checked:true,
        permissions_groups: [
            {
                permission_group_id : 1,
                checked:true,
                permissions : [1,2,3]
            }
        ]
    },
    {
        id : 3,
        name : "User Role 2",
        checked:true,
        permissions_groups: [
            {
                permission_group_id : 1,
                checked:true,
                permissions : [1,2,3]
            },
            {
                permission_group_id : 2,
                checked:true,
                permissions : [1,2,3]
            },
            {
                permission_group_id : 3,
                checked:true,
                permissions : [1,2,3]
            }
        ]
    },
    {
        id : 4,
        name : "User Role 3",
        checked:true,
        permissions_groups: [
            {
                permission_group_id : 1,
                checked:true,
                permissions : [1,2,3]
            }
        ]
    }
]


export const user = [
    {
        id : 1,
        firstname:"Umair",
        lastname:"Ali",
        email:"temp@gmail.com",
        status:"Active",
        name : "user 1",
        roles : [1,2,3]
    },
    {
        id : 2,
        firstname:"Kane",
        lastname:"William",
        email:"temp@gmail.com",
        status:"Active",
        name : "user 2",
        roles : [1,4]

    },
    {
        id : 3,
        firstname:"John",
        lastname:"Doe",
        email:"temp@gmail.com",
        status:"Suspended",
        name : "user 3",
        roles : [1]

    },
    {
        id : 4,
        firstname:"Irtaza",
        lastname:"Hammad",
        email:"temp@gmail.com",
        status:"Pending",
        name : "user 4",
        roles : [1, 4]

    },
    {
        id : 5,
        firstname:"Ali",
        lastname:"Hassan",
        email:"temp@gmail.com",
        status:"Pending",
        name : "user 5",
        roles : [2,3]

    },{
        id : 6,
        firstname:"Awais",
        lastname:"A",
        email:"temp@gmail.com",
        status:"Active",
        name : "user 6",
        roles : [1,2,3]
    },
    {
        id : 7,
        firstname:"Jack",
        lastname:"Jones",
        email:"temp@gmail.com",
        status:"Active",
        name : "user 7",
        roles : [1,4]

    },
    {
        id : 8,
        firstname:"Dj",
        lastname:"Bravo",
        email:"temp@gmail.com",
        status:"Suspended",
        name : "user 3",
        roles : [1]

    },
    {
        id : 9,
        firstname:"Jon",
        lastname:"Snow",
        email:"temp@gmail.com",
        status:"Pending",
        name : "user 4",
        roles : [1, 4]

    },
    {
        id : 10,
        firstname:"Lagertha",
        lastname:"Brok",
        email:"temp@gmail.com",
        status:"Pending",
        name : "user 5",
        roles : [2,3]

    }
]