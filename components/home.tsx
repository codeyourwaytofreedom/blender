import { Canvas } from "@react-three/fiber";
import Cube from "./Cube";
import Sphere from "./Sphere";
import Cylinder from "./Cylinder";
import { Suspense, useState } from "react";
import { Socket } from "socket.io-client";
import io from "socket.io-client";
import { useEffect } from "react";

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
          socket.off('disconnect');
        };
      }, []);
      const handle_click = () => {
        socket.emit("request_scaling_index")
      }
    return ( 
        <>
        <div style={{height:"100vh"}}>
            <button onClick={handle_click}>Random Scaling Index from Node Backend</button>
            <h1>{scaling_index.toString().substring(0,4)}</h1>
            <Suspense fallback={null}>
                <Canvas>
                    <Cube scaling_index={scaling_index??1}/>
                    <Sphere scaling_index={scaling_index??1} />
                    <Cylinder scaling_index={scaling_index??1} />
                </Canvas>
            </Suspense>
        </div> 
        </>

      );
}
 
export default Home_page;