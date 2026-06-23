import React from "react";
import SearchField from "../comps/SearchField";
import popcornImg from "../assets/popcorn.svg";
import ticketsImg from "../assets/tickets.svg";
import cameraImg from "../assets/camera.svg";
import playerImg from "../assets/player.svg";

function Home() {

    return (
        
        <div id="landing" >
            <div className="row">
                <div className="images__container">
                    <figure className="landing__img"><img src={cameraImg}/></figure>
                    <figure className="landing__img"><img src={popcornImg}/></figure>
                    <figure className="landing__img"><img src={playerImg}/></figure>
                    <figure className="landing__img"><img src={ticketsImg}/></figure>
                </div>
                <SearchField />
                <div className="slide-shows__container">
                    <div id="features" className="slide-show__box">
                        <div className="slide__box">
                            <p className="slide__text">Best Prices in the web.</p>
                        </div>
                        <div className="slide__box">
                            <p className="slide__text">50K+ movies available.</p>
                        </div>
                        <div className="slide__box">
                            <p className="slide__text">Movies in over 5 languages.</p>
                        </div>
                    </div>
                    <div id="values" className="slide-show__box">
                        <div className="slide__box">
                            <p className="slide__text">Start browsing today</p>
                        </div>
                        <div className="slide__box">
                            <p className="slide__text">50% Discount for NEW customers </p>
                        </div>
                        <div className="slide__box">
                            <p className="slide__text">Find the movie that is right for you.</p>
                        </div>
                    </div>
                    <div id="testimonials" className="slide-show__box">
                        <div className="slide__box">
                            <p className="slide__text">"JM's Library is so easy to use. I buy a movie every week and watch it with my friends."</p>
                            <p className="testimonial__author">Elizabeth P.</p>
                        </div>
                        <div className="slide__box">
                            <p className="slide__text">"This Library is cheaper than all the other stores I've tried."</p>
                            <p className="testimonial__author">George R.</p>
                        </div>
                        <div className="slide__box">
                            <p className="slide__text">"This website is awesome! Very simple and easy navigate. I always find just what I'm looking for."</p>
                            <p className="testimonial__author">Jason B.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;
