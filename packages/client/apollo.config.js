require('dotenv').config()

module.exports = {
  client: {
    service: {
      url: 'https://api.github.com/graphql',
      headers: {
        authorization: `Bearer ${process.env.TOKEN}`
      },
      skipSSLValidation: true
    },
    includes: ['src/**/*.{ts,tsx,js,jsx,graphql}']
  }
}
