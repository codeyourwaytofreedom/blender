import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import { Socket } from "socket.io-client";
import io from "socket.io-client";
import { useEffect } from "react";
import h from "../styles/home.module.css";
import Butterfly1 from "./butterfly1";
import { OrbitControls } from "@react-three/drei";
import Bike1 from "./Bike1";
import Bike2 from "./Bike2";
import Bike3 from "./Bike3";
import { Svg } from "@react-three/drei";
import Butterfly_flying from "./Butterfly_flying";

const socket: Socket = io("http://localhost:80");
socket.connect();



const Home_page = () => {
    return ( 
        <>
        <div className={h.home}>
          <div style={{width:"300px", height:"300px", right:"30vw", position:"absolute"}}>
              <Canvas>
                <Svg src={"/1.svg"} scale={0.0051} position={[0,0,0]}/>
                <Butterfly_flying />
              </Canvas>
          </div>
                <Canvas >
                
                    {/* <Butterfly1 /> */}
                    <Bike1/>
                    {/* <Bike2/> */}
                    {/* <Bike3/> */}
                    <OrbitControls/>
                </Canvas>
        </div> 
        </>

      );
}
 
export default Home_page;