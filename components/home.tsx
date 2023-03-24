import { Canvas } from "@react-three/fiber";
import Cube from "./Cube";
import Sphere from "./Sphere";
import Cylinder from "./Cylinder";
import { Suspense } from "react";
import { io, Socket } from "socket.io-client";


const socket: Socket = io("http://localhost:80");

const Home_page = () => {
    const scaling_index = 1;
    socket.connect();
    return ( 
        <>
        <div style={{height:"100vh"}}>
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