const addExercise = async (exercise: any) => {
    const loggedInUserString = sessionStorage.getItem('loggedInUser');
    let token = null;
    if (loggedInUserString !== null) {
        token = JSON.parse(loggedInUserString)?.token;
    }
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/exercises',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(exercise)
        })
};

const deleteExerciseById = async (id: number) => {
    const loggedInUserString = sessionStorage.getItem('loggedInUser');
    let token = null;
    if (loggedInUserString !== null) {
        token = JSON.parse(loggedInUserString)?.token;
    }
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/exercises/' + id,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
};

const getAllExercises = async () => {
    const loggedInUserString = sessionStorage.getItem('loggedInUser');
    let token = null;
    if (loggedInUserString !== null) {
        token = JSON.parse(loggedInUserString)?.token;
    }
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/exercises/getAllExercises',
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
};

const getExerciseById = async (id: string) => {
    const loggedInUserString = sessionStorage.getItem('loggedInUser');
    let token = null;
    if (loggedInUserString !== null) {
        token = JSON.parse(loggedInUserString)?.token;
    }
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/exercises/getExerciseById/' + id,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
}

export default {
    addExercise,
    deleteExerciseById,
    getAllExercises,
    getExerciseById
};