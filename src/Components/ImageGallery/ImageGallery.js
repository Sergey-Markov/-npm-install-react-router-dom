import { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import ImageGalleryItem from './ImageGalleryItem';
import apiService from '../../Service/Service';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import Loader from 'react-loader-spinner';

export default class ImageGallery extends Component {
  state = {
    page: 1,
    error: null,
    picturesData: [],
    isOpenModal: false,
    picture: '',
    status: 'idle',
  };

  async componentDidUpdate(prevProps, prevState) {
    const { page } = this.state;
    if (prevProps.imageName !== this.props.imageName) {
      this.setState({ status: 'pending', page: 1, picturesData: [] });
      await this.loadNewPictures();
    }
    if (prevState.page !== page && this.state.page > 1) {
      this.setState({ status: 'pending-nextBlock' });
      await this.loadMorePictures();
    }
  }

  async loadNewPictures() {
    await apiService(this.props.imageName, this.state.page)
      .then(pictures => {
        console.log(`работает newSearch`);

        this.setState({ picturesData: pictures.hits, status: 'resolved' });
      })
      .catch(error => this.setState({ error, status: 'rejected' }));
    this.avtoScroll();
  }

  async loadMorePictures() {
    await apiService(this.props.imageName, this.state.page)
      .then(pictures => {
        console.log(`работает лоадМор`);
        this.setState(prevState => ({
          picturesData: [...prevState.picturesData, ...pictures.hits],
          status: 'resolved',
        }));
      })
      .catch(error => this.setState({ error, status: 'rejected' }));
    this.avtoScroll();
  }
  onModalOpen = picture => {
    this.setState({ isOpenModal: true, picture: picture });
  };
  onCloseModal = e => {
    if (e.code === 'Escape' || e.currentTarget === e.target) {
      this.setState({ isOpenModal: false });
    }
  };

  nextPage = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };
  // ressetPage() {
  //   this.setState({ page: 1 });
  // }
  avtoScroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  render() {
    const { error, status, picturesData, picture, isOpenModal } = this.state;

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
              onClick={this.onModalOpen}
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
              onClick={this.onModalOpen}
            />
          </ul>
          {isOpenModal && (
            <Modal picture={picture} onCloseModal={this.onCloseModal} />
          )}
          {picturesData.length > 0 && <Button onClick={this.nextPage} />}
        </>
      );
    }
  }
}

ImageGallery.propTypes = {
  imageName: PropTypes.string.isRequired,
};
