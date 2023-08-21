import React, { useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';

function Brand({ featuredImage }) {
    const [carData, setCarData] = useState([]);
    const params = useParams();

    useEffect(() => {
        async function fetchData() {
            try {
                const brandResponse = await fetch(`http://localhost:8888/wordpress/redlineCrew/wp-json/wp/v2/brand?slug=${params.brandName}`);
                const brandData = await brandResponse.json();

                if (brandData.length === 0) {
                    console.log("Brand not found.");
                    return;
                }

                const brandId = brandData[0].id;

                // Use Brand ID in Car Query
                const carResponse = await fetch(`http://localhost:8888/wordpress/redlineCrew/wp-json/wp/v2/car?brand=${brandId}&_embed`);
                const carData = await carResponse.json();

                setCarData(carData); // Update state with car data
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchData();
    }, [params.brandName]); // Use params.brandName as a dependency

    console.log(carData);

    return (
        <div className="flex gap-5">
            {carData.map((car) => (
                <div key={car.id} id={`post-${car.id}`}>
                    <NavLink to="/profile" >
                    {car._embedded['wp:featuredmedia'][0] && (
                        <figure className="featured-image">
                            <img
                                src={car._embedded['wp:featuredmedia'][0].source_url}
                                alt={car._embedded['wp:featuredmedia'][0].alt_text}
                                width={car._embedded['wp:featuredmedia'][0].media_details.sizes.full.width}
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
    );
}

export default Brand;