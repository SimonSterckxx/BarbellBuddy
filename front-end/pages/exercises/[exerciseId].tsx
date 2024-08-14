import ExerciseInfo from "@/components/exercise/exerciseInfo";
import Header from "@/components/header";
import ExerciseService from "@/services/ExerciseService";
import { Exercise } from "@/types";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import useInterval from "use-interval";

const ReadExerciseById: React.FC = () => {

    const router = useRouter();
    const { exerciseId } = router.query;

    const getExerciseById = async (exerciseId: string) => {
        const [exerciseResponse] = await Promise.all([ExerciseService.getExerciseById(exerciseId as string)]);
        const [exercise] = await Promise.all([exerciseResponse.json()]);
        return exercise;
    }

    const { data, isLoading, error } = useSWR(exerciseId ? `exerciseById/${exerciseId}` : null, () => getExerciseById(exerciseId as string));

    useInterval(() => {
        mutate("exerciseById", getExerciseById(exerciseId as string));
    }, 10000);

    return (
        <>
            <Head>
                <title>Exercise info</title>
            </Head>
            <Header />
            <main className="d-flex flex-column justify-content-center align-items-center">
                <h1>Info of {data && data.name}</h1>
                {!data && <p>Exercise not found</p>}
                <section>
                    <ExerciseInfo exercise={data} />
                </section>
            </main>
        </>
    )
}


export default ReadExerciseById;