import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import fragment from "../shaders/fragment.glsl";
import vertex from "../shaders/vertex.glsl";
import * as dat from "dat.gui";
import texturepic from "../img/texture.jpg";
import gsap from "gsap";
import ASScroll from "@ashthornton/asscroll";
import barba from "@barba/core";

export default class Sketch {
  constructor(params) {
    this.materials = [];
    this.container = params.domElement;
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;

    this.camera = new THREE.PerspectiveCamera(
      30,
      this.width / this.height,
      10,
      1000
    );
    this.camera.position.z = 600;

    let h = this.height / 2;
    this.camera.fov = (2 * Math.atan(h / 600) * 180) / Math.PI;

    this.scene = new THREE.Scene();

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.container.appendChild(this.renderer.domElement);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.asscroll = new ASScroll({
      disableRaf: true,
    });
    this.asscroll.enable({
      horizontalScroll: document.body.classList.contains("a-inside"),
    });

    this.time = 0;
    // sittings is used for dat.gui
    // this.setupSettings(); // getting rid of progress button
    this.barba();
    this.addObjects();
    // console.log(this.addObjects());
    this.resize();
    this.render();
    this.setupResize();
  }

  barba() {
    this.animationRunning = false;
    let that = this;
    barba.init({
      transitions: [
        {
          name: "from-home-transition",
          from: {
            namespace: ["home"],
          },
          leave(data) {
            // alert("from home");
            that.asscroll.disable();
            return gsap.timeline().to(data.current.container, {
              opacity: 0,
            });
          },
          enter(data) {
            that.asscroll = new ASScroll({
              disableRaf: true,
              containerElement: data.next.container.querySelector(
                "[asscroll-container]"
              ),
            });
            that.asscroll.enable({
              newScrollElements:
                data.next.container.querySelector(".scroll-wrap"),
            });
            return gsap.timeline().from(data.next.container, {
              opacity: 0,
              onComplete: () => {
                that.container.style.display = "none";
              },
            });
          },
        },
        {
          name: "from-inside-transition",
          from: {
            namespace: ["inside"],
          },
          leave(data) {
            // alert("from inside");
            that.asscroll.disable();
            return gsap
              .timeline()
              .to(".curtain", {
                duration: 0.3,
                y: 0,
              })
              .to(data.current.container, {
                opacity: 0,
              });
          },
          enter(data) {
            that.asscroll = new ASScroll({
              disableRaf: true,
              containerElement: data.next.container.querySelector(
                "[asscroll-container]"
              ),
            });
            that.asscroll.enable({
              horizontalScroll: true,
              newScrollElements:
                data.next.container.querySelector(".scroll-wrap"),
            });

            that.imageStore = [];
            that.materials = [];
            that.addObjects();
            that.resize();

            return gsap
              .timeline()
              .to(".curtain", {
                duration: 0.3,
                y: "-100%",
              })
              .from(data.next.container, {
                opacity: 0,
              });
          },
        },
      ],
    });
  }

  setupSettings() {
    this.settings = {
      progress: 0,
    };
    this.gui = new dat.GUI();
    this.gui.add(this.settings, "progress", 0, 1, 0.001);
  }

  resize() {
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.renderer.setSize(this.width, this.height);
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();

    // resize issue solve
    let h = this.height / 2;
    this.camera.fov = (2 * Math.atan(h / 600) * 180) / Math.PI;
    this.materials.forEach((m) => {
      m.uniforms.uResolution.value.x = this.width;
      m.uniforms.uResolution.value.y = this.height;
    });

    this.imageStore.forEach((i) => {
      let bounds = i.img.getBoundingClientRect();
      i.mesh.scale.set(bounds.width, bounds.height, 1);
      i.top = bounds.top;
      i.left = bounds.left + this.asscroll.currentPos;
      i.width = bounds.width;
      i.height = bounds.height;

      i.mesh.material.uniforms.uQuadSize.value.x = bounds.width;
      i.mesh.material.uniforms.uQuadSize.value.y = bounds.height;

      i.mesh.material.uniforms.uTexture.value.x = bounds.width;
      i.mesh.material.uniforms.uTexture.value.y = bounds.height;
    });
  }

  setupResize() {
    window.addEventListener("resize", this.resize.bind(this));
  }

  addObjects() {
    console.log("here");
    this.geometry = new THREE.PlaneBufferGeometry(1, 1, 100, 100);

    this.material = new THREE.ShaderMaterial({
      // wireframe: true,
      uniforms: {
        time: { value: 1.0 },
        uProgress: { value: 1.0 },
        uTexture: { value: new THREE.TextureLoader().load(texturepic) },
        uResolution: { value: new THREE.Vector2(this.width, this.height) },
        uQuadSize: { value: new THREE.Vector2(300, 300) },
        uTexturesize: { value: new THREE.Vector2(100, 100) },
        uCorners: { value: new THREE.Vector4(0, 0, 0, 0) },
      },
      vertexShader: vertex,
      fragmentShader: fragment,
    });

    // this.tl = gsap
    //   .timeline()
    //   .to(this.material.uniforms.uCorners.value, { x: 1, duration: 1 })
    //   .to(this.material.uniforms.uCorners.value, { y: 1, duration: 1 }, 0.1)
    //   .to(this.material.uniforms.uCorners.value, { z: 1, duration: 1 }, 0.25)
    //   .to(this.material.uniforms.uCorners.value, { w: 1, duration: 1 }, 0.4);

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.scale.set(300, 300, 1);
    // this.scene.add(this.mesh);
    this.mesh.position.x = 300;

    this.images = [...document.querySelectorAll(".js-image")];

    const loader = new THREE.TextureLoader();

    this.imageStore = this.images.map((img) => {
      /// gets the all the details of img
      let bounds = img.getBoundingClientRect();
      let m = this.material.clone();

      this.materials.push(m);

      let texture = loader.load(img.src);
      m.uniforms.uTexture.value = texture;
      m.uniforms.uProgress.value = 0.2;
      let mesh = new THREE.Mesh(this.geometry, m);
      this.scene.add(mesh);
      mesh.scale.set(bounds.width, bounds.height, 1);

      // zoom in effect
      img.addEventListener("mouseover", () => {
        this.tl = gsap
          .timeline()
          .to(m.uniforms.uCorners.value, { x: 1, duration: 0.4 })
          .to(m.uniforms.uCorners.value, { y: 1, duration: 0.4 }, 0.1)
          .to(m.uniforms.uCorners.value, { z: 1, duration: 0.4 }, 0.25)
          .to(m.uniforms.uCorners.value, { w: 1, duration: 0.4 }, 0.4);
      });

      // zoom out effect
      img.addEventListener("mouseout", () => {
        this.tl = gsap
          .timeline()
          .to(m.uniforms.uCorners.value, { x: 0, duration: 0.4 })
          .to(m.uniforms.uCorners.value, { y: 0, duration: 0.4 }, 0.1)
          .to(m.uniforms.uCorners.value, { z: 0, duration: 0.4 }, 0.25)
          .to(m.uniforms.uCorners.value, { w: 0, duration: 0.4 }, 0.4);
      });

      return {
        img: img,
        mesh: mesh,
        width: bounds.width,
        height: bounds.height,
        top: bounds.top,
        left: bounds.left,
      };
    });
  }

  setPosition() {
    this.imageStore.forEach((o) => {
      o.mesh.position.x =
        -this.asscroll.currentPos + o.left - this.width / 2 + o.width / 2;
      o.mesh.position.y = -o.top + this.height / 2 - o.height / 2;
    });
  }

  render() {
    this.time += 0.05;
    this.setPosition();

    this.asscroll.update();

    this.material.uniforms.time.value = this.time;
    // this.material.uniforms.uProgress.value = this.settings.progress;
    // this.tl.progress(this.settings.progress);
    this.mesh.rotateX = this.time / 2000;
    this.mesh.rotateY = this.time / 2000;
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.render.bind(this));
  }
}

new Sketch({ domElement: document.getElementById("container") });