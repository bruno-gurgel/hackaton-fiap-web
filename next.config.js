// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   async redirects() {
//     return [
//       {
//         source: "/",
//         destination: "/login",
//         permanent: true,
//       },
//     ];
//   },
// };

// module.exports = nextConfig;

const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => {
  switch (phase) {
    case PHASE_DEVELOPMENT_SERVER:
      return {
        // environment varibales for local development
        env: {
          IDP_DOMAIN: "nextjs-example.auth.eu-central-1.amazoncognito.com",
          USER_POOL_ID: "eu-central-1_nfOfx47Q6",
          USER_POOL_CLIENT_ID: "28e7hm9fm0t5b9d76kgj3grp82",
          REDIRECT_SIGN_IN: "http://localhost:3000/token",
          REDIRECT_SIGN_OUT: "http://localhost:3000/",
          AUTH_COOKIE_DOMAIN: "localhost",
        },
        reactStrictMode: true,
        async redirects() {
          return [
            {
              source: "/",
              destination: "/login",
              permanent: true,
            },
          ];
        },
      };
    default:
      return {
        // environment varibales for production
        env: {
          IDP_DOMAIN: "hackaton-fiap-web.auth.us-east-1.amazoncognito.com",
          USER_POOL_ID: "us-east-1_nLGnsrTzS",
          USER_POOL_CLIENT_ID: "7kvt83vctnbb9nu1ifuu2hafk5",
          REDIRECT_SIGN_IN: "https://aws-cognito-next-example-app.now.sh/token",
          REDIRECT_SIGN_OUT: "https://aws-cognito-next-example-app.now.sh/",
          AUTH_COOKIE_DOMAIN: "aws-cognito-next-example-app.now.sh",
        },
      };
  }
};
