import Header from '../components/Header'
import Footer from '../components/Footer'
import Page from '../components/Page';
import redirectsUtil from '../utils/redirectsUtil';
import { languageCodes, codeToLanguage } from '../utils/languageUtils';
import { useState } from 'react'
import { useRouter } from 'next/router';
import MusicLingoAPI from '../services/musicLingoAPI';
import { useCookies } from "react-cookie"
import { parseCookies } from "../utils/cookieUtils"
import { useContext } from "react";
import UserContext from "../UserContext";

export default function SignUp({ headerType }) {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const router = useRouter();
    const [cookie, setCookie] = useCookies(["token"])
    const [formData, setFormData] = useState({
        current_language: null,
        languages: '',
        native_language: 'remove field',
        username: null,
        password: null,
        firstName: 'remove field',
        lastName: 'remove field',
        email: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((state) => ({
            ...state,
            [name]: value
        }));
    };

    const submitForm = async () => {
        let token;
        let result;
        try {
            console.log(formData)
            token = await MusicLingoAPI.signup(formData);
            setCookie("token", (token), {
                path: "/",
                maxAge: 3600,
                sameSite: true,
            })
            MusicLingoAPI.token = token;
            result = { success: true }
        }
        catch (errors) {
            console.log(errors)
            result = { success: false, errors };
        }

        if (result.success) {
            console.log(formData)
            let currentUser = await MusicLingoAPI.getCurrentUser(formData.username);
            setCurrentUser(currentUser);
            router.push(`/${currentUser.current_language}/songs`);
        } else {
            // setFormErrors(result.errors);
        }
    }

    return (
        <div><Page title="Learn 50+ Languages | Discover Foreign Music | Songs & Radio"
            description="With Music Lingo, you can learn a new language entirely through music. Our vocabulary-focused, science-backed approach gets results fast."
            image=""
        >
        </Page>
            <Header headerType={headerType} />
            <br />
            <center>
                <div className="sm:w-2/3 md:w-1/2 lg:w-1/3 text-left font-medium text-2xl rounded-lg">
                    <span className="text-4xl font-black tracking-widest">Sign Up</span>
                </div>
                <div className="sm:w-2/3 md:w-1/2 lg:w-1/3 mt-9 font-medium text-2xl p-6 rounded-lg shadow-2xl  border-[#2a2e45] dark:border-[#fdfdfd] border-2 text-[#2a2e45]  dark:text-[#fdfdfd]">
                    <div className="flex flex-col text-xl">
                        <label htmlFor="username" className="text-left text-[#2a2e45]  dark:text-[#fdfdfd]">
                            Username
                        </label>
                        <input name="username" onChange={handleChange} id="username" type="text" className="p-3 bg-[#e8f0fe] dark:bg-[#35405b] rounded-lg mt-2" />
                    </div>
                    <div className="flex flex-col text-xl">
                        <label htmlFor="email" className="text-left mt-4 text-[#2a2e45]  dark:text-[#fdfdfd]">
                            Email
                        </label>
                        <input name="email" onChange={handleChange} id="email" type="text" className="p-3 bg-[#e8f0fe] dark:bg-[#35405b] rounded-lg mt-2" />
                    </div>
                    <div className="flex flex-col text-xl">
                        <label htmlFor="password" className=" text-left mt-4 text-[#2a2e45]  dark:text-[#fdfdfd]">
                            Password
                        </label>
                        <input name="password" onChange={handleChange} id="password" type="password" className="p-3 bg-[#e8f0fe] dark:bg-[#35405b] rounded-lg mt-2" />
                    </div>
                    <div className="flex flex-col text-xl">
                        <label htmlFor="confirm-password" className=" text-left mt-4 text-[#2a2e45]  dark:text-[#fdfdfd]">
                            Confirm Password
                        </label>
                        <input name="password" onChange={handleChange} id="confirm-password" type="password" className="p-3 bg-[#e8f0fe] dark:bg-[#35405b] rounded-lg mt-2" />
                    </div>
                    <div className="flex flex-col text-xl">
                        <label htmlFor="current_language" className=" text-left mt-4 text-[#2a2e45]  dark:text-[#fdfdfd]">
                            I want to learn:
                        </label>
                        {/* <input id="language" type="text" className="p-3 bg-[#fdfdfd] dark:bg-[#2a2e45] rounded-lg mt-2" /> */}
                        <select name="current_language" id="current_language" onChange={handleChange} className="p-3 bg-[#e8f0fe] dark:bg-[#35405b] rounded-lg mt-2 h-max-30" >
                            <option>Select a language</option>
                            {(languageCodes).map((code) => <option value={code}>{codeToLanguage[code]}</option>)}
                        </select>
                    </div>

                    <div onClick={submitForm} className="mt-8 text-2xl rounded-lg cursor-pointer border-2 border-[#2a2e45] dark:border-[#fdfdfd] dark:text-[#cbcde8]  text-[#596088]  dark:hover:text-[#fdfdfd] hover:text-[#2a2e45]">
                        <button onClick={submitForm} className="text-xl font-bold rounded-lg bg-[#fdfdfd] dark:bg-[#2a2e45] p-2 px-6 ">Get Started</button>
                    </div>
                </div>
            </center >

            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <Footer />
        </div >
    )
}

export async function getServerSideProps(context) {
    let { token } = parseCookies(context.req)
    const ret = redirectsUtil(
        { token },
        [
            { check: 'logged-out', redirection: '/russian/learn?p=shuffle' }
        ]);
    if (!ret.redirect) {
        return { props: { headerType: 'logged-out' } }
    }
    return ret;
}
