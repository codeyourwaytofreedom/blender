import { useTexture } from "@react-three/drei";
import { Group, Mesh, Shape } from "three";
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';
const loader = new SVGLoader();
import {RepeatWrapping } from 'three';
import { Vector3 } from "three";
import { useEffect, useRef, useState } from "react";
import { Color, useFrame } from "@react-three/fiber";

type MyObjectType = {
    color: Color;
    shp:Shape;
  }
const blocks:MyObjectType[] = [];

const sscale:Vector3 = new Vector3(0.005, 0.005, 0.005);

const left_wing = [6];
const right_wing = [12];
const core = [15];



loader.load(
	// resource URL
	'/btf4.svg',
	// called when the resource is loaded
	function ( data ) {
		const paths = data.paths;
        //console.log(paths[0].color)
        for (let index = 0; index < paths.length; index++) {
            const element = paths[index];
            const s:Shape[] = SVGLoader.createShapes(element);
            const ob = {
                color:element.color,
                shp:s[0]
            }
            blocks.push(ob)
        }
	}
);

const extrudeSettings = { depth: 4, bevelEnabled: true, bevelSegments: 9, steps: 2, bevelSize: 1, bevelThickness: 1 };
const extrudeSettings2 = { depth: 25, bevelEnabled: true, bevelSegments: 9, steps: 2, bevelSize: 1, bevelThickness: 1 };
const remaining:Number[] = [];

const Butterfly_flying = () => {

    const [excluded, setExcluded] = useState<number[]>([]);
    const [angle, setAngle] = useState(-0.6);
    const [direction, setDirection] = useState(0.1);
    const [start, setStart] = useState(false)
  
    useEffect(() => {
      const interval = setTimeout(() => {

        if (angle > -0.4 && start) {
          setDirection(-0.1);
        } else if (angle < -0.9 && start) {
          setDirection(0.1);
        }
        console.log(angle + direction)
        if(start){
            setAngle((angle + direction));
        }
        

      }, 50);
  
      return () => clearInterval(interval);
    }, [start, angle, direction]);

    return ( 
        <>
        <group scale={0.3} onPointerEnter={()=>setStart(true)} onPointerLeave={()=>setStart(false)}>


        <group scale={2} rotation={[0,angle,0]} position={[-1.1-angle/3,0,0+angle/7]}>
            <group rotation={[Math.PI,0,0]} position={[-0.8,1.3,0]}>
                <group>
                {
                        blocks.map ((b,i) => i === 12 && 
                        <mesh scale={sscale} key={i}  onClick={(e)=>{
                            e.stopPropagation();
                            console.log(i); 
                            setExcluded([...excluded, i]);
                            remaining.push(i);
                            console.log(remaining)
                            }}>
                            <extrudeGeometry args={[b.shp, extrudeSettings]}/>            
                            <meshBasicMaterial color={"crimson"} />
                        </mesh> 
                        )
                    }
                </group>
            </group>        
        </group>

        <group scale={2} rotation={[-Math.PI/25,0,0]} position={[-1,0,-angle]}>
            <group rotation={[Math.PI,0,0]} position={[-0.8,1.3,0]}>
                <group>
                {
                        blocks.map ((b,i) => i === 15 && 
                        <mesh scale={sscale} key={i}  onClick={(e)=>{
                            e.stopPropagation();
                            console.log(i); 
                            setExcluded([...excluded, i]);
                            remaining.push(i);
                            console.log(remaining)
                            }}>
                            <extrudeGeometry args={[b.shp, extrudeSettings2]}/>            
                            <meshBasicMaterial color={"gold"} />
                        </mesh> 
                        )
                    }
                </group>
            </group>        
        </group>

        <group scale={2} rotation={[0,-angle,0]} position={[1.1+angle/3,0,0+angle/7]}>
            <group rotation={[Math.PI,0,0]} position={[-1.8,1.3,0]}>
                <group>
                    {
                        blocks.map ((b,i) => i === 6 && 
                        <mesh scale={sscale} key={i}  onClick={(e)=>{
                            e.stopPropagation();
                            console.log(i); 
                            setExcluded([...excluded, i]);
                            remaining.push(i);
                            console.log(remaining)
                            }}>
                            <extrudeGeometry args={[b.shp, extrudeSettings]}/>            
                            <meshBasicMaterial color={"navy"} />
                        </mesh> 
                        )
                    }
                </group>
            </group>        
        </group>

        </group>
        </>
     );
}
export default Butterfly_flying;

