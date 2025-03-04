import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import { MemoryRouter, Route, Routes } from "react-router-dom"
import MovieDetails from "../../pages/MovieDetailPage"
import { fetchMovie } from "../../store/slices/movieSlice"

// Mock react-router-dom hooks
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useParams: () => ({ id: '123' }),
  }
})

// Mock components
vi.mock('../components/ui/Loader', () => ({
  default: () => <div data-testid="loading-spinner">Loading...</div>
}))

vi.mock('./MovieInfoCard', () => ({
  default: ({ movie }: any) => <div data-testid="movie-info-card">{movie.title}</div>
}))

// Mock the movie slice action
vi.mock("../../store/slices/movieSlice", () => ({
  fetchMovie: vi.fn(() => ({ type: "movies/fetchMovie" })),
}))

describe("MovieDetails Component", () => {
  const createMockStore = (initialState: any) => {
    return configureStore({
      reducer: {
        movies: (state = initialState, action) => {
          switch (action.type) {
            default:
              return state
          }
        },
      },
      preloadedState: {
        movies: initialState,
      },
    })
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("dispatches fetchMovie action when component mounts", () => {
    const store = createMockStore({
      currentMovie: null,
      loading: false,
      error: null
    })

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/movies/123']}>
          <Routes>
            <Route path="/movies/:id" element={<MovieDetails />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    )

    // Verify fetchMovie was called with the movie ID
    expect(fetchMovie).toHaveBeenCalledWith(123)
  })

  it("shows error message when movie fetch fails", () => {
    const store = createMockStore({
      currentMovie: null,
      loading: false,
      error: 'Failed to fetch movie'
    })

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/movies/123']}>
          <Routes>
            <Route path="/movies/:id" element={<MovieDetails />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    )

    // Check if error message is displayed
    const errorMessage = screen.getByText('Error: Failed to fetch movie')
    expect(errorMessage).toBeInTheDocument()
  })

  it("shows 'Movie not found' when no movie is present and no error", () => {
    const store = createMockStore({
      currentMovie: null,
      loading: false,
      error: null
    })

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/movies/123']}>
          <Routes>
            <Route path="/movies/:id" element={<MovieDetails />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    )

    // Check if default 'Movie not found' message is displayed
    const notFoundMessage = screen.getByText('Error: Movie not found')
    expect(notFoundMessage).toBeInTheDocument()
  })
})