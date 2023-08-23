import React, { useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom'
import Loader from '../components/Loader';
import Pagination from '@mui/material/Pagination';

function PageCategory() {
    const params = useParams()
    const [restData, setRestData] = useState([]);
    const restPath = `https://bhuang.ca/redlineCrew-wordpress/wp-json/wp/v2/categories?slug=${params.categoryName}`
    const [categoryName, setCategoryName] = useState("")
    const blogsPerPage = 3; // Number of blogs to show per page
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchData() {
            try {
                const categoryResponse = await fetch(restPath);
                const categoryData = await categoryResponse.json();

                const blogId = categoryData[0].id;

                // // Use Brand ID in Car Query
                const response = await fetch(`https://bhuang.ca/redlineCrew-wordpress/wp-json/wp/v2/posts?categories=${blogId}&_embed`);
                const data = await response.json();

                setRestData(data); // Update state with car data
                setCategoryName(categoryData)
                setLoading(false)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchData();
    }, [restPath]); // Use params.brandName as a dependency

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
            <div className="max-w-[1440px] m-auto px-10 mt-24">
                <h2 className="text-5xl pt-5 pb-10">Category: {categoryName[0].name}</h2>

                {currentBlogs.map((blog) => (
                    <article key={blog.id} className="lg:flex flex-row-reverse gap-10 mb-10">
                        <NavLink to={`/blog/${blog.slug}`} className="featured-image flex-1 overflow-hidden ">
                            {blog._embedded['wp:featuredmedia'][0] && (
                                <figure className='hover:scale-110 transition duration-200 ease-in-out'>
                                    <img
                                        src={blog._embedded['wp:featuredmedia'][0].source_url}
                                        alt={blog._embedded['wp:featuredmedia'][0].alt_text}
                                        width={blog._embedded['wp:featuredmedia'][0].media_details.sizes.full.width}
                                        height={blog._embedded['wp:featuredmedia'][0].media_details.sizes.full.height}
                                    />
                                </figure>
                            )}
                        </NavLink>
                        <div className="flex-1 flex flex-col justify-between">
                            <div>
                                <h2 className="text-4xl mb-10">{blog.title.rendered}</h2>
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
    )
}

export default PageCategory