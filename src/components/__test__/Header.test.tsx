import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import Header from "../../components/layout/Header"
import * as authSlice from "../../store/slices/authSlice"

// Mock react-router-dom hooks
const mockNavigate = vi.fn()
vi.mock('react-router-dom', () => ({
  Link: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  useNavigate: () => mockNavigate,
  useLocation: () => ({ pathname: '/' }),
}))

// Mock the Redux slice actions
vi.mock("../../store/slices/authSlice", () => ({
  logout: vi.fn(() => ({ type: "auth/logout" })),
}))

// Create a mock store with a reducer that mimics the auth slice behavior
const createMockStore = (initialState: any) => {
  return configureStore({
    reducer: {
      auth: (state = initialState, action) => {
        switch (action.type) {
          case 'auth/logout':
            return {
              ...state, 
              isAuthenticated: false, 
              user: null 
            }
          default:
            return state
        }
      },
    },
    preloadedState: {
      auth: initialState,
    },
  })
}

// Mock user data
const mockAuthenticatedUser = {
  id: 1,
  username: 'testuser',
  email: 'test@example.com'
}

describe("Header Component", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("renders logo when not authenticated", () => {
    const store = createMockStore({
      isAuthenticated: false,
      user: null,
    })

    render(
      <Provider store={store}>
        <Header />
      </Provider>
    )

    // Check if logo is rendered
    const logoElement = screen.getByText('Movix')
    expect(logoElement).toBeInTheDocument()
  })

  it("does not show logout button when not authenticated", () => {
    const store = createMockStore({
      isAuthenticated: false,
      user: null,
    })

    render(
      <Provider store={store}>
        <Header />
      </Provider>
    )

    // Logout button should not be in the document
    const logoutButton = screen.queryByText('Logout')
    expect(logoutButton).not.toBeInTheDocument()
  })

  it("shows logout button and username when authenticated", () => {
    const store = createMockStore({
      isAuthenticated: true,
      user: mockAuthenticatedUser,
    })

    render(
      <Provider store={store}>
        <Header />
      </Provider>
    )

    // Check username and logout button
    const usernameElement = screen.getByText('Hi, testuser')
    const logoutButton = screen.getByText('Logout')
    
    expect(usernameElement).toBeInTheDocument()
    expect(logoutButton).toBeInTheDocument()
  })

  it("handles logout functionality", () => {
    const store = createMockStore({
      isAuthenticated: true,
      user: mockAuthenticatedUser,
    })

    render(
      <Provider store={store}>
        <Header />
      </Provider>
    )

    // Find and click logout button
    const logoutButton = screen.getByText('Logout')
    fireEvent.click(logoutButton)

    // Verify logout action was called
    expect(authSlice.logout).toHaveBeenCalled()

    // Verify navigation to login page
    expect(mockNavigate).toHaveBeenCalledWith('/login')
  })

  it("falls back to 'User' when username is not provided", () => {
    const store = createMockStore({
      isAuthenticated: true,
      user: { id: 1 }, // user object without username
    })

    render(
      <Provider store={store}>
        <Header />
      </Provider>
    )

    // Check fallback username
    const usernameElement = screen.getByText('Hi, User')
    expect(usernameElement).toBeInTheDocument()
  })
})