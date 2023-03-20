import { Line, Point, PointMaterial, Points, Svg, useTexture } from "@react-three/drei";
import * as THREE from 'three';
import { DoubleSide, ExtrudeGeometry, Line3 } from "three";
import arrow from "../public/arrow.svg";

const x = 0, y = 0;
const extrudeSettings = { depth: 8, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
const fishShape = new THREE.Shape()
					.moveTo( x, y )
					.quadraticCurveTo( x + 50, y - 80, x + 90, y - 10 )
					.quadraticCurveTo( x + 100, y - 10, x + 115, y - 40 )
					.quadraticCurveTo( x + 115, y, x + 115, y + 40 )
					.quadraticCurveTo( x + 100, y + 10, x + 90, y + 10 )
					.quadraticCurveTo( x + 50, y + 80, x, y );



    const circleRadius = 40;
    const circleShape = new THREE.Shape()
    .moveTo( 0, circleRadius )
    .quadraticCurveTo( circleRadius, circleRadius, circleRadius, 0 )
    .quadraticCurveTo( circleRadius, - circleRadius, 0, - circleRadius )
    .quadraticCurveTo( - circleRadius, - circleRadius, - circleRadius, 0 )
    .quadraticCurveTo( - circleRadius, circleRadius, 0, circleRadius );
const point = new THREE.Vector3(0, 0, 0);

                const smileyShape = new THREE.Shape()
                .moveTo( 20, 40 )
                .quadraticCurveTo( 40, 60, 60, 40 )
                .bezierCurveTo( 70, 45, 70, 50, 60, 60 )
                .quadraticCurveTo( 40, 80, 20, 60 )
                .quadraticCurveTo( 5, 50, 20, 40 );

				const smileyMouthPath = new THREE.Path()
					.moveTo( 20, 40 )
					.quadraticCurveTo( 40, 60, 60, 40 )
					.bezierCurveTo( 70, 45, 70, 50, 60, 60 )
					.quadraticCurveTo( 40, 80, 20, 60 )
					.quadraticCurveTo( 5, 50, 20, 40 );

				smileyShape.holes.push( smileyMouthPath );

const arcShape = new THREE.Shape()
    .moveTo( 50, 10 )
    .absarc( 10, 10, 40, 0, Math.PI * 2, false );

const holePath = new THREE.Path()
    .moveTo( 20, 10 )
    .absarc( 10, 10, 10, 0, Math.PI * 2, true );

arcShape.holes.push( holePath );


const leave = new THREE.Shape()
    .moveTo(0, 0)
    .quadraticCurveTo(10, -20, 30, -20)
    .quadraticCurveTo(50, -20, 60, 0)
    .quadraticCurveTo(50, 20, 30, 20)
    .quadraticCurveTo(10, 20, 0, 0)

const points = leave.getPoints();
const geometryPoints = new THREE.BufferGeometry().setFromPoints( points );

const spacedPoints = leave.getSpacedPoints( 500 );
const geometrySpacedPoints = new THREE.BufferGeometry().setFromPoints( spacedPoints );


const Balloon = () => {
    const texture = useTexture("book.jpg")
    return ( 
        <>
        <mesh scale={0.02} position={[1,0,0]}>
            <shapeGeometry args={[leave]} />
            <meshBasicMaterial  map={texture} side={DoubleSide} />
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