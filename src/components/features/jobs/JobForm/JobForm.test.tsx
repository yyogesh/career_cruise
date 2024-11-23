import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import JobForm from './JobForm';
import { Job } from '../../../../services/api/job.service';

const mockJob: Job = {
  id: '1',
  title: 'Software Engineer',
  company: 'Tech Corp',
  location: 'New York',
  description: 'A great job opportunity',
  requirements: ['React', 'TypeScript'],
  type: 'full-time',
  salary: {
    min: 80000,
    max: 120000,
    currency: 'USD',
  },
  createdAt: '2023-01-01',
  updatedAt: '2023-01-01',
};

describe('JobForm Component', () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders empty form when no initial data is provided', () => {
    render(<JobForm onSubmit={mockOnSubmit} />);
    
    expect(screen.getByLabelText('Job Title')).toHaveValue('');
    expect(screen.getByLabelText('Company')).toHaveValue('');
    expect(screen.getByLabelText('Location')).toHaveValue('');
  });

  it('renders form with initial data when provided', () => {
    render(<JobForm initialData={mockJob} onSubmit={mockOnSubmit} />);
    
    expect(screen.getByLabelText('Job Title')).toHaveValue(mockJob.title);
    expect(screen.getByLabelText('Company')).toHaveValue(mockJob.company);
    expect(screen.getByLabelText('Location')).toHaveValue(mockJob.location);
  });

  it('calls onSubmit with form data when submitted', () => {
    render(<JobForm onSubmit={mockOnSubmit} />);
    
    fireEvent.change(screen.getByLabelText('Job Title'), {
      target: { value: 'New Job' },
    });
    fireEvent.change(screen.getByLabelText('Company'), {
      target: { value: 'New Company' },
    });
    fireEvent.change(screen.getByLabelText('Location'), {
      target: { value: 'Remote' },
    });
    fireEvent.change(screen.getByLabelText('Minimum Salary'), {
      target: { value: '50000' },
    });
    fireEvent.change(screen.getByLabelText('Maximum Salary'), {
      target: { value: '80000' },
    });

    fireEvent.submit(screen.getByRole('form'));

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    expect(mockOnSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'New Job',
        company: 'New Company',
        location: 'Remote',
        salary: {
          min: 50000,
          max: 80000,
          currency: 'USD',
        },
      })
    );
  });

  it('disables form submission when loading', () => {
    render(<JobForm onSubmit={mockOnSubmit} loading={true} />);
    
    const submitButton = screen.getByRole('button', { name: /saving/i });
    expect(submitButton).toBeDisabled();
  });
}); 