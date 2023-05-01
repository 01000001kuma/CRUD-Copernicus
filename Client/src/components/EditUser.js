import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const EditUser = () => {
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [country, setCountry] = useState('');

  const { _id } = useParams();

  useEffect(() => {
    axios.get(`/api/user/obtaindatauser/${_id}`)
      .then((res) => {
        console.log(res.data)
        const datauser = res.data
        setFirst(datauser.first)
        setLast(datauser.last)
        setEmail(datauser.email)
        setCompany(datauser.company)
        setCountry(datauser.country)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [_id])

  function updating() {
    const updateUser = {
      first: first,
      last: last,
      email: email,
      company: company,
      country: country,
      _id: _id,
    };

    axios
      .put(`/api/user/updateuser/${_id}`, updateUser)
      .then((res) => {
        Swal.fire(res.data, 'User updated successfully');
        setTimeout(() => {
          window.location.href = '/';
        }, 4000); // 4 seconds delay to redirect to home
      })
      .catch((err) => {
        console.log(err);
        Swal.fire('Error updating user');
      });
  }

  return (
    <div className='container'>
      <div className='row'>
        <h2 className='mt-4'>Edit User</h2>
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
              value={first}
              onChange={e => setFirst(e.target.value)}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='last' className='form-label'>
              Last name
            </label>
            <input
              type='text'
              className='form-control'
              value={last}
              onChange={e => setLast(e.target.value)}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='email' className='form-label'>
              Email
            </label>
            <input
              type='text'
              className='form-control'
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='company' className='form-label'>
              Company
            </label>
            <input
              type='text'
              className='form-control'
              value={company}
              onChange={e => setCompany(e.target.value)}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='country' className='form-label'>
              Country
            </label>
            <input
              type='text'
              className='form-control'
              value={country}
              onChange={e => setCountry(e.target.value)}
            />
          </div>
          <button onClick={updating} className='btn btn-success'>
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUser;