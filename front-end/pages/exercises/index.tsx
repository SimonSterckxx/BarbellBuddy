import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '../../components/header';
import ExerciseOverviewTable from '../../components/exercise/exerciseOverviewTable';
import ExerciseService from '@/services/ExerciseService';
import useSWR from 'swr';
import SetService from '@/services/SetService';

const Exercises: React.FC = () => {
    const [error, setError] = useState<string | null>(null);
    const [exercises, setExercises] = useState([]);
    const getExercises = async () => {
        const response = await ExerciseService.getAllExercises();
        if (!response.ok)
            if (response.status === 401) {
                setError("You are not authorized to view this page. Please login first!");
            } else {
                setError(response.statusText);
            }
        else {
            const exercises = await response.json();
            setExercises(exercises);
        }
    }



    const handleRefreshTable = async () => {
        try {
            getExercises();
        } catch (error) {
            console.error("Failed to fetch all exercises: ", error);
        }
    };

    useEffect(() => {
        getExercises();
    }, []);

    return (
        <>
            <Head>
                <title>Exercises</title>
            </Head>
            <Header />
            <main className="d-flex flex-column justify-content-center align-items-center">
                <section>
                    {error && <div className="text-red-800">{error}</div>}
                    {!error && exercises && (
                        <>
                            <h1>Exercises</h1>
                            <ExerciseOverviewTable exercises={exercises} refreshExercises={handleRefreshTable} />
                        </>)}
                </section>
            </main>
        </>
    )
}

export default Exercises;