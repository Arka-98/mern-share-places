import React from 'react'

function About() {
  return (
    <div className='flex flex-col gap-8 font-semibold'>
      <p className='font-extrabold text-7xl text-slate-800 mb-6'>About</p>
      <p className='text-lg'>Hi! I'm Arkadipta Das, a full stack developer, and I'm glad to
      see you here. This a React 18 project developed with NodeJS & Express as the backend which uses MongoDB &
      Mongoose as the database. Some features of my project are - </p>
      <ul className='list-disc list-outside space-y-2 text-base font-thin'>
        <li>
          Used Tailwind CSS utility based framework to rapidly build a modern & fully responsive web application
        </li>
        <li>Used Google's Geocoding API & Maps API to display accurate locations</li>
        <li>Real time form validation & authentication with the help of custom hooks in React</li>
        <li>Optimized performance of React with the help of useCallback and useMemo hooks</li>
        <li>Added code splitting in React to optimize performance in production</li>
        <li>Used animations and transition effects with the help of animate.css to enhance user experience</li>
        <li>Used JSON Web Tokens (JWT) to authorize users on the application</li>
        <li>Followed MVC architecture in Express to organize and manage the backend</li>
        <li>Used MongoDB Atlas, which is a cloud database service, to store applcation data</li>
        <li>Built the application schema using Mongoose which is an ODM (Object Data Modeller) for MongoDB</li>
      </ul>
      <p className='text-lg'>and much more! Hope you liked this project!</p>
    </div>
  )
}

export default About