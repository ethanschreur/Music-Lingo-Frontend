const songsPages = [
    'Top',
    'New',
    'Trending',
    'My List',
    'Search',
    'Pop',
    'Rock',
    'Country',
    'R&B/Soul',
    'Hip Hop/Rap',
    'Easy Listening',
    'Electronic',
    'Dance',
    'Jazz',
    'Blues',
    'Classical',
    'Opera',
    'Reggae',
    'Folk',
];


const artistsPages = ['Top', 'My List', 'Search'];

const radioPages = [
    'Top',
    'Tending',
    'My List',
    'Search',
    'Pop',
    'Rock',
    'Country',
    'R&B/Soul',
    'Hip Hop/Rap',
    'Easy Listening',
    'Electronic',
    'Dance',
    'Jazz',
    'Blues',
    'Classical',
    'Opera',
    'Reggae',
    'Folk'
];

const profilePages = ['Progress', 'Stats', 'Account', 'Logout'];

const learnPages = ['Shuffle', 'Lyrics', 'Flashcards', 'Matching', 'Translation'];

const getNavItems = (type) => {
    switch (type) {
        case 'songs':
            return songsPages;
        case 'artists':
            return artistsPages;
        case 'radio':
            return radioPages;
        case 'learn':
            return learnPages;
        case 'profile':
            return profilePages;
    }
}

export { getNavItems }