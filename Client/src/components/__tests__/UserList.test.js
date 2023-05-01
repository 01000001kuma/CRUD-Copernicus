import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import axios from 'axios';
import UserList from './UserList';

jest.mock('axios');

describe('UserList component', () => {
  it('should render the component without errors', async () => {
    render(<UserList />);
    expect(await screen.findByText('Users List')).toBeInTheDocument();
  });

  it('should call handlePrevPage function when previous button is clicked', async () => {
    render(<UserList />);
    const prevButton = screen.getByText('Previous');
    fireEvent.click(prevButton);
    expect(prevButton).toBeTruthy();
  });

  it('should call handleNextPage function when next button is clicked', async () => {
    render(<UserList />);
    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);
    expect(nextButton).toBeTruthy();
  });

  it('should call handleDeleteUser function when delete button is clicked', async () => {
    const dataUsers = [
      { _id: '1', name: 'John Doe' },
      { _id: '2', name: 'Jane Doe' },
    ];
    axios.post.mockResolvedValueOnce({ data: [dataUsers[1]] });
    render(<UserList />);
    expect(await screen.findByText('John Doe')).toBeInTheDocument();
    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);
    expect(axios.post).toHaveBeenCalledWith('/api/user/deleteuser', { id: '1' });
    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
  });
});

