import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Results from '../components/Results'
import MusicLingoAPI from '../services/musicLingoAPI';
import Page from '../components/Page';
import Nav from '../components/Nav'
import redirectsUtil from '../utils/redirectsUtil';
import { parseCookies } from "../utils/cookieUtils"

export default function Home({ headerType }) {
  return (
    <div><Page title="Learn 50+ Languages | Discover Foreign Music | Songs & Radio"
      description="With Music Lingo, you can learn a new language entirely through music. Our vocabulary-focused, science-backed approach gets results fast."
      image=""
    >
    </Page>
      <Header headerType={headerType} />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Footer />
    </div>
  )
}

export async function getServerSideProps(context) {
  let { token } = parseCookies(context.req)
  const ret = redirectsUtil(
    { token },
    [
      { check: 'logged-in', redirection: '/' }
    ]);
  console.log(ret.redirect)
  if (ret.redirect) {
    return { props: { headerType: 'logged-out' } }
  }
  return { props: { headerType: 'logged-in' } }
}
