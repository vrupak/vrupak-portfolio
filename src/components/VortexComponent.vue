<template>
  <div class="vortex-background-wrapper">
    <canvas ref="canvasRef" class="vortex-canvas"></canvas>
  </div>
</template>

<script>
import { createNoise3D } from "simplex-noise";

export default {
  name: 'VortexComponent',
  props: {
    class: {
      type: String,
      default: ''
    },
    containerClass: {
      type: String,
      default: ''
    },
    particleCount: {
      type: Number,
      default: 700
    },
    rangeY: {
      type: Number,
      default: 100
    },
    baseHue: {
      type: Number,
      default: 220
    },
    baseSpeed: {
      type: Number,
      default: 0.0
    },
    rangeSpeed: {
      type: Number,
      default: 1.5
    },
    baseRadius: {
      type: Number,
      default: 1
    },
    rangeRadius: {
      type: Number,
      default: 2
    },
    backgroundColor: {
      type: String,
      default: "#000000"
    }
  },
  data() {
    return {
      TAU: 2 * Math.PI,
      BASE_TTL: 50,
      RANGE_TTL: 150,
      PARTICLE_PROP_COUNT: 9,
      RANGE_HUE: 100,
      NOISE_STEPS: 3,
      X_OFF: 0.00125,
      Y_OFF: 0.00125,
      Z_OFF: 0.0005,
      
      tick: 0,
      animationFrame: null,
      particleProps: null,
      center: [0, 0],
      ctx: null,
      opacity: 0,
      
      particleCache: {
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        life: 0,
        ttl: 0,
        speed: 0,
        radius: 0,
        hue: 0,
      },
      
      noise3D: null
    }
  },
  mounted() {
    this.noise3D = createNoise3D();
    this.initCanvas();
    this.animate();
    window.addEventListener('resize', this.handleResize);
  },
  beforeUnmount() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
    window.removeEventListener('resize', this.handleResize);
    this.ctx = null;
    this.particleProps = null;
  },
  methods: {
    rand(n) {
      return n * Math.random();
    },
    
    randRange(n) {
      return n - this.rand(2 * n);
    },
    
    fadeInOut(t, m) {
      const hm = 0.5 * m;
      return Math.abs(((t + hm) % m) - hm) / hm;
    },
    
    lerp(n1, n2, speed) {
      return (1 - speed) * n1 + speed * n2;
    },
    
    initParticle(i) {
      if (!this.particleProps || !this.$refs.canvasRef) return;

      const canvas = this.$refs.canvasRef;
      this.particleCache.x = this.rand(canvas.width);
      this.particleCache.y = this.center[1] + this.randRange(this.rangeY);
      this.particleCache.vx = 0;
      this.particleCache.vy = 0;
      this.particleCache.life = 0;
      this.particleCache.ttl = this.BASE_TTL + this.rand(this.RANGE_TTL);
      this.particleCache.speed = this.baseSpeed + this.rand(this.rangeSpeed);
      this.particleCache.radius = this.baseRadius + this.rand(this.rangeRadius);
      this.particleCache.hue = this.baseHue + this.rand(this.RANGE_HUE);

      this.particleProps.set([
        this.particleCache.x,
        this.particleCache.y,
        this.particleCache.vx,
        this.particleCache.vy,
        this.particleCache.life,
        this.particleCache.ttl,
        this.particleCache.speed,
        this.particleCache.radius,
        this.particleCache.hue,
      ], i);
    },
    
    updateParticle(i) {
      if (!this.particleProps || !this.$refs.canvasRef || !this.ctx) return;

      const canvas = this.$refs.canvasRef;
      const props = this.particleProps;
      const context = this.ctx;

      this.particleCache.x = props[i];
      this.particleCache.y = props[i + 1];
      this.particleCache.vx = props[i + 2];
      this.particleCache.vy = props[i + 3];
      this.particleCache.life = props[i + 4];
      this.particleCache.ttl = props[i + 5];
      this.particleCache.speed = props[i + 6];
      this.particleCache.radius = props[i + 7];
      this.particleCache.hue = props[i + 8];

      const n = this.noise3D(
        this.particleCache.x * this.X_OFF, 
        this.particleCache.y * this.Y_OFF, 
        this.tick * this.Z_OFF
      ) * this.NOISE_STEPS * this.TAU;

      const nextVx = this.lerp(this.particleCache.vx, Math.cos(n), 0.5);
      const nextVy = this.lerp(this.particleCache.vy, Math.sin(n), 0.5);
      const nextX = this.particleCache.x + nextVx * this.particleCache.speed;
      const nextY = this.particleCache.y + nextVy * this.particleCache.speed;

      context.save();
      context.lineCap = "round";
      context.lineWidth = this.particleCache.radius;
      context.strokeStyle = `hsla(${this.particleCache.hue}, 100%, 60%, ${this.fadeInOut(
        this.particleCache.life,
        this.particleCache.ttl,
      )})`;
      context.beginPath();
      context.moveTo(this.particleCache.x, this.particleCache.y);
      context.lineTo(nextX, nextY);
      context.stroke();
      context.restore();

      props[i] = nextX;
      props[i + 1] = nextY;
      props[i + 2] = nextVx;
      props[i + 3] = nextVy;
      props[i + 4] = this.particleCache.life + 1;

      if (
        nextX > canvas.width || 
        nextX < 0 || 
        nextY > canvas.height || 
        nextY < 0 || 
        this.particleCache.life > this.particleCache.ttl
      ) {
        this.initParticle(i);
      }
    },
    
    draw() {
      if (!this.$refs.canvasRef || !this.ctx || !this.particleProps) return;

      const canvas = this.$refs.canvasRef;
      const context = this.ctx;

      this.tick++;

      context.fillStyle = this.backgroundColor;
      context.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < this.particleProps.length; i += this.PARTICLE_PROP_COUNT) {
        this.updateParticle(i);
      }

      context.save();
      context.filter = "blur(8px) brightness(200%)";
      context.globalCompositeOperation = "lighter";
      context.drawImage(canvas, 0, 0);
      context.restore();

      context.save();
      context.filter = "blur(4px) brightness(200%)";
      context.globalCompositeOperation = "lighter";
      context.drawImage(canvas, 0, 0);
      context.restore();

      this.animationFrame = requestAnimationFrame(this.draw);
    },
    
    initCanvas() {
      const canvas = this.$refs.canvasRef;
      if (!canvas) return;

      this.ctx = canvas.getContext("2d");
      if (!this.ctx) return;

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      this.center = [0.5 * canvas.width, 0.5 * canvas.height];

      const particlePropsLength = this.particleCount * this.PARTICLE_PROP_COUNT;
      this.particleProps = new Float32Array(particlePropsLength);

      for (let i = 0; i < particlePropsLength; i += this.PARTICLE_PROP_COUNT) {
        this.initParticle(i);
      }
      
      // Fade in effect
      this.opacity = 1;
    },
    
    animate() {
      this.draw();
    },
    
    handleResize() {
      if (!this.$refs.canvasRef) return;

      const canvas = this.$refs.canvasRef;
      const { innerWidth, innerHeight } = window;
      canvas.width = innerWidth;
      canvas.height = innerHeight;
      this.center = [0.5 * canvas.width, 0.5 * canvas.height];
    }
  }
}
</script>

<style scoped>
.vortex-background-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  pointer-events: none;
}

.vortex-canvas {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
