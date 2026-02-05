<template>
  <div v-if="!isTouchDevice" class="custom-cursor-container">
    <!-- Variant 1: Hollow ring with dot -->
    <template v-if="variant === 'v1'">
      <!-- Outer ring -->
      <div
        class="custom-cursor-outer"
        :class="{ 'is-hovering': cursorVariant === 'hover' }"
        :style="outerRingStyle"
      >
        <div class="cursor-ring" />
      </div>

      <!-- Inner dot -->
      <div
        class="custom-cursor-inner"
        :class="{ 'is-hovering': cursorVariant === 'hover' }"
        :style="innerDotStyle"
      >
        <div class="cursor-dot" />
      </div>
    </template>

    <!-- Variant 2: Filled circle with scale effect -->
    <template v-else>
      <div
        class="custom-cursor-filled"
        :class="{ 'is-hovering': cursorVariant === 'hover' }"
        :style="filledCircleStyle"
      >
        <div class="cursor-circle" />
      </div>
    </template>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue';

export default {
  name: 'CustomCursor',
  props: {
    variant: {
      type: String,
      default: 'v1',
      validator: (value) => ['v1', 'v2'].includes(value)
    }
  },
  setup() {
    const cursorX = ref(0);
    const cursorY = ref(0);
    const smoothX = ref(0);
    const smoothY = ref(0);
    const cursorVariant = ref('default');
    const isVisible = ref(false);
    const isTouchDevice = ref(false);

    let animationFrameId = null;

    // Spring-like interpolation for smooth cursor movement
    const lerp = (start, end, factor) => {
      return start + (end - start) * factor;
    };

    const animate = () => {
      // Smooth interpolation with spring-like effect
      const smoothFactor = 0.2; // Increased for snappier response

      const newX = lerp(smoothX.value, cursorX.value, smoothFactor);
      const newY = lerp(smoothY.value, cursorY.value, smoothFactor);

      // Only update if there's significant movement (reduce unnecessary updates)
      if (Math.abs(newX - smoothX.value) > 0.1 || Math.abs(newY - smoothY.value) > 0.1) {
        smoothX.value = newX;
        smoothY.value = newY;
        animationFrameId = requestAnimationFrame(animate);
      } else {
        // Stop animation when cursor is nearly at target
        smoothX.value = cursorX.value;
        smoothY.value = cursorY.value;
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    // Computed styles for cursor elements (using translate3d for GPU acceleration)
    const outerRingStyle = computed(() => {
      const opacity = isVisible.value ? (cursorVariant.value === 'hover' ? 0.8 : 0.5) : 0;

      return {
        transform: `translate3d(${smoothX.value}px, ${smoothY.value}px, 0) translate(-50%, -50%)`,
        opacity: opacity
      };
    });

    const innerDotStyle = computed(() => {
      const opacity = isVisible.value && cursorVariant.value === 'default' ? 1 : 0;

      return {
        transform: `translate3d(${smoothX.value}px, ${smoothY.value}px, 0) translate(-50%, -50%)`,
        opacity: opacity
      };
    });

    const filledCircleStyle = computed(() => {
      const opacity = isVisible.value ? (cursorVariant.value === 'hover' ? 0.3 : 0.6) : 0;

      return {
        transform: `translate3d(${smoothX.value}px, ${smoothY.value}px, 0) translate(-50%, -50%)`,
        opacity: opacity
      };
    });

    // Event handlers
    const moveCursor = (e) => {
      cursorX.value = e.clientX;
      cursorY.value = e.clientY;
      isVisible.value = true;
    };

    const handleMouseLeave = () => {
      isVisible.value = false;
    };

    const handleMouseEnter = () => {
      isVisible.value = true;
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.hasAttribute('data-cursor-hover')
      ) {
        cursorVariant.value = 'hover';
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.hasAttribute('data-cursor-hover')
      ) {
        cursorVariant.value = 'default';
      }
    };

    onMounted(() => {
      // Check for touch device
      isTouchDevice.value = 'ontouchstart' in window;

      if (!isTouchDevice.value) {
        // Add event listeners
        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseleave', handleMouseLeave);
        window.addEventListener('mouseenter', handleMouseEnter);
        document.addEventListener('mouseover', handleMouseOver);
        document.addEventListener('mouseout', handleMouseOut);

        // Start animation loop
        animate();
      }
    });

    onUnmounted(() => {
      // Remove event listeners
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);

      // Cancel animation frame
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    });

    return {
      cursorX,
      cursorY,
      smoothX,
      smoothY,
      cursorVariant,
      isVisible,
      isTouchDevice,
      outerRingStyle,
      innerDotStyle,
      filledCircleStyle
    };
  }
};
</script>

<style scoped>
.custom-cursor-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9999;
  overflow: hidden;
}

.custom-cursor-outer,
.custom-cursor-inner,
.custom-cursor-filled {
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  will-change: transform;
  transition: opacity 0.2s ease;
  mix-blend-mode: difference;
  backface-visibility: hidden;
  -webkit-font-smoothing: subpixel-antialiased;
}

.cursor-ring,
.cursor-dot,
.cursor-circle {
  transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.cursor-ring {
  width: 40px;
  height: 40px;
  border: 2px solid var(--sky-cyan, #00ccff);
  border-radius: 50%;
}

.custom-cursor-outer.is-hovering .cursor-ring {
  transform: scale(1.5);
}

.cursor-dot {
  width: 8px;
  height: 8px;
  background-color: var(--sky-cyan, #00ccff);
  border-radius: 50%;
}

.custom-cursor-inner.is-hovering .cursor-dot {
  transform: scale(0);
}

.cursor-circle {
  width: 32px;
  height: 32px;
  background-color: var(--sky-cyan, #00ccff);
  border-radius: 50%;
  filter: blur(4px);
}

.custom-cursor-filled.is-hovering .cursor-circle {
  transform: scale(2);
}

/* Hide on smaller screens */
@media (max-width: 768px) {
  .custom-cursor-container {
    display: none;
  }
}

/* Hide default cursor on desktop */
@media (min-width: 769px) {
  body {
    cursor: none;
  }

  a, button, [data-cursor-hover] {
    cursor: none;
  }
}
</style>
