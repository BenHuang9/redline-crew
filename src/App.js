import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PageHome from './pages/PageHome';
import Header from './components/Header';
import PageBrand from './pages/PageBrand';
import PageBlog from './pages/PageBlog';

function App() {
  const featuredImage = (featuredImageObject) => {
    let imgWidth = featuredImageObject.media_details.sizes.full.width;
    let imgHeight = featuredImageObject.media_details.sizes.full.height;
    let img = `<img src="${featuredImageObject.media_details.sizes.full.source_url}" 
        width="${imgWidth}"
        height="${imgHeight}"
        alt="${featuredImageObject.alt_text}"
        srcset="${featuredImageObject.media_details.sizes.full.source_url} ${imgWidth}w, 
        ${featuredImageObject.media_details.sizes.large.source_url} 1024w,
        ${featuredImageObject.media_details.sizes.medium_large.source_url} 768w,
        ${featuredImageObject.media_details.sizes.medium.source_url} 300w"
        sizes="(max-width: ${imgWidth}) 100vw, ${imgWidth}px">`;
    return { __html: img }
  }

  return (
    <BrowserRouter>
      <div className='wrapper'>
        {/* <Header /> */}
        <main>
          <Routes>
            <Route path='/' element={<PageHome />} />
            <Route path="/brand/:brandName" element={<PageBrand featuredImage={featuredImage} />} />
            <Route path='/blog' element={<PageBlog />} />
          </Routes>
        </main>

      </div>
    </BrowserRouter>

  );
}

export default App;
