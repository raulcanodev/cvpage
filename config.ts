const config = {
  appName: 'Cvpage',
  appDescription: 'The first CV builder that helps you stand out in your job search, or simply create a minimal portfolio.',
  domainName: 'cvpage.to',
  domainUrl: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://cvpage.to',
  social: {
    twitter: 'https://twitter.com',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
  },
  lemonsqueezy: {
    price: '9€',
    productID: process.env.NODE_ENV === 'development' ? '527806' : '544997',
  },
  personal: {
    name: 'Raúl',
    title: 'Founder of Cvpage & Web Developer',
    description:
      "I'm a web developer based in Lisbon and the founder of Cvpage. After seeing many people struggle to stand out in their job search, I decided to create Cvpage to make it easier. Don’t hesitate to reach out if you have any questions!",
    github: 'https://github.com/raulcanodev',
    linkedin: 'https://www.linkedin.com/in/raulcano-in/',
    email: 'rawraul@outlook.com',
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
