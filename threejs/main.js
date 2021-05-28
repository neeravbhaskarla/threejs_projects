import './style.css'

import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'dat.gui'
import gsap from 'gsap'


const loadingManager = new THREE.LoadingManager()
loadingManager.onStart = ()=>{
  console.log('Loading has been started')
}
loadingManager.onProgress =() =>{
  console.log('Loading in progress')
}
loadingManager.onLoad = ()=>{
  console.log('Loaded')
}
loadingManager.onError=()=>{
  console.log("Error has been encountered")
}
const textureLoader = new THREE.TextureLoader(loadingManager)
const cubeTextureLoader = new THREE.CubeTextureLoader()

const enviornmentalMap = cubeTextureLoader.load([
  '/textures/environmentMaps/0/px.jpg',
  '/textures/environmentMaps/0/nx.jpg',
  '/textures/environmentMaps/0/py.jpg',
  '/textures/environmentMaps/0/ny.jpg',
  '/textures/environmentMaps/0/pz.jpg',
  '/textures/environmentMaps/0/nz.jpg',
])

const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
// const colorTexture = textureLoader.load('/textures/minecraft.png')
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorAmbientTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')

const matcapTexture = textureLoader.load('/textures/matcaps/1.png')
const gradientTexture = textureLoader.load('/texture/gradients/3.jpg')
// colorTexture.repeat.x = 2
// colorTexture.repeat.y = 3
// colorTexture.wrapS = THREE.MirroredRepeatWrapping
// colorTexture.wrapT = THREE.MirroredRepeatWrapping

// colorTexture.offset.x = 0.5
// colorTexture.offset.y = 0.5
// colorTexture.rotation = Math.PI/4

// colorTexture.center.x = 0.5;
// colorTexture.center.y = 0.5
// colorTexture.generateMipmaps = false
// colorTexture.minFilter = THREE.NearestFilter
// colorTexture.magFilter = THREE.NearestFilter

const gui = new dat.GUI()
const scene = new THREE.Scene()

const parameters = {
  color: 0xffadf,
  spin: ()=>{
    gsap.to(mesh.rotation, {duration: 10, y:mesh.rotation.y +10})
  }

}
gui.addColor(parameters, 'color')
    .onChange(()=>{
      material.color.set(parameters.color)
    })
gui.add(parameters, 'spin')


// const geometry =  new THREE.BoxBufferGeometry(10, 10, 10, 100, 100)
// const material = new THREE.MeshBasicMaterial({map: colorTexture})

// const mesh = new THREE.Mesh(geometry,material)

// const material = new THREE.MeshBasicMaterial()
// material.map = doorColorTexture
// material.alphaMap = doorAlphaTexture
// material.transparent = true
// const material = new THREE.MeshMatcapMaterial()
// material.matcap = matcapTexture 

const material = new THREE.MeshStandardMaterial()
// material.map = doorColorTexture
material.metalness = 0.4
material.roughness = 0.5
// material.aoMap = doorAmbientTexture
// material.aoMapIntensity = 1
// material.displacementMap = doorHeightTexture
// material.displacementScale = 0.1
// material.normalMap = doorNormalTexture
// material.metalnessMap = doorMetalnessTexture
// material.roughnessMap = doorRoughnessTexture
// material.alphaMap = doorAlphaTexture
material.envMap = enviornmentalMap
gui
    .add(material, 'metalness')
    .min(0)
    .max(1)
    .step(0.01)
gui
    .add(material, 'roughness')
    .min(0)
    .max(1)
    .step(0.01)
gui
    .add(material, 'aoMapIntensity')
    .min(0)
    .max(1)
    .step(0.01)
gui
    .add(material, 'displacementScale')
    .min(0)
    .max(1)
    .step(0.01)
material.side = THREE.DoubleSide
const mesh = new THREE.Mesh(
  new THREE.SphereBufferGeometry(10, 50, 50),
  material
  )
  mesh.position.x = -30
mesh.geometry.setAttribute(
  'uv2',
  new THREE.BufferAttribute(mesh.geometry.attributes.uv.array, 2)
)
gui
.add(mesh.position, 'y')
.min(-3)
.max(3)
.step(0.01)
.name('elevation')
gui 
.add(material, 'wireframe')
gui
.add(mesh, 'visible')
scene.add(mesh)

const planeMesh = new THREE.Mesh(
  new THREE.PlaneBufferGeometry(10, 18 , 50, 50),
  material
)
planeMesh.geometry.setAttribute(
  'uv2',
  new THREE.BufferAttribute(planeMesh.geometry.attributes.uv.array, 2)
)
scene.add(planeMesh)

const torusMesh = new THREE.Mesh(
  new THREE.TorusBufferGeometry(5, 3, 28, 32),
  material
  )
  torusMesh.geometry.setAttribute(
    'uv2',
    new THREE.BufferAttribute(torusMesh.geometry.attributes.uv.array, 2)
  )
  torusMesh.position.x = 30
  scene.add(torusMesh)
const AmbientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(AmbientLight)

const pointlight = new THREE.PointLight(0xffffff, 0.5)
pointlight.position.x = 12
pointlight.position.y = 13
pointlight.position.z = 14
scene.add(pointlight)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)
camera.position.setZ(40)
scene.add(camera)


const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#webgl')
})
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping=true
const size = {
  width: window.innerWidth,
  height: window.innerHeight
}
renderer.setSize(size.width, size.height)
renderer.render(scene, camera)

// function movement(){
//   const t = document.body.getBoundingClientRect().top;
//   camera.position.x = t * -0.01
// }
// document.onscroll = movement
const clock = new THREE.Clock()
function animate(){
  const elapsedTime = clock.getElapsedTime()
  
  requestAnimationFrame(animate)
  planeMesh.rotation.x = 0.1 * elapsedTime
  planeMesh.rotation.y = 0.1 * elapsedTime
  planeMesh.rotation.z = 0.1 * elapsedTime

  mesh.rotation.x = 0.1 * elapsedTime
  mesh.rotation.y = 0.1 * elapsedTime
  mesh.rotation.z = 0.1 * elapsedTime

  torusMesh.rotation.x = 0.1 * elapsedTime
  torusMesh.rotation.y = 0.1 * elapsedTime
  torusMesh.rotation.z = 0.1 * elapsedTime
  controls.update()
  renderer.setSize(size.width, size.height)
  renderer.render(scene,camera)
}
animate()