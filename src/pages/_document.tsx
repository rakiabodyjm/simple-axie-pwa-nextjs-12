import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'
import Script from 'next/script'
class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />

          <link sizes="57x57" href="/apple-icon-57x57.png" />
          <link sizes="60x60" href="/apple-icon-60x60.png" />
          <link sizes="72x72" href="/apple-icon-72x72.png" />
          <link sizes="76x76" href="/apple-icon-76x76.png" />
          <link sizes="114x114" href="/apple-icon-114x114.png" />
          <link sizes="120x120" href="/apple-icon-120x120.png" />
          <link sizes="144x144" href="/apple-icon-144x144.png" />
          <link sizes="152x152" href="/apple-icon-152x152.png" />
          <link sizes="180x180" href="/apple-icon-180x180.png" />
          <link rel="icon" type="image/png" sizes="192x192" href="/android-icon-192x192.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/manifest.json" />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
          <meta name="theme-color" content="#ffffff" />
          <Script
            id="next-pwa"
            type="module"
            src="https://cdn.jsdelivr.net/npm/@pwabuilder/pwaupdate"
            dangerouslySetInnerHTML={{
              __html: `
             import 'https://cdn.jsdelivr.net/npm/@pwabuilder/pwaupdate'; const el =
            document.createElement('pwa-update'); document.body.appendChild(el);
          `,
            }}
          ></Script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
