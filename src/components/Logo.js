import React, { Component } from 'react'
import Detector from '../assets/js/Detector'
import FrakturB from '../assets/fonts/FrakturB.json'
import envMap from '../assets/images/env.jpg'
import envMap2 from '../assets/images/envmap.jpg'

const THREE = require("three");


class Logo extends Component {
  onWindowResize = () => {
    const WIDTH = window.innerWidth,
      HEIGHT = window.innerHeight;
    this.renderer.setSize(WIDTH, HEIGHT);
		this.camera.left = WIDTH / -8;
		this.camera.right = WIDTH / 8;
		this.camera.top = HEIGHT / 8;
		this.camera.bottom = HEIGHT / -8;
    this.camera.updateProjectionMatrix();
    // this.refreshText()
  }
  onMouseMove = (e) => {
    e.preventDefault();
    // console.log((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1, 0)
    // this.directionalLight.position.set(1, -(e.clientY / window.innerHeight) * 2 + 1, 0)  
    this.group.rotation.y = ((e.clientX / window.innerWidth) - .5)/4
    this.group.rotation.x = ((e.clientY / window.innerHeight) - .5)/4
    this.directionalLight.position.set((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1, 0)  
  }
  start = () => {
    if (!this.frameId) this.frameId = requestAnimationFrame(this.animate)
  }
  stop = () => {
    cancelAnimationFrame(this.frameId)
  }
  animate = () => {
    // if (this.ambient.intensity <= 0.2) this.ambient.intensity += .01;
    // if (this.point.intensity <= 1) this.point.intensity += 0.1;
    // if (this.directionalLight.intensity <= 5) this.directionalLight.intensity += 0.1;  

    this.renderer.render(this.scene, this.camera)
    this.frameId = window.requestAnimationFrame(this.animate)
  }
  componentDidMount() {
    if (!Detector.webgl) Detector.addGetWebGLMessage();
    
    this.scene = new THREE.Scene();
    this.camera = new THREE.OrthographicCamera(
      window.innerWidth / -8,
      window.innerWidth / 8,
      window.innerHeight / 8,
      window.innerHeight / -8,
      0.1, // Near clipping pane
      1000 // Far clipping pane
    );
    // Reposition the camera
    this.camera.position.set(0, 0, 500);
  
    // Add orbit control
    // let controls = new THREE.OrbitControls(this.camera);
    // controls.target.set(0, -0.2, -0.2);
    // controls.update();
  
    // Add an ambient lights
    this.ambient = new THREE.AmbientLight(0xffffff, 0);
    this.scene.add(this.ambient);
  
    this.directionalLight = new THREE.DirectionalLight( 0xffffff, 0 );
    this.directionalLight.castShadow = true;
    this.directionalLight.position.set( new THREE.Vector3(0, 20, 20) );

    this.scene.add( this.directionalLight );

    // Add a point light that will cast shadows
    this.point = new THREE.PointLight(0xffffff, 0);
    this.point.position.set(25, 50, 25);
    this.point.castShadow = true;
    this.point.shadow.mapSize.width = 1024;
    this.point.shadow.mapSize.height = 1024;
    this.scene.add(this.point);

    this.group = new THREE.Group();
    this.group.position.y = 0;
    this.scene.add( this.group );
  
    this.createText();
  
    // Create a renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    // Set size
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    // Set color
    this.renderer.setClearColor(0xffffff);
    this.renderer.gammaOutput = true;
    // Enable shadow mapping
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.mount.appendChild(this.renderer.domElement);
    // Add resize listener
    window.addEventListener("resize", this.onWindowResize, false);
    document.addEventListener('mousemove', this.onMouseMove, false);

    this.start()
  }
  createText = () => {
    let emap = new THREE.TextureLoader().load(envMap, () => {
      emap.mapping = THREE.SphericalReflectionMapping;    
      const material = (type) => ({
        "gold": [ 
          new THREE.MeshStandardMaterial({
            color: "#f2ce41",
            emissive: "#43390b",
            roughness: 0.25,
            metalness: 1,
            envMap: emap
          }), // front
          new THREE.MeshStandardMaterial({
            color: "#f2ce41",
            emissive: "#43390b",
            roughness: 0.25,
            metalness: 1,
            envMap: emap
          }) // side
        ],
        "silver": [],
        "royal": [
          new THREE.MeshStandardMaterial({
            color: "#35d3ff",
            emissive: "#212faf",
            roughness: 0.15,
            metalness: 1,
            envMap: emap
          }), // front
          new THREE.MeshStandardMaterial({
            color: "#35d3ff",
            emissive: "#212faf",
            roughness: 0.15,
            metalness: 1,
            envMap: emap
          }) // side
        ]
      })[type]
  
      let textGeo = new THREE.TextGeometry( this.props.text, {
        font: new THREE.Font(FrakturB),
        size: window.innerWidth * 0.0173611111,
        height: this.props.height,
        curveSegments: window.innerWidth * 0.00277777778,
        bevelThickness: window.innerWidth * 0.00555555556,
        bevelSize: window.innerWidth * 0.00104166667,
        bevelEnabled: true
      });
  
      textGeo.computeBoundingBox();
      textGeo.computeFaceNormals()
      textGeo.computeVertexNormals();
  
      var centerOffset = -0.5 * ( textGeo.boundingBox.max.x - textGeo.boundingBox.min.x );
      textGeo = new THREE.BufferGeometry().fromGeometry( textGeo );
      this.textMesh = new THREE.Mesh( textGeo, material(this.props.material));
      this.textMesh.position.x = centerOffset;
      this.textMesh.position.z = 0;
      this.textMesh.rotation.x = 0;
      this.textMesh.rotation.y = Math.PI * 2;
      
      this.group.add( this.textMesh );
    });
  }
  refreshText = () => {
    this.group.remove( this.textMesh );
    this.createText();
  }
  render () {
    return ( 
      <div style={this.props.style} ref={(mount) => { this.mount = mount }} />
    )
  }
}

export default Logo;
