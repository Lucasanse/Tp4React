import React from 'react'

const Spinner = () => {
  return (
    <div className="flex justify-center items-center relative ">
      <div className="relative text-center right-15">
          <div className="w-20 h-20 rounded-full absolute
          border-8 border-solid border-gray-200"></div>
          <div className="w-20 h-20 rounded-full animate-spin absolute
          border-8 border-solid border-purple-500 border-t-transparent"></div>
          </div>
      </div>
  )
}

export default Spinner
