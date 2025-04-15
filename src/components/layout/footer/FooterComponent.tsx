import React from 'react'
import Link from 'next/link'

const Footer = () => {

    return (
        <footer className='w-full h-auto flex flex-col md:flex-row items-center justify-between bg-[#1a1a1a] text-white p-4'>
            <p className='text-center md:text-left mb-2 md:mb-0'>&copy; {new Date().getFullYear()} Todos los derechos reservados</p>
            <div className='flex gap-4'>
                <Link className='hover:text-[#5bc51d]' href='/terms&conditions'>
                    Terms & Conds
                </Link>
            </div>
        </footer>
    )
}

export default Footer