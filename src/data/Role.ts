import { environment } from "../environments/environment"
export const group_Role = [
    
    {
        id : 1,
        name : "Admin Role",
        permissions_group_id : [
            {
                permission_group_id : 1,
                permissions : [1,2,3]
            },
            {
                permission_group_id : 2,
                permissions : [1,2,3]
            }
        ]
    },
    {
        id : 2,
        name : "User Role 1",
        permissions_group_id : [
            {
                permission_group_id : 1,
                permissions : [1,2,3]
            }
        ]
    },
    {
        id : 3,
        name : "User Role 2",
        permissions_group_id : [
            {
                permission_group_id : 1,
                permissions : [1,2,3]
            },
            {
                permission_group_id : 1,
                permissions : [1,2,3]
            },
            {
                permission_group_id : 1,
                permissions : [1,2,3]
            }
        ]
    },
    {
        id : 4,
        name : "User Role 3",
        permissions_group_id : [
            {
                permission_group_id : 1,
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
        status:"active",
        name : "user 1",
        roles : [1,2,3]
    },
    {
        id : 2,
        firstname:"Kane",
        lastname:"William",
        status:"active",
        name : "user 2",
        roles : [1,4]

    },
    {
        id : 3,
        firstname:"John",
        lastname:"Doe",
        status:"suspended",
        name : "user 3",
        roles : [1]

    },
    {
        id : 4,
        firstname:"Irtaza",
        lastname:"Hammad",
        status:"pending",
        name : "user 4",
        roles : [1, 4]

    },
    {
        id : 5,
        firstname:"Ali",
        lastname:"Hassan",
        status:"pending",
        name : "user 5",
        roles : [2,3]

    },{
        id : 6,
        firstname:"Awais",
        lastname:"A",
        status:"active",
        name : "user 6",
        roles : [1,2,3]
    },
    {
        id : 7,
        firstname:"Jack",
        lastname:"Jones",
        status:"active",
        name : "user 7",
        roles : [1,4]

    },
    {
        id : 8,
        firstname:"Dj",
        lastname:"Bravo",
        status:"suspended",
        name : "user 3",
        roles : [1]

    },
    {
        id : 9,
        firstname:"Jon",
        lastname:"Snow",
        status:"pending",
        name : "user 4",
        roles : [1, 4]

    },
    {
        id : 10,
        firstname:"Lagertha",
        lastname:"Brok",
        status:"pending",
        name : "user 5",
        roles : [2,3]

    }
]