import React, { useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';

function PageBlog() {
    const [restData, setRestData] = useState([]);
    const params = useParams();

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`http://localhost:8888/wordpress/redlineCrew/wp-json/wp/v2/posts?_embed`);
                const data = await response.json();

                setRestData(data); // Update state with car data

                console.log(restData)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchData();
    }, [restData]); // Use params.brandName as a dependency

    return (
        <>
            <div>

            </div>
        </>

    )
}

export default PageBlog