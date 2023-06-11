import axios from 'axios';
import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import Card from './Card';
import Spinner from './Spineer';


const ImageGallery = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        fetchImages()
        setLoading(false)
    }, []);
    console.log(images)

    const fetchImages = async () => {
        setLoading(true)
        try {
            const response = await axios.get(`https://picsum.photos/v2/list?page=${currentPage}&limit=10`);
            const data = response.data

            // Check if there are more movies available
            const moreImageAvailable = data.length > 0;

            // Append the new Images to the existing Images data
            setImages((prevImages) => [...prevImages, ...data]);
            setHasMore(moreImageAvailable)
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };

    const loadMoreImages = () => {
        setCurrentPage((prevPage) => prevPage + 1);
        setInterval(() => {
            fetchImages();
        }, 5000);;
    };

    return (
        // <div className="card-container">
        //     <Card image={images} />
        // </div>
        <InfiniteScroll
            dataLength={images.length} // Number of movies
            next={loadMoreImages} // Function to load more movies
            hasMore={hasMore} // Indicates if there are more movies available
            loader={<Spinner/>} // Loader component
            endMessage={<p>No more Images to load.</p>} // Message when no more movies are available
        >
            <div className='card-container'>
                <Card image={images} />
            </div>
        </InfiniteScroll>
    );
}

export default ImageGallery