import { useTexture } from "@react-three/drei";
import { Shape } from "three";
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';
const loader = new SVGLoader();
import {RepeatWrapping } from 'three';
import { Vector3 } from "three";
import { useState } from "react";

const blocks:Object[] = [];
const sscale:Vector3 = new Vector3(0.005, 0.005, 0.005);
/* const included = [1,3, 5, 29, 27, 51, 47, 83, 85, 55, 53, 49, 
    45, 79, 87, 81, 77, 57, 59, 7, 9, 25, 13, 11, 17, 15, 21, 
    23, 19, 61, 63, 67, 65, 33, 37, 69, 75, 43, 35, 73, 71, 39, 41] */


    const basic_but = [5, 7, 1, 3];
    
loader.load(
	// resource URL
	'/btf4.svg',
	// called when the resource is loaded
	function ( data ) {

		const paths = data.paths;
        //console.log(paths[0].color)
        for (let index = 0; index < paths.length; index++) {
            const element = paths[index];
            //console.log(element.color);
            //console.log(index)

            const s:Shape[] = SVGLoader.createShapes(element);
            //console.log(s)
            blocks.push(s[0])
            const ob = {
                color:element.color,
                shp:s[0]
            }
            blocks.push(ob)
            
        }
	}
);

const extrudeSettings = { depth: 2, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
const remaining = [];
const Balloon = () => {
    //const texture = useTexture("but.jpg");
    let texture;
    let col;
    const [excluded, setExcluded] = useState([33, 37, 35,39, 43, 41,9,11,13, 15, 17, 19, 21,
        31, 29, 27, 25, 23,73, 75, 71, 69,45, 47, 49, 51, 61, 63,53, 67, 65, 55, 59, 57]);
/*     texture.wrapS = RepeatWrapping;
    texture.wrapT = RepeatWrapping;
    texture.repeat.set( 0.001, 0.001 ); */
    return ( 
        <>
        <group position={[0,1,0]} scale={4}>
            {
                blocks.map ((b,i) => !excluded.includes(i) &&
                <mesh scale={sscale} key={i} rotation={[0,0,Math.PI]} 
                    onClick={(e)=>{
                    e.stopPropagation();
                    console.log(i); 
                    setExcluded([...excluded, i]);
                    remaining.push(i);
                    console.log(remaining)
                    }} 
                >
                    <extrudeGeometry args={[b.shp, extrudeSettings]}/>            
                    <meshBasicMaterial map={texture??null} color={b.color} />
                </mesh> 
                )
            }
        </group>

        </>
     );
}
export default Balloon;









{/*         <mesh scale={0.02} position={[1,0,0]}>
            <shapeGeometry args={[leave]} />
            <meshBasicMaterial attach="material" color="black" transparent={true} opacity={0.8} side={DoubleSide} />
        </mesh> */}


/*         <mesh scale={0.02} position={[1,0,0]}>
            <extrudeBufferGeometry args={[fishShape, extrudeSettings]}/>            
            <meshBasicMaterial attach="material" color="black" transparent={true} opacity={0.8} side={DoubleSide} />
        </mesh> */

{/* <Svg src={"/arrow.svg"} scale={0.01}/> */}


{/* <mesh scale={0.05}>
<points args={[geometrySpacedPoints]}>
    <pointsMaterial color={"green"} size={0.04}/>
</points>
</mesh> */}


{/* <mesh scale={0.05}>
<lineSegments args={[geometrySpacedPoints]}>
    <lineBasicMaterial color={"crimson"}/>
</lineSegments>
</mesh> */}


{/* <mesh scale={0.05}>
<Line points={points}>
    <lineBasicMaterial color={"crimson"} />
</Line>
</mesh> */}