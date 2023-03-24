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

const Home_page = () => {
    return ( 
        <>
        <div className={h.home}>
            <Suspense fallback={null}>
                <Canvas>
                    <Cube scaling_index={1}/>
                    <Sphere scaling_index={1} />
                    <Cylinder scaling_index={1} />
                </Canvas>
            </Suspense>
        </div> 
        </>

      );
}
 
export default Home_page;