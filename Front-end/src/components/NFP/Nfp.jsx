import React from 'react'
import nfpimg from "../../images/NFP.jpg"
import MapPage from '../Map/MapPage'
function Nfp() {
  return (
    <>
      <div className='nfp'>
        <img src={nfpimg} alt="NFP" />
      </div>
      <MapPage></MapPage>
    </>
  )
}

export default Nfp