import { Shape } from "three";
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';
import { Vector3 } from "three";
import { useState } from "react";
import { Color } from "three";

const loader = new SVGLoader();
type path = {
    color: Color;
    shp:Shape;
  }
const blocks:path[] = [];
const sscale:Vector3 = new Vector3(0.005, 0.005, 0.005);
loader.load(
	'/n1.svg',
	function ( data ) {
		const paths = data.paths;
        for (let index = 0; index < paths.length; index++) {
            const element = paths[index];
            const s:Shape[] = SVGLoader.createShapes(element);
            const ob = {
                color:new Color(element.color.r/2, element.color.g/2, element.color.b/2),
                shp:s[0]
            }
            blocks.push(ob)
        }
	}
);

const extrudeSettings = { depth: 70, bevelEnabled: true, bevelSegments: 9, steps: 2, bevelSize: 1, bevelThickness: 1 };

const Butterfly1 = () => {
    const [excluded, setExcluded] = useState<number[]>([]);
    return ( 
        <>
        <group>
        <mesh>
            <boxGeometry args={[0.1,0.1,0.1]}/>
            <meshBasicMaterial color={"navy"} />
        </mesh>
        <group position={[1,1,0]} scale={1} onPointerEnter={()=> console.log(555)}>
            {
                blocks.map ((b,i) => !excluded.includes(i) && 
                <mesh position={[0,0,0]} scale={sscale} key={i} rotation={[0,0,Math.PI]} onClick={(e)=>{
                    e.stopPropagation();
                    console.log(i); 
                    setExcluded([...excluded, i]);
                    }}>
                    <extrudeGeometry args={[b.shp, extrudeSettings]}/>            
                    <meshBasicMaterial color={b.color} />
                </mesh> 
                )
            }
        </group>
        </group>
        </>
     );
}
export default Butterfly1;