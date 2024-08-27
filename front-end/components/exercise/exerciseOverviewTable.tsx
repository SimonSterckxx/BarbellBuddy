import { Exercise, Set } from "../../types";
import React, { useState } from "react";
import AddExerciseForm from "./addExerciseForm";
import ExerciseService from "@/services/ExerciseService";

type Props = {
    exercises: Array<Exercise>
    refreshExercises: () => void
}

const ExerciseOverviewTable: React.FC<Props> = ({ exercises, refreshExercises }: Props) => {
    const [addOpen, setAddOpen] = useState<boolean>(false);

    const handleDeleteExercise = async (exerciseId: number) => {
        try {
            ExerciseService.deleteExerciseById(exerciseId);
            refreshExercises();
        } catch (error) { }
    };

    return (
        <>
            {exercises && (
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Muscle Group</th>
                            <th scope="col">Favorite</th>
                            <th scope="col">Delete Exercise</th>
                        </tr>
                    </thead>
                    <tbody>
                        {exercises.map((exercise, index) => (
                            <tr key={index}>
                                <td>{exercise.name}</td>
                                <td>{exercise.muscleGroup}</td>
                                <td>{exercise.favorite ? "Yes" : "No"}</td>
                                <td>
                                    <button onClick={() => {
                                        handleDeleteExercise(exercise.id!);
                                    }}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {!addOpen &&
                <button onClick={() => setAddOpen(true)}>Add exercise </button>
            }
            {addOpen &&
                <AddExerciseForm refreshExercises={refreshExercises} />
            }
        </>
    )
}

export default ExerciseOverviewTable