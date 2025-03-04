export interface Booking {
  id: number;
  user: number;
  movie_title: number;
  num_seats: number;
  user_name: string;
  showtime: string;
  movie_id: number
}

export interface BookingFormData {
  num_seats:number;
}