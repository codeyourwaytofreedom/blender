import { Group, Shape } from "three";
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';
import { Vector3 } from "three";
import { Color } from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Euler } from 'three';
import { useEffect, useState } from "react";

type MyObjectType = {
    color: Color;
    shp:Shape;
  }
const blocks:MyObjectType[] = [];

const sscale:Vector3 = new Vector3(0.013, 0.009, 0.009);

const loader = new SVGLoader();

loader.load(
	// resource URL
	'/sign.svg',
	// called when the resource is loaded
	function ( data ) {
		const paths = data.paths;
        //console.log(paths[0].color)
        for (let index = 0; index < paths.length; index++) {
            const element = paths[index];
            const s:Shape[] = SVGLoader.createShapes(element);
            const color = new Color(element.color.r/2, element.color.g/2, element.color.b/2);
            const ob = {
                color:color,
                shp:s[0]
            }
            blocks.push(ob)
        }
	}
);

const extrudeSettings = { depth: 20, bevelEnabled: true, bevelSegments: 9, steps: 2, bevelSize: 1, bevelThickness: 1 };

const Arrows = () => {
    const arrow = useRef<Group>(null);
/*     useFrame(({ clock }) => {
        const rotation = new Euler(clock.elapsedTime*3, 0, 0);
        if(arrow.current){
            arrow.current.setRotationFromEuler(rotation);
        }
    }); */
    const [excluded, setExcluded] = useState<number[]>([]);
    const remaining:Number[] = [];
    return ( 
        <>
        <group ref={arrow} position={[0,0,0]}>
            <mesh>
                <boxGeometry args={[0.1,0.1,0.1]}/>
                <meshBasicMaterial color={"navy"} />
            </mesh>
            <group position={[-4.1,0.3,0.1]} scale={1} rotation={[0,Math.PI,0]}>
                {
                    blocks.map ((b,i) =>!excluded.includes(i) && 
                    <mesh position={[0,0,0]} scale={sscale} key={i} rotation={[0,0,Math.PI]}  onClick={(e)=>{
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
export default Arrows;