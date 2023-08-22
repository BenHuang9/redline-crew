import React, { useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom'
import OwlCarousel from 'react-owl-carousel';
import Loader from './Loader';

function RelatedBlog() {
    const params = useParams()
    const [restData, setRestData] = useState([]);
    // const restPath = `http://localhost:8888/wordpress/redlineCrew/wp-json/wp/v2/categories?slug=${params.brandName}`
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                if (params.brandName) {
                    const restPath = `http://localhost:8888/wordpress/redlineCrew/wp-json/wp/v2/categories?slug=${params.brandName}`
                    const categoryResponse = await fetch(restPath);
                    const categoryData = await categoryResponse.json();

                    const blogId = categoryData[0].id;

                    // // Use Brand ID in Car Query
                    const response = await fetch(`http://localhost:8888/wordpress/redlineCrew/wp-json/wp/v2/posts?categories=${blogId}&_embed`);
                    const data = await response.json();

                    setRestData(data);
                } else {
                    console.log('no')
                    const restPath = await fetch(`http://localhost:8888/wordpress/redlineCrew/wp-json/wp/v2/posts?_embed`)
                    const data = await restPath.json();

                    setRestData(data);
                }
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        }

        fetchData();
    }, [params.brandName]);

    const options = {
        margin: 25,
        // responsiveClass: true,
        dots: true,
        autoplay: true,
        smartSpeed: 1000,
        responsive: {
            320: {
                items: 1,
            },
            650: {
                items: 2,
            },
            1024: {
                items: 3,
            }
        },
    };


    if (loading) {
        return <Loader />
    }

    return (
        <>
            {restData && (
                <OwlCarousel
                    className="owl-theme"
                    {...options}>
                    {restData.map((blog) => (
                        <article key={blog.id} className="gap-10 mb-10">
                            <NavLink to={`/blog/${blog.slug}`} className="featured-image flex-1 overflow-hidden">
                                {blog._embedded['wp:featuredmedia'][0] && (
                                    <figure className='overflow-hidden'>
                                        <img
                                            src={blog._embedded['wp:featuredmedia'][0].source_url}
                                            alt={blog._embedded['wp:featuredmedia'][0].alt_text}
                                            className='hover:scale-110 transition duration-200 ease-in-out w-full h-[300px] object-cover'
                                        />
                                    </figure>
                                )}
                            </NavLink>
                            <div className="flex-1 flex flex-col justify-between h-[400px]">
                                <div className='flex justify-between flex-col '>
                                    <h2 className="text-3xl mb-8 md:h-[125px]">{blog.title.rendered}</h2>
                                    <div className="entry-content" dangerouslySetInnerHTML={{ __html: blog.excerpt.rendered }} />
                                </div>

                                <button className="text-right text-2xl">
                                    <NavLink to={`/blog/${blog.slug}`}>
                                        Read More
                                    </NavLink>
                                </button>
                            </div>
                        </article>
                    ))}
                </OwlCarousel>
            )}
        </>
    )
}

export default RelatedBlog