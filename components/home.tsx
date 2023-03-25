import { Canvas } from "@react-three/fiber";
import Cube from "./Cube";
import Sphere from "./Sphere";
import Cylinder from "./Cylinder";
import { Suspense, useState } from "react";
import { Socket } from "socket.io-client";
import io from "socket.io-client";
import { useEffect } from "react";
import h from "../styles/home.module.css";
import * as THREE from 'three';
import Butterfly1 from "./butterfly1";


const socket: Socket = io("http://localhost:80");
socket.connect();



const Home_page = () => {
    const [scaling_index, setIndex] = useState<number>(1)
    useEffect(() => {
        socket.on('connect', () => {
        });
    
        socket.on('scaling_index', (ind) => {
            console.log(ind)
            setIndex(ind)
        });
    
        return () => {
          socket.off('connect');
          socket.off('scaling_index');
        };
      }, []);
    const handle_click = () => {
        socket.emit("request_scaling_index")
      }
    return ( 
        <>
        <div className={h.home}>
                <Canvas >
                    <Butterfly1 />
                </Canvas>
        </div> 
        </>

      );
}
 
export default Home_page;