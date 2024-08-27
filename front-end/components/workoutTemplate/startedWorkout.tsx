import React, { useEffect } from 'react';
import { WorkoutTemplate } from "@/types";
import UserService from '@/services/UserService';
import SetService from '@/services/SetService';

type Props = {
    workout: WorkoutTemplate;
    refreshTable: () => void;
}

const StartedWorkout: React.FC<Props> = ({ workout, refreshTable }) => {
    const [openForms, setOpenForms] = React.useState<{ [key: number]: boolean }>({});
    const [formState, setFormState] = React.useState<{ [key: number]: { reps: number | null; weight: number | null } }>({});
    const [loggedInUser, setLoggedInUser] = React.useState<string | null>(null);

    useEffect(() => {
        const storedUserJson = sessionStorage.getItem('loggedInUser');
        if (storedUserJson) {
            const storedUser = JSON.parse(storedUserJson);
            setLoggedInUser(storedUser.username);
        }
    }, []);

    const handleAddSet = (exerciseIndex: number) => {
        setOpenForms((prev) => ({
            ...prev,
            [exerciseIndex]: true,
        }));
        setFormState((prev) => ({
            ...prev,
            [exerciseIndex]: { reps: null, weight: null }
        }));
    };

    const handleCloseForm = (exerciseIndex: number) => {
        setOpenForms((prev) => ({
            ...prev,
            [exerciseIndex]: false,
        }));
        setFormState((prev) => ({
            ...prev,
            [exerciseIndex]: { reps: null, weight: null }
        }));
    };

    const fetchUserId = async (): Promise<number | null> => {
        if (loggedInUser) {
            const response = await UserService.getUserByUsername(loggedInUser);
            const userIdJson = await response.json();
            return userIdJson.id;
        }
        return null;
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>, exerciseIndex: number) => {
        event.preventDefault();
        const userId = await fetchUserId();

        if (userId === null) {
            throw new Error("User not logged in");
        }

        const { reps, weight } = formState[exerciseIndex] || { reps: null, weight: null };

        if (reps === null || weight === null) {
            throw new Error("Reps and weight must be provided");
        }

        const set = {
            reps,
            weight,
            exerciseId: workout.exercises[exerciseIndex].id!,
        };
        await SetService.createSet(set);
        handleCloseForm(exerciseIndex);
        refreshTable();
    };

    const handleInputChange = (exerciseIndex: number, field: 'reps' | 'weight', value: number | null) => {
        setFormState((prev) => ({
            ...prev,
            [exerciseIndex]: {
                ...prev[exerciseIndex],
                [field]: value,
            }
        }));
    };

    return (
        <>
            <div>
                <h1>{workout.name}</h1>
                {workout.exercises.map((exercise, index) => (
                    <div key={index}>
                        <h2>{exercise.name}</h2>

                        {exercise.sets.map((set, setIndex) => (
                            <div key={setIndex}>
                                <p>Set {setIndex + 1}</p>
                                <p>Reps: {set.reps}</p>
                                <p>Weight: {set.weight}</p>
                            </div>
                        ))}

                        {openForms[index] ? (
                            <form onSubmit={(event) => handleSubmit(event, index)}>
                                <input
                                    type="number"
                                    placeholder="Reps"
                                    value={formState[index]?.reps || ''}
                                    onChange={(e) => handleInputChange(index, 'reps', parseInt(e.target.value))}
                                />
                                <input
                                    type="number"
                                    placeholder="Weight"
                                    value={formState[index]?.weight || ''}
                                    onChange={(e) => handleInputChange(index, 'weight', parseInt(e.target.value))}
                                />
                                <button type="submit">Add</button>
                                <button type="button" onClick={() => handleCloseForm(index)}>Cancel</button>
                            </form>
                        ) : (
                            <button onClick={() => handleAddSet(index)}>+ Add Set</button>
                        )}
                    </div>
                ))}
                <button>Finish workout</button>
            </div>
        </>
    );
}

export default StartedWorkout;
