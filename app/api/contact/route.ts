import { FormDataSchema } from '@/lib/schema';
import { authOptions } from '@/providers/authOptions';
import { resend } from '@/resend/resend';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
   try {
      const session = await getServerSession(authOptions);
      if (!session) return NextResponse.json({ success: false });
      const { email, name } = session.user;
      const body = await req.json();
      const validation = FormDataSchema.safeParse(body);
      if (!validation.success) {
         return NextResponse.json({ success: false }, { status: 400 });
      }
      const { subject, message, subscriptionPlan } = validation.data;
      const data = await resend.emails.send({
         from: `${name} <${process.env.RESEND_EMAIL}>`,
         to: ['melendez@robertdev.net'],
         reply_to: email!,
         subject: subject,
         text: message,
      });

      return NextResponse.json({ success: true, data });
   } catch (error) {
      return NextResponse.json({ error }, { status: 500 });
   }
}
