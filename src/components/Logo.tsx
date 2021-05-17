import * as THREE from 'three'
import React, { useEffect, useRef, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'

type GLTFResult = GLTF & {
  nodes: {
    amethyst: THREE.Mesh
    outline: THREE.Mesh
  }
  materials: {
    amethyst_material: THREE.MeshPhysicalMaterial
    outline_material: THREE.MeshBasicMaterial
  }
}

const Model: React.FC = (props: JSX.IntrinsicElements['group']) => {
  const { nodes, materials } = useGLTF('/3d/logo.glb') as GLTFResult
  const group = useRef<THREE.Group>()

  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    document.body.style.cursor = hovered ? 'grab' : 'auto'
  }, [hovered])

  useEffect(() => {
    materials.outline_material.color.set('#9966cc')
  }, [])

  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.01
    }
  })

  return (
    <group
      ref={group}
      dispose={null}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      {...props}
    >
      <mesh material={materials.amethyst_material} geometry={nodes.amethyst.geometry} />
      <mesh material={materials.outline_material} geometry={nodes.outline.geometry} />
    </group>
  )
}

useGLTF.preload('/3d/logo.glb')

export default Model
