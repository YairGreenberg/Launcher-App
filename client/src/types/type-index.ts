export interface Launcher {
    id:string,
    name: string,
    rocketType: 'Shahab3'|'Fetah110'|'Radwan'|'Kheibar',
    latitude: number,
    longitude: number,
    city: string
}

export interface User {
    id:string,
    username:string,
    email:string,
    password:string,
    user_type:string,
    last_login:Date
    
}