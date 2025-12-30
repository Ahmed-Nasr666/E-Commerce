export interface Address {
  results: number
  status: string
  data: Daum[]
  message?:string
}

export interface Daum {
  _id: string
  name: string
  details: string
  phone: string
  city: string
}