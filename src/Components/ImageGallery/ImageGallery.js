import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import ImageGalleryItem from './ImageGalleryItem';
import apiService from '../../Service/Service';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import Loader from 'react-loader-spinner';

export default function ImageGallery ({imageName}) {
  // state = {
  //   page: 1,
  //   error: null,
  //   picturesData: [],
  //   isOpenModal: false,
  //   picture: '',
  //   status: 'idle',
  // };

  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [picturesData, setPicturesData] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [picture, setPicture] = useState('');
  const [status, setStatus] = useState('idle');

  // async function componentDidUpdate(prevProps, prevState) {
  //   // const { page } = this.state;
  //   if (prevProps.imageName !== this.props.imageName) {
  //     this.setState({ status: 'pending', page: 1, picturesData: [] });
  //     await this.loadNewPictures();
  //   }
  //   if (prevState.page !== page && page > 1) {
  //     this.setState({ status: 'pending-nextBlock' });
  //     await this.loadMorePictures();
  //   }
  // }
  // useEffect(() => {
    
  // }, [imageName]);

  useEffect(() => {
    if(!imageName){
      setStatus('idle');
      return;
    };
    if(imageName){
      setStatus('pending');
      loadNewPictures();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[imageName]);

  useEffect(() => { 
    if(page>1)loadMorePictures();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[page]);

  async function loadNewPictures() {
    await apiService(imageName, page)
      .then(pictures => {
        console.log(`работает newSearch`);

        // this.setState({ picturesData: pictures.hits, status: 'resolved' });
        setPicturesData(pictures.hits);
        setStatus('resolved');
      })
      .catch((error) => {return(
        setError( error),
        setStatus('rejected')
        )});
    avtoScroll();
  }

  async function loadMorePictures() {
    await apiService(imageName, page)
      .then(pictures => {
        console.log(`работает лоадМор`);
        setPicturesData((prev)=>[...prev,...pictures.hits])
        setStatus('resolved');

      })
      .catch((error) => {return(
        setError( error),
        setStatus('rejected')
        )});
    avtoScroll();
  }
  const onModalOpen = picture => {
    setIsOpenModal(true);
    setPicture(picture);
  };
  const onCloseModal = e => {
    if (e.code === 'Escape' || e.currentTarget === e.target) {
      setIsOpenModal( false );
    }
  };

   const nextPage =  () => {
    
    setPage(prevState => 
       prevState + 1
    );
    setStatus('pending-nextBlock');
    
    
  };
  
  const avtoScroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

 
  //   const { error, status, picturesData, picture, isOpenModal } = this.state;

    if (status === 'idle') {
      return (
        <p className="notifyText-onStart">
          Please! Enter word for searching images
        </p>
      );
    }

    if (status === 'pending') {
      return (
        <Loader
          className="loader"
          type="Grid"
          color="blue"
          height={100}
          width={100}
          timeout={4000}
        />
      );
    }

    if (status === 'pending-nextBlock') {
      return (
        <>
          <ul className="ImageGallery">
            <ImageGalleryItem
              pictures={picturesData}
              onClick={onModalOpen}
            />
          </ul>
          <Loader
            className="loader"
            type="Grid"
            color="blue"
            height={100}
            width={100}
            timeout={4000}
          />
        </>
      );
    }

    if (status === 'rejected') {
      return toast.error(error.message);
    }
    if (status === 'resolved') {
      return (
        <>
          <ul className="ImageGallery">
            <ImageGalleryItem
              pictures={picturesData}
              onClick={onModalOpen}
            />
          </ul>
          {isOpenModal && (
            <Modal picture={picture} onCloseModal={onCloseModal} />
          )}
          {picturesData.length > 0 && <Button onClick={nextPage} />}
        </>
      );
    }
  
}

ImageGallery.propTypes = {
  imageName: PropTypes.string.isRequired,
};
