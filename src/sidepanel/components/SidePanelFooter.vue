<template>
  <div class="editor-footer">
    <button class="icon-btn" @click="isSettingsOpen = true" title="设置">
      <SettingsIcon size="20" />
    </button>
  </div>
  <SettingsDialog v-model:isOpen="isSettingsOpen" v-model="currentTheme" />
</template>

<script setup>
import { ref, computed } from 'vue'
import { Settings as SettingsIcon } from 'lucide-vue-next'
import SettingsDialog from './SettingsDialog.vue'

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])

const currentTheme = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

const isSettingsOpen = ref(false)
</script>

<style lang="scss" scoped>
.editor-footer {
  position: absolute;
  bottom: 20px;
  right: 20px;
  z-index: 100;

  .icon-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
    border-radius: 8px;
    color: var(--text-color-secondary, #666);
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background-color: var(--bg-color-hover, rgba(0, 0, 0, 0.05));
      color: var(--text-color, #333);
    }
  }
}
</style>
