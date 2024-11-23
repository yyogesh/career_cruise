import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Input from './Input';

describe('Input Component', () => {
  it('renders input with label', () => {
    render(<Input label="Username" name="username" />);
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
  });

  it('shows error message when error prop is provided', () => {
    const errorMessage = 'This field is required';
    render(<Input label="Username" error={errorMessage} />);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('calls onChange handler when value changes', () => {
    const handleChange = jest.fn();
    render(<Input label="Username" onChange={handleChange} />);
    
    const input = screen.getByLabelText('Username');
    fireEvent.change(input, { target: { value: 'test' } });
    
    expect(handleChange).toHaveBeenCalled();
  });

  it('applies error class when error prop is provided', () => {
    render(<Input label="Username" error="Error message" />);
    const input = screen.getByLabelText('Username');
    expect(input).toHaveClass('error');
  });

  it('applies additional className when provided', () => {
    render(<Input label="Username" className="custom-class" />);
    const input = screen.getByLabelText('Username');
    expect(input).toHaveClass('custom-class');
  });
}); 