import nodemailer from "nodemailer"

// Create a transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: Number(process.env.EMAIL_SERVER_PORT),
  secure: true,
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
})

interface QuestionEmailParams {
  from: string
  to: string
  subject: string
  userName: string
  userEmail: string
  message: string
}

export async function sendVerificationEmail(email: string, token: string) {
  const verificationUrl = `${process.env.NEXTAUTH_URL}/api/auth/verify?token=${token}`

  await transporter.sendMail({
    from: process.env.ADMIN_EMAIL,
    to: email,
    subject: "Verify your email address",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Verify your email address</h2>
        <p>Thank you for registering with MindSupport. Please click the button below to verify your email address:</p>
        <a href="${verificationUrl}" style="display: inline-block; background-color: #4F46E5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 20px 0;">
          Verify Email
        </a>
        <p>If you did not create an account, you can safely ignore this email.</p>
      </div>
    `,
  })
}

export async function sendQuestionEmail({ from, to, subject, userName, userEmail, message }: QuestionEmailParams) {
  await transporter.sendMail({
    from,
    to,
    subject,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>New Question from ${userName}</h2>
        <p><strong>From:</strong> ${userName} (${userEmail})</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <p>${message.replace(/\n/g, "<br>")}</p>
        </div>
        <p>You can reply directly to this email to respond to the user.</p>
      </div>
    `,
  })
}

