import Header from "@/components/header";
import WorkoutTemplateOverview from "@/components/workoutTemplate/workoutTemplateOverview";
import ExerciseService from "@/services/ExerciseService";
import WorkoutTemplateService from "@/services/WorkoutTemplateService";
import { Exercise, WorkoutTemplate } from "@/types"
import Head from "next/head";
import { use, useEffect, useState } from "react";
import useInterval from "use-interval"


const WorkoutTemplates: React.FC = () => {
    const [error, setError] = useState<string | null>(null);
    const [workoutTemplates, setWorkoutTemplates] = useState<WorkoutTemplate[]>([]);
    const [exercises, setExercises] = useState<Exercise[]>([]);

    const getWorkoutTemplatesAndExercises = async () => {
        try {
            const [workoutTemplatesResponse, exercisesResponse] = await Promise.all([
                WorkoutTemplateService.getAllWorkoutTemplates(),
                ExerciseService.getAllExercises()
            ]);

            if (!workoutTemplatesResponse.ok || !exercisesResponse.ok) {
                if (workoutTemplatesResponse.status === 401 || exercisesResponse.status === 401) {
                    setError("You are not authorized to view this page. Please login first!");
                } else {
                    setError(workoutTemplatesResponse.statusText || exercisesResponse.statusText);
                }
                return;
            }

            const workoutTemplates = await workoutTemplatesResponse.json();
            const exercises = await exercisesResponse.json();

            setWorkoutTemplates(workoutTemplates);
            setExercises(exercises);
        } catch (error) {
            setError("An unexpected error occurred.");
            console.error(error);
        }
    };

    useEffect(() => {
        getWorkoutTemplatesAndExercises();
    }, [])

    const handleRefreshTable = async () => {
        try {
            getWorkoutTemplatesAndExercises();
        } catch (error) {
            console.error("Failed to fetch all exercises: ", error);
        }
    };

    return (
        <>
            <Head>
                <title>Workout templates</title>
            </Head>
            <Header />
            <main className="p-6 min-h-screen flex flex-col items-center">
                <>
                    {error && <div className="text-red-800">{error}</div>}
                    {!error && workoutTemplates && exercises &&
                        <>
                            <h1>WorkoutTemplates with all exercises</h1>
                            <WorkoutTemplateOverview workoutTemplates={workoutTemplates} exercises={exercises} refreshTable={handleRefreshTable} />
                        </>
                    }
                </>
            </main>
        </>
    )
}


export default WorkoutTemplates