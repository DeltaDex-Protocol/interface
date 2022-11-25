/** @type {import('next').NextConfig} */
// const { withSentryConfig } = require('@sentry/nextjs')
// const nextConfig = {
//   reactStrictMode: true,
//   swcMinify: true,
//   // sentry: { hideSourceMaps: true },
//   options: {
//     sourcemaps: 'development', // possible values can be production, development, or none
//   },
//   webpack(config) {
//     config.module.rules.push({
//       test: /\.svg$/,
//       use: ['@svgr/webpack'],
//     })

//     return config
//   },
// }

// module.exports = nextConfig

const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      /* development only config options here */
      // options: {
      //   sourcemaps: 'development', // possible values can be production, development, or none
      // },
      reactStrictMode: true,
      swcMinify: true,
      // sentry: { hideSourceMaps: true },
      // sourcemaps: 'development', // possible values can be production, development, or none
      // productionBrowserSourceMaps: true,

      webpack(config) {
        config.module.rules.push({
          test: /\.svg$/,
          use: ['@svgr/webpack'],
        })

        return config
      },
    }
  }

  return {
    /* config options for all phases except development here */
    reactStrictMode: true,
    swcMinify: true,
    // sentry: { hideSourceMaps: true },

    webpack(config) {
      config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      })

      return config
    },
  }
}
