import { Card, CardBody, CardFooter, useDisclosure } from '@heroui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ModalComponent from '@/components/modal';

interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
}

const Products = () => {

    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    useEffect(() => {
        async function getSortProducts() {
            try {
                const response = await axios.get("https://fakestoreapi.com/products");
                setProducts(response.data);
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false);
            }
        }
        getSortProducts();
    }, []);

    const handleOpenModal = (product: Product) => {
        setSelectedProduct(product);
        onOpen();
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h1 className='title text-center'>Products</h1>
            <p className='text-white text-xl text-center'>Discover your next treasure...</p>
            <div className='grid grid-cols-4 gap-4 m-4'>
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
            <ModalComponent isOpen={isOpen} onOpenChange={onOpenChange} product={selectedProduct}/>
        </div>
    )
}

export default Products