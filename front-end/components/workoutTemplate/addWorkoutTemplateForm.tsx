import UserService from "@/services/UserService";
import WorkoutTemplateService from "@/services/WorkoutTemplateService";
import { Exercise, WorkoutTemplate } from "@/types";
import { useEffect, useState } from "react";
import ExerciseTagSelector from "../exercise/exerciseTagSelector";

type Props = {
    exercises: Array<Exercise>;
    refreshTable: () => void;
}

const AddWorkoutTemplateForm: React.FC<Props> = ({ exercises, refreshTable }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [loggedInUser, setLoggedInUser] = useState<string | null>(null);
    const [selectedExerciseIds, setSelectedExerciseIds] = useState<number[]>([]);

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
        const selectedExercises = exercises.filter(e => selectedExerciseIds.includes(e.id!));
        const workoutTemplate = {
            userId,
            name,
            description,
            exercises: selectedExercises
        }; console.log("submitting", workoutTemplate);
        await WorkoutTemplateService.addWorkoutTemplate(workoutTemplate);
        setName('');
        setDescription('');
        setSelectedExerciseIds([]);
        refreshTable();
    };
    return (
        <>
            <h1 className="text-2xl font-bold mb-4">Add Workout Template</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-black rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-black rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label htmlFor="exercises" className="block text-sm font-medium text-gray-700">Exercises</label>
                    <ExerciseTagSelector
                        exercises={exercises}
                        selectedExerciseIds={selectedExerciseIds}
                        onSelectionChange={setSelectedExerciseIds}
                    />
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Add
                </button>
            </form>
        </>
    );
};

export default AddWorkoutTemplateForm;