import ContactForm from '@/components/ContactForm';

const ContactPage = () => {
   return (
      <div className='p-4 shadow-sm rounded-md flex items-center flex-col max-w-2xl mx-auto'>
         <p className='text-2xl font-semibold mt-20 mb-4'>Contact Us</p>
         <ContactForm />
      </div>
   );
};

export default ContactPage;
