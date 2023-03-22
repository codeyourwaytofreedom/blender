import { Instances, useTexture } from "@react-three/drei";
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

const test = [6,12]


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

const extrudeSettings = { depth: 2, bevelEnabled: true, bevelSegments: 9, steps: 2, bevelSize: 1, bevelThickness: 1 };

const remaining:Number[] = [];

const Balloon = () => {
    //const texture = useTexture("but.jpg");
    let texture;
    let col;
    const [excluded, setExcluded] = useState<number[]>([]);
    const lw = useRef<Group>(null);

    const [angle, setAngle] = useState(0);
    const [direction, setDirection] = useState(0.1);
  
    useEffect(() => {
      const interval = setTimeout(() => {

        if (angle > 0.8) {
          setDirection(-0.1);
        } else if (angle < 0.1) {
          setDirection(0.1);
        }
        setAngle((angle + direction));
      }, 50);
  
      return () => clearInterval(interval);
    }, [angle, direction]);

    return ( 
        <>
        <group scale={2} rotation={[0,angle,0]} position={[-1,0,0]}>
            <mesh position={[0,0,0]}>
                <boxGeometry args={[0.1,0.1,0.1]} />
                <meshBasicMaterial color={"black"}/>
            </mesh>
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
    {/*                 {
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
                    } */}
                </group>
            </group>        
        </group>
        <group scale={2} rotation={[0,-angle,0]} position={[1,0,0]}>
            <mesh position={[0,0,0]}>
                <boxGeometry args={[0.1,0.1,0.1]} />
                <meshBasicMaterial color={"black"}/>
            </mesh>
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
        </>
     );
}
export default Balloon;






/* onClick={(e)=>{
    e.stopPropagation();
    console.log(i); 
    setExcluded([...excluded, i]);
    remaining.push(i);
    console.log(remaining)
    }}  */


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