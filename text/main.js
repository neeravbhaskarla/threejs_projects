import './style.css'

import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'


const canvas = document.querySelector('#webgl')

const scene = new THREE.Scene()


const fontLoader = new THREE.FontLoader()
const textureLoader = new THREE.TextureLoader()

const matCapTexture = textureLoader.load('/textures/matcaps/2.png')
// const axesHelper = new THREE.AxesHelper(10)
// scene.add(axesHelper)


fontLoader.load(
  '/fonts/helvetiker_regular.typeface.json',
  (font)=>{
    const textGeometry = new THREE.TextBufferGeometry('Neerav',{
      font: font,
      size: 5,
      height: 3,
      curveSegments: 50,
      bevelEnabled: true,
      bevelThickness: 0.3,
      bevelSize: 0.2,
      bevelOffset: 0,
      bevelSegments: 30
    })
    textGeometry.center()
    // textGeometry.computeBoundingBox()
    // textGeometry.translate(
    //   -textGeometry.boundingBox.max.x * 0.5,
    //   -textGeometry.boundingBox.max.y * 0.5,
    //   -textGeometry.boundingBox.max.z * 0.5
    // )
    // textGeometry.computeBoundingBox()
    console.log(textGeometry.boundingBox)
    const material = new THREE.MeshMatcapMaterial()
    material.matcap = matCapTexture
    // material.wireframe = true
    const mesh = new THREE.Mesh(textGeometry, material)
    scene.add(mesh)
    for(let i=0 ;i<200;i++){
      const donutGeometry = new THREE.TorusBufferGeometry(2,1, 20, 45)
      const donutMaterial = new THREE.MeshNormalMaterial()
      const donutMesh = new THREE.Mesh(donutGeometry, donutMaterial)
      let [x,y,z] = Array(3).fill().map(()=>(Math.random() -0.5) *80)
      donutMesh.position.set(x,y,z)
      let [r,s,t] = Array(3).fill().map(()=>Math.random() * Math.PI)
      donutMesh.rotation.set(r,s,t)
      scene.add(donutMesh)
    }
  }
  )
  
  
  // const geometry = new THREE.BoxBufferGeometry(10,10,10, 100)
  // const material = new THREE.MeshBasicMaterial({color: 'red'})
  
  // const boxMesh = new THREE.Mesh(geometry, material)
  
  
  
  // scene.add(boxMesh)
  
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
  }
  
  const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height, 0.1, 1000)
  camera.position.setZ(30)
  scene.add(camera)
  
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas
  })
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  
  renderer.setSize(sizes.width, sizes.height)
  renderer.render(scene, camera)
  
  function animate(){
    window.requestAnimationFrame(animate)
    controls.update()
    renderer.setSize(sizes.width, sizes.height)
    renderer.render(scene, camera)
  }
  
  animate()