import { Button, Input } from '@heroui/react';
import React, { useEffect } from 'react';

const UserProfile: React.FC = () => {

    const [loading, setLoading] = React.useState(true);
    const [user, setUser] = React.useState({
        email: '',
        name: {
            firstname: '',
            lastname: ''
        },
        address: {
            city: '',
        },
        password: '',
        phone: '',
    });

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    if (loading) {
        return <div className="text-center mt-10 text-lg font-semibold">Cargando datos...</div>;
    }

    return (
        <div className='flex flex-col items-center justify-center m-2 gap-4'>
            <h1 className='title'>Datos del Usuario</h1>    
            <div className='grid grid-cols-2 gap-8 m-4 w-full max-w-2xl'>
                <Input label="Name" labelPlacement="outside" value={user.name.firstname} isReadOnly />
                <Input label="Last Name" labelPlacement="outside" value={user.name.lastname} isReadOnly />
                <Input label="Email" labelPlacement="outside" value={user.email} isReadOnly />
                <Input label="Address" labelPlacement="outside" value={user.address.city} isReadOnly />
                <Input label="Phone" labelPlacement="outside" value={user.phone} isReadOnly />
                <Input label="Password" labelPlacement="outside" value={user.password} isReadOnly />
            </div>
            <Button className="max-w-52 bg-[#5bc51d] text-white text-medium font-semibold mb-4 " onClick={() => window.location.href = '/'}>
                Volver
            </Button>
        </div>
    );
};

export default UserProfile;