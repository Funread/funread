import React from 'react'
import "./Collage.css"

function Collage(props) {
  return (
    <div class="collage-container">

        <div class="image-gallery">
            <div class="column">
            <div class="image-item">
                <input className='image-input' type="text" name="name" autocomplete="off" />
                <img src="https://source.unsplash.com/VWcPlbHglYc" alt="" />
            </div>
            <div class="image-item">
                <input className='image-input' type="text" name="name" autocomplete="off" />
                <img src="https://source.unsplash.com/e6FMMambeO4" alt="" />
            </div>
            </div>

            <div class="column">
            <div class="image-item">
                <input className='image-input' type="text" name="name" autocomplete="off" />
                <img src="https://source.unsplash.com/klCiPmzUw0Y" alt="" />
            </div>
            <div class="image-item">
                <input className='image-input' type="text" name="name" autocomplete="off" />
                <img src="https://source.unsplash.com/O0N9MF--hK4" alt="" />
            </div>
            </div>

            <div class="column">
            <div class="image-item">
                <input className='image-input' type="text" name="name" autocomplete="off" />
                <img src="https://source.unsplash.com/FV3GConVSss" alt="" />
            </div>
            <div class="image-item">
                <input className='image-input' type="text" name="name" autocomplete="off" />
                <img src="https://source.unsplash.com/0ESjL-Nw22Y" alt="" />
            </div>
            </div>
        </div>

    </div>
  );
}

Collage.propTypes = {}

export default Collage