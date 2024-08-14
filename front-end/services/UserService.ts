import { UserLogin } from "@/types";

const login = async (user: UserLogin) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
}

const getUserByUsername = async (username: string) => {
    const loggedInUserString = sessionStorage.getItem('loggedInUser');
    let token = null;
    if (loggedInUserString !== null) {
        token = JSON.parse(loggedInUserString)?.token;
    }
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/users/getUserByUsername/' + username, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    });
}


export default { login, getUserByUsername };