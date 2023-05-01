import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserDetail from './UserDetail';

const UserList = () => {
  const [dataUsers, setDataUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/user/list?page=${currentPage}`)
      .then((res) => {
        console.log(res.data);
        setDataUsers(res.data.users);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentPage]);

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleDeleteUser = (id) => {
    axios
      .post('/api/user/deleteuser', { id })
      .then((res) => {
        console.log(res.data[0]);
        setDataUsers((prevData) => prevData.filter((user) => user._id !== id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const userList = dataUsers.map((user) => {
    return (
      <div key={user._id}>
        <UserDetail user={user} onDeleteUser={handleDeleteUser} />
      </div>
    );
  });

  return (
    <>
      <h2 className="text-center my-5">Users List</h2>
      {userList}
      <div className="d-flex justify-content-center mt-3">
        {currentPage > 1 && (
          <button className="btn btn-primary me-3" onClick={handlePrevPage}>
            Previous
          </button>
        )}
        {totalPages && currentPage < totalPages && (
          <button className="btn btn-primary" onClick={handleNextPage}>
            Next
          </button>
        )}
      </div>
    </>
  );
};

export default UserList;