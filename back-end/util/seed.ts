// Execute: npx ts-node util/seed.ts

import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const main = async () => {
    await prisma.workoutTemplate.deleteMany()
    await prisma.set.deleteMany()
    await prisma.exercise.deleteMany()
    await prisma.user.deleteMany()

    const admin = await prisma.user.create({
        data: {
            username: 'Admin',
            password: await bcrypt.hash('admin123', 10),
            role: 'Admin',
            age: 22,
            weight: 95,
            height: 193,
        }
    })


    const simon = await prisma.user.create({
        data: {
            username: 'Simon',
            password: await bcrypt.hash('simon123', 10),
            role: 'User',
            age: 22,
            weight: 95,
            height: 193,
        }
    })

    const benchPress = await prisma.exercise.create({
        data: {
            user: {
                connect: {
                    id: simon.id
                }
            },
            name: 'Bench Press',
            muscleGroup: 'Chest',
            favorite: true
        }
    })

    const benchPressSet1 = await prisma.set.create({
        data: {
            reps: 10,
            weight: 60,
            exercise: {
                connect: {
                    id: benchPress.id
                }
            }
        }
    })

    const inclineDumbellPress = await prisma.exercise.create({
        data: {
            user: {
                connect: {
                    id: simon.id
                }
            },
            name: 'Incline Dumbell Press',
            muscleGroup: 'Chest',
            favorite: true
        }
    })

    const cableFly = await prisma.exercise.create({
        data: {
            user: {
                connect: {
                    id: simon.id
                }
            },
            name: 'Cable Fly',
            muscleGroup: 'Chest',
            favorite: false
        }
    })

    const lateralRaise = await prisma.exercise.create({
        data: {
            user: {
                connect: {
                    id: simon.id
                }
            },
            name: 'Lateral Raise',
            muscleGroup: 'Shoulders',
            favorite: false
        }
    })

    const tricepsExtension = await prisma.exercise.create({
        data: {
            user: {
                connect: {
                    id: simon.id
                }
            },
            name: 'Triceps Extension',
            muscleGroup: 'Arms',
            favorite: false
        }
    })

    const overheadExtension = await prisma.exercise.create({
        data: {
            user: {
                connect: {
                    id: simon.id
                }
            },
            name: 'Overhead Extension',
            muscleGroup: 'Arms',
            favorite: false
        }
    })

    const squat = await prisma.exercise.create({
        data: {
            user: {
                connect: {
                    id: simon.id
                }
            },
            name: 'Squat',
            muscleGroup: 'Legs',
            favorite: false
        }
    })

    const deadlift = await prisma.exercise.create({
        data: {
            user: {
                connect: {
                    id: simon.id
                }
            },
            name: 'Deadlift',
            muscleGroup: 'Back',
            favorite: true
        }
    })

    const chestDay = await prisma.workoutTemplate.create({
        data: {
            user: {
                connect: {
                    id: simon.id
                }
            },
            name: 'Chest Day',
            description: 'Chest workout',
            exercises: {
                connect: [
                    { id: benchPress.id },
                    { id: inclineDumbellPress.id },
                    { id: cableFly.id },
                    { id: lateralRaise.id },
                    { id: tricepsExtension.id },
                    { id: overheadExtension.id }
                ]
            }
        }
    })
}

main();