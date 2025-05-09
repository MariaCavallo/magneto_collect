import { Button, Card } from '@heroui/react';
import { CheckCircle } from '@phosphor-icons/react';
import React from 'react';

const SuccessCheckout: React.FC = () => {
    return (
        <div className='flex items-center justify-center m-2 h-4/5'>
            <Card className='flex flex-col items-center justify-center w-4/5 gap-4 bg-gray-100'>
                <h1 className='title'>Payment successful!</h1>
                <p><CheckCircle size={120} color={'#51ad1b'} /></p>
                <p className='text-lg'>Thank you for your purchase!</p>
                <p className='text-lg'>Your payment has been processed successfully.</p>
                <p className='text-lg'>You will soon receive an email with the details of your order.</p>
                <Button className="bg-[#51ad1b] text-white text-medium font-semibold p-2 m-8"
                    onPress={() => (window.location.href = '/')}
                >
                    Go back
                </Button>
            </Card>
        </div>
    );
};

export default SuccessCheckout;