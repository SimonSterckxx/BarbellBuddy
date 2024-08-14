import UserService from "@/services/UserService";
import { StatusMessage } from "@/types";
import classNames from "classnames";
import { useRouter } from "next/router";
import { useState } from "react";

const UserLoginForm: React.FC = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [nameError, setNameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [statusMessage, setStatusMessage] = useState<StatusMessage[]>([]);
    const router = useRouter();

    const clearErrors = () => {
        setNameError('');
        setPasswordError('');
        setStatusMessage([]);
    }

    const validate = () => {
        let result = false;

        if (!name && name.trim() === '') {
            setNameError('Username is required');
            result = true;
        }
        if (!password && password.trim() === '') {
            setPasswordError('Password is required');
            result = true;
        }
        return false;
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        clearErrors();

        if (!validate) {
            return;
        }

        const user = { username: name, password };
        const response = await UserService.login(user);

        if (response.ok) {
            setStatusMessage([{ message: 'Login successful', type: 'success' }]);
            const user = await response.json();
            console.log(user);
            sessionStorage.setItem('loggedInUser', JSON.stringify(user));
            setTimeout(() => {
                router.push('/');
            }, 2000);
        } else {
            setStatusMessage([{ message: 'Login failed', type: 'error' }]);
        }
    };

    return (
        <>
            {statusMessage && (
                <div className="row">
                    <ul className="list-none mb-3 mx-auto">
                        {statusMessage.map(({ message, type }, index) => (
                            <li key={index}
                                className={classNames({
                                    "text-red-800": type === "error",
                                    "text-green-800": type === "success"
                                })}>{message}</li>
                        ))}
                    </ul>
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <label htmlFor="nameInput"
                    className="block mb-2 text-sm font-medium">Username: </label>
                <div className="block mb-2 text-sm font-medium">
                    <input id="usernameInput"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500" />
                    {nameError && (
                        <div className="text-red-800 text-sm">{nameError}</div>)}
                </div>
                <label htmlFor="passwordInput"
                    className="block mb-2 text-sm font-medium">Password: </label>
                <div className="block mb-2 text-sm font-medium">
                    <input id="passwordInput"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500" />
                    {passwordError && (
                        <div className="text-red-800 text-sm">{passwordError}</div>)}
                </div>

                <button className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    type="submit"></button>
            </form>
        </>
    )
}

export default UserLoginForm;