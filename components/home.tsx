import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { NextPage } from "next";
import { GridHelper } from "three";
import h from "../styles/home.module.css";
import Balloon from "./balloon";
import Butterfly1 from "./butterfly1";
import Butterfly_flying from "./Butterfly_flying";
import MyComponent from "./Instances";

const Home_page = () => {
    return ( 
        <div className={h.home}>
            <Canvas /* camera={{ position: [0, 40, 0], fov: 45 }} */>
                {/* <Balloon /> */}
                {/* <Butterfly_flying /> */}
                <MyComponent />

                <OrbitControls                 
                    minPolarAngle={Math.PI/2}
                    maxPolarAngle={Math.PI/2}  
                />
            </Canvas>
        </div>
      );
}
 
export default Home_page;