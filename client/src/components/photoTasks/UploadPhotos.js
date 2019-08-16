// UPLOAD PHOTOS
// Import Necessary Libraries
// React & ShortID
import React, { Component } from "react";
import shortid from 'shortid'

// Pull from Events to get event ID for metadata and future img sorting
import eventsTest from "../../components/eventsTest.json";


// FilePond
import { FilePond, registerPlugin, File } from "react-filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";

// FilePond CSS
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// Firebase
import { storage, database } from "../../firebase";
import "firebase/storage";
import "firebase/database";

// Register Filepond Plugins for Additional Functionality
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

// Start of Photobook Component
class UploadPhotos extends Component {
    constructor(props) {
        super(props);

        // Reference Firebase 
        this.storageRef = storage;
        this.databaseRef = database;

    }

        state = {
            files: [],
            url: null,
            uploadValue: 0,
            metadataFile: [],
            rows: [],
            // uploadEventId: "",
        };

    // componentDidMount() { 
    //     let uploadEventId = this.props.match.params.eventId;
    //     console.log(uploadEventId); 

    //     // this.setState({ uploadEventId: this.props.match.params.eventId });
    //     // console.log(this.state); 
    // };
    
        
    // Handles our Image Storage
    handleProcessing(fieldName, file, metadata, load, error, progress, abort) {
        // Logs for Testing
        console.log(this.storageRef.child(file.name).fullPath);

        const fileUpload = file;

        // ShortID 
        const id = shortid.generate();

        const task = this.storageRef.child(`images/${file.name}`).put(fileUpload, {
            shortID: id});

        // Handle Uploading Here
            task.on(`state_changed` , (snapshot) => {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
            }, (err) => {
                // Log Error
                console.log(err);
                error(err.message);
            }, () => {
                // Success
                console.log("VICTORY");
                this.setState({
                    url: task.snapshot.downloadURL
                })

                // Get Metadata
                this.storageRef.child(`images/${file.name}`).getMetadata().then((metadata) => {
                    // Metadata for 'filepond/${file.name}' contained
                    // let downloadURL = '';
                    this.storageRef.child(`images/${file.name}`).getDownloadURL().then(url => {
                        console.log(url)
                        let metadataFile = {
                            name: metadata.name,
                            size: metadata.size,
                            contentType: metadata.contentType,
                            fullPath: metadata.fullPath,
                            downloadURL: url,
                            id: id,
                            // eventId: this.uploadEventId,
                        }
                    // Save Metadata
                    this.databaseRef.child('images').push({ metadataFile });
                    })

                }).catch(function(error) {
                    console.log(error)
            });
        
        })
    }
    
    handleInit() {
        console.log("FilePond ACTIVATED", this.pond);
    }

    render() {

        const uploadStyle = {
            marginTop: '2rem',
            display: 'flex',
            flexDirection: 'column'
        };

        return(
            <div>
            {/* <RenderEventId /> */}
            <div style={uploadStyle}>
                <FilePond
                    ref={ref => (this.pond = ref)}
                    files={this.state.files}
                    allowMultiple={true}
                    maxFiles={10}
                    server={{process : this.handleProcessing.bind(this)}}
                    oninit={() => this.handleInit()}
                >
                    {this.state.files.map(file => (
                        <File key = {file} source = {file}/>
                    ))}
                </FilePond>

            </div>
            </div>
        );
    }
}


export default UploadPhotos;
