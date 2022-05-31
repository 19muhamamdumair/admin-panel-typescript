export const permissionTypes = [
     {
        id : 1,
        name : "Permission Type 1"  
    },
    {
        id : 2,
        name :"Permission Type 2"  
    },
    {
        id : 3,
        name :"Permission Type 3"  
    },
    {
        id : 4,
        name :"Permission Type 4"  
    },
];

export const permission = [
    {
        id:  1,      
        label: "Permission 1",
        permission_id:1,
        value: "Permission 1",
        checked: true,
        permission_type_id : 1
    },
    {
        id: 2,    
        permission_id:2,
        label: "Permission 2",
        value: "Permission 2",
        checked: true,
        permission_type_id : 2
    },
    {
        id: 3, 
        permission_id:3,
        label: "Permission 3",
        value: "Permission 3",
        checked: true,
        permission_type_id : 3
    },
    {
        id:4,
        permission_id:4,
        label: "Permission 4",
        value: "Permission 4",
        checked: false,
        permission_type_id : 4
    },
    {
        id:5,
        permission_id:5,
        label: "Permission 5",
        value: "Permission 5",
        checked: false,
        permission_type_id : 3

    },
    {
        id:6,
        permission_id:6,
        label: "Permission 6",
        value: "Permission 6",
        checked: false,
        permission_type_id : 2

    },
    {
        id:7,
        permission_id:7,     
        label: "Permission 7",
        value: "Permission 7",
        checked: false,
        permission_type_id : 4

    },
    {
        id:8,
        permission_id:8,     
        label: "Permission 8",
        value: "Permission 8",
        checked: false,
        permission_type_id : 1

    },
    
    
]
export const group_permissions = [
    {
        id : 1,
        name : "Admin Permissions",
        permissions : [
            {
                permission_id : 1,
                sub_permissions : [1,2,3]
            }, {
                permission_id : 2,
                sub_permissions : [1,2,3]
            }
        ]
    },
    {
        id : 2,
        name : "Permissions Group 1",
        permissions : [
            {
                permission_id : 1,
                sub_permissions : [1,2,3]
            }
            , {
                permission_id : 2,
                sub_permissions : [1,2,3]
            }, {
                permission_id : 3,
                sub_permissions : [1,2,3]
            }
        ]
    },
    {
        id : 3,
        name : "Permissions Group 2",
        permissions : [
            {
                permission_id : 1,
                sub_permissions : [1,2,3]
            }
        ]
    },
    {
        id : 4,
        name : "Permissions Group 3",
        permissions : [
            {
                permission_id : 4,
                sub_permissions : [1,2,3]
            },
            {
                permission_id : 5,
                sub_permissions : [1,2,3]
            }, {
                permission_id : 3,
                sub_permissions : [1,2,3]
            }
        ]
    },
    {
        id : 5,
        name : "Permissions Group 4",
        permissions : [
            {
                permission_id : 8,
                sub_permissions : [1,2,3]
            },  {
                permission_id : 7,
                sub_permissions : [1,2,3]
            },
            {
                permission_id : 2,
                sub_permissions : [1,2,3]
            }, {
                permission_id : 6,
                sub_permissions : [1,2,3]
            }
        ]
    },
]
