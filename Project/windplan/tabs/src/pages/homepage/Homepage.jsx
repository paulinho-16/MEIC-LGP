import React from "react";
import { AiOutlineMail, AiOutlinePhone, AiOutlineFile } from "react-icons/ai";
import { FiMapPin } from "react-icons/fi";
import { BsWind } from "react-icons/bs";
import "./Homepage.css";

export default function Homepage() {
  return (
    <>
      <div className="homecontainer">
        <div className="tooldescription">
          <h2>Tool Description</h2>
          <div className="p-div">
            <p>WindPlan ensures that a company is on the shortest path to success, by making sure that it knows where to invest its resources to get the best return.</p>
            <p>It is a project portfolio management tool, in the form of a web application, that can easily be integrated into Microsoft Teams.</p>
            <p>Unlike other PPM tools, whose complexity and low usability stifle the benefits obtained, WindPlan is simple and straightforward to use.</p>
            <p>It's completely feasible to continue to develop/evolve the existing product so that the app is suited to the preferences of the company at hand.</p>
            <div class="slogan" style={{ display: "flex", justifyContent: "center" }}>
              <p style={{ verticalAlign: "bottom" }}>Manage your projects in a breeze!&nbsp;&nbsp;<BsWind size={20} style={{ verticalAlign: "bottom" }}></BsWind></p>
            </div>
          </div>
        </div>
        <div className="guidelines">
          <h2>Guidelines</h2>
          <div className="guideline-content">
            <div className="guideline-items">
              <AiOutlineFile className="file" size={120}></AiOutlineFile>
              <h3>End-User License</h3>
            </div>
            <div className="guideline-items">
              <AiOutlineFile className="file" size={120}></AiOutlineFile>
              <h3>Terms and Conditions</h3>
            </div>
            <div className="guideline-items">
              <AiOutlineFile className="file" size={120}></AiOutlineFile>
              <h3>Usage Guidelines</h3>
            </div>
          </div>
        </div>
        <div className="contactandhelp">
          <h2>Help / Contact</h2>
          <div className="contact">
            <AiOutlineMail></AiOutlineMail>
            <h3> Email</h3>
            <p>windplan@fe.up.pt</p>
          </div>
          <div className="contact">
            <AiOutlinePhone></AiOutlinePhone>
            <h3>Phone</h3>
            <p>+351912345678</p>
            <p>+351000345678</p>
          </div>
          <div className="contact">
            <FiMapPin></FiMapPin>
            <h3>Address</h3>
            <p>Rua Dr. Roberto Frias, Porto</p>
          </div>
        </div>
      </div>
    </>
  );
}
