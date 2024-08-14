// Execute: npx ts-node util/seed.ts

import { PrismaClient } from "@prisma/client";
import { set } from "date-fns";

const prisma = new PrismaClient();

const main = async () => {
    await prisma.workoutTemplate.deleteMany()
    await prisma.exercise.deleteMany()
    await prisma.user.deleteMany()

    const admin = await prisma.user.create({
        data: {
            username: 'Admin',
            password: '$2a$12$/OBlXlQzkoCTFZ1Wm6T4bOx7yfXiRe0kCoe/hcRHmR6pyzdhax6lG',
            role: 'ADMIN',
            age: 22,
            weight: 95,
            height: 193,
        }
    })


    const simon = await prisma.user.create({
        data: {
            username: 'Simon',
            password: '1234',
            role: 'USER',
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