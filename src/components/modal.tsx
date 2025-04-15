import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
} from "@heroui/react";
import { useCart } from "./context/CartContext";

interface ModalComponentProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    product: {
        id: number;
        title: string;
        price: number;
        description: string;
        category: string;
        image: string;
    } | null;
}

const ModalComponent: React.FC<ModalComponentProps> = ({ isOpen, onOpenChange, product }) => {
    const { addToCart } = useCart();

    if (!product) return null;

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur" size="2xl" scrollBehavior="outside" className='modal text-white'>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">{product?.title}</ModalHeader>
                        <ModalBody>
                            <img src={product.image} alt={product.title} className="w-full h-60 object-contain mb-4" />
                            <p className="text-gray-300">{product.description}</p>
                            <p className="text-[#5bc51d] text-lg font-semibold">Price: ${product.price}</p>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                                Close
                            </Button>
                            <Button className="bg-[#5bc51d] text-white font-semibold" onPress={() => {
                                addToCart({ ...product, quantity: 1 });
                                onClose();
                            }}>
                                Add
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default ModalComponent;
