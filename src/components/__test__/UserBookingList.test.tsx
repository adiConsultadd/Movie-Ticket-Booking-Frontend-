import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import UserBookingList from "../../components/bookings/UserBookingList"
import * as toastUtils from "../../utils/toast"

// Mock the Redux store and actions
vi.mock("../../store/slices/bookingSlice", () => ({
  fetchUserBookings: vi.fn(() => ({ type: "bookings/fetchUserBookings" })),
  cancelBooking: vi.fn((id) => ({ type: "bookings/cancelBooking", payload: id })),
  clearBookingSuccess: vi.fn(() => ({ type: "bookings/clearBookingSuccess" })),
}))

// Mock the toast utilities
vi.mock("../../utils/toast", () => ({
  showSuccess: vi.fn(),
  showError: vi.fn(),
}))

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

describe("UserBookingList", () => {
  // Mock window.confirm
  window.confirm = vi.fn(() => true)

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("renders error state when there is an error", () => {
    const store = createMockStore({
      bookings: [],
      loading: false,
      error: "Failed to load bookings",
      success: null,
    })

    render(
      <Provider store={store}>
        <UserBookingList />
      </Provider>,
    )

    expect(screen.getByText("Failed to load bookings")).toBeInTheDocument()
    expect(toastUtils.showError).toHaveBeenCalled()
  })

  it("renders no bookings message when bookings array is empty", () => {
    const store = createMockStore({
      bookings: [],
      loading: false,
      error: null,
      success: null,
    })

    render(
      <Provider store={store}>
        <UserBookingList />
      </Provider>,
    )

    expect(screen.getByText("No bookings found")).toBeInTheDocument()
    expect(screen.getByText("You haven't booked any movies yet.")).toBeInTheDocument()
  })

  it("renders bookings table when bookings are available", () => {
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

    expect(screen.getByText("Avengers Infinity War")).toBeInTheDocument()
    expect(screen.getByText("Avengers: Age of Ultron")).toBeInTheDocument()
    expect(screen.getAllByText("Aman")).toHaveLength(2)
  })

  it("calls cancelBooking when cancel button is clicked", () => {
    const store = createMockStore({
      bookings: mockBookings,
      loading: false,
      error: null,
      success: null,
    })

    const { getAllByText } = render(
      <Provider store={store}>
        <UserBookingList />
      </Provider>,
    )

    // Click the first "Cancel" button
    fireEvent.click(getAllByText("Cancel")[0])

    // Check if window.confirm was called
    expect(window.confirm).toHaveBeenCalledWith("Are you sure you want to cancel this booking?")

    // Check if cancelBooking was dispatched with the correct ID
    expect(store.getState().bookings.bookings[0].movie_id).toBe(2)
  })
})

