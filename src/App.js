import './App.css';
import { Component } from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Searchbar from './Components/Searchbar/Searchbar';
import ImageGallery from './Components/ImageGallery/ImageGallery';

class App extends Component {
  state = {
    imageName: '',
  };

  onSearchSubmit = imageName => {
    this.setState({ imageName });
  };

  render() {
    return (
      <div className="App">
        <Searchbar onSubmit={this.onSearchSubmit} />
        <ImageGallery imageName={this.state.imageName} />
      </div>
    );
  }
}

export default App;
