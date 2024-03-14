'use client';
import React from 'react';
import Swal from 'sweetalert2';

const Page = () => {
  const showAlert = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }

  return (
    <div>
      <h1>Dashboard Serial2 Page</h1>
      <button onClick={showAlert}>Show Alert</button>
    </div>
  );
}

export default Page;
