import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import Layout from "../../components/layout/Layout"

// Mock child components
vi.mock("../../components/layout/Header", () => ({
  default: () => <div data-testid="mock-header">Mocked Header</div>
}))

vi.mock("../../components/layout/Footer", () => ({
  default: () => <div data-testid="mock-footer">Mocked Footer</div>
}))

// Mock window.scrollTo
const mockScrollTo = vi.fn()
Object.defineProperty(window, 'scrollTo', {
  value: mockScrollTo,
  writable: true
})

describe("Layout Component", () => {
  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks()
  })

  it("renders Header, children, and Footer", () => {
    const TestChildren = () => <div>Test Content</div>

    render(
      <Layout>
        <TestChildren />
      </Layout>
    )

    // Check Header is rendered
    const header = screen.getByTestId('mock-header')
    expect(header).toBeInTheDocument()

    // Check children content is rendered
    const childContent = screen.getByText('Test Content')
    expect(childContent).toBeInTheDocument()

    // Check Footer is rendered
    const footer = screen.getByTestId('mock-footer')
    expect(footer).toBeInTheDocument()
  })

  it("scrolls to top when mounted", () => {
    render(<Layout>Test</Layout>)

    // Verify window.scrollTo was called with (0, 0)
    expect(mockScrollTo).toHaveBeenCalledWith(0, 0)
  })
  
  it("wraps children in responsive container", () => {
    render(<Layout>Test Content</Layout>)

    // Find the main content wrapper
    const contentWrapper = screen.getByText('Test Content').closest('div')
    
    expect(contentWrapper).toHaveClass('max-w-7xl')
    expect(contentWrapper).toHaveClass('mx-auto')
    expect(contentWrapper).toHaveClass('px-3')
    expect(contentWrapper).toHaveClass('sm:px-4')
    expect(contentWrapper).toHaveClass('md:px-6')
    expect(contentWrapper).toHaveClass('lg:px-8')
  })
})