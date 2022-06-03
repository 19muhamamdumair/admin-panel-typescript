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
        name : "user 1",
        roles : [1,2,3]
    },
    {
        id : 2,
        name : "user 2",
        roles : [1,4,9]

    },
    {
        id : 3,
        name : "user 3",
        roles : [1]

    },
    {
        id : 4,
        name : "user 4",
        roles : [1, 5]

    },
    {
        id : 5,
        name : "user 5",
        roles : [1, 5, 6]

    }
]