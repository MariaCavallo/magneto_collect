import React, { useState } from "react";
import { Form, Input, Checkbox, Button, CircularProgress } from "@heroui/react";
import { ArrowLeft, Eye, EyeSlash, FileText } from "@phosphor-icons/react";
import { Toaster, toast } from 'sonner'
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";

const Login = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [terms, setTerms] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{ userName?: string; password?: string; terms?: string, api?: string }>({});
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        // Validaciones
        const newErrors: { userName?: string; password?: string; terms?: string } = {};

        if (userName.length < 3 || userName.length > 20) {
            newErrors.userName = "Username must be between 3 and 20 characters";
        }
        if (password.length < 4) {
            newErrors.password = "Password must be at least 4 characters long";
        }
        if (!terms) {
            newErrors.terms = "Please accept the terms";
        }

        // Si hay errores, los mostramos y detenemos el proceso
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setLoading(false);
            return;
        }

        setErrors({}); // Reinicia errores si todo está bien

        // Llamada a la API
        try {
            const response = await axios.post("https://fakestoreapi.com/auth/login", {
                username: userName,
                password: password,
            });
            const responseUser = await axios.get('https://fakestoreapi.com/users');
            const users = responseUser.data;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const user = users.find((u: any) => u.username === userName);
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('token', response.data.token);
            toast.success('Inicio de sesión exitoso', { position: 'bottom-right', duration: 2000 });
            console.log("Login successful!", response.data);
            console.log("Usuario", user);
            setTimeout(() => {
                router.push('/');
            }, 1000);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error("Login error:", error.response?.data || error.message);
            setErrors({ api: "Login failed. Please check your credentials." });
            toast.error('Credenciales incorrectas', { position: 'bottom-right', duration: 2000 });

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="grid grid-cols-2 h-screen">
            <div className="bg-[url(https://img.freepik.com/vector-gratis/ilustracion-concepto-compra-online_114360-1428.jpg?t=st=1740062754~exp=1740066354~hmac=352a2b4c439f3d5d73c70e41f404275b443f0d01beac20f980e6312dd123f2b6&w=740)] bg-contain bg-no-repeat opacity-70">
            <Toaster richColors />
            </div>
            <Button isIconOnly as={Link} href="/" className="bg-[#5bc51d] absolute top-4 left-4">
                <ArrowLeft size={'3rem'} weight="bold" />
            </Button>
            <div className="flex flex-col justify-center items-center">
                <h1 className="title mb-6">Login</h1>
                <Form
                    className="w-full flex justify-center items-center space-y-4"
                    validationErrors={errors}
                    onSubmit={handleSubmit}
                >
                    <div className="flex flex-col gap-8 max-w-md">
                        <Input
                            isRequired
                            errorMessage={errors.userName}
                            isInvalid={!!errors.userName}
                            label="Username"
                            labelPlacement="outside"
                            name="username"
                            placeholder="Enter your username"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                        <Input
                            isRequired
                            errorMessage={errors.password}
                            isInvalid={!!errors.password}
                            label="Password"
                            labelPlacement="outside"
                            name="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type={isVisible ? "text" : "password"}
                            endContent={
                                <button
                                    className="focus:outline-none"
                                    type="button"
                                    onClick={toggleVisibility}
                                >
                                    {isVisible ? <EyeSlash size={20} /> : <Eye size={20} />}
                                </button>
                            }
                        />
                        <Checkbox
                            isRequired
                            classNames={{ label: "text-small, text-white" }}
                            isInvalid={!!errors.terms}
                            name="terms"
                            validationBehavior="aria"
                            checked={terms}
                            onChange={(e) => setTerms(e.target.checked)}
                        >
                            I agree to the terms and conditions
                        </Checkbox>

                        {errors.terms && <span className="text-danger text-small">{errors.terms}</span>}
                        {errors.api && <span className="text-danger text-small">{errors.api}</span>}

                        <div className="flex gap-4">
                            <Button className="w-full bg-[#5bc51d]" type="submit">
                                {loading ? <CircularProgress aria-label="Loading..." color="default" /> : "Login"}
                            </Button>
                            <Button className="border-2 border-[#5bc51d] text-white" type="reset" variant="bordered" onPress={() => {
                                setUserName("");
                                setPassword("");
                                setTerms(false);
                                setErrors({});
                            }}>
                                Reset
                            </Button>
                        </div>
                        <div className="flex justify-center items-center">
                            <Button endContent={<FileText size={17} />} className="bg-transparent border-b-2 border-[#5bc51d] text-white" variant="flat" radius="none" onPress={() => window.open('/user.txt', '_blank')}>
                                Working users
                            </Button>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default Login;
