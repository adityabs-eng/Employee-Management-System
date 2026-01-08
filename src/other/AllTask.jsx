import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthProvider'

const AllTask = () => {
  const [userData] = useContext(AuthContext)

  // ✅ SAFETY CHECK (VERY IMPORTANT)
  if (!Array.isArray(userData) || userData.length === 0) {
    return (
      <div className='bg-[#1e1e1e] rounded-xl shadow-md shadow-black/10 p-6 mt-6'>
        <h2 className='text-xl font-bold text-gray-100 mb-6'>Task Overview</h2>
        <p className='text-gray-400 text-center py-6'>
          No employee task data available
        </p>
      </div>
    )
  }

  return (
    <div className='bg-[#1e1e1e] rounded-xl shadow-md shadow-black/10 p-6 mt-6'>
      <h2 className='text-xl font-bold text-gray-100 mb-6'>Task Overview</h2>

      <div className='bg-black mb-4 py-3 px-6 flex justify-between rounded-lg'>
        <h2 className='w-1/5 font-semibold text-gray-300'>Employee Name</h2>
        <h3 className='w-1/5 font-semibold text-center text-gray-300'>New Task</h3>
        <h5 className='w-1/5 font-semibold text-center text-gray-300'>Active Task</h5>
        <h5 className='w-1/5 font-semibold text-center text-gray-300'>Completed</h5>
        <h5 className='w-1/5 font-semibold text-center text-gray-300'>Failed</h5>
      </div>

      <div className='overflow-auto max-h-[300px]'>
        {userData.map((element) => (
          <div
            key={element.id}
            className='bg-[#1e1e1e] border border-gray-800 hover:bg-[#222222] mb-2 py-3 px-6 flex justify-between rounded-lg transition-all duration-200'
          >
            <h2 className='w-1/5 text-gray-100'>{element.firstName}</h2>
            <h3 className='w-1/5 text-center text-gray-300'>
              {element.taskCounts?.newTask ?? 0}
            </h3>
            <h5 className='w-1/5 text-center text-gray-300'>
              {element.taskCounts?.active ?? 0}
            </h5>
            <h5 className='w-1/5 text-center text-gray-300'>
              {element.taskCounts?.completed ?? 0}
            </h5>
            <h5 className='w-1/5 text-center text-gray-300'>
              {element.taskCounts?.failed ?? 0}
            </h5>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllTask
