import React, { useEffect, useState } from 'react'
import { useParams, NavLink } from 'react-router-dom';
import Loader from '../components/Loader';
import SideBar from '../components/SideBar';

function PageSingleBlog() {
    const [restData, setRestData] = useState([]);
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const restPath = `http://localhost:8888/wordpress/redlineCrew/wp-json/wp/v2/posts?slug=${params.blogName}&_embed`

    useEffect(() => {
        async function fetchData() {
            try {
                const blogResponse = await fetch(restPath);
                const blogData = await blogResponse.json();

                const blogId = blogData[0].id;

                // Use Brand ID in Car Query instead of using array
                const Response = await fetch(`http://localhost:8888/wordpress/redlineCrew/wp-json/wp/v2/posts/${blogId}?_embed`);
                const data = await Response.json();
                setRestData(data); // Update state with car data
                setLoading(false)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchData();
    }, [restPath]); 

console.log(restData)
    if (loading) {
        return <Loader />
    }

    const blogContent = restData.acf.content.replace(/\r\n/g, '<br />');
    return (
        <>
            <div className="max-w-[1440px] px-10 m-auto lg:flex relative">
                <div className='blog-content basis-3/5'>
                    <h2 className="text-5xl pt-5 pb-10">{restData.title.rendered}</h2>
                    {restData._embedded['wp:featuredmedia'][0] && (
                        <figure className="featured-image">
                            <img
                                src={restData._embedded['wp:featuredmedia'][0].source_url}
                                alt={restData._embedded['wp:featuredmedia'][0].alt_text}
                                width={restData._embedded['wp:featuredmedia'][0].media_details.sizes.full.width}
                                height={restData._embedded['wp:featuredmedia'][0].media_details.sizes.full.height}
                            />
                        </figure>
                    )}
                    <div className="content my-10 text-xl" dangerouslySetInnerHTML={{ __html: blogContent }} />

                    <nav className="posts-navigation flex justify-between text-xl mt-16 mb-10 gap-5">
                        {restData.previous_post && (
                            <NavLink
                                to={`/blog/${restData.previous_post.slug}`}
                                className="prev-post flex-1"
                                onClick={() => window.scrollTo(0, 0)}
                            >
                                Previous:<br />
                                {restData.previous_post.title}
                            </NavLink>
                        )}

                        {restData.next_post && (
                            <NavLink
                                to={`/blog/${restData.next_post.slug}`}
                                className="next-post flex-1 text-right"
                                onClick={() => window.scrollTo(0, 0)}
                            >
                                Next:<br />
                                {restData.next_post.title}
                            </NavLink>
                        )}
                    </nav>
                </div>
                <aside className="sideBar lg:ml-10">
                    <SideBar />
                </aside>
            </div>
        </>

    )
}

export default PageSingleBlog