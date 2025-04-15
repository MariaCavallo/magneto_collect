import React, { useEffect, useState } from 'react';
import { Tabs, Tab, Card, CardBody, Input, Button, CircularProgress, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, CardFooter } from '@heroui/react';
import { useCart } from './context/CartContext';
import { toast, Toaster } from 'sonner';
import Cards, { Focused } from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import { CreditCard, ShoppingBag, User } from '@phosphor-icons/react';
import { useRouter } from 'next/router';

const CheckoutComponent = () => {
    const { cart, clearCart } = useCart();
    const [selectedTab, setSelectedTab] = useState('user');
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        customer: { name: {firstname: '', lastname: ''}, email: '' },
        card: { cardNumber: '', cvv: '', expDate: '', nameOnCard: '', focus: '' }
    });

    const router = useRouter()

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const user = JSON.parse(storedUser);
            setFormData((prev) => ({
                ...prev,
                customer: {
                    name: {
                        firstname: user.name.firstname || '',
                        lastname: user.name.lastname || ''
                    },
                    email: user.email || ''
                }
            }));
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData((prevState) => ({
            ...prevState,
            customer: {
                ...prevState.customer,
                [name]: (name in prevState.customer ? value : prevState.customer[name as keyof typeof prevState.customer]),
            },
            card: {
                ...prevState.card,
                [name]: (name in prevState.card ? value : prevState.card[name as keyof typeof prevState.card]),
            },
        }));
    };


    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        setFormData({ ...formData, card: { ...formData.card, focus: e.target.name } });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const orderItems = cart.map((item) => ({
                name: item.title,
                image: item.image,
                price: item.price
            }));

            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    customer: formData.customer,
                    card: {
                        cardNumber: formData.card.cardNumber,
                        cvv: parseInt(formData.card.cvv, 3),
                        expDate: formData.card.expDate,
                        nameOnCard: formData.card.nameOnCard
                    },
                    order: orderItems
                })
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'An error ocurred in the payment process');
            console.log(data)
            toast.success('Payment successful!');
            clearCart();
            setTimeout(() => {
                router.push('/checkout/success');
            }, 1000);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log(error)
            toast.error(error.message || 'An error ocurred in the payment process');
        } finally {
            setLoading(false);
        }
    };

    const isFormComplete = () => {
        const { name, email } = formData.customer;
        const { cardNumber, cvv, expDate, nameOnCard } = formData.card;

        return (
            name.firstname.trim() !== '' &&
            name.lastname.trim() !== '' &&
            email.trim() !== '' &&
            cardNumber.trim().length === 19 &&
            cvv.trim().length === 3 &&
            expDate.trim().length === 5 &&
            nameOnCard.trim() !== ''
        );
    };

    return (
        <div className="flex flex-col w-full items-center">
            <Toaster richColors />
            <Card className="max-w-full m-8 bg-transparent">
                <CardBody className="overflow-hidden">
                    <Tabs
                        fullWidth
                        aria-label="Checkout Steps"
                        selectedKey={selectedTab}
                        size="md"
                        onSelectionChange={(key) => setSelectedTab(String(key))}
                    >
                        {/* User Info */}
                        <Tab key="user" title={
                            <div className="flex items-center space-x-2">
                                <User size={22} weight="bold" />
                                <span>User</span>
                            </div>
                        }>
                            <div className="flex flex-col gap-4">
                                <Input name="firstname" label="Name" labelPlacement="outside" value={formData.customer.name.firstname} onChange={handleChange} isRequired />
                                <Input name="lastname" label="Last Name" labelPlacement="outside" value={formData.customer.name.lastname} onChange={handleChange} isRequired />
                                <Input name="email" type="email" label="Email" labelPlacement="outside" value={formData.customer.email} onChange={handleChange} isRequired />
                            </div>
                        </Tab>

                        {/* Order Summary */}
                        <Tab key="order" title={
                            <div className="flex items-center space-x-2">
                                <ShoppingBag size={24} weight="bold" />
                                <span>Order</span>
                            </div>
                        }>
                            <div>
                                {cart.length === 0 ? (
                                    <div className='flex justify-center items-center '>
                                        <p>There are no products in the cart</p>
                                    </div>
                                ) : (
                                    <Table>
                                        <TableHeader>
                                            <TableColumn>Image</TableColumn>
                                            <TableColumn>Product</TableColumn>
                                            <TableColumn>Price</TableColumn>
                                            <TableColumn>Quantity</TableColumn>
                                        </TableHeader>
                                        <TableBody>
                                            {cart.map((item, index) => (
                                                <TableRow key={index}>
                                                    <TableCell><img src={item.image} alt={item.title} width={50} /></TableCell>
                                                    <TableCell>{item.title}</TableCell>
                                                    <TableCell>${item.price}</TableCell>
                                                    <TableCell>{item.quantity}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                )}
                            </div>
                        </Tab>

                        {/* Payment Info */}
                        <Tab key="payment" title={
                            <div className="flex items-center space-x-2">
                                <CreditCard size={22} weight="bold" />
                                <span>Payments</span>
                            </div>
                        }>
                            <div className="flex flex-col gap-4">
                                <Cards
                                    cvc={formData.card.cvv}
                                    expiry={formData.card.expDate}
                                    focused={formData.card.focus as Focused}
                                    name={formData.card.nameOnCard}
                                    number={formData.card.cardNumber}
                                />
                                <Input
                                    name="cardNumber"
                                    label="Card Number"
                                    placeholder="Insert the card number"
                                    labelPlacement="outside"
                                    value={formData.card.cardNumber}
                                    onChange={(e) => {
                                        let value = e.target.value.replace(/\D/g, ''); // Solo números
                                        value = value.replace(/(.{4})/g, '$1 ').trim(); // Formateo con espacios
                                        setFormData((prevState) => ({
                                            ...prevState,
                                            card: {
                                                ...prevState.card,
                                                cardNumber: value,
                                            },
                                        }));
                                    }}
                                    onFocus={handleFocus}
                                    isRequired
                                    inputMode="numeric"
                                    maxLength={19} // 16 dígitos + 3 espacios
                                />
                                <Input
                                    name="cvv"
                                    type="text"
                                    label="CVV"
                                    placeholder="123"
                                    labelPlacement="outside"
                                    value={formData.card.cvv}
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/\D/g, '').slice(0, 3);
                                        setFormData((prevState) => ({
                                            ...prevState,
                                            card: {
                                                ...prevState.card,
                                                cvv: value,
                                            },
                                        }));
                                    }}
                                    onFocus={handleFocus}
                                    isRequired
                                    inputMode="numeric"
                                />
                                <Input
                                    name="expDate"
                                    type="text"
                                    label="Exp Date (MM/YY)"
                                    placeholder="MM/YY"
                                    labelPlacement="outside"
                                    value={formData.card.expDate}
                                    onChange={(e) => {
                                        let value = e.target.value.replace(/\D/g, '');
                                        if (value.length >= 3) {
                                            value = value.slice(0, 2) + '/' + value.slice(2, 4);
                                        }
                                        setFormData((prevState) => ({
                                            ...prevState,
                                            card: {
                                                ...prevState.card,
                                                expDate: value,
                                            },
                                        }));
                                    }}
                                    onFocus={handleFocus}
                                    isRequired
                                    inputMode="numeric"
                                    maxLength={5}
                                />
                                <Input name="nameOnCard" label="Name on Card" placeholder='Insert the name on card' labelPlacement="outside" value={formData.card.nameOnCard} onChange={handleChange} onFocus={handleFocus} isRequired />
                            </div>
                        </Tab>
                    </Tabs>
                </CardBody>
                <CardFooter className="flex justify-evenly w-full">
                    {/* Botón "Back" (No aparece en la primera pestaña) */}
                    {selectedTab !== 'user' && (
                        <Button color="default" variant='bordered' className="text-white text-medium font-semibold" onClick={() => {
                            if (selectedTab === 'order') setSelectedTab('user');
                            else if (selectedTab === 'payment') setSelectedTab('order');
                        }}>
                            Back
                        </Button>
                    )}

                    {/* Botón "Next" (No aparece en la última pestaña) */}
                    {selectedTab !== 'payment' && (
                        <Button color="default" variant='bordered' className="text-white text-medium font-semibold" onClick={() => {
                            if (selectedTab === 'user') setSelectedTab('order');
                            else if (selectedTab === 'order') setSelectedTab('payment');
                        }}>
                            Next
                        </Button>
                    )}

                    {/* Botón "Pagar" (Solo aparece en la pestaña de pago) */}
                    {selectedTab === 'payment' && (
                        <Button className="bg-[#5bc51d] text-white text-medium font-semibold" onClick={handleSubmit} isDisabled={loading || !isFormComplete()}>
                            {loading ? <CircularProgress size="sm" /> : "Buy"}
                        </Button>
                    )}
                </CardFooter>
            </Card>
        </div>
    );
};

export default CheckoutComponent;
