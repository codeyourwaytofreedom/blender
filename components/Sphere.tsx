
import { NextPage } from "next";
import { useTexture } from "@react-three/drei";

type scaling = {
    scaling_index: number;
  }

const Sphere:NextPage<scaling> = ({scaling_index}) => {
    const texture = useTexture("stone.jpg");
    return ( 
        <>
        <mesh position={[0,0,-scaling_index/2]}>
            <sphereGeometry args={[scaling_index,90,90]}/>
            <meshBasicMaterial map={texture} />
        </mesh>
        </>
     );
}
export default Sphere;