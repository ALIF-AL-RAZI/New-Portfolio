'use client'
import React, { useState, useEffect } from 'react';
import { Upload, Camera, Users, Plus, Trash2 } from 'lucide-react';

// API Configuration
const API_BASE_URL = 'http://localhost:8000';

// PersonUpload Component
const PersonUpload = ({ onPersonAdded }) => {
  const [name, setName] = useState('');
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length < 2) {
      setError('Please select at least 2 images');
      return;
    }
    if (files.length > 4) {
      setError('Please select maximum 4 images');
      return;
    }
    
    setError('');
    setImages(files);
    
    // Create previews
    const newPreviews = [];
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        newPreviews.push(e.target.result);
        if (newPreviews.length === files.length) {
          setPreviews(newPreviews);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async () => {
    if (!name.trim() || images.length < 2) {
      setError('Please provide name and at least 2 images');
      return;
    }

    setUploading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('name', name);
      images.forEach(image => {
        formData.append('images', image);
      });

      const response = await fetch(`${API_BASE_URL}/add_person`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to add person');
      }

      const result = await response.json();
      onPersonAdded(result);
      
      // Reset form
      setName('');
      setImages([]);
      setPreviews([]);
      document.getElementById('image-input').value = '';
      
    } catch (error) {
      setError(error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Users className="h-6 w-6" />
        Add New Person
      </h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Person Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter person's name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Images (2-4 images required)
          </label>
          <input
            id="image-input"
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        {previews.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {previews.map((preview, index) => (
              <div key={index} className="relative">
                <img
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-32 object-cover rounded-md border"
                />
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={uploading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-2 px-4 rounded-md transition duration-200 flex items-center justify-center gap-2"
        >
          {uploading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            <Upload className="h-5 w-5" />
          )}
          {uploading ? 'Uploading...' : 'Add Person'}
        </button>
      </div>
    </div>
  );
};

// PersonsList Component
const PersonsList = ({ persons, onPersonDeleted }) => {
  const [deleting, setDeleting] = useState(null);

  const handleDelete = async (name) => {
    if (!window.confirm(`Are you sure you want to delete ${name}?`)) {
      return;
    }

    setDeleting(name);
    try {
      const response = await fetch(`${API_BASE_URL}/person/${encodeURIComponent(name)}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete person');
      }

      onPersonDeleted(name);
    } catch (error) {
      alert('Failed to delete person: ' + error.message);
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4">Registered Persons</h2>
      {persons.length === 0 ? (
        <p className="text-gray-500">No persons registered yet.</p>
      ) : (
        <div className="space-y-3">
          {persons.map((person, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
              <div>
                <span className="font-medium">{person.name}</span>
                <span className="text-gray-500 ml-2">({person.images_count} images)</span>
              </div>
              <button
                onClick={() => handleDelete(person.name)}
                disabled={deleting === person.name}
                className="text-red-600 hover:text-red-800 disabled:text-red-400 p-1"
              >
                {deleting === person.name ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                ) : (
                  <Trash2 className="h-4 w-4" />
                )}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// WebcamRecognition Component
const WebcamRecognition = () => {
  const [isActive, setIsActive] = useState(false);
  const [result, setResult] = useState(null);
  const [recognizing, setRecognizing] = useState(false);
  const [stream, setStream] = useState(null);
  const [videoLoading, setVideoLoading] = useState(true);
  const videoRef = React.useRef(null);
  const canvasRef = React.useRef(null);

  const startWebcam = async () => {
    try {
      const constraints = {
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user'
        },
        audio: false
      };
      
      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(mediaStream);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        
        // Wait for the video to load
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play().then(() => {
            setVideoLoading(false);
          }).catch(err => {
            console.error('Error playing video:', err);
            setVideoLoading(false);
          });
        };
      }
      
      setIsActive(true);
      setVideoLoading(true);
      setResult(null);
    } catch (error) {
      console.error('Webcam error:', error);
      alert('Error accessing webcam: ' + error.message + '\n\nPlease make sure:\n1. Camera permission is granted\n2. Camera is not being used by another application\n3. You are using HTTPS or localhost');
    }
  };

  const stopWebcam = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsActive(false);
    setVideoLoading(true);
    setResult(null);
  };

  const captureAndRecognize = async () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    // Check if video is actually playing
    if (videoRef.current.readyState !== 4) {
      alert('Video is not ready yet. Please wait a moment.');
      return;
    }

    setRecognizing(true);
    setResult(null);

    try {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      
      // Set canvas size to match video
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      const dataURL = canvas.toDataURL('image/jpeg', 0.8);
      
      const response = await fetch(`${API_BASE_URL}/recognize_base64`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: dataURL }),
      });

      if (!response.ok) {
        throw new Error('Failed to recognize face');
      }

      const result = await response.json();
      setResult(result);
    } catch (error) {
      setResult({ message: 'Error: ' + error.message, name: null });
    } finally {
      setRecognizing(false);
    }
  };

  React.useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Camera className="h-6 w-6" />
        Face Recognition
      </h2>

      <div className="space-y-4">
        {!isActive ? (
          <button
            onClick={startWebcam}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200 flex items-center justify-center gap-2"
          >
            <Camera className="h-5 w-5" />
            Start Webcam
          </button>
        ) : (
          <>
            <div className="relative bg-black rounded-lg overflow-hidden min-h-[300px] flex items-center justify-center">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-auto max-w-full"
                style={{ transform: 'scaleX(-1)' }}
              />
              {/* Loading indicator while video is loading */}
              {videoLoading && (
                <div className="absolute inset-0 flex items-center justify-center text-white bg-black bg-opacity-75">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                    <p>Loading camera...</p>
                  </div>
                </div>
              )}
            </div>
            
            <canvas ref={canvasRef} style={{ display: 'none' }} />

            <div className="flex gap-2">
              <button
                onClick={captureAndRecognize}
                disabled={recognizing}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-2 px-4 rounded-md transition duration-200 flex items-center justify-center gap-2"
              >
                {recognizing ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <Camera className="h-5 w-5" />
                )}
                {recognizing ? 'Recognizing...' : 'Recognize Face'}
              </button>
              
              <button
                onClick={stopWebcam}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
              >
                Stop
              </button>
            </div>

            {result && (
              <div className={`p-4 rounded-md ${
                result.name 
                  ? 'bg-green-50 border border-green-200 text-green-800' 
                  : 'bg-yellow-50 border border-yellow-200 text-yellow-800'
              }`}>
                <div className="font-medium">
                  {result.name ? `Recognized: ${result.name}` : 'Face not recognized'}
                </div>
                {result.confidence && (
                  <div className="text-sm">Confidence: {result.confidence}%</div>
                )}
                <div className="text-sm">{result.message}</div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  const [persons, setPersons] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPersons = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/persons`);
      if (response.ok) {
        const data = await response.json();
        setPersons(data.persons);
      }
    } catch (error) {
      console.error('Error fetching persons:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePersonAdded = (result) => {
    alert(result.message);
    fetchPersons();
  };

  const handlePersonDeleted = (deletedName) => {
    setPersons(persons.filter(p => p.name !== deletedName));
  };

  React.useEffect(() => {
    fetchPersons();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Face Recognition System
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <PersonUpload onPersonAdded={handlePersonAdded} />
            <PersonsList persons={persons} onPersonDeleted={handlePersonDeleted} />
          </div>
          
          <div>
            <WebcamRecognition />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;