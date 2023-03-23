import { Instances, useTexture } from "@react-three/drei";
import { ExtrudeGeometry, Group, Mesh, Shape } from "three";
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';
const loader = new SVGLoader();
import {RepeatWrapping } from 'three';
import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { InstancedMesh, MeshBasicMaterial, BoxGeometry,Matrix4,Vector3, Color } from "three";
import { NextPage } from "next";
import { useMemo } from "react";
import { BufferGeometryUtils } from 'three';

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


interface InstancedCubesProps {
    count: number;
  }  
const InstancedCubes:NextPage<InstancedCubesProps> = ({count}) => {

  const geometry = useMemo(() => new ExtrudeGeometry([blocks[6].shp,blocks[12].shp ],extrudeSettings), []);
  const material = useMemo(() => new MeshBasicMaterial({ }), []);
  const meshRef = useMemo(() => new InstancedMesh(geometry, material, count), [count]);

  const cubeSize = 10;
  const startPosition = new Vector3(0,0,0);
  const instanceSpacing = 100;

  const radius = 50; // the radius of the circle
  const interval = (1/2 * Math.PI) / count;     

for (let i = 0; i < count; i++) {
  // Calculate the x, y, and z position of the current cube
  const x =  1000
  const y = i % 2 === 0 ? i*0.1 : i*0.2
  const z =  i % 2 === 0 ? i*0.1 : i*0.2
  

  meshRef.setMatrixAt(i, new Matrix4().makeTranslation(x,y,z));
  const color = new Color(Math.random(), Math.random(), Math.random());
  meshRef.setColorAt(i, color);
}

  return <primitive object={meshRef} />;
}

const ARGE = () => {
  
      return ( 
        <>
        <group scale={0.005} rotation={[Math.PI,0,0]} position={[-1.3,1.3,0]}>
            <InstancedCubes count={20}/>
        </group>
        <mesh position={[0,0,0]}>
            <boxGeometry args={[0.1,0.1,0.1]} />
            <meshBasicMaterial color={"black"}/>
        </mesh>
        </>
     );
}
export default ARGE;