const getGenreId = (text) => {
    const textIdMap = {
        Alternative: 20,
        Blues: 2,
        "Children's Music": 4,
        Classical: 5,
        Country: 6,
        Dance: 17,
        'Easy Learning': 25,
        Electronic: 7,
        Folk: 1289,
        'Hip Hop/Rap': 18,
        Jazz: 11,
        Opera: 1028,
        Pop: 14,
        'R&B/Soul': 15,
        Reggae: 24,
        Rock: 21,
        'Singer/Songwriter': 1160,
        Soundtrack: 1169
    };
    return textIdMap[text];
};

export default getGenreId;
