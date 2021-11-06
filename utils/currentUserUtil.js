import MusicLingoAPI from "../services/musicLingoAPI";
import { useContext } from "react";
import UserContext from "../UserContext";

export default grabCurrentUser = async (username) => {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    let currentUser = await MusicLingoAPI.getCurrentUser(username);
    setCurrentUser(currentUser);
}