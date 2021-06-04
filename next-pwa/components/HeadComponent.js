import Head from "next/head"

const HeadComponent = ({ title, description, url }) => {
  return (
    <Head>
      <meta charSet='utf-8' />
      <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta name='description' content={description} />
      <meta name='keywords' content='example keywords' />
      <meta name="theme-color" content="#ffffff"></meta>
      <link rel="manifest" href="/manifest.webmanifest" />
      <link rel="canonical" href={url} />
      <link rel="alternate" hrefLang="en" href="https://www.example.com/en" />
      <link rel="icon" type="image/x-icon" sizes="32x32" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"></link>
      <title>{title}</title>

      <meta property="og:title" content={title} />
      <meta property="og:site_name" content="Example Name" />
      <meta property="og:type" content="website" />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content="http://www.example.com/og-image.jpg" />
      <meta property="og:image:secure_url" content="https://www.example.com/og-image.jpg" />
      <meta property="og:image:type" content="image/png" />
      <meta property="fb:app_id" content="1234567890" />
    </Head>
  )
}

export default HeadComponent