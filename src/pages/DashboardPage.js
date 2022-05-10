import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/context';

const DashboardPage = () => {
  const { user, signOut } = useContext(AuthContext);
  const [cars, setCars] = useState([]);

  if (!user.name) {
    return <p>You are not logged in.</p>;
  }

  useEffect(() => {
    console.log(cars);
    async function getCars() {
      const headers = new Headers();
      headers.append('Authorization', `JWT ${user.token}`);
      const requestOptions = {
        method: 'GET',
        headers: headers,
        redirect: 'follow'
      };
      const res = await fetch('http://localhost:5000/cars', requestOptions);
      const data = await res.json();
      setCars(data.cars);
    }
    getCars();
  }, []);

  return (
    <div className='dashboard-container'>
      <h1>Welcome {user.name}!</h1>
      <button
        className='button'
        onClick={() => {
          signOut();
        }}>
        Sign out
      </button>
      {cars &&
        cars.map((car) => (
          <div key={car.car_id}>
            <h1>{car.license_plate}</h1>
          </div>
        ))}
    </div>
  );
};

export default DashboardPage;
