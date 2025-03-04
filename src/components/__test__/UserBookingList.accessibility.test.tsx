import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import UserBookingList from "../../components/bookings/UserBookingList"

// Mock data
const mockBookings = [
  {
    id: 1,
    user_name: "Aman",
    movie_title: "Avengers Infinity War",
    showtime: "2025-03-26T04:39:00",
    num_seats: 1,
    movie_id: 2,
  },
  {
    id: 2,
    user_name: "Aman",
    movie_title: "Avengers: Age of Ultron",
    showtime: "2025-03-04T12:17:00",
    num_seats: 1,
    movie_id: 3,
  },
]

// Create a mock store
const createMockStore = (initialState:any) => {
  return configureStore({
    reducer: {
      bookings: (state = initialState, action) => state,
    },
    preloadedState: {
      bookings: initialState,
    },
  })
}

describe("UserBookingList Accessibility", () => {
  it("has accessible table structure with proper headers", () => {
    const store = createMockStore({
      bookings: mockBookings,
      loading: false,
      error: null,
      success: null,
    })

    render(
      <Provider store={store}>
        <UserBookingList />
      </Provider>,
    )

    // Check for table headers
    expect(screen.getByText("Movie")).toBeInTheDocument()
    expect(screen.getByText("Showtime")).toBeInTheDocument()
    expect(screen.getByText("Seats")).toBeInTheDocument()
    expect(screen.getByText("Booked By")).toBeInTheDocument()
    expect(screen.getByText("Actions")).toBeInTheDocument()

    // Check that the table has proper structure
    const table = screen.getByRole("table")
    expect(table).toBeInTheDocument()

    // Check for table rows
    const rows = screen.getAllByRole("row")
    expect(rows.length).toBe(3) // Header row + 2 data rows
  })
})

