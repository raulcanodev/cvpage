const config = {
  appName: 'Cvpage',
  appDescription: 'Create your own personal page with Cvpage and share it with the world',
  domainName: 'cvpage.to',
  domainUrl: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://cvpage.to',
  lemonsqueezy: {
    productLink: 'https://cvpage.lemonsqueezy.com/buy/9cb2a0ed-191d-4d81-a9f5-72361c356a43',
    price: 9.99,
  }
}

export default config;