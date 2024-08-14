import { Exercise } from "@/types"

type Props = {
    exercise: Exercise | null
}

const ExerciseInfo: React.FC<Props> = ({ exercise }: Props) => {
    return (
        <>
            {exercise && (
                <div>
                    <p>Name: {exercise.name}</p>
                    <p>Muscle group: {exercise.muscleGroup}</p>
                    <p>Favorite: {exercise.favorite ? "Yes" : "No"}</p>
                </div>
            )}
            {!exercise && <p>Exercise not found</p>}
        </>
    )
}

export default ExerciseInfo