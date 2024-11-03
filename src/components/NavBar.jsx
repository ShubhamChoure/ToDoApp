import React from 'react'

function NavBar() {
  return (
    <div className=' flex justify-around bg-purple-600 text-white p-3 hover:cursor-default w-full h-fit mb-2'>
        <div className="logo font-extrabold text-lg">iTask</div>
      <ul className='flex list-none gap-8'>
        <li className=' hover:underline hover:cursor-pointer'>Home</li>
        <li className=' hover:underline hover:cursor-pointer'>About Us</li>
      </ul>
    </div>
  )
}

export default NavBar
