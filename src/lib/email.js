export const EMAILJS_SERVICE_ID =
  process.env.REACT_APP_EMAILJS_SERVICE_ID || 'service_mqfxlrf';
export const EMAILJS_PUBLIC_KEY =
  process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'gIe1fPtsjMnXK9NsC';
export const EMAILJS_CONSULTATION_TEMPLATE_ID =
  process.env.REACT_APP_EMAILJS_CONSULTATION_TEMPLATE_ID || 'template_3o6955o';
export const EMAILJS_CONSULTATION_CONFIRM_TEMPLATE_ID =
  process.env.REACT_APP_EMAILJS_CONSULTATION_CONFIRM_TEMPLATE_ID || 'template_iff6fyg';
export const EMAILJS_OWNER_EMAIL =
  process.env.REACT_APP_OWNER_EMAIL || 'fadialbadrasawi@gmail.com';

let emailClientPromise;

async function getEmailClient() {
  if (!emailClientPromise) {
    emailClientPromise = import('emailjs-com').then(({ default: emailjs }) => {
      emailjs.init(EMAILJS_PUBLIC_KEY);
      return emailjs;
    });
  }

  return emailClientPromise;
}

export async function sendEmail(templateId, templateParams) {
  const emailjs = await getEmailClient();

  return emailjs.send(EMAILJS_SERVICE_ID, templateId, templateParams);
}
