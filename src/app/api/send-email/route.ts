import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { to, subject, text, imageUrl } = await req.json();

    const response = await resend.emails.send({
      from: 'shopco@resend.dev',
      to,
      subject,
      html: `
        <div style="font-family: Arial, sans-serif; text-align: center;">
        <img src="${imageUrl}" alt="Shipping Image" style="max-width: 30%; height: auto; margin-top: 10px;" />
          <h2>${subject}</h2>
          <p>${text}</p>
          <h4>Thanks for chosen Shop.co </h4>
          
        </div>
      `,
    });

    return NextResponse.json({ success: true, data: response });
  } catch (error) {
    return NextResponse.json({ success: false, error });
  }
}
