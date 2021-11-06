import Head from 'next/head';
import router, { useRouter } from 'next/router';
import React from 'react';
// import {datetime} from '../utils/date-format'
// import titleStyle from '../utils/title-style';

// import GlobalStyle from './GlobalStyle';

export default ({ children, date, description, image, title = "Learn 50+ Languages | Discover Foreign Music | Songs & Radio", keywords, routes }) => {
    const domain = 'https://www.music-lingo.com';
    const router = useRouter();
    // const formattedTitle = titleStyle(title);
    const formattedTitle = (title);
    const url = router && router.asPath ? router.asPath : undefined;
    const canonical = url && url === '/' ? domain : domain + url;
    const featuredImage = domain + image;

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta charSet="utf-8" />
                <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
                <meta content="width=device-width, initial-scale=1" name="viewport" />
                {description && <meta content={description} name="description" />}
                {keywords && <meta content={keywords} name="keywords" />}
                <meta content="follow, index" name="robots" />
                <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png" />
                <link rel="manifest" href="/images/site.webmanifest" />
                <link rel="mask-icon" href="/images/safari-pinned-tab.svg" color="#5bbad5" />
                <meta name="msapplication-TileColor" content="#00aba9" />
                <meta name="theme-color" content="#ffffff" />
                {url && <link href={canonical} rel="canonical" />}
                <meta content="en-US" property="og:locale" />
                <meta content={formattedTitle} property="og:description" />
                <meta content={description} property="og:description" />
                <meta content={canonical} property="og:url" />
                {featuredImage && (
                    <>
                        <meta content={featuredImage} property="og:image" />
                        <meta content={description} property="og:image:alt" />
                    </>
                )}
                {date && (
                    <>
                        <meta content="article" property="og:type" />
                        // <meta content={dateTime(date)} property="article:published_time" />
                    </>
                )}
            </Head>
        </>
    )
}


// example meta stuff
// export const meta = {
//     date: '2021-12-01',
//     description: 'This is the description of the page/article',
//     image: '/link to the image you want displayed',
//     slug: 'learn-next-js',
//     title: 'Article Title'
// }