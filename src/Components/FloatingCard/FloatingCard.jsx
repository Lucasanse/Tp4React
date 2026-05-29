import React from 'react'
import './FloatingCard.css'


const FloatingCard = ({ product, position }) => {
  return (
    <div
    role="contenedor"
    key={product.id}
    className={`
        ${position}
        absolute rounded-2xl px-4 py-3
        backdrop-blur-md border border-white/80
        bg-white
        fade-In-float
    `}
    >
      <p className="text-[15px] uppercase tracking-widest text-purple-400 mb-1">${product.price}</p>
      <p className="text-lg font-semibold text-purple-900">{product.name}</p>
      <span className="inline-block text-[10px] px-2 py-0.5 rounded-full mt-1.5 bg-blue-100">
        <p>
        Stock: {product.stock}
        </p>
      </span>
    </div>
  )
}

export default FloatingCard
