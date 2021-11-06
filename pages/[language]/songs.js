import redirectsUtil from '../../utils/redirectsUtil'
import Header from '../../components/Header'
import Nav from '../../components/Nav'
import Results from '../../components/Results'
import MusicLingoAPI from '../../services/musicLingoAPI';
import { parseCookies } from "../../utils/cookieUtils"
import Page from '../../components/Page';

const Songs = ({ results }) => {
    return (
        <div>
            <Page description='' title='title' keywords="word, word" />
            <Header />
            <Nav type="songs" />
            <Results results={results} />
        </div>
    )
}

export async function getServerSideProps(context) {
    let { token } = parseCookies(context.req)
    const ret = redirectsUtil(
        { language: context.params.language, p: context.query.p, token: token },
        [
            { check: 'logged-in', redirection: '/' },
            { check: 'language', redirection: '/' },
            { check: 'page', redirection: `/${context.params.language}/songs?p=top` }
        ]);
    if (!ret.redirect) {
        MusicLingoAPI.token = token;
        const request = await MusicLingoAPI.charts('songs', 'mxmweekly', 'ru', 1);
        ret.props.results = request.result;
        return ret
    }

    return ret;
}

export default Songs

