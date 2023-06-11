import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'

const Card = ({ image }) => {
    const [slideNumber, setSlideNumber] = useState(0)
    const [openModal, setOpenModal] = useState(false)

    const handleOpenModel = (index) => {
        setSlideNumber(index)
        setOpenModal(true)
    }

    const handleCloseModal = () => {
        setOpenModal(false)
    }

    return (
        <div>
            {openModal &&
                <div className='sliderWrap'>
                    <FontAwesomeIcon icon={faCircleXmark} className='btnClose' onClick={handleCloseModal} />
                    <div className="fullScreenImage">
                        <img src={image[slideNumber].download_url} alt="" />
                    </div>
                </div>
            }
            <h1>Image Gallery Store</h1>
            <div className="galleryWrap">
                
                {
                    image && image.map((slide, index) => {
                        return (
                            <div className="single"
                                key={index}
                                onClick={() => handleOpenModel(index)}
                            >
                                <img src={slide.download_url} alt="" />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Card