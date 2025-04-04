import { createTransport } from 'nodemailer';

const transport = createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
})

const info = transport.sendMail({
    from: '',
    to: "",
    subject: ''
})