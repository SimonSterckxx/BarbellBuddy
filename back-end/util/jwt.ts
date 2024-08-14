import exp from 'constants';
import jwt from 'jsonwebtoken';

const generateJwtToken = ({ username, role }): string => {
    const options = { expiresIn: `${process.env.JWT_EXPIRES_HOURS}h`, issuer: "barbellBuddy" };
    try {
        return jwt.sign({ username, role }, process.env.JWT_SECRET, options);
    }
    catch (error) {
        console.log(error);
        throw new Error('Error generating JWT token, see server log for more info.')
    }

}

export { generateJwtToken }