const config = {
  appName: 'Cvpage',
  appDescription: 'Create your own personal page with Cvpage and share it with the world',
  domainName: 'cvpage.to',
  domainUrl: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://cvpage.to',
  social: {
    twitter: 'https://twitter.com',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
  },
  lemonsqueezy: {
    productLink: process.env.NODE_ENV === 'development' ? 'https://cvpage.lemonsqueezy.com/buy/9cb2a0ed-191d-4d81-a9f5-72361c356a43' : 'https://cvpage.lemonsqueezy.com/buy/5f16d591-9854-4e0c-9a4d-edb9eafd8f10',
    price: '24€',
    productID: process.env.NODE_ENV === 'development' ? '527806' : '544997',
  },
  personal: {
    name: 'Raúl',
    title: 'Founder of Cvpage & Web Developer',
    description:
      "Having an online CV won’t guarantee you a job, but it will catch recruiters' attention for sure :)",
    github: 'https://github.com/raulcanodev',
    linkedin: 'https://www.linkedin.com/in/raulcano-in/',
    email: '',
    twitter: 'https://x.com/raulcanodev',
  },
  email: {
    // @/email-template/emails/signin-email.tsx
    noreply: 'Cvpage <noreply@cvpage.to>',
    signin: {
      subject: 'Login Link to your Cvpage Account.',
      content: 'Please click the magic button below to sign in to your account.',
      buttonColor: '#000',
      logo: 'icon.png',
    }
  }
};

export default config;
