import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
    const [loggedInUser, setLoggedInUser] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(null);

    useEffect(() => {
        setLoggedInUser(sessionStorage.getItem("loggedInUser"))
        const storedUserJson = sessionStorage.getItem('loggedInUser');

        if (storedUserJson) {
            const storedUser = JSON.parse(storedUserJson);
            setUsername(storedUser.username);
        }
    }, [])

    const handleLogout = () => {
        sessionStorage.removeItem("loggedInUser");
        setLoggedInUser(null);
    }

    return (
        <>
            <header className='p-3 mb-3 border-bottom bg-gradient-to-br from-gray-900 to-gray-600 flex flex-col items-center'>
                <a className='flex mb-2 md:mb-5 text-black-50 text-3xl text-gray-300'>Barbell Buddy</a>
                <nav className='items-center flex md:flex-row flex-col'>
                    <Link
                        href="/"
                        className="px-4 text-xl text-black hover:bg-gray-600 rounded-lg">
                        Home
                    </Link>
                    <Link
                        href="/exercises"
                        className="px-4 text-xl text-black hover:bg-gray-600 rounded-lg">
                        Exercises
                    </Link>
                    <Link
                        href="/workoutTemplates"
                        className="px-4 text-xl text-black hover:bg-gray-600 rounded-lg">
                        WorkoutTemplates
                    </Link>

                    {!loggedInUser && (
                        <Link
                            href="/login"
                            className="px-4 text-xl text-black hover:bg-gray-600 rounded-lg">
                            Login
                        </Link>
                    )}
                    {loggedInUser && (
                        <>
                            <a href="#"
                                className="px-4 text-xl text-black hover:bg-gray-600 rounded-lg"
                                onClick={handleLogout}>
                                Logout
                            </a>
                            <p>Welcome {username}</p>
                        </>

                    )}
                </nav>
            </header>
        </>
    )
}

export default Header;