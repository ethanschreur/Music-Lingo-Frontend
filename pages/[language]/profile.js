import redirectsUtil from '../../utils/redirectsUtil'
import Header from '../../components/Header'
import Nav from '../../components/Nav'
import Head from 'next/head'
import { parseCookies } from "../../utils/cookieUtils"

const Profile = () => {
    return (
        <div>
            <Head>
                <title>Profile</title>
                <link rel="apple-touch-icon" sizes="180x180" href="/public/favicons/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/public/favicons/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/public/favicons/favicon-16x16.png" />
                <link rel="manifest" href="/public/favicons/site.webmanifest" />
                <link rel="mask-icon" href="/public/favicons/safari-pinned-tab.svg" color="#5bbad5" />
                <meta name="msapplication-TileColor" content="#00aba9" />
                <meta name="theme-color" content="#ffffff" />
            </Head>
            <Header />
            <Nav type="profile" />

        </div>
    )
}
export async function getServerSideProps(context) {
    let { token } = parseCookies(context.req)
    const ret = redirectsUtil(
        { language: context.params.language, token: token },
        [{ check: 'logged-in', redirection: '/' },
        { check: 'language', redirection: '/' }
        ]);
    if (!ret.redirect) {
        return ret
    }
    return ret;
}

export default Profile

