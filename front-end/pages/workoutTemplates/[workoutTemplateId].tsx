import React from 'react';
import StartedWorkout from "@/components/workoutTemplate/startedWorkout";
import WorkoutTemplateService from "@/services/WorkoutTemplateService";
import { useRouter } from "next/router";
import useSWR, { mutate } from "swr";
import useInterval from "use-interval";
import { WorkoutTemplate } from "@/types";
import Header from '@/components/header';


const ReadWorkoutTemplateById: React.FC = () => {
    const router = useRouter();
    const { workoutTemplateId } = router.query;

    const { data, error, isLoading } = useSWR<WorkoutTemplate>(
        workoutTemplateId ? `exerciseById/${workoutTemplateId}` : null,
        async () => {
            const response = await WorkoutTemplateService.getWorkoutTemplateById(workoutTemplateId as string);
            const workoutTemplate: WorkoutTemplate = await response.json();
            return workoutTemplate;
        }
    );

    const handleRefreshTable = () => {
        // Manually trigger a revalidation of the SWR cache for this endpoint
        if (workoutTemplateId) {
            mutate(`exerciseById/${workoutTemplateId}`);
        }
    };

    useInterval(() => {
        if (workoutTemplateId) {
            mutate(`exerciseById/${workoutTemplateId}`);
        }
    }, 10000);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading workout template</div>;

    return (
        <>
            <Header />
            {data && <StartedWorkout workout={data} refreshTable={handleRefreshTable} />}
        </>
    );
}

export default ReadWorkoutTemplateById;
