import redirectsUtil from '../../utils/redirectsUtil'
import Header from '../../components/Header'
import Nav from '../../components/Nav'
import { parseCookies } from "../../utils/cookieUtils"
import Page from '../../components/Page';

const Profile = () => {
    return (
        <div>
            <Page description='' title='title' keywords="word, word" />
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

