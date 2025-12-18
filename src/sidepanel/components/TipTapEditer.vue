<template>
  <div class="editor-container">
    <EditorToolbar v-if="editor" :editor="editor" />
    <EditorContent :editor="editor" class="editor-content" />
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount } from 'vue'
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import { Table } from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { all, createLowlight } from 'lowlight'
import EditorToolbar from './EditorToolbar.vue'

// Setup lowlight for syntax highlighting
const lowlight = createLowlight(all)

const editor = ref(null)

editor.value = new Editor({
  extensions: [
    StarterKit.configure({
      codeBlock: false, // We use CodeBlockLowlight instead
    }),
    Link.configure({
      openOnClick: true,
      defaultProtocol: 'https',
    }),
    Image,
    Table.configure({
      resizable: true,
    }),
    TableRow,
    TableHeader,
    TableCell,
    TaskList,
    TaskItem.configure({
      nested: true,
    }),
    CodeBlockLowlight.configure({
      lowlight,
    }),
  ],
  content: '',
  editorProps: {
    attributes: {
      class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
    },
  },
})

onBeforeUnmount(() => {
  editor.value?.destroy()
})

defineExpose({
  editor,
})
</script>

<style lang="scss" scoped>
@use '@/style/default_markdown.scss';

.editor-content {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  border-radius: 8px;
  background-color: var(--bg-color);
  width: 100%;
  height: 100%;
  :deep(.ProseMirror) {
    min-height: 100%;
    outline: none;
  }
}
</style>
