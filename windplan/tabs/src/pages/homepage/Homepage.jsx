import React from "react";
import { AiOutlineMail, AiOutlinePhone, AiOutlineFile } from "react-icons/ai";
import { FiMapPin } from "react-icons/fi";
import "./Homepage.css";

export default function Homepage() {
  return (
    <>
      <div className="homecontainer">
        <div className="tooldescription">
          <h2>Tool Description</h2>
          <div className="p-div">
            <p>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
              erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci
              tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
              consequat. Duis autem vel eum iriure dolor in hendrerit in
              vulputate velit esse molestie consequat, vel illum dolore eu
              feugiat nulla facilisis at vero eros et accumsan et iusto odio
              dignissim qui blandit praesent luptatum zzril delenit augue duis
              dolore te feugait nulla facilisi. Nam liber tempor cum soluta
              nobis eleifend option congue nihil imperdiet doming id quod mazim
              placerat facer possim assum.
            </p>
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
              <AiOutlineFile className="file"  size={120}></AiOutlineFile>
              <h3>Terms and Conditions</h3>
            </div>
            <div className="guideline-items">
              <AiOutlineFile className="file"  size={120}></AiOutlineFile>
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
