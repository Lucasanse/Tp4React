import React from 'react'

const ErrorComponent = ({ message, type = "not-found" }) => {
  
  const config = {
    "not-found": {
      className: "col-span-3 text-center text-gray-500 my-4",
      text: `No se encontraron productos para "${message}"`,
    },
    "error": {
      className: "col-span-3 text-center text-red-500 my-4",
      text: `Error: ${message}`,
    },
  }

  const { className, text } = config[type] ?? config["not-found"]

  return <p 
  className={className}>
    {text}
  </p>
}

export default ErrorComponent