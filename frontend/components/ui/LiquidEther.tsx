"use client";

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export interface LiquidEtherProps {
    mouseForce?: number;
    cursorSize?: number;
    isViscous?: boolean;
    viscous?: number;
    iterationsViscous?: number;
    iterationsPoisson?: number;
    dt?: number;
    BFECC?: boolean;
    resolution?: number;
    isBounce?: boolean;
    colors?: string[];
    style?: React.CSSProperties;
    className?: string;
    autoDemo?: boolean;
    autoSpeed?: number;
    autoIntensity?: number;
    takeoverDuration?: number;
    autoResumeDelay?: number;
    autoRampDuration?: number;
}

interface SimOptions {
    iterations_poisson: number;
    iterations_viscous: number;
    mouse_force: number;
    resolution: number;
    cursor_size: number;
    viscous: number;
    isBounce: boolean;
    dt: number;
    isViscous: boolean;
    BFECC: boolean;
}

interface LiquidEtherWebGL {
    output?: { simulation?: { options: SimOptions; resize: () => void } };
    autoDriver?: {
        enabled: boolean;
        speed: number;
        resumeDelay: number;
        rampDurationMs: number;
        mouse?: { autoIntensity: number; takeoverDuration: number };
        forceStop: () => void;
    };
    resize: () => void;
    start: () => void;
    pause: () => void;
    dispose: () => void;
}

const defaultColors = ['#5227FF', '#FF9FFC', '#B19EEF'];

// --- Shaders ---
const face_vert = `
  attribute vec3 position;
  uniform vec2 px;
  uniform vec2 boundarySpace;
  varying vec2 uv;
  precision highp float;
  void main(){
    vec3 pos = position;
    vec2 scale = 1.0 - boundarySpace * 2.0;
    pos.xy = pos.xy * scale;
    uv = vec2(0.5)+(pos.xy)*0.5;
    gl_Position = vec4(pos, 1.0);
  }
`;

const line_vert = `
  attribute vec3 position;
  uniform vec2 px;
  precision highp float;
  varying vec2 uv;
  void main(){
    vec3 pos = position;
    uv = 0.5 + pos.xy * 0.5;
    vec2 n = sign(pos.xy);
    pos.xy = abs(pos.xy) - px * 1.0;
    pos.xy *= n;
    gl_Position = vec4(pos, 1.0);
  }
`;

const mouse_vert = `
  precision highp float;
  attribute vec3 position;
  attribute vec2 uv;
  uniform vec2 center;
  uniform vec2 scale;
  uniform vec2 px;
  varying vec2 vUv;
  void main(){
    vec2 pos = position.xy * scale * 2.0 * px + center;
    vUv = uv;
    gl_Position = vec4(pos, 0.0, 1.0);
  }
`;

const advection_frag = `
  precision highp float;
  uniform sampler2D velocity;
  uniform float dt;
  uniform bool isBFECC;
  uniform vec2 fboSize;
  uniform vec2 px;
  varying vec2 uv;
  void main(){
    vec2 ratio = max(fboSize.x, fboSize.y) / fboSize;
    if(isBFECC == false){
      vec2 vel = texture2D(velocity, uv).xy;
      vec2 uv2 = uv - vel * dt * ratio;
      vec2 newVel = texture2D(velocity, uv2).xy;
      gl_FragColor = vec4(newVel, 0.0, 0.0);
    } else {
      vec2 spot_new = uv;
      vec2 vel_old = texture2D(velocity, uv).xy;
      vec2 spot_old = spot_new - vel_old * dt * ratio;
      vec2 vel_new1 = texture2D(velocity, spot_old).xy;
      vec2 spot_new2 = spot_old + vel_new1 * dt * ratio;
      vec2 error = spot_new2 - spot_new;
      vec2 spot_new3 = spot_new - error / 2.0;
      vec2 vel_2 = texture2D(velocity, spot_new3).xy;
      vec2 spot_old2 = spot_new3 - vel_2 * dt * ratio;
      vec2 newVel2 = texture2D(velocity, spot_old2).xy; 
      gl_FragColor = vec4(newVel2, 0.0, 0.0);
    }
  }
`;

const color_frag = `
  precision highp float;
  uniform sampler2D velocity;
  uniform sampler2D palette;
  uniform vec4 bgColor;
  varying vec2 uv;
  void main(){
    vec2 vel = texture2D(velocity, uv).xy;
    float lenv = clamp(length(vel), 0.0, 1.0);
    vec3 c = texture2D(palette, vec2(lenv, 0.5)).rgb;
    vec3 outRGB = mix(bgColor.rgb, c, lenv);
    float outA = mix(bgColor.a, 1.0, lenv);
    gl_FragColor = vec4(outRGB, outA);
  }
`;

const divergence_frag = `
  precision highp float;
  uniform sampler2D velocity;
  uniform float dt;
  uniform vec2 px;
  varying vec2 uv;
  void main(){
    float x0 = texture2D(velocity, uv-vec2(px.x, 0.0)).x;
    float x1 = texture2D(velocity, uv+vec2(px.x, 0.0)).x;
    float y0 = texture2D(velocity, uv-vec2(0.0, px.y)).y;
    float y1 = texture2D(velocity, uv+vec2(0.0, px.y)).y;
    float divergence = (x1 - x0 + y1 - y0) / 2.0;
    gl_FragColor = vec4(divergence / dt);
  }
`;

const externalForce_frag = `
  precision highp float;
  uniform vec2 force;
  uniform vec2 center;
  uniform vec2 scale;
  uniform vec2 px;
  varying vec2 vUv;
  void main(){
    vec2 circle = (vUv - 0.5) * 2.0;
    float d = 1.0 - min(length(circle), 1.0);
    d *= d;
    gl_FragColor = vec4(force * d, 0.0, 1.0);
  }
`;

const poisson_frag = `
  precision highp float;
  uniform sampler2D pressure;
  uniform sampler2D divergence;
  uniform vec2 px;
  varying vec2 uv;
  void main(){
    float p0 = texture2D(pressure, uv + vec2(px.x * 2.0, 0.0)).r;
    float p1 = texture2D(pressure, uv - vec2(px.x * 2.0, 0.0)).r;
    float p2 = texture2D(pressure, uv + vec2(0.0, px.y * 2.0)).r;
    float p3 = texture2D(pressure, uv - vec2(0.0, px.y * 2.0)).r;
    float div = texture2D(divergence, uv).r;
    float newP = (p0 + p1 + p2 + p3) / 4.0 - div;
    gl_FragColor = vec4(newP);
  }
`;

const pressure_frag = `
  precision highp float;
  uniform sampler2D pressure;
  uniform sampler2D velocity;
  uniform vec2 px;
  uniform float dt;
  varying vec2 uv;
  void main(){
    float step = 1.0;
    float p0 = texture2D(pressure, uv + vec2(px.x * step, 0.0)).r;
    float p1 = texture2D(pressure, uv - vec2(px.x * step, 0.0)).r;
    float p2 = texture2D(pressure, uv + vec2(0.0, px.y * step)).r;
    float p3 = texture2D(pressure, uv - vec2(0.0, px.y * step)).r;
    vec2 v = texture2D(velocity, uv).xy;
    vec2 gradP = vec2(p0 - p1, p2 - p3) * 0.5;
    v = v - gradP * dt;
    gl_FragColor = vec4(v, 0.0, 1.0);
  }
`;

const viscous_frag = `
  precision highp float;
  uniform sampler2D velocity;
  uniform sampler2D velocity_new;
  uniform float v;
  uniform vec2 px;
  uniform float dt;
  varying vec2 uv;
  void main(){
    vec2 old = texture2D(velocity, uv).xy;
    vec2 new0 = texture2D(velocity_new, uv + vec2(px.x * 2.0, 0.0)).xy;
    vec2 new1 = texture2D(velocity_new, uv - vec2(px.x * 2.0, 0.0)).xy;
    vec2 new2 = texture2D(velocity_new, uv + vec2(0.0, px.y * 2.0)).xy;
    vec2 new3 = texture2D(velocity_new, uv - vec2(0.0, px.y * 2.0)).xy;
    vec2 newv = 4.0 * old + v * dt * (new0 + new1 + new2 + new3);
    newv /= 4.0 * (1.0 + v * dt);
    gl_FragColor = vec4(newv, 0.0, 0.0);
  }
`;

// --- Helpers and Internal Classes ---

function makePaletteTexture(stops: string[]): THREE.DataTexture {
    let arr: string[];
    if (Array.isArray(stops) && stops.length > 0) {
        arr = stops.length === 1 ? [stops[0], stops[0]] : stops;
    } else {
        arr = ['#ffffff', '#ffffff'];
    }
    const w = arr.length;
    const data = new Uint8Array(w * 4);
    for (let i = 0; i < w; i++) {
        const c = new THREE.Color(arr[i]);
        data[i * 4 + 0] = Math.round(c.r * 255);
        data[i * 4 + 1] = Math.round(c.g * 255);
        data[i * 4 + 2] = Math.round(c.b * 255);
        data[i * 4 + 3] = 255;
    }
    const tex = new THREE.DataTexture(data, w, 1, THREE.RGBAFormat);
    tex.magFilter = THREE.LinearFilter;
    tex.minFilter = THREE.LinearFilter;
    tex.wrapS = THREE.ClampToEdgeWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    tex.generateMipmaps = false;
    tex.needsUpdate = true;
    return tex;
}

class CommonClass {
    width = 0;
    height = 0;
    aspect = 1;
    pixelRatio = 1;
    isMobile = false;
    breakpoint = 768;
    fboWidth: number | null = null;
    fboHeight: number | null = null;
    time = 0;
    delta = 0;
    container: HTMLElement | null = null;
    renderer: THREE.WebGLRenderer | null = null;
    camera: THREE.Camera | null = null;
    clock: THREE.Clock | null = null;
    init(container: HTMLElement) {
        this.container = container;
        this.pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
        this.resize();
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.autoClear = false;
        this.renderer.setClearColor(new THREE.Color(0x000000), 0);
        this.renderer.setPixelRatio(this.pixelRatio);
        this.renderer.setSize(this.width, this.height);
        const el = this.renderer.domElement;
        el.style.width = '100%';
        el.style.height = '100%';
        el.style.display = 'block';
        container.appendChild(el);
        this.camera = new THREE.Camera();
        this.clock = new THREE.Clock();
        this.clock.start();
    }
    resize() {
        if (!this.container) return;
        const rect = this.container.getBoundingClientRect();
        this.width = Math.max(1, Math.floor(rect.width));
        this.height = Math.max(1, Math.floor(rect.height));
        this.aspect = this.width / this.height;
        if (this.renderer) this.renderer.setSize(this.width, this.height, false);
    }
    update() {
        if (!this.clock) return;
        this.delta = this.clock.getDelta();
        this.time += this.delta;
    }
}

class MouseClass {
    mouseMoved = false;
    coords = new THREE.Vector2();
    coords_old = new THREE.Vector2();
    diff = new THREE.Vector2();
    timer: number | null = null;
    container: HTMLElement | null = null;
    docTarget: Document | null = null;
    listenerTarget: Window | null = null;
    isHoverInside = false;
    hasUserControl = false;
    isAutoActive = false;
    autoIntensity = 2.0;
    autoSpeed = 0.5;
    takeoverActive = false;
    takeoverStartTime = 0;
    takeoverDuration = 0.25;
    takeoverFrom = new THREE.Vector2();
    takeoverTo = new THREE.Vector2();
    onInteract: (() => void) | null = null;
    private _onMouseMove = this.onDocumentMouseMove.bind(this);
    private _onTouchStart = this.onDocumentTouchStart.bind(this);
    private _onTouchMove = this.onDocumentTouchMove.bind(this);
    private _onTouchEnd = this.onTouchEnd.bind(this);
    private _onDocumentLeave = this.onDocumentLeave.bind(this);
    init(container: HTMLElement) {
        this.container = container;
        this.docTarget = container.ownerDocument || null;
        const defaultView = this.docTarget?.defaultView || (typeof window !== 'undefined' ? window : null);
        if (!defaultView) return;
        this.listenerTarget = defaultView;
        this.listenerTarget.addEventListener('mousemove', this._onMouseMove);
        this.listenerTarget.addEventListener('touchstart', this._onTouchStart, {
            passive: true
        });
        this.listenerTarget.addEventListener('touchmove', this._onTouchMove, {
            passive: true
        });
        this.listenerTarget.addEventListener('touchend', this._onTouchEnd);
        this.docTarget?.addEventListener('mouseleave', this._onDocumentLeave);
    }
    dispose() {
        if (this.listenerTarget) {
            this.listenerTarget.removeEventListener('mousemove', this._onMouseMove);
            this.listenerTarget.removeEventListener('touchstart', this._onTouchStart);
            this.listenerTarget.removeEventListener('touchmove', this._onTouchMove);
            this.listenerTarget.removeEventListener('touchend', this._onTouchEnd);
        }
        if (this.docTarget) {
            this.docTarget.removeEventListener('mouseleave', this._onDocumentLeave);
        }
        this.listenerTarget = null;
        this.docTarget = null;
        this.container = null;
    }
    private isPointInside(clientX: number, clientY: number) {
        if (!this.container) return false;
        const rect = this.container.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return false;
        return clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom;
    }
    private updateHoverState(clientX: number, clientY: number) {
        this.isHoverInside = this.isPointInside(clientX, clientY);
        return this.isHoverInside;
    }
    setCoords(x: number, y: number) {
        if (!this.container) return;
        if (this.timer) window.clearTimeout(this.timer);
        const rect = this.container.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;
        const nx = (x - rect.left) / rect.width;
        const ny = (y - rect.top) / rect.height;
        this.coords.set(nx * 2 - 1, -(ny * 2 - 1));
        this.mouseMoved = true;
        this.timer = window.setTimeout(() => {
            this.mouseMoved = false;
        }, 100);
    }
    setNormalized(nx: number, ny: number) {
        this.coords.set(nx, ny);
        this.mouseMoved = true;
    }
    onDocumentMouseMove(event: MouseEvent) {
        if (!this.updateHoverState(event.clientX, event.clientY)) return;
        if (this.onInteract) this.onInteract();
        if (this.isAutoActive && !this.hasUserControl && !this.takeoverActive) {
            if (!this.container) return;
            const rect = this.container.getBoundingClientRect();
            const nx = (event.clientX - rect.left) / rect.width;
            const ny = (event.clientY - rect.top) / rect.height;
            this.takeoverFrom.copy(this.coords);
            this.takeoverTo.set(nx * 2 - 1, -(ny * 2 - 1));
            this.takeoverStartTime = performance.now();
            this.takeoverActive = true;
            this.hasUserControl = true;
            this.isAutoActive = false;
            return;
        }
        this.setCoords(event.clientX, event.clientY);
        this.hasUserControl = true;
    }
    onDocumentTouchStart(event: TouchEvent) {
        if (event.touches.length !== 1) return;
        const t = event.touches[0];
        if (!this.updateHoverState(t.clientX, t.clientY)) return;
        if (this.onInteract) this.onInteract();
        this.setCoords(t.clientX, t.clientY);
        this.hasUserControl = true;
    }
    onDocumentTouchMove(event: TouchEvent) {
        if (event.touches.length !== 1) return;
        const t = event.touches[0];
        if (!this.updateHoverState(t.clientX, t.clientY)) return;
        if (this.onInteract) this.onInteract();
        this.setCoords(t.clientX, t.clientY);
    }
    onTouchEnd() {
        this.isHoverInside = false;
    }
    onDocumentLeave() {
        this.isHoverInside = false;
    }
    update() {
        if (this.takeoverActive) {
            const t = (performance.now() - this.takeoverStartTime) / (this.takeoverDuration * 1000);
            if (t >= 1) {
                this.takeoverActive = false;
                this.coords.copy(this.takeoverTo);
                this.coords_old.copy(this.coords);
                this.diff.set(0, 0);
            } else {
                const k = t * t * (3 - 2 * t);
                this.coords.copy(this.takeoverFrom).lerp(this.takeoverTo, k);
            }
        } else if (this.isAutoActive) {
            const t = performance.now() * 0.001 * this.autoSpeed;
            this.coords.set(Math.sin(t) * 0.8, Math.cos(t * 0.9) * 0.6);
        }

        this.diff.subVectors(this.coords, this.coords_old);
        this.coords_old.copy(this.coords);
        if (this.coords_old.x === 0 && this.coords_old.y === 0) this.diff.set(0, 0);

        if (this.isAutoActive && !this.takeoverActive) this.diff.multiplyScalar(this.autoIntensity);
    }
}



type FBO = THREE.WebGLRenderTarget;

interface SimPassProps {
    cellScale?: THREE.Vector2;
    fboSize?: THREE.Vector2;
    dt?: number;
    boundarySpace?: THREE.Vector2;
    src?: FBO;
    dst?: FBO;
    dst_?: FBO;
    src_p?: FBO;
    src_v?: FBO;
    viscous?: number;
    cursor_size?: number;
    mouse_force?: number;
}

type Uniforms = Record<string, { value: unknown }>;


interface ShaderPassProps {
    material?: {
        vertexShader: string;
        fragmentShader: string;
        uniforms: Uniforms;
        transparent?: boolean;
        blending?: THREE.Blending;
        depthWrite?: boolean;
    };
    output?: FBO;
    output0?: FBO;
    output1?: FBO;
}

class ShaderPass {
    props: ShaderPassProps;
    uniforms?: Uniforms;
    scene: THREE.Scene | null = null;
    camera: THREE.Camera | null = null;
    material: THREE.RawShaderMaterial | null = null;
    geometry: THREE.BufferGeometry | null = null;
    plane: THREE.Mesh | null = null;
    common: CommonClass;

    constructor(props: ShaderPassProps, common: CommonClass) {
        this.props = props;
        this.uniforms = this.props.material?.uniforms;
        this.common = common;
    }
    init() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.Camera();
        if (this.uniforms) {
            this.material = new THREE.RawShaderMaterial(this.props.material!);
            this.geometry = new THREE.PlaneGeometry(2, 2);
            this.plane = new THREE.Mesh(this.geometry, this.material);
            this.scene.add(this.plane);
        }
    }
    update() {
        if (!this.common.renderer || !this.scene || !this.camera) return;
        this.common.renderer.setRenderTarget(this.props.output || null);
        this.common.renderer.render(this.scene, this.camera);
        this.common.renderer.setRenderTarget(null);
    }
}

class Advection extends ShaderPass {
    line!: THREE.LineSegments;
    constructor(simProps: SimPassProps, common: CommonClass) {
        super({
            material: {
                vertexShader: face_vert,
                fragmentShader: advection_frag,
                uniforms: {
                    boundarySpace: { value: simProps.cellScale },
                    px: { value: simProps.cellScale },
                    fboSize: { value: simProps.fboSize },
                    velocity: { value: simProps.src!.texture },
                    dt: { value: simProps.dt },
                    isBFECC: { value: true }
                }
            },
            output: simProps.dst
        }, common);
        this.init();
    }
    init() {
        super.init();
        this.createBoundary();
    }
    createBoundary() {
        const boundaryG = new THREE.BufferGeometry();
        const vertices_boundary = new Float32Array([
            -1, -1, 0, -1, 1, 0, -1, 1, 0, 1, 1, 0, 1, 1, 0, 1, -1, 0, 1, -1, 0, -1, -1, 0
        ]);
        boundaryG.setAttribute('position', new THREE.BufferAttribute(vertices_boundary, 3));
        const boundaryM = new THREE.RawShaderMaterial({
            vertexShader: line_vert,
            fragmentShader: advection_frag,
            uniforms: this.uniforms!
        });
        this.line = new THREE.LineSegments(boundaryG, boundaryM);
        this.scene!.add(this.line);
    }
    update(args: { dt?: number; isBounce?: boolean; BFECC?: boolean } = {}) {
        const { dt, isBounce, BFECC } = args;
        if (!this.uniforms) return;
        if (typeof dt === 'number') this.uniforms.dt.value = dt;
        if (typeof isBounce === 'boolean') this.line.visible = isBounce;
        if (typeof BFECC === 'boolean') this.uniforms.isBFECC.value = BFECC;
        super.update();
    }
}

class ExternalForce extends ShaderPass {
    mouseMesh!: THREE.Mesh;
    mouse: MouseClass;
    constructor(simProps: SimPassProps, common: CommonClass, mouse: MouseClass) {
        super({ output: simProps.dst }, common);
        this.mouse = mouse;
        this.initExternalForce(simProps);
    }
    initExternalForce(simProps: SimPassProps) {
        super.init();
        const mouseG = new THREE.PlaneGeometry(1, 1);
        const mouseM = new THREE.RawShaderMaterial({
            vertexShader: mouse_vert,
            fragmentShader: externalForce_frag,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            uniforms: {
                px: { value: simProps.cellScale },
                force: { value: new THREE.Vector2(0, 0) },
                center: { value: new THREE.Vector2(0, 0) },
                scale: { value: new THREE.Vector2(simProps.cursor_size, simProps.cursor_size) }
            }
        });
        this.mouseMesh = new THREE.Mesh(mouseG, mouseM);
        this.scene!.add(this.mouseMesh);
    }
    update(args: { mouse_force?: number; cellScale?: THREE.Vector2; cursor_size?: number } = {}) {
        const forceX = (this.mouse.diff.x / 2) * (args.mouse_force || 0);
        const forceY = (this.mouse.diff.y / 2) * (args.mouse_force || 0);
        const cellScale = args.cellScale || new THREE.Vector2(1, 1);
        const cursorSize = args.cursor_size || 0;
        const cursorSizeX = cursorSize * cellScale.x;
        const cursorSizeY = cursorSize * cellScale.y;
        const centerX = Math.min(
            Math.max(this.mouse.coords.x, -1 + cursorSizeX + cellScale.x * 2),
            1 - cursorSizeX - cellScale.x * 2
        );
        const centerY = Math.min(
            Math.max(this.mouse.coords.y, -1 + cursorSizeY + cellScale.y * 2),
            1 - cursorSizeY - cellScale.y * 2
        );
        const uniforms = (this.mouseMesh.material as THREE.RawShaderMaterial).uniforms;
        uniforms.force.value.set(forceX, forceY);
        uniforms.center.value.set(centerX, centerY);
        uniforms.scale.value.set(cursorSize, cursorSize);
        super.update();
    }
}

class Viscous extends ShaderPass {
    constructor(simProps: SimPassProps, common: CommonClass) {
        super({
            material: {
                vertexShader: face_vert,
                fragmentShader: viscous_frag,
                uniforms: {
                    boundarySpace: { value: simProps.boundarySpace },
                    velocity: { value: simProps.src!.texture },
                    velocity_new: { value: simProps.dst_!.texture },
                    v: { value: simProps.viscous },
                    px: { value: simProps.cellScale },
                    dt: { value: simProps.dt }
                }
            },
            output: simProps.dst,
            output0: simProps.dst_,
            output1: simProps.dst
        }, common);
        this.init();
    }
    update(args: { viscous?: number; iterations?: number; dt?: number } = {}) {
        const { viscous, iterations, dt } = args;
        if (!this.uniforms) return;
        let fbo_in: FBO = this.props.output0!;
        let fbo_out: FBO = this.props.output1!;
        if (typeof viscous === 'number') this.uniforms.v.value = viscous;
        const iter = iterations ?? 0;
        for (let i = 0; i < iter; i++) {
            if (i % 2 === 0) {
                fbo_in = this.props.output0!;
                fbo_out = this.props.output1!;
            } else {
                fbo_in = this.props.output1!;
                fbo_out = this.props.output0!;
            }
            this.uniforms.velocity_new.value = fbo_in.texture;
            this.props.output = fbo_out;
            if (typeof dt === 'number') this.uniforms.dt.value = dt;
            super.update();
        }
        return fbo_out;
    }
}

class Divergence extends ShaderPass {
    constructor(simProps: SimPassProps, common: CommonClass) {
        super({
            material: {
                vertexShader: face_vert,
                fragmentShader: divergence_frag,
                uniforms: {
                    boundarySpace: { value: simProps.boundarySpace },
                    velocity: { value: simProps.src!.texture },
                    px: { value: simProps.cellScale },
                    dt: { value: simProps.dt }
                }
            },
            output: simProps.dst
        }, common);
        this.init();
    }
    update(args: { vel?: FBO } = {}) {
        const { vel } = args;
        if (this.uniforms && vel) {
            this.uniforms.velocity.value = vel.texture;
        }
        super.update();
    }
}

class Poisson extends ShaderPass {
    constructor(simProps: SimPassProps, common: CommonClass) {
        super({
            material: {
                vertexShader: face_vert,
                fragmentShader: poisson_frag,
                uniforms: {
                    boundarySpace: { value: simProps.boundarySpace },
                    pressure: { value: simProps.dst_!.texture },
                    divergence: { value: simProps.src!.texture },
                    px: { value: simProps.cellScale }
                }
            },
            output: simProps.dst,
            output0: simProps.dst_,
            output1: simProps.dst
        }, common);
        this.init();
    }
    update(args: { iterations?: number } = {}) {
        const { iterations } = args;
        let p_in: FBO = this.props.output0!;
        let p_out: FBO = this.props.output1!;
        const iter = iterations ?? 0;
        for (let i = 0; i < iter; i++) {
            if (i % 2 === 0) {
                p_in = this.props.output0!;
                p_out = this.props.output1!;
            } else {
                p_in = this.props.output1!;
                p_out = this.props.output0!;
            }
            if (this.uniforms) this.uniforms.pressure.value = p_in.texture;
            this.props.output = p_out;
            super.update();
        }
        return p_out;
    }
}

class Pressure extends ShaderPass {
    constructor(simProps: SimPassProps, common: CommonClass) {
        super({
            material: {
                vertexShader: face_vert,
                fragmentShader: pressure_frag,
                uniforms: {
                    boundarySpace: { value: simProps.boundarySpace },
                    pressure: { value: simProps.src_p!.texture },
                    velocity: { value: simProps.src_v!.texture },
                    px: { value: simProps.cellScale },
                    dt: { value: simProps.dt }
                }
            },
            output: simProps.dst
        }, common);
        this.init();
    }
    update(args: { vel?: FBO; pressure?: FBO } = {}) {
        const { vel, pressure } = args;
        if (this.uniforms && vel && pressure) {
            this.uniforms.velocity.value = vel.texture;
            this.uniforms.pressure.value = pressure.texture;
        }
        super.update();
    }
}

class Simulation {
    options: SimOptions;
    fbos: Record<string, THREE.WebGLRenderTarget | null> = {
        vel_0: null,
        vel_1: null,
        vel_viscous0: null,
        vel_viscous1: null,
        div: null,
        pressure_0: null,
        pressure_1: null
    };
    fboSize = new THREE.Vector2();
    cellScale = new THREE.Vector2();
    boundarySpace = new THREE.Vector2();
    advection!: Advection;
    externalForce!: ExternalForce;
    viscous!: Viscous;
    divergence!: Divergence;
    poisson!: Poisson;
    pressure!: Pressure;
    common: CommonClass;
    mouse: MouseClass;

    constructor(common: CommonClass, mouse: MouseClass, options?: Partial<SimOptions>) {
        this.common = common;
        this.mouse = mouse;
        this.options = {
            iterations_poisson: 32,
            iterations_viscous: 32,
            mouse_force: 20,
            resolution: 0.5,
            cursor_size: 100,
            viscous: 30,
            isBounce: false,
            dt: 0.014,
            isViscous: false,
            BFECC: true,
            ...options
        };
        this.init();
    }
    init() {
        this.calcSize();
        this.resize();
        this.initKernels();
    }
    calcSize() {
        if (!this.common.container) return;
        const width = Math.round(this.common.width * this.options.resolution);
        const height = Math.round(this.common.height * this.options.resolution);
        const px_x = 1.0 / width;
        const px_y = 1.0 / height;
        this.cellScale.set(px_x, px_y);
        this.fboSize.set(width, height);
    }
    resize() {
        this.calcSize();
        this.initFramebuffers();
        if (this.advection) {
            this.initKernels();
        }
    }
    initFramebuffers() {
        const simRes = this.fboSize;
        const options: THREE.RenderTargetOptions = {
            minFilter: THREE.LinearFilter,
            magFilter: THREE.LinearFilter,
            type: THREE.HalfFloatType,
            format: THREE.RGBAFormat,
            depthBuffer: false,
            stencilBuffer: false
        };
        // Reuse or create render targets
        const keys = Object.keys(this.fbos);
        for (const key of keys) {
            if (this.fbos[key]) this.fbos[key]!.dispose();
            this.fbos[key] = new THREE.WebGLRenderTarget(simRes.x, simRes.y, options);
        }
    }
    initKernels() {
        this.advection = new Advection({
            cellScale: this.cellScale,
            fboSize: this.fboSize,
            dt: this.options.dt,
            src: this.fbos.vel_0!,
            dst: this.fbos.vel_1!
        }, this.common);
        this.externalForce = new ExternalForce({
            cellScale: this.cellScale,
            cursor_size: this.options.cursor_size,
            dst: this.fbos.vel_1!
        }, this.common, this.mouse);
        this.viscous = new Viscous({
            cellScale: this.cellScale,
            boundarySpace: this.boundarySpace,
            viscous: this.options.viscous,
            src: this.fbos.vel_1!,
            dst: this.fbos.vel_viscous1!,
            dst_: this.fbos.vel_viscous0!,
            dt: this.options.dt
        }, this.common);
        this.divergence = new Divergence({
            cellScale: this.cellScale,
            boundarySpace: this.boundarySpace,
            src: this.fbos.vel_viscous0!,
            dst: this.fbos.div!,
            dt: this.options.dt
        }, this.common);
        this.poisson = new Poisson({
            cellScale: this.cellScale,
            boundarySpace: this.boundarySpace,
            src: this.fbos.div!,
            dst: this.fbos.pressure_1!,
            dst_: this.fbos.pressure_0!
        }, this.common);
        this.pressure = new Pressure({
            cellScale: this.cellScale,
            boundarySpace: this.boundarySpace,
            src_p: this.fbos.pressure_0!,
            src_v: this.fbos.vel_viscous0!,
            dst: this.fbos.vel_0!,
            dt: this.options.dt
        }, this.common);
    }
    update() {
        if (this.common.time === 0) return;
        this.common.renderer!.autoClear = false;
        this.advection.update({
            dt: this.options.dt,
            isBounce: this.options.isBounce,
            BFECC: this.options.BFECC
        });
        if (this.mouse.mouseMoved || this.mouse.isAutoActive) {
            this.externalForce.update({
                mouse_force: this.options.mouse_force,
                cursor_size: this.options.cursor_size,
                cellScale: this.cellScale
            });
        }
        this.mouse.mouseMoved = false;
        let vel: FBO | null = this.fbos.vel_1!;
        if (this.options.isViscous) {
            vel = this.viscous.update({
                viscous: this.options.viscous,
                iterations: this.options.iterations_viscous,
                dt: this.options.dt // Removed ;
            }) || null;
        }
        this.divergence.update({ vel: vel! });
        const pressure = this.poisson.update({ iterations: this.options.iterations_poisson });
        this.pressure.update({ vel: vel!, pressure });
    }
}

export default function LiquidEther(props: LiquidEtherProps) {
    const wrapper = useRef<HTMLDivElement>(null);
    const webglRef = useRef<LiquidEtherWebGL | null>(null);
    const commonRef = useRef<CommonClass | null>(null);
    const mouseRef = useRef<MouseClass | null>(null);
    const simRef = useRef<Simulation | null>(null);
    const rafRef = useRef<number | null>(null);
    const isVisibleRef = useRef(false);
    const resizeObserverRef = useRef<ResizeObserver | null>(null);
    const intersectionObserverRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        if (!wrapper.current) return;

        const common = new CommonClass();
        commonRef.current = common;
        const mouse = new MouseClass();
        mouseRef.current = mouse;

        common.init(wrapper.current);
        mouse.init(wrapper.current);

        // Init Auto Demo
        if (props.autoDemo) {
            mouse.isAutoActive = true;
            mouse.autoSpeed = props.autoSpeed || 0.5;
            mouse.autoIntensity = props.autoIntensity || 2.0;
        }

        const simulation = new Simulation(common, mouse, props);
        simRef.current = simulation;

        const color_mat = new THREE.RawShaderMaterial({
            vertexShader: face_vert,
            fragmentShader: color_frag,
            uniforms: {
                velocity: { value: simulation.fbos.vel_0!.texture },
                boundarySpace: { value: new THREE.Vector2() },
                palette: { value: null },
                bgColor: { value: new THREE.Vector4(0, 0, 0, 0) } // transparent
            },
        });
        const color_plane = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), color_mat);
        const color_scene = new THREE.Scene();
        color_scene.add(color_plane);

        const paletteTex = makePaletteTexture(props.colors || defaultColors);
        color_mat.uniforms.palette.value = paletteTex;

        const update = () => {
            if (isVisibleRef.current) {
                common.update();
                mouse.update();
                simulation.update();
                color_mat.uniforms.velocity.value = simulation.fbos.vel_0!.texture;
                common.renderer!.setRenderTarget(null);
                common.renderer!.render(color_scene, common.camera!);
            }
            rafRef.current = requestAnimationFrame(update);
        };
        rafRef.current = requestAnimationFrame(update);

        webglRef.current = {
            resize: () => {
                common.resize();
                simulation.resize();
            },
            start: () => {
                isVisibleRef.current = true;
            },
            pause: () => {
                isVisibleRef.current = false;
            },
            dispose: () => {
                if (rafRef.current) cancelAnimationFrame(rafRef.current);
                mouse.dispose();
                common.renderer?.dispose();
                if (common.container && common.renderer?.domElement) {
                    common.container.removeChild(common.renderer.domElement);
                }
            },
            output: {
                simulation: {
                    options: simulation.options,
                    resize: () => simulation.resize()
                }
            },
            autoDriver: {
                enabled: false,
                speed: 0,
                resumeDelay: 0,
                rampDurationMs: 0,
                forceStop: () => { }
            }
        };

        const onResize = () => {
            if (webglRef.current) webglRef.current.resize();
        };
        resizeObserverRef.current = new ResizeObserver(() => onResize());
        resizeObserverRef.current.observe(wrapper.current);

        intersectionObserverRef.current = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                isVisibleRef.current = entry.isIntersecting;
            });
        });
        intersectionObserverRef.current.observe(wrapper.current);

        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            if (resizeObserverRef.current) resizeObserverRef.current.disconnect();
            if (intersectionObserverRef.current) intersectionObserverRef.current.disconnect();
            if (webglRef.current) webglRef.current.dispose();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div
            ref={wrapper}
            className={`relative w-full h-full overflow-hidden ${props.className || ''}`}
            style={props.style}
        />
    );
}
