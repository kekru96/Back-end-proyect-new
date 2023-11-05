import React from 'react'
import { Link } from 'react-router-dom'

export const CategoryCard = ({...props}) => {
    return (
        <Link to={props.link} className='overflow-hidden rounded-lg'>
            <div className="relative w-96 h-56 bg-cover rounded-lg overflow-hidden hover:scale-110 transition-all">
                <img
                    src={props.image}
                    alt="Gaming category image"
                    className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 flex items-end p-8 text-white text-2xl font-bold bg-black bg-opacity-50">
                    <p className='underline'>{props.text}</p>
                </div>
            </div>
        </Link>
    )
}