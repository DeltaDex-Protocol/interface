import Document, { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <link rel="icon" href="/favicon.svg" />
          <meta name="theme-color" content="#000000" />
          {/* <link rel="manifest" href="/manifest.json" /> */}


          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=optional" rel="stylesheet" />

          
        </Head>

        <body className="dark">
          <Main />
          <NextScript /> 
        </body>
      </Html>
    )
  }
}

export default MyDocument
