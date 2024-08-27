import { Set, SetInput } from "@/types";

const createSet = async (set: SetInput) => {
    const loggedInUserString = sessionStorage.getItem('loggedInUser');
    let token = null;
    if (loggedInUserString !== null) {
        token = JSON.parse(loggedInUserString)?.token;
    }
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/sets',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(set)
        })
};

const getAllSets = async () => {
    const loggedInUserString = sessionStorage.getItem('loggedInUser');
    let token = null;
    if (loggedInUserString !== null) {
        token = JSON.parse(loggedInUserString)?.token;
    }
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/sets/getAllSets',
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
};

export default {
    createSet,
    getAllSets
};