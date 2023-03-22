import { NextPage } from "next";
import { type } from "os";
import { useMemo } from "react";
import { InstancedMesh, MeshBasicMaterial, BoxGeometry,Matrix4 } from "three";


interface InstancedCubesProps {
    count: number;
  }
  
const InstancedCubes:NextPage<InstancedCubesProps> = ({count}) => {
  const geometry = useMemo(() => new BoxGeometry(1,1,1), []);
  const material = useMemo(() => new MeshBasicMaterial({ color: "red" }), []);
  const meshRef = useMemo(() => new InstancedMesh(geometry, material, count), [count]);

  // Update instance positions
  for (let i = 0; i < count; i++) {
    meshRef.setMatrixAt(i, new Matrix4().makeTranslation(Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * 10 - 5));
  }

  return <primitive object={meshRef} />;
}

 export default function MyComponent() {
  return <InstancedCubes count={100} />;
}
