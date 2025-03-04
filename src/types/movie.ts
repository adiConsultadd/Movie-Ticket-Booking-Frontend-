export interface Movie{
  id:number;
  title: string;
  description: string;
  duration: number;
  price: number;
  showtime: string;
  total_seats:number;
  available_seats:number
}
  
export interface MovieFormData{
  title: string;
  description: string;
  duration:number;
  price: number;
  showtime: string;
  total_seats: number;
}
  