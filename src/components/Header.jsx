import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Loader from '../components/Loader';

function Header() {
  const restPath = "http://localhost:8888/wordpress/redlineCrew/wp-json/wp/v2/media/456";
  const [restData, setRestData] = useState([]);
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(restPath);
        const data = await response.json();

        setRestData(data); // Update state with car data
        setLoading(false)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [restPath]);

  if(loading){
    return <Loader />
  }
  return (
    <header className='absolute top-0 w-full left-0 z-40 flex justify-between items-center'>
      <img src={restData.guid.rendered} alt="logo" className='w-[100px]'/>
      <ul className='flex gap-3 text-2xl pr-10'>
        <li>
          <NavLink to="/">
            Home
          </NavLink>
        </li>
        <li className="group relative">
          <NavLink className="group">
            Brand
          </NavLink>
          <ul className='hidden group-hover:block absolute left-1/2 transform -translate-x-1/2 bg-white rounded shadow z-50'>
            <li>
              <NavLink to="/brand/ferrari" className="block py-2 px-4 text-gray-800 hover:bg-gray-100">
                Ferrari
              </NavLink>
            </li>
            <li>
              <NavLink to="/brand/lamborghini" className="block py-2 px-4 text-gray-800 hover:bg-gray-100">
                Lamborghini
              </NavLink>
            </li>
            <li>
              <NavLink to="/brand/mclaren" className="block py-2 px-4 text-gray-800 hover:bg-gray-100">
                McLaren
              </NavLink>
            </li>
            <li>
              <NavLink to="/brand/porsche" className="block py-2 px-4 text-gray-800 hover:bg-gray-100">
                Porsche
              </NavLink>
            </li>

          </ul>
        </li>
        <li>
          <NavLink to="/blog">
            Blog
          </NavLink>
        </li>
      </ul>
    </header>
  )
}

export default Header