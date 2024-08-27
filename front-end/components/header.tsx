import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
    const [loggedInUser, setLoggedInUser] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(null);

    useEffect(() => {
        const storedUserJson = sessionStorage.getItem('loggedInUser');
        if (storedUserJson) {
            const storedUser = JSON.parse(storedUserJson);
            setLoggedInUser(storedUserJson);
            setUsername(storedUser.username);
        }
    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem("loggedInUser");
        setLoggedInUser(null);
        setUsername(null);
    };

    return (
        <header className="header">
            <a className="title">Barbell Buddy</a>
            <nav className="nav">
                <Link href="/" className="link">Home</Link>
                <Link href="/exercises" className="link">Exercises</Link>
                <Link href="/workoutTemplates" className="link">Workout Templates</Link>
                {!loggedInUser && (
                    <Link href="/login" className="link">Login</Link>
                )}
                {loggedInUser && (
                    <>
                        <a href="#" className="link" onClick={handleLogout}>Logout</a>
                        <p className="welcome">Welcome {username}</p>
                    </>
                )}
            </nav>
        </header>
    );
};

export default Header;
