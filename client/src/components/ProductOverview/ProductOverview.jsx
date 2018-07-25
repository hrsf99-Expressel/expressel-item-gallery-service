import React from 'react';
import PropTypes from 'prop-types';
import HiddenImageView from './HiddenImageView';
import aws from '../../../../AWS/aws_key';

class ProductOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hideHiddenImageView: true,
      currentImage: '',
    };
    this.updateCurrentImage = this.updateCurrentImage.bind(this);
    this.toggleImageView = this.toggleImageView.bind(this);
    this.generateDefaultView = this.generateDefaultView.bind(this);
  }

  generateDefaultView() {
    const {
      images,
      thumbnails,
    } = this.props;

    const {
      currentImage,
      hideHiddenImageView,
    } = this.state;

    const sourceData = currentImage || `${aws}${images[0]}`;

    const style = hideHiddenImageView ? { display: 'none' } : {};

    this.thumbnailElements = thumbnails.map(thumbnail => (
      <div className="thumbnail" key={thumbnail} role="button" tabIndex="-1" onMouseEnter={this.updateCurrentImage}>
        <img className="thumbnailImage" src={`${aws}${thumbnail}`} alt="" />
      </div>));

    return (
      <div className="overviewColumn">
        <div id="productImageView">
          <div id="productImageViewCarosel">
            <div id="imageView" onClick={this.toggleImageView} onKeyDown={this.toggleImageView} role="button" tabIndex="0">
              <img src={sourceData} alt="" />
            </div>
            <div className="thumbnailPicker">
              {this.thumbnailElements}
            </div>
          </div>
        </div>
        <div id="hiddenImageViewContainer" style={style}>
          <HiddenImageView currentImage={currentImage} images={images} thumbnails={thumbnails} />
        </div>
      </div>
    );
  }

  updateCurrentImage(e) {
    const newImage = e.target.firstChild.src.replace('thumbnails', 'fullsize');
    this.setState({
      currentImage: newImage,
    });
  }

  toggleImageView() {
    this.setState(prevState => ({
      hideHiddenImageView: !prevState.hideHiddenImageView,
    }));
  }

  render() {
    return (
      this.generateDefaultView()
    );
  }
}

export default ProductOverview;

ProductOverview.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  thumbnails: PropTypes.arrayOf(PropTypes.string).isRequired,
};
