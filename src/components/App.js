import React from 'react';
import SearchBar from './SearchBar'
import youtube from '../apis/youtube'
import VideoList from './VideoList'
import VideoDetail from './VideoDetail'

export default class App extends React.Component {
    state = { videos: [], selectedVideo: null }

    componentDidMount() {
        this.onTermSubmit('');
    }
    onTermSubmit = async term => {
        console.log(term);
        const response = await youtube.get('/search', {
            params: {
                q: term
            }
        });
        console.log(response);
        this.setState({ videos: response.data.items, selectedVideo: response.data.items[0] });
        this.setState({ videos: this.state.videos.splice(1) });


    }
    onVideoSelect = video => {
        console.log('From the App', video);
        this.setState({ videos: this.state.videos.push(this.state.selectedVideo) });
        this.setState({ selectedVideo: video });
        this.setState({ videos: this.state.videos.filter(v => v != video) });

    }
    render() {
        return (
            <div className="ui container">Application
                <SearchBar onFormSubmit={this.onTermSubmit} />
                Videos Found {this.state.videos.length}
                <div className="ui grid">
                    <div className="ui row">
                        <div className="eleven wide column">
                            <VideoDetail video={this.state.selectedVideo} />
                        </div>
                        <div className="five wide column">
                            <VideoList onVideoSelect={this.onVideoSelect} videos={this.state.videos} />
                        </div>
                    </div>
                </div>
            </div>
        )
    };
}