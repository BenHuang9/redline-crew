import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import Loader from '../components/Loader';
import simpleParallax from 'simple-parallax-js';
import { GiCancel } from 'react-icons/gi'
import { MdKeyboardDoubleArrowRight } from 'react-icons/md'
import CountUp from 'react-countup'
import RelatedBlog from '../components/RelatedBlog';
import OwlCarousel from 'react-owl-carousel';
import RelatedModel from '../components/RelatedModel';

function PageSingleCar() {
    const params = useParams()
    const restPath = `http://localhost:8888/wordpress/redlineCrew/wp-json/wp/v2/car?slug=${params.carName}&_embed`
    const [loading, setLoading] = useState(true)
    const [restData, setRestData] = useState([]);
    const [showHideSpec, setShowHideSpec] = useState(false)
    useEffect(() => {
        async function fetchData() {
            try {
                const carResponse = await fetch(restPath);
                const carData = await carResponse.json();

                const carId = carData[0].id;

                // Use Brand ID in Car Query instead of using array
                const Response = await fetch(`http://localhost:8888/wordpress/redlineCrew/wp-json/wp/v2/car/${carId}?acf_format=standard&_embed`);
                const data = await Response.json();
                setRestData(data); // Update state with car data
                setLoading(false)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchData();
    }, [restPath]);


    useEffect(() => {
        new simpleParallax(document.querySelector('.parallax-down'), {
            delay: .6,
            transition: 'cubic-bezier(0,0,0.5,1)',
            orientation: 'down',
            overflow: true,
            maxTransition: 70
        });
    })

    useEffect(() => {
        new simpleParallax(document.querySelector('.parallax-up'), {
            delay: .6,
            transition: 'cubic-bezier(0,0,0.5,1)',
            orientation: 'up',
            overflow: true,

        });
    });

    console.log(restData)

    function showSpec() {
        setShowHideSpec(!showHideSpec)

        if (!showHideSpec) {
            console.log("yes")
            // document.getElementById('subSpec').scrollIntoView()
        } else {
            console.log("no")
            // document.getElementById('spec').scrollIntoView()
        }
    }

    const options = {
        margin: 25,
        dots: true,
        autoplay: true,
        smartSpeed: 1000,
        responsive: {
            320: {
                items: 1,
            }
        },
    };


    if (loading) {
        return <Loader />;
    }

    return (
        <div className="max-w-[1440px] m-auto px-10">
            <h2>{restData.title.rendered}</h2>
            <div className="carBanner">
                <img src={restData.acf.banner} alt="carBanner" />
            </div>
            <div className="mini-Nav flex sticky p-7 top-0 z-50 w-full blur-0 backdrop-blur-md bg-[#161A21]/[0.8] md:block md:p-0">
                <div className="breadcrumb md:hidden">
                    <span className='uppercase'>{restData.type}</span>
                    <span className="arrow px-1">»</span>
                    <span>{restData.title.rendered}</span>
                    <span className="arrow px-1">»</span>
                </div>
                <div>
                    <ul className="nav-list md:flex justify-start gap-5 mx-8">
                        <li>
                            <a href="#design" className="md:p-5 inline-block">Design</a>
                        </li>
                        <li>
                            <a href="#spec" className="md:p-5 inline-block">Specs</a>
                        </li>
                        <li>
                            <a href="#gallery" className="md:p-5 inline-block">Gallery</a>
                        </li>
                        <li>
                            <a href="#blog" className="md:p-5 inline-block">News</a>
                        </li>
                        <li>
                            <a href="#models" className="md:p-5 inline-block">Other Models</a>
                        </li>
                    </ul>
                </div>
            </div>
            {/* Car Design Begin */}
            <section className="design pt-[64px]" id="design">

                <div className="section-title flex items-center text-md text-[#da291c] mx-2 py-8">
                    <span>1</span>
                    <span className='flex item-center max-w-[100px] min-w-[10px] m-3 w-[70%] h-[1px]'>
                        <i className='bg-[#da291c] inline-block w-full h-full'></i>
                    </span>
                    <span>Design</span>
                </div>
                <div className="content-wrapper">
                    <div className="introWrapper m-auto md:flex gap-8 md:py-16">
                        <p className="intro-left reveal flex-1 my-3">
                            {restData.acf.design.intro_left}
                        </p>
                        <p className="intro-right reveal flex-1 my-3">
                            {restData.acf.design.intro_right}
                        </p>
                    </div>
                    <div className="designWrapper">
                        <div className="text-container pt-5">
                            <h2>
                                <div>
                                    <span className="reveal singleWord">The</span>
                                </div>
                                <div>
                                    <span className="reveal singleWord">Essence</span>
                                </div>
                                <div>
                                    <span className="reveal singleWord">of</span>
                                </div>
                                <div>
                                    <span className="reveal singleWord">Design</span>
                                </div>
                            </h2>
                            <p>
                                {restData.acf.design.design_text}
                            </p>
                        </div>
                        <div className="image-container my-10">
                            <div className="left-column parallax-down">
                                <div className="imageOne">
                                    <img src={restData.acf.design.intro_img_one} alt="intro design car" />
                                </div>
                                <div className="imageTwo">
                                    <img src={restData.acf.design.intro_img_two} alt="intro design car" />
                                </div>
                            </div>
                            <div className="right-column parallax-up">
                                <div className="imageThree">
                                    <img src={restData.acf.design.intro_img_three} alt="intro design car" />
                                </div>
                            </div>
                        </div>
                    </div>



                    <div className="videoWrapper">
                        <div className="videoId">
                            {/* <?php if (get_field('car-video')): ?>
            <p className="ID">
                <?php echo the_field('car-video'); ?>
            </p>
            <?php endif ?> */}
                        </div>
                        <div id="player"></div>

                    </div>
                </div>
            </section>

            {/* Car Specification begin */}
            <section id="spec" className='pt-[64px]'>
                <div className="section-title flex items-center text-md text-[#da291c] mx-2 py-8">
                    <span>2</span>
                    <span className='flex item-center max-w-[100px] min-w-[10px] m-3 w-[70%] h-[1px]'>
                        <i className='bg-[#da291c] inline-block w-full h-full'></i>
                    </span>
                    <span>Specification</span>
                </div>
                <h2 className="text-[9vw] lg:text-[4vw] text-center mb-16">Performance</h2>
                <div className="main-spec grid grid-rows-3 lg:grid-cols-3 lg:grid-rows-1">
                    <div className="single-spec h-[200px] md:h-[300px] text-center flex justify-center items-center flex-col border-b lg:border-b-0 lg:border-r border-white">
                        <h4 className='text-[5vw] lg:text-[2vw] mb-3 uppercase'>Horsepower</h4>
                        <h4>
                            <CountUp start={0} end={restData.acf.specification.horsepower} enableScrollSpy={true} scrollSpyOnce={true}>
                                {({ countUpRef }) => (
                                    <span ref={countUpRef} className="num text-[9vw] lg:text-[4vw]">number</span>
                                )}
                            </CountUp>
                            <span className='text-[3.5vw] lg:text-[1.5vw] text-[#da291c]'> HP</span>
                        </h4>
                    </div>
                    <div className="single-spec h-[200px] md:h-[300px] text-center flex justify-center items-center flex-col border-b lg:border-b-0 lg:border-r border-white">
                        <h4 className='text-[5vw] lg:text-[2vw] mb-3'>Torque</h4>
                        <h4>
                            <CountUp start={0} end={restData.acf.specification.torque} enableScrollSpy={true} scrollSpyOnce={true}>
                                {({ countUpRef }) => (
                                    <span ref={countUpRef} className="num text-[9vw] lg:text-[4vw]">number</span>
                                )}
                            </CountUp>
                            <span className='text-[3.5vw] lg:text-[1.5vw] text-[#da291c]'> lb-ft</span>
                        </h4>
                    </div>
                    <div className="single-spec h-[200px] md:h-[300px] text-center flex justify-center items-center flex-col border-b lg:border-b-0 border-white">
                        <h4 className='text-[5vw] lg:text-[2vw] mb-3'>Top Speed</h4>
                        <h4>
                            <CountUp start={0} end={restData.acf.specification.top_speed} enableScrollSpy={true} scrollSpyOnce={true}>
                                {({ countUpRef }) => (
                                    <span ref={countUpRef} className="num text-[9vw] lg:text-[4vw]">number</span>
                                )}
                            </CountUp>
                            <span className='text-[3.5vw] lg:text-[1.5vw] text-[#da291c]'>km/h</span>
                        </h4>
                    </div>
                </div>
                <div className="btn-seeMore text-center pt-20 pb-12" id="btn-seeMore">
                    <button
                        id="showSpec"
                        onClick={showSpec}
                        className="inline-flex items-center justify-between border-white border border-r-4 border-r-[#da291c] w-[80%] py-5 px-8 lg:w-[300px]"
                    >
                        <span>See More</span>
                        <span><MdKeyboardDoubleArrowRight /></span>
                    </button>
                </div>


                <div id="subSpec" className={`subSpec max-h-0 overflow-hidden transition-[max-height] duration-1000 ease-out ${showHideSpec ? "max-h-[2200px] h-auto" : ""}`}>
                    <div className="subSpec-list p-12 grid gap-12 lg:grid-cols-2 lg:grid-rows-2" id="subSpec-list">
                        <div className="single-spec">
                            <h4 className="spec-title text-[9vw] lg:text-[3vw]">Engine</h4>
                            <div className='flex gap-5 justify-between border-b uppercase py-[1em]'>
                                <h4 className=''>Horsepower</h4>
                                <h4>
                                    {restData.acf.specification.horsepower} <span>HP</span>
                                </h4>
                            </div>
                            <div className='flex gap-5 justify-between border-b uppercase py-[1em]'>
                                <h4>Torque</h4>
                                <h4>
                                    {restData.acf.specification.torque} <span>lb-ft</span>
                                </h4>
                            </div>
                            <div className='flex gap-5 justify-between border-b uppercase py-[1em]'>
                                <h4>Engine</h4>
                                <h4>
                                    {restData.acf.specification.engine}
                                </h4>
                            </div>
                            <div className='flex gap-5 justify-between border-b uppercase py-[1em]'>
                                <h4>Transmission</h4>
                                <h4>
                                    {restData.acf.specification.transmission}
                                </h4>
                            </div>
                            <div className='flex gap-5 justify-between border-b uppercase py-[1em]'>
                                <h4>Fuel Consumption</h4>
                                <h4>
                                    {restData.acf.specification.fuel_economy} <span>l/100km</span>
                                </h4>
                            </div>
                        </div>
                        <div className="single-spec">
                            <h4 className="spec-title text-[9vw] lg:text-[3vw]">Performance</h4>
                            <div className='flex gap-5 justify-between border-b uppercase py-[1em]'>
                                <h4>Top Speed</h4>
                                <h4>
                                    {restData.acf.specification.top_speed} <span> km/h</span>
                                </h4>
                            </div>
                            <div className='flex gap-5 justify-between border-b uppercase py-[1em]'>
                                <h4>Acceleration 0-100 km/h</h4>
                                <h4>
                                    {restData.acf.specification.acceleration_100} <span>Sec</span>
                                </h4>
                            </div>
                            <div className='flex gap-5 justify-between border-b uppercase py-[1em]'>
                                <h4>Acceleration 0-200 km/h</h4>
                                <h4>
                                    {restData.acf.specification.acceleration_200} <span>Sec</span>
                                </h4>
                            </div>
                        </div>
                        <div className="single-spec">
                            <h4 className="spec-title text-[9vw] lg:text-[3vw]">Dimension</h4>
                            <div className='flex gap-5 justify-between border-b uppercase py-[1em]'>
                                <h4>Length</h4>
                                <h4>
                                    {restData.acf.specification.car_length} <span>mm</span>
                                </h4>
                            </div>
                            <div className='flex gap-5 justify-between border-b uppercase py-[1em]'>
                                <h4>Width</h4>
                                <h4>
                                    {restData.acf.specification.car_width} <span>mm</span>
                                </h4>
                            </div>
                            <div className='flex gap-5 justify-between border-b uppercase py-[1em]'>
                                <h4>Height</h4>
                                <h4>
                                    {restData.acf.specification.car_height} <span>mm</span>
                                </h4>
                            </div>
                            <div className='flex gap-5 justify-between border-b uppercase py-[1em]'>
                                <h4>Wheelbase</h4>
                                <h4>
                                    {restData.acf.specification.wheelbase} <span>mm</span>
                                </h4>
                            </div>
                        </div>
                        <div className="single-spec">
                            <h4 className="spec-title text-[9vw] lg:text-[3vw]">Wheels</h4>
                            <div className='flex gap-5 justify-between border-b uppercase py-[1em]'>
                                <h4>Front Rims</h4>
                                <h4>
                                    {restData.acf.specification.front_rim}
                                </h4>
                            </div>
                            <div className='flex gap-5 justify-between border-b uppercase py-[1em]'>
                                <h4>Rear Rims</h4>
                                <h4>
                                    {restData.acf.specification.rear_rim}
                                </h4>
                            </div>
                        </div>
                    </div>
                    <div className="close-btn mb-10 flex justify-center" id="close-btn">
                        <button className="closeSpec" onClick={showSpec}>
                            <GiCancel className='text-3xl' />
                        </button>
                    </div>
                </div>
            </section>
            {/* Car specification end */}

            <section id="gallery" className='pt-[64px]'>
                <div className="section-title flex items-center text-md text-[#da291c] mx-2 py-8">
                    <span>3</span>
                    <span className='flex item-center max-w-[100px] min-w-[10px] m-3 w-[70%] h-[1px]'>
                        <i className='bg-[#da291c] inline-block w-full h-full'></i>
                    </span>
                    <span>Gallery</span>
                </div>
                {restData &&
                    <OwlCarousel
                        className="owl-theme"
                        {...options}>
                        <div>
                            <img src={restData.acf.gallery.slider_one} alt="gallery" className='h-[30vh] md:h-[60vh] object-cover object-center' />
                        </div>
                        <div>
                            <img src={restData.acf.gallery.slider_two} alt="gallery" className='h-[30vh] md:h-[60vh] object-cover object-center' />
                        </div>
                        <div>
                            <img src={restData.acf.gallery.slider_three} alt="gallery" className='h-[30vh] md:h-[60vh] object-cover object-center' />
                        </div>
                        <div>
                            <img src={restData.acf.gallery.slider_four} alt="gallery" className='h-[30vh] md:h-[60vh] object-cover object-center' />
                        </div>
                        <div>
                            <img src={restData.acf.gallery.slider_five} alt="gallery" className='h-[30vh] md:h-[60vh] object-cover object-center' />
                        </div>
                    </OwlCarousel>
                }
            </section>

            <section id="blog" className='pt-[64px]'>
                <div className="section-title flex items-center text-md text-[#da291c] mx-2 py-8">
                    <span>4</span>
                    <span className='flex item-center max-w-[100px] min-w-[10px] m-3 w-[70%] h-[1px]'>
                        <i className='bg-[#da291c] inline-block w-full h-full'></i>
                    </span>
                    <span>Latest News</span>
                </div>
                <RelatedBlog />
            </section>

            <section id="models" className='pt-[64px]'>
                <div className="section-title flex items-center text-md text-[#da291c] mx-2 py-8">
                    <span>5</span>
                    <span className='flex item-center max-w-[100px] min-w-[10px] m-3 w-[70%] h-[1px]'>
                        <i className='bg-[#da291c] inline-block w-full h-full'></i>
                    </span>
                    <span>More Models</span>
                </div>
                <RelatedModel />
            </section>

        </div>
    )
}

export default PageSingleCar