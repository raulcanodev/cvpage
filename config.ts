const config = {
  appName: 'Cvpage',
  appDescription: 'Create your own personal page with Cvpage and share it with the world',
  domainName: 'cvpage.to',
  domainUrl: process.env.NODE_ENV === 'development' ? 'http://localhost' : 'https://cvpage.to',
}

export default config;