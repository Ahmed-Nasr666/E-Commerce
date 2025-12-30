export interface SuccessLoginResponse{
    message:string
    user:UserResponse
    token:string
}
export interface FailedLoginResponse{
    message:string
    statusMsg:string
}
export interface UserResponse{
    email:string,
    password:string,
    role:string,
    name:string
}