import { NextPage } from "next";
import { type } from "os";
import { useMemo } from "react";
import { InstancedMesh, MeshBasicMaterial, BoxGeometry,Matrix4,Vector3, Color } from "three";


interface InstancedCubesProps {
    count: number;
  }
  
const InstancedCubes:NextPage<InstancedCubesProps> = ({count}) => {
  const geometry = useMemo(() => new BoxGeometry(0.5,0.5,0.5), []);
  const material = useMemo(() => new MeshBasicMaterial({ }), []);
  const meshRef = useMemo(() => new InstancedMesh(geometry, material, count), [count]);

  const cubeSize = 10;
  const startPosition = new Vector3(-5,-5,0);
  const instanceSpacing = 0.01;

// Loop through each cube in the instance grid and set its position
for (let i = 0; i < count; i++) {
  // Calculate the x, y, and z position of the current cube
  const x = startPosition.x + (i % cubeSize) * (1 + instanceSpacing);
  const y = startPosition.y + Math.floor((i / cubeSize) % cubeSize) * (1 + instanceSpacing);
  const z = startPosition.z + Math.floor(i / (cubeSize * cubeSize)) * (1 + instanceSpacing);

  meshRef.setMatrixAt(i, new Matrix4().makeTranslation(x,y,z));
  const color = new Color(Math.random(), Math.random(), Math.random());
  meshRef.setColorAt(i, color);
}

  return <primitive object={meshRef} />;
}

 export default function MyComponent() {
  return <InstancedCubes count={1000} />;
}
