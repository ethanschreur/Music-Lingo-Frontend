import { useCookies } from "react-cookie"
import { useEffect, useContext } from 'react'
import { useRouter } from 'next/router';
import UserContext from "../UserContext";

export default () => {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const router = useRouter();
    const [cookie, setCookie, removeCookie] = useCookies(["token"])
    useEffect(() => {
        setCurrentUser(null);
        removeCookie('token')
        router.push('/')
    }, [])
    return ''
}