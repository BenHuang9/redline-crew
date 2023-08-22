import React from 'react'
import Loading from "../asset/loader.gif"


function Loader() {
  return (
    <div className="h-[100vh] flex items-center bg-black bg-opacity-50">
      <img src={Loading} alt="loading" className="m-auto"/>
    </div>
  )
}

export default Loader