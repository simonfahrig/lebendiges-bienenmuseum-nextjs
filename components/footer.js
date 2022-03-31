import React, { Component, Fragment } from "react";
import { FaPhone, FaFax } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import Image from 'next/image';

class Footer extends Component {
    render() {
        return (
            <div style={{ width: "100%", textAlign: "center", padding: "50px 0 100px", backgroundColor: "#FFF9E5" }}>
                {/* <hr style={{margin: "0 40px"}} /> */}
                <div style={{ display: "inline-block", margin: "20px" }}>
                    <p><FaPhone /> 05685-499</p>
                    <p><FaFax /> 05685-930364</p>
                    <p><MdEmail /> Bienenmuseum-Knüllwald@web.de</p>
                </div><br />
                <div style={{ display: "inline-block", margin: "20px" }}>
                    © 2018 Lebendiges Bienenmuseum Knüllwald
                </div>
            </div>
        );
    }
}

export default Footer;