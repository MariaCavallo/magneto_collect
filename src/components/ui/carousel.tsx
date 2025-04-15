import React from 'react';
import { Card, CardBody } from '@heroui/react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Category {
    title: string;
    image: string;
    onClick: () => void
}

interface Props {
    categories: Category[];
}

const SliderComponent: React.FC<Props> = ({ categories }) => {
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true,
        arrows: true,
    };

    return (
        <div className='slider-container p-6'>
            <Slider {...settings} className='m-4'>
                {categories.map((category) => (
                    <div key={category.title} className="p-2 hover:cursor-pointer" onClick={category.onClick}>
                        <Card className='bg-transparent, border-2 border-[#5bc51d] '>
                            <CardBody
                                className="overflow-visible p-4 flex items-center justify-center h-60 bg-cover bg-center transform transition-transform duration-300 hover:scale-105"
                                style={{ backgroundImage: `url(${category.image})` }}
                            >
                                <h1 className="text-white text-lg font-semibold bg-lime-600/50 p-2 rounded">
                                    {category.title}
                                </h1>
                            </CardBody>
                        </Card>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default SliderComponent;