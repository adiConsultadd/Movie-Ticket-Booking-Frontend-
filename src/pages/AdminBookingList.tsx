import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/index";
import { fetchAllBookings } from "../store/slices/bookingSlice";
import LoadingSpinner from "../components/ui/Loader";

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(dateString).toLocaleString("en-US", options);
};

const AdminBookingList = () => {
  const dispatch = useDispatch();
  const { allBookings, loading, error } = useSelector(
    (state: RootState) => state.bookings
  );

  useEffect(() => {
    dispatch(fetchAllBookings() as any);
  }, [dispatch]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="p-3 md:p-4">
      <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4">All Bookings</h2>
      {allBookings.length === 0 ? (
        <p className="text-gray-500">No bookings available.</p>
      ) : (
        <div className="overflow-x-auto -mx-3 md:mx-0">
          {/* Regular table for medium and larger screens */}
          <table className="hidden sm:table min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-3 md:py-3 md:px-4 border-b text-left">User</th>
                <th className="py-2 px-3 md:py-3 md:px-4 border-b text-left">Movie</th>
                <th className="py-2 px-3 md:py-3 md:px-4 border-b text-left">Showtime</th>
                <th className="py-2 px-3 md:py-3 md:px-4 border-b text-left">Tickets</th> 
              </tr>
            </thead>
            <tbody>
              {allBookings.map((booking, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-2 px-3 md:py-3 md:px-4 border-b">{booking.user_name}</td>
                  <td className="py-2 px-3 md:py-3 md:px-4 border-b">{booking.movie_title}</td>
                  <td className="py-2 px-3 md:py-3 md:px-4 border-b">{formatDate(booking.showtime)}</td>
                  <td className="py-2 px-3 md:py-3 md:px-4 border-b">{booking.num_seats}</td> 
                </tr>
              ))}
            </tbody>
          </table>
          
          {/* Card view for small screens */}
          <div className="sm:hidden px-3">
            {allBookings.map((booking, index) => (
              <div key={index} className="bg-white rounded-lg shadow mb-3 p-3 border border-gray-200">
                <div className="grid grid-cols-2 gap-1 text-sm">
                  <div className="text-gray-600">User:</div>
                  <div className="font-medium">{booking.user_name}</div>
                  
                  <div className="text-gray-600">Movie:</div>
                  <div className="font-medium">{booking.movie_title}</div>
                  
                  <div className="text-gray-600">Showtime:</div>
                  <div className="font-medium">{formatDate(booking.showtime)}</div>
                  
                  <div className="text-gray-600">Tickets:</div>
                  <div className="font-medium">{booking.num_seats}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBookingList;