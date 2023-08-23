import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';


function SideBar() {
    const [categoryData, setCategoryData] = useState([]);
    const [latestData, setLatestData] = useState([]);
    //get post category
    const categoryPath = `http://localhost:8888/wordpress/redlineCrew/wp-json/wp/v2/categories`
    //get all posts
    const latestPath = `http://localhost:8888/wordpress/redlineCrew/wp-json/wp/v2/posts`


    useEffect(() => {
        async function fetchData() {
            try {
                const cateResponse = await fetch(categoryPath);
                const cateData = await cateResponse.json();

                const latestNewResponse = await fetch(latestPath);
                const latestNewData = await latestNewResponse.json();

                setCategoryData(cateData); 
                setLatestData(latestNewData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchData();
    }, [categoryPath, latestPath]); 

    return (
        <>
            <div className='categories'>
                <h3 className="text-3xl py-5">Categories</h3>
                <ul>
                    {categoryData.map(category => (
                        <li key={category.id} className='text-xl'>
                            <NavLink to={`/category/${category.slug}`}>
                                {category.name}
                            </NavLink>
                        </li>

                    ))}
                </ul>
            </div>
            <div className='latestNew'>
                <h3 className="text-3xl py-5">Latest News</h3>
                <ul>
                    {latestData.slice(0, 5).map(news => (
                        <li key={news.id} className='text-xl'>
                            <NavLink to={`/blog/${news.slug}`} onClick={() => window.scrollTo(0, 0)}>
                                {news.title.rendered}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default SideBar