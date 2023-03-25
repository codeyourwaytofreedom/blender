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


const socket: Socket = io("http://localhost:80");
socket.connect();



const Home_page = () => {
    return ( 
        <>
        <div className={h.home}>
                <Canvas >
                    {/* <Butterfly1 /> */}
                    {/* <Bike1/> */}
                    {/* <Bike2/> */}
                    {/* <Bike3/> */}
                    <OrbitControls/>
                </Canvas>
        </div> 
        </>

      );
}
 
export default Home_page;