import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { NextPage } from "next";
import { GridHelper } from "three";
import h from "../styles/home.module.css";
import Balloon from "./balloon";
import Butterfly1 from "./butterfly1";

const Home_page = () => {
    return ( 
        <div className={h.home}>
            <Canvas>
                {/* <Butterfly1 /> */}
                <Balloon />
                <OrbitControls />
            </Canvas>
        </div>
      );
}
 
export default Home_page;