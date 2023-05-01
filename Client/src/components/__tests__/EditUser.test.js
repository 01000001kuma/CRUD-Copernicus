import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EditUser from './EditUser';

jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: { first: 'John', last: 'Doe', email: 'john.doe@example.com', company: 'Acme', country: 'USA' } })),
  put: jest.fn(() => Promise.resolve({ data: 'User updated successfully' })),
}));
jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}));

describe('EditUser', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(<EditUser />);
  });

  it('should render the Edit User form', async () => {
    expect(screen.getByText('Edit User')).toBeInTheDocument();
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Last name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Company')).toBeInTheDocument();
    expect(screen.getByLabelText('Country')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Update' })).toBeInTheDocument();
  });

  it('should populate the form with user data', async () => {
    expect(screen.getByLabelText('Name')).toHaveValue('John');
    expect(screen.getByLabelText('Last name')).toHaveValue('Doe');
    expect(screen.getByLabelText('Email')).toHaveValue('john.doe@example.com');
    expect(screen.getByLabelText('Company')).toHaveValue('Acme');
    expect(screen.getByLabelText('Country')).toHaveValue('USA');
  });

  it('should update user data and redirect to home page', async () => {
    const updateButton = screen.getByRole('button', { name: 'Update' });

    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Jane' } });
    fireEvent.change(screen.getByLabelText('Last name'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'jane.doe@example.com' } });
    fireEvent.change(screen.getByLabelText('Company'), { target: { value: 'Acme Inc.' } });
    fireEvent.change(screen.getByLabelText('Country'), { target: { value: 'Canada' } });

    fireEvent.click(updateButton);

    // eslint-disable-next-line no-undef
    expect(axios.put).toHaveBeenCalledWith('/api/user/updateuser/_id_', {
      first: 'Jane',
      last: 'Doe',
      email: 'jane.doe@example.com',
      company: 'Acme Inc.',
      country: 'Canada',
      _id: '_id_',
    });

    await Promise.resolve(); // wait for state update and setTimeout

    expect(window.location.href).toEqual('/');
    // eslint-disable-next-line no-undef
    expect(sweetalert2.fire).toHaveBeenCalledWith('User updated successfully', expect.anything());
  });
});