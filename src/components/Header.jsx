import React from 'react'
import { NavLink } from 'react-router-dom'

function Header() {
  return (
    <header className='absolute top-0 w-full left-0 mx-6 z-40'>
      <ul className='flex gap-3 text-2xl'>
        <li>
          <NavLink to="/">
            Home
          </NavLink>
        </li>
        <li className="group relative">
          <NavLink className="group">
            Brand
          </NavLink>
          <ul className='hidden group-hover:block absolute left-0 bg-white rounded shadow z-50'>
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
      <ul className='flex gap-3 text-2xl'>
        <li>
          <NavLink to="/">
            Home
          </NavLink>
        </li>
        <li className="group relative">
          <NavLink className="group">
            Brand
          </NavLink>
          <ul className='hidden group-hover:block absolute left-0 bg-white rounded shadow z-50'>
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