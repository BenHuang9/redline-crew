import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import RelatedBlog from '../components/RelatedBlog';
import Loader from '../components/Loader';

function PageHome() {
  const [loading, setLoading] = useState(true)
  const restPath = "http://localhost:8888/wordpress/redlineCrew/wp-json/wp/v2/pages/11?acf_format=standard&_embed";
  const [restData, setRestData] = useState([]);


  let HomeBanner;
  const videoId1 = '5GrxYha5Vwo';

  useEffect(() => {
    // Create a script element and append the YouTube iframe API
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';

    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // Define the YouTube API ready function in the global scope
    window.onYouTubeIframeAPIReady = () => {
      HomeBanner = new window.YT.Player('homeBanner', {
        width: '100%',
        height: '100%',
        playerVars: {
          loop: 1,
          mute: 1,
          // autoplay:1,
          controls: 0,
          showinfo: 0,
          autohide: 1,
          modestbranding: 1,
          suggestedQuality: 'default',
          start: 117,
          end: 168,
        },
        videoId: videoId1,
        events: {
          'onReady': onReady,
          'onStateChange': onStateChange
        }
      });
    };


  }, []);

  const onReady = (event) => {
    event.target.playVideo();
    HomeBanner.mute();

  };

  const onStateChange = (state) => {
    if (state.data === window.YT.PlayerState.ENDED) {
      HomeBanner.loadVideoById({
        videoId: videoId1,
        startSeconds: 30,
        endSeconds: 87,
      });
    }

    if (state.data === window.YT.PlayerState.PLAYING) {
      var bannerImg = document.querySelector(".bannerImg");
      bannerImg.style.display = "none";
    }
  };

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


  return (
    <>
      <section className="videoWrapper relative w-full h-[40vh] overflow-hidden min-[500px]:h-[60vh] min-[800px]:h-[100vh]">
        <img src="https://img.youtube.com/vi/5GrxYha5Vwo/maxres1.jpg" className="bannerImg h-full w-full object-cover opacity-90 absolute top-0 left-0 brightness-75" alt='banner' />
        <div id="homeBanner">
          <img src="https://img.youtube.com/vi/5GrxYha5Vwo/maxresdefault.jpg" alt='banner' />
        </div>
        <div className="textWrapper absolute bottom-[15%] left-[5%]">
          <h2 className='text-[9vw] m-0 min-[500px]:text-[7vw] min-[800px]:text-[5vw]'>REDLINE CREW</h2>
          <p className='text-[3vw] m-0 min-[800px]:text-[2vw]'>Sleek Speed <br />Unleash the Power</p>
        </div>
        <div className="scroll-invitation hidden min-[800px]:block absolute bottom-10 left-[50%] -translate-x-[50%] fill-white mx-auto mb-[25px]">
          <svg className="scroll-invitation__svg block m-auto pb-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 42" width="24px"
            height="42px">
            <path
              d="M2,12H2V30a10,10,0,0,0,20,0V12A10,10,0,0,0,2,12ZM0,12a12,12,0,0,1,24,0V30A12,12,0,0,1,0,30V12Z">
            </path>
            <path id="wheel" d="M11,7v4a1,1,0,0,0,2,0V7a1,1,0,0,0-2,0Z"></path>
          </svg>
          <p>Scroll Down</p>
        </div>
      </section>
      <div className="max-w-[1440px] px-10 m-auto relative">

        <section className="flex flex-col gap-5 text-3xl py-32">
          <NavLink to="/brand/porsche">Porsche</NavLink>
          <NavLink to="/brand/lamborghini">Lamborghini</NavLink>
          <NavLink to="/brand/ferrari">Ferrari</NavLink>
          <NavLink to="/brand/mclaren">Mclaren</NavLink>
        </section>
        {restData.acf &&
          <section className=" py-32">
            <h2 className='text-3xl mb-5'>About Us</h2>
            <div className='flex'>
              <p className='flex-1'>{restData.acf.about}</p>
              <div className='flex-1'>
                <img src={restData.acf.about_image} alt="about us" />
              </div>
            </div>
          </section>
        }
        <section className=" py-32">
          <h2 className='text-3xl mb-5'>Latest News</h2>
          <RelatedBlog />
        </section>
      </div >

    </>
  );
};

export default PageHome