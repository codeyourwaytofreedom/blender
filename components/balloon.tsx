import { useTexture } from "@react-three/drei";
import { Shape } from "three";
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';
const loader = new SVGLoader();
import {RepeatWrapping } from 'three';
import { Vector3 } from "three";

const blocks:Object[] = [];
const sscale:Vector3 = new Vector3(0.005, 0.005, 0.005);

loader.load(
	// resource URL
	'/btf3.svg',
	// called when the resource is loaded
	function ( data ) {

		const paths = data.paths;
        console.log(paths[0].color)
        for (let index = 0; index < paths.length; index++) {
            const element = paths[index];
            console.log(element.color);
            console.log(index)

            const s:Shape[] = SVGLoader.createShapes(element);
            console.log(s)
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

const Balloon = () => {
    //const texture = useTexture("but.jpg");
    let texture;
    let col;
/*     texture.wrapS = RepeatWrapping;
    texture.wrapT = RepeatWrapping;
    texture.repeat.set( 0.001, 0.001 ); */
    return ( 
        <>
        <group position={[0,1,0]} scale={4}>
            {
                blocks.slice(2,blocks.length-1).map ((b,i) =>
                <mesh scale={sscale} rotation={[0,0,Math.PI]} onClick={()=>console.log(5555)} >
                    <extrudeBufferGeometry args={[b.shp, extrudeSettings]}/>            
                    <meshBasicMaterial map={texture??null} color={b.color}/>
                </mesh> 
                )
            }
{/*         <mesh scale={sscale} rotation={[0,0,Math.PI]} >
            <extrudeBufferGeometry args={[blocks[0], extrudeSettings]}/>            
            <meshBasicMaterial map={texture??null} color={col??"crimson"}/>
        </mesh> 
        <mesh scale={sscale} rotation={[0,0,Math.PI]} >
            <extrudeBufferGeometry args={[blocks[1], extrudeSettings]}/>            
            <meshBasicMaterial map={texture??null} color={col??"crimson"}/>
        </mesh> 
        <mesh scale={sscale} rotation={[0,0,Math.PI]} >
            <extrudeBufferGeometry args={[blocks[2], extrudeSettings]}/>            
            <meshBasicMaterial map={texture??null} color={col??"crimson"}/>
        </mesh>  */}
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