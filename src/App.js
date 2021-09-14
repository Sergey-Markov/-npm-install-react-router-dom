import './App.css';
import { useState } from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Searchbar from './Components/Searchbar/Searchbar';
import ImageGallery from './Components/ImageGallery/ImageGallery';

function App () {
  const [imageName, setImageName] = useState('');

  const onSearchSubmit = imageName => {
    setImageName( imageName );
  };

  
    return (
      <div className="App">
        <Searchbar onSubmit={onSearchSubmit} />
        <ImageGallery imageName={imageName} />
      </div>
    );
  
}

export default App;
