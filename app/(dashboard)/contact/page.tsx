import ContactForm from '@/components/ContactForm';

const ContactPage = () => {
   return (
      <div className='p-4 shadow-sm rounded-md flex items-center flex-col max-w-2xl mx-auto mt-4'>
         <p className='text-2xl font-semibold my-6'>Contact Us</p>
         <ContactForm />
      </div>
   );
};

export default ContactPage;
