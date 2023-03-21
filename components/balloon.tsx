import { Line, Point, PointMaterial, Points, Svg, useTexture } from "@react-three/drei";
import * as THREE from 'three';
import { DoubleSide, ExtrudeGeometry, Line3 } from "three";
import arrow from "../public/arrow.svg";
import { Vector2 } from "@react-three/fiber";
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';
import { useEffect, useState } from "react";
import { Text } from "@react-three/drei";
const loader = new SVGLoader();
const shps = [];

let test;
loader.load(
	// resource URL
	'/btf.svg',
	// called when the resource is loaded
	function ( data ) {

		const paths = data.paths;
        console.log(paths.length)
        const s = SVGLoader.createShapes(data.paths[1]);
        test = s;

/*         for ( let i = 0; i < paths.length; i ++ ) {

			const path = paths[ i ];
            //react equivalent
            const p = [];
            const mat = <meshBasicMaterial side={DoubleSide} depthWrite={false} color={path.color} />
			const material = new THREE.MeshBasicMaterial( {
				color: path.color,
				side: THREE.DoubleSide,
				depthWrite: false
			} );

			const shapes = SVGLoader.createShapes( path );

			for ( let j = 0; j < shapes.length; j ++ ) {

                const mmesh = 
                            <mesh>
                                <shapeGeometry args={[shapes[ j ]]}/>
                                {mat}
                            </mesh>
                p.push(shapes[ j ])                
			}
		} */
	},
    
	// called when loading is in progresses
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
);

const extrudeSettings = { depth: 8, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };


const Balloon = () => {
    const texture = useTexture("book.jpg");
    const [meshes, setMeshes] = useState([]);
    useEffect(()=>{
        shps.map(s=> console.log(s))
    },[])
    return ( 
        <>
        <mesh scale={0.001} position={[0,0,0]}>
            <extrudeBufferGeometry args={[test, extrudeSettings]}/>            
            <meshBasicMaterial color={"darkorange"} side={DoubleSide} />
        </mesh> 
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