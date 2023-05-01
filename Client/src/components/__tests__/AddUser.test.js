import React from 'react';
import { shallow } from 'enzyme';
import axios from 'axios';
import Swal from 'sweetalert2';
import AddUser from './AddUser';

jest.mock('axios');
jest.mock('sweetalert2');

describe('AddUser', () => {
  let wrapper;
  const mockUser = {
    name: 'John',
    last: 'Doe',
    email: 'johndoe@example.com',
    company: 'Acme Inc.',
    country: 'USA',
  };

  beforeEach(() => {
    wrapper = shallow(<AddUser />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should update state when input values change', () => {
    const nameInput = wrapper.find('#name');
    const lastInput = wrapper.find('#last');
    const emailInput = wrapper.find('#email');
    const companyInput = wrapper.find('#company');
    const countryInput = wrapper.find('#country');

    nameInput.simulate('change', { target: { value: mockUser.name } });
    lastInput.simulate('change', { target: { value: mockUser.last } });
    emailInput.simulate('change', { target: { value: mockUser.email } });
    companyInput.simulate('change', { target: { value: mockUser.company } });
    countryInput.simulate('change', { target: { value: mockUser.country } });

    expect(wrapper.state('name')).toEqual(mockUser.name);
    expect(wrapper.state('last')).toEqual(mockUser.last);
    expect(wrapper.state('email')).toEqual(mockUser.email);
    expect(wrapper.state('company')).toEqual(mockUser.company);
    expect(wrapper.state('country')).toEqual(mockUser.country);
  });

  it('should call axios.post with user data when add button is clicked', () => {
    const mockAxiosResponse = { data: 'success' };
    axios.post.mockResolvedValue(mockAxiosResponse);

    const addButton = wrapper.find('.btn-success');
    addButton.simulate('click');

    expect(axios.post).toHaveBeenCalledWith('/api/user/adding', {
      name: wrapper.state('name'),
      last: wrapper.state('last'),
      email: wrapper.state('email'),
      company: wrapper.state('company'),
      country: wrapper.state('country'),
      iduser: expect.any(String),
    });
  });

  it('should display success message and redirect to home page on successful axios.post', async () => {
    const mockAxiosResponse = { data: 'success' };
    axios.post.mockResolvedValue(mockAxiosResponse);

    const addButton = wrapper.find('.btn-success');
    addButton.simulate('click');
    await flushPromises();

    expect(Swal.fire).toHaveBeenCalledWith('User added successfully');
    expect(window.location.href).toEqual('/');
  });

  it('should display error message on failed axios.post', async () => {
    const mockAxiosError = { message: 'Error adding user' };
    axios.post.mockRejectedValue(mockAxiosError);

    const addButton = wrapper.find('.btn-success');
    addButton.simulate('click');
    await flushPromises();

    expect(console.log).toHaveBeenCalledWith(mockAxiosError);
    expect(Swal.fire).toHaveBeenCalledWith('Error adding user');
  });
});

// helper function to resolve promises
const flushPromises = () => {
  return new Promise((resolve) => setImmediate(resolve));
};