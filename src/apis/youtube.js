import axios from 'axios';

const KEY = 'AIzaSyBV-Atw76L83AnDspe4MWZsW_h2At5dVPw';
export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3',
    params: {
        part: 'snippet',
        type: 'video',
        maxResults: 3,
        key: KEY
    }
});