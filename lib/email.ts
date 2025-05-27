"use server"

import { formSchema } from "../convex/schema";
import {z} from "zod"
import nodemailer from "nodemailer"


const send = async (emailFormData: z.infer<typeof formSchema>) => {
    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:'nithingodeshi33@gmail.com',
            pass:process.env.APP_PASS, 
        }

    });
    const mailOptions ={
        from:"nithingodeshi33@gmail.com",
        to:emailFormData.email,
        subject:'Thank you for the Feedback!',
        html:`<html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Thank You for Your Feedback</title>
                </head>
                <body style="font-family: Arial, sans-serif; color: #333;">
                    <h2 style="color: #4CAF50;">Thank You for Your Feedback, ${emailFormData.firstname}!</h2>
                    <p style="font-size: 16px;">We’ve received your message, and our team will get back to you as soon as possible.</p>
                    <p style="font-size: 16px;">Here’s the message you submitted:</p>
                    <blockquote style="border-left: 4px solid #4CAF50; padding-left: 10px; font-style: italic;">
                        "${emailFormData.message}"
                    </blockquote>
                    <p style="font-size: 16px;">If you have any further questions or need immediate assistance, feel free to contact us again!</p>
                    <p style="font-size: 16px;">Thanks for reaching out, and we’ll be in touch soon!</p>
                    <br>
                    <p style="font-size: 16px;">Best regards,<br>Nithin Godeshi</p>
                </body>
            </html>`
    
        
    }
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    } catch (error) {
        console.error('Error sending email: ', error);
    }

    

};
export  default send