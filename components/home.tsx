import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { NextPage } from "next";
import { GridHelper } from "three";
import h from "../styles/home.module.css";
import ARGE from "./arge";
import Arrows from "./arrows";
import Butterfly1 from "./butterfly1";
import Butterfly_flying from "./Butterfly_flying";
import Cube from "./Cube";
import MyComponent from "./Instances";
import Sphere from "./Sphere";
import Cylinder from "./Cylinder";
import { Suspense } from "react";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { io, Socket } from "socket.io-client";


const socket: Socket = io("http://localhost:9000");

const Home_page = () => {
    const scaling_index = 1;
    socket.connect();
    return ( 
        <>
        <div className={h.home}>
            <Suspense fallback={null}>
                <Canvas>
                    <Cube scaling_index={scaling_index}/>
                    <Sphere scaling_index={scaling_index} />
                    <Cylinder scaling_index={scaling_index} />
                </Canvas>
            </Suspense>
        </div> 
        </>

      );
}
 
export default Home_page;