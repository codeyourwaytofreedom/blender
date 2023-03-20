import { Svg } from "@react-three/drei";
import * as THREE from 'three';
import { DoubleSide } from "three";

const x = 0, y = 0;
const fishShape = new THREE.Shape()
					.moveTo( x, y )
					.quadraticCurveTo( x + 50, y - 80, x + 90, y - 10 )
					.quadraticCurveTo( x + 100, y - 10, x + 115, y - 40 )
					.quadraticCurveTo( x + 115, y, x + 115, y + 40 )
					.quadraticCurveTo( x + 100, y + 10, x + 90, y + 10 )
					.quadraticCurveTo( x + 50, y + 80, x, y );

const Balloon = () => {
    
    return ( 
        <mesh scale={0.01}>
             <shapeGeometry args={[fishShape]} />
             <meshBasicMaterial attach="material" color="blue" side={DoubleSide} />
        </mesh>
       
     );
}
 
export default Balloon;



{/* <Svg src={"/arrow.svg"} scale={0.01}/> */}