import React from 'react'

const AboutUs = () => {
    return (
        <div className='flex flex-col items-center text-white px-6 py-12'>
            <h1 className='title pb-8'>About Us</h1>
            <section className="max-w-4xl text-center">
                <h2 className='text-2xl md:text-3xl font-semibold text-white mb-4'>Welcome to 
                    <span className='text-[#5bc51d]'> Magneto Collect</span> - The power of choosing the extraordinary
                </h2>
                <p className='text-gray-200 leading-relaxed mt-6'>At <span className='text-[#5bc51d] font-semibold'>Magneto Collect</span>, we believe that every collector deserves a place where their passion is understood, valued, and celebrated. Founded by enthusiasts for enthusiasts, our mission is to bring you the most unique, high-quality, and sought-after collectibles from around the world.</p>
            </section>
            <section className='max-w-4xl text-center mt-10'>
                <h2 className='text-2xl md:text-3xl font-semibold text-white mb-4'>Our Story</h2>
                <p className='text-gray-200 leading-relaxed'>What started as a small idea among collectors quickly grew into a trusted online destination for rare finds, limited editions, and must-have pieces. We understand the thrill of adding the perfect item to your collection, and we’re here to make that experience as exciting and seamless as possible.</p>
            </section>
            <section className="max-w-4xl mt-10">
                <h2 className='text-2xl md:text-3xl font-semibold text-white text-center mb-6'>Why Choose <span className='text-[#5bc51d] font-semibold'>Magneto Collect</span> ?</h2>
                <ul className="space-y-4 text-gray-200">
                    <li className="flex items-center space-x-3">
                        <span className="text-[#5bc51d] text-xl">✔</span>
                        <span className='font-semibold underline pr-2'>Curated Selection:</span> 
                        We handpick the best collectibles so you don’t have to.
                    </li>
                    <li className="flex items-center space-x-3">
                        <span className="text-[#5bc51d] text-xl">✔</span>   
                        <span className='font-semibold underline pr-2'>Authenticity Guaranteed:</span> 
                        Every item is 100% original and sourced from reputable suppliers.
                    </li>
                    <li className="flex items-center space-x-3">
                        <span className="text-[#5bc51d] text-xl">✔</span>
                        <span className='font-semibold underline pr-2'>Worldwide Shipping:</span> 
                        No matter where you are, we bring the best to your doorstep.
                    </li>
                    <li className="flex items-center space-x-3">
                        <span className="text-[#5bc51d] text-xl">✔</span>
                        <span className='font-semibold underline pr-2'>Customer approach:</span> 
                        Your satisfaction is our priority, with dedicated support to assist you every step of the way.
                    </li>
                </ul>
            </section>
            <section className="max-w-4xl text-center mt-10">
                <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">Join Our Community</h2>
                <p className='text-gray-200 leading-relaxed'><span className='text-[#5bc51d] font-semibold'>Magneto Collect</span> is more than just a store. It’s a community of collectors who share a passion for rare and extraordinary items. Follow us on social media, share your latest finds, and be part of a network that truly appreciates the art of collecting.</p>
                <p className='text-gray-200 leading-relaxed mt-8'>Thank you for being part of <span className='text-[#5bc51d] font-semibold'>Magneto Collect</span>. Your next great find is just a click away!</p>
            </section>
        </div>
    )
}

export default AboutUs