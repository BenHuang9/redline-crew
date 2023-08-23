import React, { useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import Loader from '../components/Loader';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';


function Brand() {
    const [carData, setCarData] = useState([]);
    const [brandName, setBrandName] = useState([])
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const restPath = `http://localhost:8888/wordpress/redlineCrew/wp-json/wp/v2/brand?slug=${params.brandName}`

    useEffect(() => {
        async function fetchData() {
            try {
                const brandResponse = await fetch(restPath);
                const brandData = await brandResponse.json();

                setBrandName(brandData)
                const brandId = brandData[0].id;

                // Use Brand ID in Car Query
                const carResponse = await fetch(`http://localhost:8888/wordpress/redlineCrew/wp-json/wp/v2/car?brand=${brandId}&_embed`);
                const carData = await carResponse.json();

                setCarData(carData); // Update state with car data
                setLoading(false)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchData();
    }, [restPath]); // Use params.brandName as a dependency


    if (loading) {
        return <Loader />
    }
    console.log(brandName)
    return (
        <>
            <div className='relative h-[95vh] flex items-center brandBanner bg-radial-gradient'>
                <h2 className='absolute top-[40%] md:top-[35%] lg:top-[25%] min-[1500px]:top-32 min-[1800px]:top-10 left-1/2 transform -translate-x-1/2 text-[15vw]'>{brandName[0].name}</h2>
                <Swiper
                    effect={'coverflow'}
                    centeredSlides={true}
                    slidesPerView={'auto'}
                    initialSlide={1}
                    navigation
                    coverflowEffect={{
                        rotate: 0,
                        stretch: 0,
                        depth: 100,
                        modifier: 10,
                        slideShadows: false,
                    }}
                    pagination={true}
                    modules={[Navigation, EffectCoverflow, Pagination]}
                    className="mySwiper pt-10"
                >
                    {carData.map((car) => (
                        <SwiperSlide key={car.id} id={`post-${car.id}`} >
                            <NavLink to={`/brand/${brandName[0].slug}/${car.slug}`} className="relative">
                                {car._embedded['wp:featuredmedia'][0] && (
                                    <figure className="featured-image">
                                        <img
                                            src={car._embedded['wp:featuredmedia'][0].source_url}
                                            alt={car._embedded['wp:featuredmedia'][0].alt_text}
                                            className='m-auto w-[60%]'
                                        />
                                    </figure>
                                )}
                                <h2 className='absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[3vw]'>{car.acf.model_name}</h2>
                            </NavLink>
                        </SwiperSlide>

                    ))}
                </Swiper>
            </div>
        </>
    );
}

export default Brand;