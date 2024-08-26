import * as dotenv from 'dotenv';
import express, { ErrorRequestHandler, NextFunction } from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { userRouter } from './controller/user.routes';
import { exerciseRouter } from './controller/exercise.routes';
import { workoutTemplateRouter } from './controller/workoutTemplate.routes';
import { setRouter } from './controller/set.routes';
import { expressjwt } from 'express-jwt';
import helmet from 'helmet';

const app = express();
app.use(helmet());
dotenv.config();
const port = process.env.APP_PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use(expressjwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
}).unless({ path: ['/api-docs', /^\/api-docs\/.*/, '/users/signup', '/users/login', '/status'] }));

app.use('/users', userRouter);
app.use('/exercises', exerciseRouter);
app.use('/workoutTemplates', workoutTemplateRouter);
app.use('/sets', setRouter);

app.get('/status', (req, res) => {
    res.json({ message: 'Back-end is running...' });
});

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'BarbellBuddy API',
            version: '1.0.0',
            description: 'BarbellBuddy API Documentation',
        },
    },
    apis: ['./controller/*.routes.ts'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
    console.error('Error:', err);

    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ status: 'unauthorized', message: err.message });
    } else if (['UserError', 'ExerciseError', 'WorkoutTemplateError'].includes(err.name)) {
        res.status(400).json({ status: 'domain error', message: err.message });
    } else {
        res.status(500).json({
            status: 'application error',
            message: err.message || 'An unexpected error occurred',
        });
    }
};

app.use(errorHandler);

app.listen(port || 3000, () => {
    console.log(`Back-end is running on port ${port}.`);
});
