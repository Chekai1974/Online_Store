import React from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import instagram from "../../images/instagram.png";
import wathsapp from "../../images/whatsApp.png";

const MapPage = ({ google }) => {
  const MARKER = {
    lat: 52.5079545,
    lng: 13.3749224,
  };

  return (
    <footer className="footer">
      <div className="container-footer">
        <div className="content-footer">
          <div className="mapDiv">
            <div className="footer-left-text">
              <h1>Contact</h1>
              <h3>+49 999 999 99 99</h3>
              <div className="footer-icons">
                <div className="instagram-icon">
                  <a href="https://www.instagram.com/telran.de/" target="blank">
                    <img src={instagram} alt="" />
                  </a>
                  <a href="https://www.instagram.com/telran.de/" target="blank">
                    <p>Instagram</p>
                  </a>
                </div>
                <div className="wathsapp-icon">
                  <a href="tel:+4915735989554" target="blank">
                    <img src={wathsapp} alt="" />
                  </a>
                  <a href="tel:+4915735989554" target="blank">
                    <p>WhatsApp</p>
                  </a>
                </div>
              </div>
            </div>
            <div className="footer-right-text">
              <h1>Address</h1>
              <a href="https://tel-ran.de/" target="blank">
                Linkstraße 2, 8 OG, 10785, <br /> Berlin, Deutschland
              </a>
              <p>Working Hours:</p>
              <h3>24 hours a day</h3>
            </div>
          </div>
          <div className="map">
            <Map
              google={google}
              zoom={17}
              initialCenter={MARKER}
            >
              <Marker position={MARKER} />
            </Map>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyARV5i3XmmiyCxEZPxLbkRFktxiHdXRJyY",
})(MapPage);
