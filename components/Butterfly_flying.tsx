import { Instance, Instances, useTexture } from "@react-three/drei";
import { Group, Mesh, Shape } from "three";
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';
const loader = new SVGLoader();
import {RepeatWrapping } from 'three';
import { Vector3 } from "three";
import { useEffect, useRef, useState } from "react";
import { Color, useFrame } from "@react-three/fiber";
import { NextPage } from "next";

type path = {
    color: Color;
    shp:Shape;
  }
const blocks:path[] = [];

const sscale:Vector3 = new Vector3(0.005, 0.005, 0.005);

loader.load(
	'/btf4.svg',
	function ( data ) {
		const paths = data.paths;
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

interface color {
    color:string
}

const Butterfly_flying:NextPage<color> = ({color}) => {

    const [excluded, setExcluded] = useState<number[]>([]);
    const [angle, setAngle] = useState(-0.6);
    const [direction, setDirection] = useState(0.1);
  
    useEffect(() => {
      const interval = setTimeout(() => {

        if (angle > -0.4) {
          setDirection(-0.1);
        } else if (angle < -0.9) {
          setDirection(0.1);
        }
        console.log(angle + direction)
        setAngle((angle + direction));

      }, 50);
  
      return () => clearInterval(interval);
    }, [angle, direction]);

    return ( 
        <>
        <group scale={0.3} rotation={[0.5,0,0]} position={[1.5,0.7,0]}>
            <group scale={2} rotation={[0,angle,0]} position={[-1.1-angle/3,0,0+angle/7]}>
                <group rotation={[Math.PI,0,0]} position={[-0.8,1.3,0]}>
                    {
                            blocks.map ((b,i) => i === 12 && 
                            <mesh scale={sscale} key={i}>
                                <extrudeGeometry args={[b.shp, extrudeSettings]}/>            
                                <meshBasicMaterial color={color} />
                            </mesh> 
                            )
                        }
                </group>        
            </group>

            <group scale={2} rotation={[-Math.PI/25,0,0]} position={[-1,0,-angle]}>
                <group rotation={[Math.PI,0,0]} position={[-0.8,1.3,0]}>
                    {
                            blocks.map ((b,i) => i === 15 && 
                            <mesh scale={sscale} key={i}>
                                <extrudeGeometry args={[b.shp, extrudeSettings2]}/>            
                                <meshBasicMaterial color={"black"} />
                            </mesh> 
                            )
                        }
                </group>        
            </group>

            <group scale={2} rotation={[0,-angle,0]} position={[1.1+angle/3,0,0+angle/7]}>
                <group rotation={[Math.PI,0,0]} position={[-1.8,1.3,0]}>
                        {
                            blocks.map ((b,i) => i === 6 && 
                            <mesh scale={sscale} key={i}>
                                <extrudeGeometry args={[b.shp, extrudeSettings]}/>            
                                <meshBasicMaterial color={color} />
                            </mesh> 
                            )
                        }
                </group>        
            </group>
        </group>

        </>
     );
}
export default Butterfly_flying;

