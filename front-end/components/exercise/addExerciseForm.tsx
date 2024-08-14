import ExerciseService from "@/services/ExerciseService";
import UserService from "@/services/UserService";
import { useEffect, useState } from "react";

type Props = {
    refreshExercises: () => void;
};

const AddExerciseForm: React.FC<Props> = ({ refreshExercises }) => {
    const [name, setName] = useState('');
    const [muscleGroup, setMuscleGroup] = useState('');
    const [favorite, setFavorite] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState<string | null>(null);

    useEffect(() => {
        setLoggedInUser(sessionStorage.getItem("loggedInUser"))
        const storedUserJson = sessionStorage.getItem('loggedInUser');

        if (storedUserJson) {
            const storedUser = JSON.parse(storedUserJson);
            setLoggedInUser(storedUser.username);

        }
    }, [])

    const fetchUserId = async (): Promise<number | null> => {
        if (loggedInUser) {
            const response = await UserService.getUserByUsername(loggedInUser);
            const userIdJson = await response.json();
            return userIdJson.id;
        }
        return null;
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const userId = await fetchUserId();

        if (userId === null) {
            throw new Error("User not logged in");
        }
        const exercise = { userId, name, muscleGroup, favorite };
        await ExerciseService.addExercise(exercise);
        refreshExercises();
    };
    return (
        <>
            <h1>Add Exercise</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor="muscleGroup">Muscle Group</label>
                <input
                    type="text"
                    id="muscleGroup"
                    name="muscleGroup"
                    required
                    value={muscleGroup}
                    onChange={(e) => setMuscleGroup(e.target.value)}
                />
                <label htmlFor="favorite">Favorite</label>
                <input
                    type="checkbox"
                    id="favorite"
                    name="favorite"
                    checked={favorite}
                    onChange={(e) => setFavorite(e.target.checked)}
                />
                <button type="submit">Submit</button>
            </form>
        </>
    )
}

export default AddExerciseForm;