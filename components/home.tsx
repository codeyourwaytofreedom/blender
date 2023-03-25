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
  const [index, setIndex] = useState<number>(1)
    return ( 
        <>
        <div className={h.home}>
          <div className={h.mini}>
            <span id={h.click} onClick={
              ()=> index === 1 ? setIndex(2) : index === 2 ? setIndex(3) : setIndex(1)
            }></span>
            <Canvas>
              <Svg src={`${index}.svg`} scale={0.005} position={[0,0,0]}/>
              <Butterfly_flying color={index === 1 ? "green" : index === 2 ? "red" : "#47BED8"}/>
            </Canvas>
          </div>
              <Canvas>
                  {
                    index === 1 ? <Bike1/> : index === 2 ? <Bike2/> : <Bike3/>
                  }
                  <OrbitControls maxDistance={4} minDistance={3.5}/>
              </Canvas>
        </div> 
        </>

      );
}
 
export default Home_page;