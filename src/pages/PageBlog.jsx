import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Loader from '../components/Loader';
import Pagination from '@mui/material/Pagination';

function PageBlog() {
    const [loading, setLoading] = useState(true)
    const restPath = "https://bhuang.ca/redlineCrew-wordpress/wp-json/wp/v2/posts?_embed";
    const [restData, setRestData] = useState([]);
    const blogsPerPage = 3; // Number of blogs to show per page
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(restPath);
                const data = await response.json();

                setRestData(data); // Update state with car data
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchData();
    }, [restPath]);

    if (loading) {
        return <Loader />;
    }

    const startIndex = (currentPage - 1) * blogsPerPage;
    const endIndex = startIndex + blogsPerPage;
    const currentBlogs = restData.slice(startIndex, endIndex);

    // Calculate the total number of pagination pages
    const totalPages = Math.ceil(restData.length / blogsPerPage);

    const handlePageChange = (event, page) => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
    };

    return (
        <>
            <div className="max-w-[1440px] m-auto px-5 mt-24">
                <h2 className="text-3xl md:text-5xl pt-5 pb-10">BLOGS STATION</h2>

                {currentBlogs.map((blog) => (
                    <article key={blog.id} className="lg:flex flex-row-reverse gap-10 mb-10">
                        <NavLink to={`/blog/${blog.slug}`} className="featured-image flex-1">
                            {blog._embedded['wp:featuredmedia'][0] && (
                                <figure className='overflow-hidden'>
                                    <img
                                        src={blog._embedded['wp:featuredmedia'][0].source_url}
                                        alt={blog._embedded['wp:featuredmedia'][0].alt_text}
                                        className='hover:scale-110 transition duration-200 ease-in-out'
                                    />
                                </figure>
                            )}
                        </NavLink>
                        <div className="flex-1 flex flex-col justify-between">
                            <div>
                                <h2 className="text-2xl md:text-4xl my-5 md:mt-0 md:mb-10">{blog.title.rendered}</h2>
                                <div className="entry-content" dangerouslySetInnerHTML={{ __html: blog.excerpt.rendered }} />
                            </div>

                            <button className="text-right text-xl md:text-2xl my-3">
                                <NavLink to={`/blog/${blog.slug}`}>
                                    Read More
                                </NavLink>
                            </button>
                        </div>
                    </article>
                ))}

                <div className="flex justify-center mt-16 mb-10">
                    <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={handlePageChange}
                        classes={{ ul: 'pagination-button-container' }}
                    />
                </div>
            </div>
        </>
    );
}

export default PageBlog;