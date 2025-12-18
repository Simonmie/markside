<template>
  <div v-if="isOpen" class="settings-popover" @click.stop>
    <div class="popover-header">
      <h3>设置</h3>
      <button class="close-btn" @click="close">
        <X size="16" />
      </button>
    </div>

    <div class="popover-body">
      <div class="setting-item">
        <label>外观模式</label>
        <div class="theme-options">
          <button
            v-for="option in themeOptions"
            :key="option.value"
            :class="{ active: modelValue === option.value }"
            @click="updateTheme(option.value)"
          >
            <component :is="option.icon" size="16" />
            <span>{{ option.label }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
  <div v-if="isOpen" class="popover-overlay" @click="close"></div>
</template>

<script setup>
import { X, Sun, Moon, Monitor } from 'lucide-vue-next'

defineProps({
  isOpen: Boolean,
  modelValue: {
    type: String,
    default: 'system',
  },
})

const emit = defineEmits(['update:isOpen', 'update:modelValue'])

const close = () => {
  emit('update:isOpen', false)
}

const updateTheme = (value) => {
  emit('update:modelValue', value)
}

const themeOptions = [
  { label: '浅色', value: 'light', icon: Sun },
  { label: '深色', value: 'dark', icon: Moon },
  { label: '系统', value: 'system', icon: Monitor },
]
</script>

<style lang="scss" scoped>
.popover-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  background: transparent;
}

.settings-popover {
  position: fixed;
  bottom: 50px;
  right: 20px;
  width: 280px;
  background-color: var(--bg-color);
  color: var(--text-color);
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  border: 1px solid var(--border-color);
  z-index: 1000;
  animation: slideUp 0.2s ease-out;

  &::after {
    content: '';
    position: absolute;
    bottom: -6px;
    right: 20px;
    width: 10px;
    height: 10px;
    background-color: var(--bg-color);
    border-bottom: 1px solid var(--border-color);
    border-right: 1px solid var(--border-color);
    transform: rotate(45deg);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.popover-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 14px;
  border-bottom: 1px solid var(--border-color);

  h3 {
    font-size: 14px;
    font-weight: 600;
    margin: 0;
  }

  .close-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
    color: var(--text-color);
    display: flex;
    align-items: center;
    border-radius: 4px;
    opacity: 0.6;

    &:hover {
      background-color: var(--hover-color);
      opacity: 1;
    }
  }
}

.popover-body {
  padding: 14px;
}

.setting-item {
  display: flex;
  flex-direction: column;
  gap: 8px;

  label {
    font-size: 12px;
    font-weight: 500;
    opacity: 0.8;
  }
}

.theme-options {
  display: flex;
  gap: 8px;
  background-color: var(--hover-color);
  padding: 4px;
  border-radius: 6px;

  button {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 6px 8px;
    background: none;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    color: var(--text-color);
    font-size: 12px;
    transition: all 0.2s;
    opacity: 0.7;

    &:hover {
      opacity: 1;
    }

    &.active {
      background-color: var(--bg-color);
      color: var(--primary-color);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      opacity: 1;
      font-weight: 500;
    }
  }
}
</style>
