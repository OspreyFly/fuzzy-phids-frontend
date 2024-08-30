import React, { useEffect } from 'react';
import './HomePage.css';

const HomePage = () => {


    return (
        <div className="media">
            <h3 className="title">Peacock Spiders</h3>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/5qkzwG2lLPc?si=kkbU2B55-O3Askgb" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            <h3 className="title">Inside a Jumping Spider's Brain</h3>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/Dgbci0GC1vk?si=3H-WPTdLiAYo2M-U" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div >
    );
};

export default HomePage;