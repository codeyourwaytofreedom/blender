import { useTexture } from "@react-three/drei";
import { Shape } from "three";
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';
const loader = new SVGLoader();
import {RepeatWrapping } from 'three';
import { Vector3 } from "three";
import { useEffect, useState } from "react";
import { Color } from "three";
import { Group,} from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

type MyObjectType = {
    color: Color;
    shp:Shape;
  }
const blocks:MyObjectType[] = [];

const sscale:Vector3 = new Vector3(0.005, 0.005, 0.005);


const left_wing = [14, 8, 9, 7, 10, 11, 30, 31, 33, 32, 16, 18, 34, 37, 21, 17, 36, 35, 19, 20];
const right_wing = [13, 5, 6, 12, 4, 3, 28, 29, 38, 40, 39, 43, 22, 24, 25, 23, 41, 42, 27, 26];
const body = [44]
const neck = [48]
const head = [15]
const eyes = [49,50]
const antennas = [1,2]


loader.load(
	// resource URL
	'/1.svg',
	// called when the resource is loaded
	function ( data ) {
		const paths = data.paths;
        //console.log(paths[0].color)
        for (let index = 0; index < paths.length; index++) {
            const element = paths[index];
            const s:Shape[] = SVGLoader.createShapes(element);
            const color = new Color(element.color.r/2, element.color.g/2, element.color.b/2);
            console.log(element.color)
            const ob = {
                color:color,
                shp:s[0]
            }
            blocks.push(ob)
        }
	}
);

const extrudeSettings = { depth: 50, bevelEnabled: true, bevelSegments: 9, steps: 2, bevelSize: 1, bevelThickness: 1 };
const remaining:Number[] = [];
const Butterfly1 = () => {
    let col;
    const [excluded, setExcluded] = useState<number[]>([]);
    const lw = useRef<Group>(null);

    const [wing_angle, setAngle] = useState(0);

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
                    remaining.push(i);
                    console.log(remaining)
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