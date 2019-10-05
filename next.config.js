const withSass = require('@zeit/next-sass');

module.exports = withSass({
  env: {
    apiUrl: process.env.API_URL,
  },
});
