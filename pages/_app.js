import 'tailwindcss/tailwind.css'
import '../styles/global.css';
import { ThemeProvider } from 'next-themes'
import { CookiesProvider } from "react-cookie"
import { useState, useEffect } from 'react';
import UserContext from '../UserContext';
import MusicLingoAPI from '../services/musicLingoAPI';
import jwt from 'jsonwebtoken';

function MyApp({ Component, pageProps }) {
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(async () => {
    if (!currentUser) {
      try {
        const token = document.cookie.split('token=')[1];
        const { username } = jwt.decode(token);
        console.log(username)
        MusicLingoAPI.token = token;
        const user = await MusicLingoAPI.getCurrentUser(username);
        console.log(user)
        setCurrentUser(user);
      } catch (e) {
        console.log(e)
      }
    }

  }, [])

  return (
    <ThemeProvider attribute="class">
      <CookiesProvider>
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
          <Component {...pageProps} />
        </UserContext.Provider>
      </CookiesProvider>
    </ThemeProvider>
  )
}


export default MyApp