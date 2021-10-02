import * as THREE from 'three'
import { useRef, useState, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'

import { PcGLTF } from './Pc'

import useStore from '../../store'
import { displayStatus as dp, displayContentTypes as dct } from '../../store/constants'

const drawImage = async (ctx: CanvasRenderingContext2D, url: string) => {
  const img = new Image()
  img.crossOrigin = 'anonymous'

  await new Promise((r) => {
    img.onload = () => {
      r(true)
    }
    img.src = url
  })

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  ctx.drawImage(img, 0, 0, img.width, img.height)
}

const ScreenModel: React.FC = (props: JSX.IntrinsicElements['group']) => {
  const group = useRef<THREE.Group>()
  const { nodes, materials } = (useGLTF('/3d/pc.glb') as unknown) as PcGLTF

  const displayContent = useStore((state) => state.displayContent)

  // Materials
  const offMaterial = useRef<THREE.Material>(materials.bake_pc)
  const onMaterial = useRef<THREE.MeshBasicMaterial>(new THREE.MeshBasicMaterial())

  // UVs
  const offUV = useRef(nodes.mesh_4.geometry.getAttribute('uv'))
  const onUV = useRef(
    new THREE.BufferAttribute(new Int8Array([0, 0, 1, 0, 1, 1, 0, 1]), 2),
  )

  // Texture
  const displayCanvas = useStore((state) => state.displayCanvas)

  // Current
  const [currentMaterial, setCurrentMaterial] = useState<THREE.Material>(
    offMaterial.current,
  )

  useEffect(() => {
    if (displayCanvas && !onMaterial.current.map) {
      const canvasTexture = new THREE.CanvasTexture(displayCanvas)
      onMaterial.current.map = canvasTexture
      onMaterial.current.needsUpdate = true
    }
  }, [displayCanvas])

  useEffect(() => {
    if (!displayContent || !displayCanvas) return

    switch (displayContent.status) {
      case dp.OFF:
        if (currentMaterial !== offMaterial.current) {
          setCurrentMaterial(offMaterial.current)
          nodes.mesh_4.geometry.setAttribute('uv', offUV.current)
        }
        break
      case dp.ON:
        if (currentMaterial !== onMaterial.current) {
          setCurrentMaterial(onMaterial.current)
          nodes.mesh_4.geometry.setAttribute('uv', onUV.current)
        }
        break
    }

    const updateDisplay = async () => {
      if (displayCanvas) {
        const ctx = displayCanvas.getContext('2d')
        if (!ctx) return

        switch (displayContent.contentType) {
          case dct.BLANK:
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
            break
          case dct.IMAGE:
            if (displayContent.data) {
              await drawImage(ctx, displayContent.data)
            }
            break
        }

        onMaterial.current.map!.needsUpdate = true
      }
    }
    updateDisplay()
  }, [displayContent, displayCanvas, onMaterial.current.map])

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
