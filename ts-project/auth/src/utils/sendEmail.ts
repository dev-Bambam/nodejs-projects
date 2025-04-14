import { createTransport } from 'nodemailer';
import { EmailError } from './Errors/Errors';
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
            throw new EmailError(email)
        }
        return true;
    } catch (error:any) {
        throw new EmailError(`failed to send email: ${error.message}`)
    }
}

export default sendEmail;