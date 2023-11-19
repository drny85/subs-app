import MagicLinkEmail from '@/emails/MagicLink';
import { resend } from '@/resend/resend';
import toast from 'react-hot-toast';

export async function sendVerificationRequest(params: any) {
   const { identifier, url } = params;
   const { host } = new URL(url);

   try {
      const data = await resend.emails.send({
         from: `Students Notes <${process.env.RESEND_EMAIL}>`,
         to: [identifier],
         subject: `Log in to Students Notes Site`,
         text: text({ url, host }),
         react: MagicLinkEmail({ url, host }),
      });
      console.log('Email sent successfully', data);
      return { success: true, data };
   } catch (error) {
      const err = error as Error;
      toast.error(err.message);
      throw new Error('Failed to send the verification Email.');
   }
}

function text({ url, host }: { url: string; host: string }) {
   return `Sign in to ${host}\n${url}\n\n`;
}
