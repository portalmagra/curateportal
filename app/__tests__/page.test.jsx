import { render, screen } from '@testing-library/react'
import HomePage from '../page.jsx'

describe('HomePage', () => {
  it('renders the main heading', () => {
    render(<HomePage />)
    const heading = screen.getByRole('heading', { name: /curateportal/i })
    expect(heading).toBeInTheDocument()
  })

  it('renders the subtitle text', () => {
    render(<HomePage />)
    const subtitle = screen.getByText(/health assessment/i)
    expect(subtitle).toBeInTheDocument()
  })

  it('renders the assessment button', () => {
    render(<HomePage />)
    const button = screen.getByRole('button', { name: /start now/i })
    expect(button).toBeInTheDocument()
  })

  it('has correct styling on the button', () => {
    render(<HomePage />)
    const button = screen.getByRole('button', { name: /start now/i })
    expect(button).toHaveStyle({
      background: 'linear-gradient(135deg, #10b981, #059669)',
      color: 'rgb(255, 255, 255)',
      cursor: 'pointer'
    })
  })
})