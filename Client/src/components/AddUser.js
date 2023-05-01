import React from 'react';
import { useState } from 'react';
import { uniqueId } from 'lodash';
import axios from 'axios';
import Swal from 'sweetalert2';

const AddUser = () => {
  const [name, setName] = useState('');
  const [last, setLast] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [country, setCountry] = useState('');

  const adding = () => {
    const user = {
      name: name,
      last: last,
      email: email,
      company: company,
      country: country,
      iduser: uniqueId(),
    };
    console.log(user);

    axios
      .post('/api/user/adding', user)
      .then((res) => {
        Swal.fire('User added successfully');
        window.location.href = '/';
      })
      .catch((err) => {
        console.log(err);
        Swal.fire('Error adding user');
      });
  };

  return (
    <div className='container'>
      <div className='row'>
        <h2 className="text-center my-5">Add User</h2>
      </div>

      <div className='row'>
        <div className='col-sm-6 offset-3'>
          <div className='mb-3'>
            <label htmlFor='name' className='form-label'>
              Name
            </label>
            <input
              type='text'
              className='form-control'
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            ></input>
          </div>
          <div className='mb-3'>
            <label htmlFor='last' className='form-label'>
              Last name
            </label>
            <input
              type='text'
              className='form-control'
              value={last}
              onChange={(e) => {
                setLast(e.target.value);
              }}
            ></input>
          </div>
          <div className='mb-3'>
            <label htmlFor='email' className='form-label'>
              Email
            </label>
            <input
              type='text'
              className='form-control'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></input>
          </div>
          <div className='mb-3'>
            <label htmlFor='company' className='form-label'>
              Company
            </label>
            <input
              type='text'
              className='form-control'
              value={company}
              onChange={(e) => {
                setCompany(e.target.value);
              }}
            ></input>
          </div>
          <div className='mb-3'>
            <label htmlFor='country' className='form-label'>
              Country
            </label>
            <input
              type='text'
              className='form-control'
              value={country}
              onChange={(e) => {
                setCountry(e.target.value);
              }}
            ></input>
          </div>
          <button onClick={adding} className='btn btn-success'>
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddUser;