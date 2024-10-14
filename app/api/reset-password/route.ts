import { Resend } from 'resend'
import { NextResponse } from 'next/server';
import { fetchUserDataByEmail, saveResetToken } from '@/lib/mongodb';
import { v4 as uuidv4 } from 'uuid';
import config from "@/config";
import { ResetPasswordEmail } from '@/email-template/emails/reset-password';

/**
 * This route is responsible for sending an email to the user with a link to reset their password.
 * The email is sent using the Resend API.
 * 
 * The user's email is extracted from the request body and used to fetch the user's data from the database.
 * If the user is found, a reset token is generated and saved to the database.
 * 
 * Check: auth/forgot-password/page.tsx then auth/reset-password/page.tsx
 */

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(request: Request) {
  const { email } = await request.json();

  const user = await fetchUserDataByEmail(email);

  if(!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }

  const token = uuidv4();
  const resetUrl = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${token}`;
  await saveResetToken(email, token);

  try {
    const { data, error } = await resend.emails.send({
      from: `${config.appName} <noreply@${config.domainName}>`,
      to: email,
      subject: 'Reset your password',
      react: ResetPasswordEmail({ userFirstname: "Cvpager", resetPasswordLink: resetUrl }),
    });
    // const { data, error } = await resend.emails.send({
    //   from: `${config.appName} <noreply@${config.domainName}>`,
    //   to: email,
    //   subject: 'Reset your password',
    //   text: `Reset your password here: ${resetUrl}`,
    // });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return NextResponse.json({ message: 'Check your email 😄', data });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }

}