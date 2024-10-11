import { useState } from 'react';

function App() {
    // States for file uploads
    const [singleFile, setSingleFile] = useState(null);
    const [multipleFiles, setMultipleFiles] = useState([]);
    const [fetchedFiles, setFetchedFiles] = useState([]);

    // State for random dog image
    const [dogImage, setDogImage] = useState(null);

    // Handle single file selection
    const handleSingleFileChange = (e) => {
        setSingleFile(e.target.files[0]);
    };

    // Handle multiple file selection
    const handleMultipleFilesChange = (e) => {
        setMultipleFiles(e.target.files);
    };

    // Upload single file to server
    const uploadSingleFile = async () => {
        const formData = new FormData();
        formData.append('file', singleFile);

        try {
            const response = await fetch('http://localhost:8000/save/single', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            alert(data.message);
        } catch (error) {
            console.error('Error uploading single file:', error);
        }
    };

    // Upload multiple files to server
    const uploadMultipleFiles = async () => {
        const formData = new FormData();
        Array.from(multipleFiles).forEach(file => {
            formData.append('files', file);
        });

        try {
            const response = await fetch('http://localhost:8000/save/multiple', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            alert(data.message);
        } catch (error) {
            console.error('Error uploading multiple files:', error);
        }
    };

    // Fetch random multiple files from server
    const fetchMultipleFiles = async () => {
        try {
            const response = await fetch('http://localhost:8000/fetch/multiple');
            const data = await response.json();
            setFetchedFiles(data);
        } catch (error) {
            console.error('Error fetching files:', error);
        }
    };

    // Fetch a random dog image from the API
    const fetchDogImage = async () => {
        try {
            const response = await fetch('https://dog.ceo/api/breeds/image/random');
            const data = await response.json();
            setDogImage(data.message);
        } catch (error) {
            console.error('Error fetching dog image:', error);
        }
    };

    // Upload the fetched dog image to the server
    const uploadDogImage = async () => {
        if (!dogImage) return;

        try {
            const response = await fetch(dogImage);
            const blob = await response.blob();  // Convert dog image to blob for upload
            const formData = new FormData();
            formData.append('file', blob, 'dog.jpg');

            const uploadResponse = await fetch('http://localhost:8000/save/single', {
                method: 'POST',
                body: formData,
            });
            const uploadData = await uploadResponse.json();
            alert(uploadData.message);
        } catch (error) {
            console.error('Error uploading dog image:', error);
        }
    };

    return (
        <div>
            <h1>File Upload and Fetch App</h1>

            {/* Single File Upload Section */}
            <div>
                <h2>Upload Single File</h2>
                <input type="file" onChange={handleSingleFileChange} />
                <button onClick={uploadSingleFile}>Upload Single File</button>
            </div>

            {/* Multiple File Upload Section */}
            <div>
                <h2>Upload Multiple Files</h2>
                <input type="file" multiple onChange={handleMultipleFilesChange} />
                <button onClick={uploadMultipleFiles}>Upload Multiple Files</button>
            </div>

            {/* Fetch Random Files Section */}
            <div>
                <h2>Fetch Random Files</h2>
                <button onClick={fetchMultipleFiles}>Fetch Files</button>
                <div>
                    {fetchedFiles.map((file, index) => (
                        <img key={index} src={file} alt="Fetched" width="200px" />
                    ))}
                </div>
            </div>

            {/* Fetch Random Dog Image and Upload Section */}
            <div>
                <h2>Fetch Random Dog Image</h2>
                <button onClick={fetchDogImage}>Fetch Dog Image</button>
                {dogImage && (
                    <div>
                        <img src={dogImage} alt="Dog" width="200px" />
                        <button onClick={uploadDogImage}>Upload Dog Image</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
