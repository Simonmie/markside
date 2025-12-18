<template>
  <div class="side-panel-container">
    <!-- 主编辑区 -->
    <div class="main-edit-area">
      <!-- 头部工具栏 -->
      <div class="editor-header">
        <!-- Toolbar placeholder -->
      </div>

      <!-- markdown 编辑/渲染区域 -->
      <editor-content :editor="editor" class="editor-content" />

      <!-- 底部快捷方式 -->
      <div class="editor-footer">
        <!-- Footer placeholder -->
      </div>
    </div>
    <!-- 左侧抽屉 -->
    <div class="drawer-container">
      <!-- 抽屉内容 -->
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, ref } from 'vue'
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'

defineOptions({
  name: 'SidePanel',
})

const editor = ref(null)

editor.value = new Editor({
  extensions: [StarterKit],
  content: '<p>Hello World! 🌍</p>',
  editorProps: {
    attributes: {
      class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
    },
  },
})

onBeforeUnmount(() => {
  editor.value?.destroy()
})
</script>

<style lang="scss" scoped>
@use '@/style/default_markdown.scss';

.side-panel-container {
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
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
