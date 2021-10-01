import * as THREE from 'three'
import { useRef, useState, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'

import { PcGLTF } from './Pc'

import useStore from '../../store'
import { displayContents as dp } from '../../store/constants'

const ScreenModel: React.FC = (props: JSX.IntrinsicElements['group']) => {
  const group = useRef<THREE.Group>()
  const { nodes, materials } = useGLTF('/3d/pc.glb') as unknown as PcGLTF

  const offMaterial = useRef<THREE.Material>(materials.bake_pc)
  const offUV = useRef(nodes.mesh_4.geometry.getAttribute('uv'))
  const onUV = useRef(
    new THREE.BufferAttribute(new Uint16Array([0, 1, 1, 1, 0, 0, 1, 0]), 2, false),
  )
  const onMaterial = useRef(new THREE.MeshBasicMaterial())

  const [currentMaterial, setCurrentMaterial] = useState<THREE.Material>(
    onMaterial.current,
  )

  useEffect(() => {
    useStore.subscribe(
      (displayContents: number) => {
        switch (displayContents) {
          case dp.OFF:
            setCurrentMaterial(offMaterial.current)
            nodes.mesh_4.geometry.setAttribute('uv', offUV.current)
            break
          case dp.BLANK:
            setCurrentMaterial(onMaterial.current)
            nodes.mesh_4.geometry.setAttribute('uv', onUV.current)
            break
        }
      },
      (state) => state.displayContent,
    ),
      []
  })

  return (
    <group
      position={[-0.456037909, 0.699552476, -1.59474409]}
      rotation={[Math.PI / 2, 0, 0]}
      ref={group}
      {...props}
    >
      <mesh
        geometry={nodes.mesh_4.geometry}
        material={currentMaterial}
        position={[-0.318482935, -0.0488045439, -0.401600093]}
        scale={0.0000476903442}
      />
    </group>
  )
}

useGLTF.preload('/3d/pc.glb')

export default ScreenModel
