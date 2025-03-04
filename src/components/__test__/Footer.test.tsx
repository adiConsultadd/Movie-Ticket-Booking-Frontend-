import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"

import Footer from '../../components/layout/Footer';

describe("Footer Component", () => {
  // Mock Date to ensure consistent year in tests
  const originalDate = global.Date;
  const mockDate = vi.fn(() => ({
    getFullYear: () => 2024,
  })) as unknown as DateConstructor;

  beforeEach(() => {
    global.Date = mockDate;
  });

  afterEach(() => {
    global.Date = originalDate;
    vi.restoreAllMocks();
  });

  it("renders the footer logo", () => {
    render(<Footer />);

    // Check for Movix logo
    const logoElement = screen.getByText('Movix');
    expect(logoElement).toBeInTheDocument();
  });

  it("renders the tagline", () => {
    render(<Footer />);

    // Check for tagline
    const taglineElement = screen.getByText('Book your favorite movies online');
    expect(taglineElement).toBeInTheDocument();
  });

  it("renders correct copyright year", () => {
    render(<Footer />);

    // Check for copyright with mocked year
    const copyrightElement = screen.getByText('© 2024 MovieTickets. All rights reserved.');
    expect(copyrightElement).toBeInTheDocument();
  });

  it("renders all footer links", () => {
    render(<Footer />);

    // Check for specific links
    const links = [
      'About Us',
      'Contact',
      'Terms',
      'Privacy'
    ];

    links.forEach(linkText => {
      const link = screen.getByText(linkText);
      expect(link).toBeInTheDocument();
      expect(link.tagName).toBe('A');
    });
  });

  it("has correct link styling", () => {
    render(<Footer />);

    const links = screen.getAllByRole('link');
    links.forEach(link => {
      expect(link).toHaveClass('text-gray-300');
      expect(link).toHaveClass('hover:text-white');
      expect(link).toHaveClass('text-sm');
    });
  });

  it("renders footer with responsive classes", () => {
    render(<Footer />);

    const footerElement = screen.getByText('Movix').closest('footer');
    expect(footerElement).toHaveClass('bg-gray-800');
    expect(footerElement).toHaveClass('text-white');
    expect(footerElement).toHaveClass('py-4');
    expect(footerElement).toHaveClass('sm:py-6');
    expect(footerElement).toHaveClass('mt-auto');
  });
});