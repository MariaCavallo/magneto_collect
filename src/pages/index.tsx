import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Button, Card, CardBody, CardFooter, useDisclosure } from '@heroui/react';
import HeroComponent from '@/components/hero';
import Link from 'next/link';
import { AnimatedTestimonials } from '@/components/ui/animated-testimonials';
import ModalComponent from '@/components/modal';
import SliderComponent from '@/components/ui/carousel';

interface Products {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

const categoryImages: Record<string, string> = {
  electronics: "https://img.freepik.com/foto-gratis/arreglo-coleccion-estacionaria-moderna_23-2149309662.jpg?t=st=1740576885~exp=1740580485~hmac=7afe5ab576ba75d68ae1eb13c9374633fb84b0119099b07fd7296436d961ce77&w=1060",
  jewelery: "https://img.freepik.com/foto-gratis/vista-lujoso-anillo-dorado-marmol_23-2150329649.jpg?t=st=1740577037~exp=1740580637~hmac=22140e48d70cf3f29530eeadc4f74c681e4977dacd0de87197a24a63941dfd38&w=740",
  "men's clothing": "https://img.freepik.com/foto-gratis/accesorios-sueter-cinturon-ropa-masculina_1203-6421.jpg?t=st=1740577117~exp=1740580717~hmac=72b818827942d523c9fd17ffef5bef1e0f0800193b9d7204f0707292e61810d0&w=740",
  "women's clothing": "https://img.freepik.com/foto-gratis/conjunto-falda-sueter-moda-mujer_169016-3210.jpg?t=st=1740577169~exp=1740580769~hmac=c65735787a646190155570922b28f8e4eed1fc4644dd6df4cf98da97149b65f4&w=996"
};

const Index = () => {

  const [categories, setCategories] = useState<{ title: string; image: string, onClick: () => void }[]>([]);
  const [products, setProducts] = useState<Products[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Products | null>(null);
  const [loading, setLoading] = useState(true);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const testimonials = [
    {
      name: "Emily Carter",
      quote: "This service exceeded my expectations! The quality and customer support are top-notch. Highly recommended!",
      src: "https://images.unsplash.com/photo-1462804993656-fac4ff489837?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      name: "Michael Thompson",
      quote: "I was skeptical at first, but this turned out to be the best investment I've made. Amazing experience!",
      src: "https://images.unsplash.com/photo-1504593811423-6dd665756598?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      name: "Sophia Martinez",
      quote: "Fast delivery, excellent product, and outstanding customer service. I will definitely buy again!",
      src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      name: "Daniel Lee",
      quote: "The team is incredibly professional and attentive to details. I felt valued as a customer from start to finish.",
      src: "https://images.unsplash.com/photo-1572708608967-104e751113e4?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      name: "Olivia Brown",
      quote: "Absolutely fantastic! The quality is impressive, and the support team was very helpful throughout the process.",
      src: "https://images.unsplash.com/photo-1518144616-9f579ea945e6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
  ]

  useEffect(() => {
    async function getAllCategories() {
      try {
        const response = await axios.get("https://fakestoreapi.com/products/categories");
        const formattedCategories = response.data.map((category: string) => ({
          title: category.charAt(0).toUpperCase() + category.slice(1), // Capitalizar
          image: categoryImages[category],
        }));
        setCategories(formattedCategories);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getAllCategories();
  }, []);

  useEffect(() => {
    async function getSortProducts() {
      try {
        const { data } = await axios.get("https://fakestoreapi.com/products?sort=desc");
        const randomProducts = data.sort(() => Math.random() - 0.5).slice(0, 5);
        setProducts(randomProducts);
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false);
      }
    }

    getSortProducts();
  }, []);

  const handleOpenModal = (product: Products) => {
    setSelectedProduct(product);
    onOpen();
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <HeroComponent />
      <h2 className='title text-center mt-4'>Favourites prodcuts</h2>
      <p className='text-center text-white text-xl m-2 mb-4'>Discover our community&apos;s favourites. What will be your next purchase?</p>
      <div className='flex flex-row gap-4 m-2'>
        {products.map((product) => (
          <Card key={product.id} isPressable shadow="sm" onPress={() => handleOpenModal(product)} className='flex border-2 border-[#5bc51d] transform transition-transform duration-300 hover:scale-105 h-72 w-72'>
            <CardBody
              className="items-center overflow-visible bg-contain bg-center bg-no-repeat p-0"
              style={{ backgroundImage: `url(${product.image})` }}
            >
            </CardBody>
            <CardFooter className="text-small justify-between">
              <b>{product.title}</b>
              <p className="text-default-500 bg-lime-500/40">${product.price}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className='flex justify-center m-4'>
        <Button as={Link} href="/products" className="bg-[#5bc51d] text-white text-medium font-semibold" variant="flat">
          See more
        </Button>
      </div>
      <div>
        <h2 className='title text-center mt-8'>Our Categories</h2>
        <p className='text-center text-white text-xl m-2'>Discover our categories carefully selected for you!</p>
        <SliderComponent categories={categories} />
        <div className='flex justify-center m-4'>
          <Button as={Link} href="/categories" className="bg-[#5bc51d] text-white text-medium font-semibold" variant="flat">
            See more
          </Button>
        </div>
      </div>
      <div className='flex flex-col justify-center m-4'>
        <h2 className='title text-center mt-4'>What our clients say</h2>
        <AnimatedTestimonials testimonials={testimonials} />
      </div>
      <ModalComponent isOpen={isOpen} onOpenChange={onOpenChange} product={selectedProduct} />
    </div>
  )
}

export default Index