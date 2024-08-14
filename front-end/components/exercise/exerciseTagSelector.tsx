import Select from 'react-select';
import { Exercise } from "@/types";
import { useState } from "react";

type Props = {
    exercises: Array<Exercise>;
    selectedExerciseIds: number[];
    onSelectionChange: (selectedIds: number[]) => void;
}

const ExerciseTagSelector: React.FC<Props> = ({ exercises, selectedExerciseIds, onSelectionChange }) => {
    const options = exercises
        .filter(exercise => exercise.id !== undefined)
        .map(exercise => ({
            value: exercise.id!,
            label: exercise.name
        }));

    const handleChange = (selectedOptions: any) => {
        const selectedIds = selectedOptions ? selectedOptions.map((option: any) => option.value) : [];
        onSelectionChange(selectedIds);
    };

    return (
        <Select
            options={options}
            value={options.filter(option => selectedExerciseIds.includes(option.value))}
            onChange={handleChange}
            isMulti
        />
    );
};

export default ExerciseTagSelector;