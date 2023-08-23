import React, { useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import Loader from '../components/Loader';

function RelatedModel() {
    const [carData, setCarData] = useState([]);
    const [brandName, setBrandName] = useState([])
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const restPath = `https://bhuang.ca/redlineCrew-wordpress/wp-json/wp/v2/brand?slug=${params.brandName}`

    useEffect(() => {
        async function fetchData() {
            try {
                const brandResponse = await fetch(restPath);
                const brandData = await brandResponse.json();

                setBrandName(brandData)
                const brandId = brandData[0].id;

                // Use Brand ID in Car Query
                const carResponse = await fetch(`https://bhuang.ca/redlineCrew-wordpress/wp-json/wp/v2/car?brand=${brandId}&_embed`);
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
    return (
        <>
            <div className="md:flex gap-5">
                {carData
                    .filter((car) => car.slug !== params.carName) // Filter cars by slug condition
                    .map((car) => (
                        <div key={car.id} id={`post-${car.id}`}>
                            <NavLink to={`/brand/${brandName[0].slug}/${car.slug}`} onClick={() => window.scrollTo(0, 0)}>
                                {car._embedded['wp:featuredmedia'][0] && (
                                    <figure className="featured-image">
                                        <img
                                            src={car._embedded['wp:featuredmedia'][0].source_url}
                                            alt={car._embedded['wp:featuredmedia'][0].alt_text}
                                            width={600}
                                            height={car._embedded['wp:featuredmedia'][0].media_details.sizes.full.height}
                                        />
                                    </figure>
                                )}
                                {car.acf.model_name}
                            </NavLink>
                            {/* Display other car details here */}
                        </div>
                    ))}
            </div>
        </>
    );
}
export default RelatedModel