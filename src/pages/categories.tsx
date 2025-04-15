import ModalComponent from '@/components/modal';
import SliderComponent from '@/components/ui/carousel';
import { Card, CardBody, CardFooter, useDisclosure } from '@heroui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface Product {
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

const Categories = () => {

    const [categories, setCategories] = useState<{ title: string; image: string, onClick: () => void }[]>([]);
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState<Product[]>([]); // Estado para los productos
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    useEffect(() => {
        async function getAllCategories() {
            try {
                const response = await axios.get("https://fakestoreapi.com/products/categories");
                const formattedCategories = response.data.map((category: string) => ({
                    title: category.charAt(0).toUpperCase() + category.slice(1), // Capitalizar
                    image: categoryImages[category],
                    onClick: () => fetchProductsByCategory(category), // Agregar la lógica para cargar productos
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

    // Función para cargar los productos por categoría
    const fetchProductsByCategory = async (category: string) => {
        try {
            const response = await axios.get(`https://fakestoreapi.com/products/category/${category}`);
            setProducts(response.data); // Actualizar el estado de los productos
        } catch (error) {
            console.log(error);
        }
    };

    const handleOpenModal = (product: Product) => {
        setSelectedProduct(product);
        onOpen();
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className='text-center'>
            <h2 className='title m-4'>Collections</h2>
            <p className='text-white text-xl'>Carefully selected collections for you!</p>
            <SliderComponent categories={categories} />

            {/* Mostrar los productos debajo del slider */}
            <div className="products-container mt-8">
                {products.length > 0 ? (
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
                ) : (
                    <div className='flex justify-center items-center m-10'>
                        <p className="text-white">No products available for this category.</p>
                    </div>
                )}
            </div>
            <ModalComponent isOpen={isOpen} onOpenChange={onOpenChange} product={selectedProduct}/>
        </div>
    );
};

export default Categories;