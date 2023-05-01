import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AOS from 'aos';
import Swal from 'sweetalert2';

function UserDetail(props) {
  useEffect(() => {
    AOS.init();
  }, []);

  const deleteUser = () => {
    axios
      .post('/api/user/deleteuser', { id: props.user._id })
      .then((res) => {
        console.log(res.data[0]);
        Swal.fire(res.data);
        props.onDeleteUser(props.user._id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const user = props.user;

  return (
    <div>
      <div className='container'>
        <div className='row'>
          <div className='col-sm-6 offset-3' data-aos='flip-right'>
            <ul className='list-group'>
              <li className='list-group-item'>Name: {user.first}</li>
              <li className='list-group-item'>Last name: {user.last}</li>
              <li className='list-group-item'>Email: {user.email}</li>
              <li className='list-group-item'>Company: {user.company}</li>
              <li className='list-group-item'>Country: {user.country}</li>
              <li className='list-group-item'>Id: {user._id}</li>
            </ul>
            <Link to={`/edit-user/${user._id}`} className='btn btn-success'>
              Edit
            </Link>
            &nbsp;
            <button onClick={deleteUser} className='btn btn-danger'>
              Delete
            </button>
            <hr className='mt-4' />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetail;