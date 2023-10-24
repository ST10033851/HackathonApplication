const nodemailer = require("nodemailer");
// Import NodeMailer (after npm install)

async function main() {
    // Async function enables allows handling of promises with await

    // First, define send settings by creating a new transporter: 
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com", // SMTP server address (usually mail.your-domain.com)
        port: 465, // Port for SMTP (usually 465)
        secure: true, // Usually true if connecting to port 465
        auth: {
            user: 'bargainbasketteam@gmail.com', // Your email address
            pass: 'bargainbasket123', // Password (for gmail, your app password)
            // ⚠️ For better security, use environment variables set on the server for these values when deploying
        },
    });

    // Define and send message inside transporter.sendEmail() and await info about send from promise:
    let info = await transporter.sendMail({
        from: 'Bargain Basket <bargainbasketteam@gmail.c>',
        to: "avishjudnarain19@gmail.com",
        subject: "Your Grocery List",
        html: `
    <h1>Hello there</h1>
    <p>Isn't NodeMailer useful?</p>
    `,
    });

    console.log(info.messageId); // Random ID generated after successful send (optional)
}

main()
    .catch(err => console.log(err));