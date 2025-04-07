import { createTransport } from 'nodemailer';
import logger from './logger';

const transport = createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
})

const sendEmail = async (email: string, subject: string, code: string): Promise<boolean> => {
    try {
        const info = await transport.sendMail({
           from: process.env.EMAIL,
           to: email,
           subject: subject,
           html: `<h1>${subject}</h1>
        <p>Please copy this code to verify your to do ${subject}</p>
        <p>${code}</p>
        `,
        });
        if (!info.accepted.includes(email)) {
            logger.error(`failed to send email to ${email}`);
            throw new Error()
        }
        return true;
    } catch (error) {
        throw new Error(`unexpected error occured: error.message`)
    }
}

export default sendEmail;