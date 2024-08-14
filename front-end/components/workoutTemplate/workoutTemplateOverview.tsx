import { WorkoutTemplate, Exercise } from "@/types";
import { useState } from "react";
import classNames from 'classnames';
import WorkoutTemplateService from "@/services/WorkoutTemplateService";
import AddWorkoutTemplateForm from "./addWorkoutTemplateForm";

type Props = {
    workoutTemplates: Array<WorkoutTemplate>;
    exercises: Array<Exercise>;
    refreshTable: () => void;
}
const WorkoutTemplateOverview: React.FC<Props> = ({ workoutTemplates, exercises, refreshTable }: Props) => {
    const [selectedWorkoutTemplate, setSelectedWorkoutTemplate] = useState<WorkoutTemplate | null>(null);
    const [addOpen, setAddOpen] = useState<boolean>(false);

    const selectWorkoutTemplate = (workoutTemplate: WorkoutTemplate) => {
        setSelectedWorkoutTemplate(workoutTemplate);
    };

    const handleAddExercise = async (exercise: Exercise) => {
        if (!selectedWorkoutTemplate || selectedWorkoutTemplate.id === undefined) {
            console.error('No workout template selected or template ID is undefined.');
            return;
        }
        if (exercise.id === undefined) {
            console.error('Exercise ID is undefined.');
            return;
        }

        try {
            await WorkoutTemplateService.addExerciseToWorkoutTemplate(selectedWorkoutTemplate.id, exercise.id);
            const response = await WorkoutTemplateService.getWorkoutTemplateById(selectedWorkoutTemplate.id);
            const updatedWorkoutTemplate = await response.json();
            refreshTable();
            setSelectedWorkoutTemplate(updatedWorkoutTemplate);
        } catch (error) {
            console.error('Failed to add exercise:', error);
        }
    };

    const handleRemoveExerciseFromWorkout = async (exercise: Exercise) => {
        if (!selectedWorkoutTemplate || selectedWorkoutTemplate.id === undefined) {
            console.error('No workout template selected or template ID is undefined.');
            return;
        }
        if (exercise.id === undefined) {
            console.error('Exercise ID is undefined.');
            return;
        }

        try {
            await WorkoutTemplateService.removeExerciseFromWorkoutTemplate(selectedWorkoutTemplate.id, exercise.id);
            const response = await WorkoutTemplateService.getWorkoutTemplateById(selectedWorkoutTemplate.id);
            const updatedWorkoutTemplate = await response.json();
            refreshTable();
            setSelectedWorkoutTemplate(updatedWorkoutTemplate);
        } catch (error) {
            console.error('Failed to remove exercise:', error);
        }
    };

    const handleDeleteWorkoutTemplate = async (workoutId: number) => {
        try {
            await WorkoutTemplateService.deleteWorkoutById(workoutId);
            refreshTable();
        } catch (error) { }
    };

    return (
        <>
            {workoutTemplates && (
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Delete workout template</th>
                        </tr>
                    </thead>
                    <tbody>
                        {workoutTemplates.map((workoutTemplate, index) => (
                            <tr key={index}>
                                <td
                                    onClick={() => selectWorkoutTemplate(workoutTemplate)}
                                    className={classNames({
                                        "table-active": selectedWorkoutTemplate?.id === workoutTemplate.id
                                    })}
                                    role="button">{workoutTemplate.name}</td>
                                <td>
                                    <button onClick={() => {
                                        handleDeleteWorkoutTemplate(workoutTemplate.id!);
                                    }}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {selectedWorkoutTemplate && (
                <section className="mt-5">
                    <h2 className="text-center">Exercises</h2>
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">name</th>
                                <th scope="col">muscle group</th>
                                <th scope="col">favorite</th>
                            </tr>
                        </thead>
                        <tbody>
                            {exercises.map((exercise, index) => (
                                <tr key={index}>
                                    <td>{exercise.name}</td>
                                    <td>{exercise.muscleGroup}</td>
                                    <td>{exercise.favorite ? "Yes" : "No"}</td>
                                    <td>
                                        {!selectedWorkoutTemplate.exercises.find(
                                            (e) => e.id === exercise.id
                                        ) && (
                                                <button
                                                    onClick={() => handleAddExercise(exercise)}>Add to workout</button>
                                            )}
                                        {selectedWorkoutTemplate.exercises.find(
                                            (e) => e.id === exercise.id
                                        ) && (
                                                <button
                                                    onClick={() => handleRemoveExerciseFromWorkout(exercise)}>Remove from workout</button>
                                            )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            )}
            {!addOpen &&
                <button onClick={() => setAddOpen(true)}>Add workout template</button>
            }
            {addOpen &&
                <AddWorkoutTemplateForm exercises={exercises} refreshTable={refreshTable} />
            }
        </>
    )
}

export default WorkoutTemplateOverview