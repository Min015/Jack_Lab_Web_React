const initialState = {};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
    switch (action.type) {
        case "SAVE_AdminAlbum":
            return { ...state, AlbumList: action.payload };
        case "SAVE_Book":
            return { ...state, BookList: action.payload }
        case "SAVE_BookInfo":
            return { ...state, BookInfo: action.payload }
        default:
            return state;
    }
};