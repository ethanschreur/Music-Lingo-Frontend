import axios from 'axios';

// const BASE_URL = process.env.REACT_APP_BASE_URL || 'https://lingo-fm.herokuapp.com';
const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';

class MusicLingoAPI {
    static token;
    static async request(endpoint, data = {}, method = 'get') {
        const url = `${BASE_URL}/${endpoint}`;
        console.log(url);
        const headers = {
            Authorization: `Bearer ${MusicLingoAPI.token}`
        };
        const params = method === 'get' || method === 'delete' ? data : {};

        try {
            return (await axios({ url: encodeURI(url), method, data, params, headers })).data;
        } catch (err) {
            console.error('API Error:', err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    }

    /** Get the current user. */

    static async getCurrentUser(username) {
        let res = await this.request(`users/${username}`);
        return res.user;
    }

    /** Get token for login from username, password. */

    static async login(data) {
        let res = await this.request(`auth/token`, data, 'post');
        return res.token;
    }

    /** Signup for site. */

    static async signup(data) {
        let res = await this.request(`auth/register`, data, 'post');
        return res.token;
    }

    /** Save edit profile page. */

    static async editProfile(username, data) {
        let res = await this.request(`users/${username}`, data, 'patch');
        return res.user;
    }

    /** Save a users language data. */

    static async setlanguageData(username, data) {
        let res = await this.request(`users/${username}/language`, data, 'patch');
        return res.user;
    }

    /** Search for songs. */

    static async search(opts) {
        let res = await this.request(
            `musix/search/${opts.for}?value=${opts.value}&language=${opts.language}&country=${opts.country}&page=${opts.page}&genre=${opts.genre}&username=${opts.username}&token=${MusicLingoAPI.token}`
        );
        return res;
    }

    /** Get charts */

    static async charts(chart_type, chart_name, country, page) {
        let res = await this.request(
            `musix/charts/${chart_type}?chart_name=${chart_name}&country=${country}&page=${page}`
        );
        return res;
    }

    /** Get a song's lyrics */

    static async lyrics(track_id) {
        let res = await this.request(`musix/lyrics?track_id=${track_id}`);
        return res;
    }

    /** Get a song's data from its commontrack_id */

    static async track(commontrack_id) {
        let res = await this.request(`musix/track?commontrack_id=${commontrack_id}`);
        return res;
    }

    /** Get a song lyric's translation from its commontrack_id */

    static async getTranslation(commontrack_id, iso_code) {
        let res = await this.request(
            `musix/translation?commontrack_id=${commontrack_id}&selected_language=${iso_code}`
        );
        return res;
    }

    /** Favorite a song using track_id. */

    static async favoriteSong(username, song_id) {
        let res = await this.request(`users/${username}/songs/${song_id}`, {}, 'post');
        return res;
    }

    /** Unfavorite a song using track_id. */

    static async unfavoriteSong(username, song_id) {
        let res = await this.request(`users/${username}/songs/${song_id}`, {}, 'delete');
        return res;
    }

    /** Favorite an artist using artist_id. */

    static async favoriteArtist(username, artist_id) {
        let res = await this.request(`users/${username}/artists/${artist_id}`, {}, 'post');
        return res;
    }

    /** Unfavorite an artist using artist_id. */

    static async unfavoriteArtist(username, artist_id) {
        let res = await this.request(`users/${username}/artists/${artist_id}`, {}, 'delete');
        return res;
    }

    /** Favorite a station using stationuuid. */

    static async favoriteStation(username, stationuuid) {
        let res = await this.request(`users/${username}/stations/${stationuuid}`, {}, 'post');
        return res;
    }

    /** Unfavorite a station using stationuuid. */

    static async unfavoriteStation(username, stationuuid) {
        let res = await this.request(`users/${username}/stations/${stationuuid}`, {}, 'delete');
        return res;
    }

    /** Get a video thumbnail from video_id */

    static async thumbnail(video_id) {
        let res = await this.request(`youtube/thumbnail/${video_id}`);
        return res;
    }

    /** Search for radio stations */
    // page, countrycode, tag, name, order

    static async radioSearch(opts) {
        let res = await this.request(
            `radio/?offset=${opts.page}&countrycode=${opts.countrycode}&tag=${opts.tag}&name=${opts.name}&order=${opts.order}`
        );
        return res;
    }
}

export default MusicLingoAPI;
