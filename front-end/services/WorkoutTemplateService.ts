import { Exercise, WorkoutTemplate } from "@/types";

const getAllWorkoutTemplates = async () => {
    const loggedInUserString = sessionStorage.getItem('loggedInUser');
    let token = null;
    if (loggedInUserString !== null) {
        token = JSON.parse(loggedInUserString)?.token;
    }
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/workoutTemplates/getAllWorkoutTemplates',
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
};

const getWorkoutTemplateById = async (id: string) => {
    const loggedInUserString = sessionStorage.getItem('loggedInUser');
    let token = null;
    if (loggedInUserString !== null) {
        token = JSON.parse(loggedInUserString)?.token;
    }
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/workoutTemplates/' + id,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
}

const addWorkoutTemplate = async (workoutTemplate: WorkoutTemplate) => {
    const loggedInUserString = sessionStorage.getItem('loggedInUser');
    let token = null;
    if (loggedInUserString !== null) {
        token = JSON.parse(loggedInUserString)?.token;
    }
    console.log(workoutTemplate);
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/workoutTemplates',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(workoutTemplate)
        })
};

const addExerciseToWorkoutTemplate = async (workoutTemplateId: number, exerciseId: number) => {
    const loggedInUserString = sessionStorage.getItem('loggedInUser');
    let token = null;
    if (loggedInUserString !== null) {
        token = JSON.parse(loggedInUserString)?.token;
    }
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/workoutTemplates/' + workoutTemplateId + '/addExerciseToWorkoutTemplate',
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ exerciseId })
        })
}

const removeExerciseFromWorkoutTemplate = async (workoutTemplateId: number, exerciseId: number) => {
    const loggedInUserString = sessionStorage.getItem('loggedInUser');
    let token = null;
    if (loggedInUserString !== null) {
        token = JSON.parse(loggedInUserString)?.token;
    }
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/workoutTemplates/' + workoutTemplateId + '/deleteExerciseFromWorkoutTemplate',
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ exerciseId })
        })
}

const deleteWorkoutById = async (id: number) => {
    const loggedInUserString = sessionStorage.getItem('loggedInUser');
    let token = null;
    if (loggedInUserString !== null) {
        token = JSON.parse(loggedInUserString)?.token;
    }
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/workoutTemplates/' + id,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
}

export default {
    getAllWorkoutTemplates,
    getWorkoutTemplateById,
    addWorkoutTemplate,
    addExerciseToWorkoutTemplate,
    removeExerciseFromWorkoutTemplate,
    deleteWorkoutById
};