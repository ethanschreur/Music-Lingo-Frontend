import HeaderItem from '../components/HeaderItem'
import { SunIcon, MoonIcon, HomeIcon, BookOpenIcon, ChatAltIcon, LoginIcon, IdentificationIcon, MicrophoneIcon, StatusOnlineIcon, UserIcon, AcademicCapIcon, MusicNoteIcon } from '@heroicons/react/outline';
import { useTheme } from 'next-themes'
import { redirectsUtil } from '../utils/redirectsUtil'
import { useContext } from "react";
import UserContext from "../UserContext";
import { codeToLanguage } from '../utils/languageUtils'

export default function Header({ headerType, username }) {
    console.log(headerType)
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const { theme, setTheme } = useTheme()
    return (
        <header className="flex flex-col sm:flex-row mx-5 mt-5 justify-between items-center h-auto">
            <div className="flex flex-grow justify-evenly max-w-2xl">

                {headerType === 'logged-out' ? <>
                    <HeaderItem title="LOGIN" Icon={LoginIcon} to="/login" />
                    <HeaderItem title="SIGNUP" Icon={IdentificationIcon} to="/signup" /></> : <></>}
                {headerType !== 'logged-out' ? <>
                    <HeaderItem title="LEARN" Icon={AcademicCapIcon} to={`/${codeToLanguage[currentUser?.current_language]?.toLowerCase()}/learn`} />
                    <HeaderItem title="SONGS" Icon={MusicNoteIcon} to={`/${codeToLanguage[currentUser?.current_language]?.toLowerCase()}/songs`} />
                    <HeaderItem title="ARTISTS" Icon={MicrophoneIcon} to={`/${codeToLanguage[currentUser?.current_language]?.toLowerCase()}/artists`} />
                    <HeaderItem title="RADIO" Icon={StatusOnlineIcon} to={`/${codeToLanguage[currentUser?.current_language]?.toLowerCase()}/radio`} />
                    <HeaderItem title="BLOG" Icon={BookOpenIcon} to="/blog" />
                    <HeaderItem title="PROFILE" Icon={UserIcon} to={`/${codeToLanguage[currentUser?.current_language]?.toLowerCase()}/profile`} /></> : <></>}
            </div>

            <div className="flex text-4xl font-black tracking-widest cursor-pointer px-10">
                <span
                    type="button"
                    className="px-6"
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                >
                    {theme == 'dark' ? <MoonIcon className="h-11" /> : <SunIcon className="h-11" />}
                </span>
                <div>MUSIC LINGO</div>
            </div>

        </header>
    )
}

export async function getServerSideProps(context) {
    const ret = redirectsUtil(
        { results: request.result, language: context.params.language, p: context.query.p },
        [
            { check: 'logged-in' },
        ]);
    return ret;
}

