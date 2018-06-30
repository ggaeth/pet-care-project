import React, { Component } from 'react';
import firebase from "firebase";
import FileUploader from "react-firebase-file-uploader";

class ImageUpload extends Component {
  state = {
    image: "",
    isUploading: false,
    progress: 0,
    imageURL: ""
  }

  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });

  handleProgress = progress => this.setState({ progress });

  handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
  };

  handleUploadSuccess = filename => {
    this.setState({ image: filename, progress: 100, isUploading: false });
    firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then(url => this.setState({ imageURL: url }));
  };

  render() {
    return (
      <div className="mt-5">
        <form>
          <label>Upload a Photo</label>
          {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
          <FileUploader
            accept="image/*"
            name="image"
            randomizeFilename
            storageRef={firebase.storage().ref("images")}
            onUploadStart={this.handleUploadStart}
            onUploadError={this.handleUploadError}
            onUploadSuccess={this.handleUploadSuccess}
            onProgress={this.handleProgress}
          />
        </form>
      </div>
    );
  }
}

export default ImageUpload;
