import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { NextPage } from "next";
import h from "../styles/home.module.css";
import Balloon from "./balloon";

const Home_page = () => {
    return ( 
        <div className={h.home}>
            <Canvas>
                <Balloon />
                <OrbitControls />
            </Canvas>
        </div>
      );
}
 
export default Home_page;