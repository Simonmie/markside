<template>
  <div class="side-panel-container">
    <!-- 主编辑区 -->
    <div class="main-edit-area">
      <!-- markdown 编辑/渲染区域 -->
      <TipTapEditer ref="editorRef" />
    </div>
    <!-- 左侧抽屉 -->
    <div class="drawer-container">
      <!-- 抽屉内容 -->
    </div>
    <!-- 底部快捷方式 -->
    <div class="editor-footer">
      <button class="icon-btn" @click="isSettingsOpen = true" title="设置">
        <SettingsIcon size="20" />
      </button>
    </div>
    <SettingsDialog v-model:isOpen="isSettingsOpen" v-model="currentTheme" />
  </div>
</template>

<script setup>
import { onBeforeUnmount, ref, watch, onMounted } from 'vue'
import { Settings as SettingsIcon } from 'lucide-vue-next'
import SettingsDialog from './components/SettingsDialog.vue'
import TipTapEditer from './components/TipTapEditer.vue'

defineOptions({
  name: 'SidePanel',
})

const editorRef = ref(null)
const isSettingsOpen = ref(false)
const currentTheme = ref(localStorage.getItem('theme') || 'system')

// Theme management
const applyTheme = (theme) => {
  const root = document.documentElement

  if (theme === 'system') {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    root.setAttribute('data-theme', isDark ? 'dark' : 'light')
    root.removeAttribute('data-theme')
  } else {
    root.setAttribute('data-theme', theme)
  }
}

// Watch for theme changes
watch(currentTheme, (newTheme) => {
  localStorage.setItem('theme', newTheme)
  applyTheme(newTheme)
})

// Listen for system theme changes if in system mode
const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
const handleSystemThemeChange = () => {
  if (currentTheme.value === 'system') {
    // Re-apply to ensure clean state, though CSS handles it mostly
    applyTheme('system')
  }
}

onMounted(() => {
  applyTheme(currentTheme.value)
  mediaQuery.addEventListener('change', handleSystemThemeChange)
})

onBeforeUnmount(() => {
  mediaQuery.removeEventListener('change', handleSystemThemeChange)
})
</script>

<style lang="scss" scoped>
@use '@/style/default_markdown.scss';

.side-panel-container {
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  .editor-footer {
    position: absolute;
    bottom: 20px;
    right: 20px;
    z-index: 100;
  }
}

.main-edit-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  overflow: hidden;
}

.editor-content {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background-color: var(--bg-color);

  :deep(.ProseMirror) {
    min-height: 100%;
    outline: none;
  }
}

.drawer-container {
  width: 250px;
  border-left: 1px solid var(--border-color);
  background-color: var(--hover-color);
  display: none; /* Hidden by default for now */
}
</style>
