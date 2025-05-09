import { Button, Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader } from "@heroui/react";
import { useCart } from "./context/CartContext"
import Image from "next/image";
import { Minus, Plus, X } from "@phosphor-icons/react";
import Link from "next/link";

interface CartComponentProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

const CartComponent: React.FC<CartComponentProps> = ({ isOpen, onOpenChange }) => {
    const { cart, removeFromCart, increaseQuantity, decreaseQuantity, getTotal } = useCart();

    return (
        <Drawer isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur" className="cart text-white">
            <DrawerContent>
                {(onClose) => (
                    <>
                        <DrawerHeader className="flex flex-col gap-1">Your Cart</DrawerHeader>
                        <DrawerBody>
                            {cart.length === 0 ? (
                                <p className="text-gray-400">Your cart is empty.</p>
                            ) : (
                                <div className="flex flex-col gap-4">
                                    {cart.map((product) => (
                                        <div key={product.id} className="flex items-center gap-4 border-b border-gray-700 pb-2">
                                            <Image src={product.image} alt={product.title} width={60} height={60} className="object-contain" />
                                            <div className="flex-1">
                                                <p className="text-white font-semibold">{product.title}</p>
                                                <p className="text-[#5bc51d]">${product.price}</p>
                                                <div className="flex items-center gap-2 mt-2">
                                                    <Button className="text-sm" isIconOnly onPress={() => increaseQuantity(product.id)}>
                                                        <Plus size={20} />
                                                    </Button> 
                                                    <p className="text-white">{product.quantity}</p>
                                                    <Button className="text-sm" isIconOnly onPress={() => decreaseQuantity(product.id)}>
                                                        <Minus size={20} />
                                                    </Button>
                                                </div>
                                            </div>
                                            <Button className="text-sm" isIconOnly color="danger" onPress={() => removeFromCart(product.id)}>
                                                <X size={20} />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </DrawerBody>
                        <DrawerFooter>
                            <div className="w-full flex gap-2 items-center text-white">
                                <p className="text-lg font-semibold">Total:</p>
                                <p className="text-[#5bc51d] text-lg font-semibold">${getTotal().toFixed(2)}</p>
                            </div>
                            <Button color="danger" variant="light" onPress={onClose}>
                                Close
                            </Button>
                            <Button as={Link} href="/checkout/checkout" className="bg-[#5bc51d] text-white font-semibold" onPress={onClose} isDisabled={cart.length === 0}>
                                Checkout
                            </Button>
                        </DrawerFooter>
                    </>
                )}
            </DrawerContent>
        </Drawer>
    );
};

export default CartComponent;
