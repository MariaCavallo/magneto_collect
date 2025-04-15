import React, { useEffect, useState } from "react";
import {
    Navbar,
    NavbarBrand,
    NavbarItem,
    Link,
    Button,
    Dropdown,
    DropdownTrigger,
    Avatar,
    DropdownItem,
    DropdownMenu,
    useDisclosure,
} from "@heroui/react";
import { ShoppingCart } from "@phosphor-icons/react";
import Image from "next/image";
import { useRouter } from "next/router";
import CartComponent from "@/components/cart";
import { useCart } from "@/components/context/CartContext";

export default function NavbarComponent() {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { cart } = useCart();

    // Verifica si hay un token en localStorage
    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsAuthenticated(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token"); // Elimina el token
        setIsAuthenticated(false);
        router.push("/");
    };

    return (
        <>
            <Navbar shouldHideOnScroll className="bg-[#1a1a1a] h-28 flex items-center">
                <NavbarBrand className="flex justify-start p-4">
                    <Link href="/">
                        <Image src={"/icon-circle.png"} alt="logo" height={100} width={100} />
                    </Link>
                </NavbarBrand>
                <NavbarBrand className="hidden sm:flex felx justify-center gap-4">
                    <NavbarItem>
                        <Link className="text-white text-xl hover:text-[#5bc51d]" href="/products">
                            Products
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link className="text-white text-xl hover:text-[#5bc51d]" href="/categories">
                            Categories
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link className="text-white text-xl hover:text-[#5bc51d]" href="/about-us">
                            About Us
                        </Link>
                    </NavbarItem>
                </NavbarBrand>
                <NavbarBrand className="p-4 fle justify-end gap-4">
                    <Link onPress={onOpen} className="text-[#5bc51d] hover:cursor-pointer">
                        <ShoppingCart size={32} weight="bold" />
                        {cart.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
                                {cart.length}
                            </span>
                        )}
                    </Link>
                    {isAuthenticated ? (
                        <Dropdown placement="bottom-end" className="bg-[#1a1a1a] text-white">
                            <DropdownTrigger>
                                <Avatar
                                    isBordered
                                    as="button"
                                    className="transition-transform"
                                    color="success"
                                    name="Avatar"
                                    size="sm"
                                    src="/user.png"
                                />
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Profile Actions" variant="flat">
                                <DropdownItem className="text-white" key="profile" color="success" as={Link} href="/user/profile">
                                    Profile
                                </DropdownItem>
                                <DropdownItem key="logout" color="danger" onPress={handleLogout}>
                                    Log Out
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    ) : (
                        <Button as={Link} href="/auth/login" className="bg-[#5bc51d] text-white text-medium font-semibold" variant="flat">
                            Login
                        </Button>
                    )}
                </NavbarBrand>
            </Navbar>
            <CartComponent isOpen={isOpen} onOpenChange={onOpenChange} />
        </>
    )
}

