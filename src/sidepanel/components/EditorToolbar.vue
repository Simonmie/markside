<template>
  <div class="toolbar" v-if="editor">
    <div class="toolbar-group">
      <button 
        @click="editor.chain().focus().toggleBold().run()" 
        :class="{ 'is-active': editor.isActive('bold') }"
        title="Bold"
      >
        <Bold size="16" />
      </button>
      <button 
        @click="editor.chain().focus().toggleItalic().run()" 
        :class="{ 'is-active': editor.isActive('italic') }"
        title="Italic"
      >
        <Italic size="16" />
      </button>
      <button 
        @click="editor.chain().focus().toggleStrike().run()" 
        :class="{ 'is-active': editor.isActive('strike') }"
        title="Strike"
      >
        <Strikethrough size="16" />
      </button>
      <button 
        @click="editor.chain().focus().toggleCode().run()" 
        :class="{ 'is-active': editor.isActive('code') }"
        title="Inline Code"
      >
        <Code size="16" />
      </button>
    </div>

    <div class="divider"></div>

    <div class="toolbar-group">
      <button 
        @click="editor.chain().focus().toggleHeading({ level: 1 }).run()" 
        :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
        title="H1"
      >
        <Heading1 size="16" />
      </button>
      <button 
        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" 
        :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
        title="H2"
      >
        <Heading2 size="16" />
      </button>
      <button 
        @click="editor.chain().focus().toggleHeading({ level: 3 }).run()" 
        :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
        title="H3"
      >
        <Heading3 size="16" />
      </button>
    </div>

    <div class="divider"></div>

    <div class="toolbar-group">
      <button 
        @click="editor.chain().focus().toggleBulletList().run()" 
        :class="{ 'is-active': editor.isActive('bulletList') }"
        title="Bullet List"
      >
        <List size="16" />
      </button>
      <button 
        @click="editor.chain().focus().toggleOrderedList().run()" 
        :class="{ 'is-active': editor.isActive('orderedList') }"
        title="Ordered List"
      >
        <ListOrdered size="16" />
      </button>
      <button 
        @click="editor.chain().focus().toggleTaskList().run()" 
        :class="{ 'is-active': editor.isActive('taskList') }"
        title="Task List"
      >
        <CheckSquare size="16" />
      </button>
    </div>

    <div class="divider"></div>

    <div class="toolbar-group">
      <button 
        @click="editor.chain().focus().toggleBlockquote().run()" 
        :class="{ 'is-active': editor.isActive('blockquote') }"
        title="Blockquote"
      >
        <Quote size="16" />
      </button>
      <button 
        @click="editor.chain().focus().toggleCodeBlock().run()" 
        :class="{ 'is-active': editor.isActive('codeBlock') }"
        title="Code Block"
      >
        <SquareCode size="16" />
      </button>
      <button 
        @click="editor.chain().focus().setHorizontalRule().run()"
        title="Horizontal Rule"
      >
        <Minus size="16" />
      </button>
    </div>

    <div class="divider"></div>

    <div class="toolbar-group">
      <button 
        @click="addLink" 
        :class="{ 'is-active': editor.isActive('link') }"
        title="Link"
      >
        <LinkIcon size="16" />
      </button>
      <button 
        @click="addImage" 
        title="Image"
      >
        <ImageIcon size="16" />
      </button>
      <div class="table-button-container" ref="tableButtonRef">
        <button 
          @click="toggleTablePopup"
          title="Table"
          :class="{ 'is-active': showTablePopup }"
        >
          <TableIcon size="16" />
        </button>
        <TablePopup 
          v-if="showTablePopup" 
          @select="insertTable"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { 
  Bold, Italic, Strikethrough, Code, 
  Heading1, Heading2, Heading3, 
  List, ListOrdered, CheckSquare, 
  Quote, SquareCode, Minus, 
  Link as LinkIcon, Image as ImageIcon, Table as TableIcon
} from 'lucide-vue-next'
import TablePopup from './editerTools/tablePopup.vue'

const props = defineProps({
  editor: {
    type: Object,
    required: true
  }
})

const showTablePopup = ref(false)
const tableButtonRef = ref(null)

const toggleTablePopup = () => {
  showTablePopup.value = !showTablePopup.value
}

const closeTablePopup = (event) => {
  if (tableButtonRef.value && !tableButtonRef.value.contains(event.target)) {
    showTablePopup.value = false
  }
}

const insertTable = ({ rows, cols }) => {
  props.editor.chain().focus().insertTable({ rows, cols, withHeaderRow: true }).run()
  showTablePopup.value = false
}

onMounted(() => {
  document.addEventListener('click', closeTablePopup)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', closeTablePopup)
})

const addLink = () => {
  const previousUrl = props.editor.getAttributes('link').href
  const url = window.prompt('URL', previousUrl)

  // cancelled
  if (url === null) {
    return
  }

  // empty
  if (url === '') {
    props.editor.chain().focus().extendMarkRange('link').unsetLink().run()
    return
  }

  // update link
  props.editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
}

const addImage = () => {
  const url = window.prompt('URL')

  if (url) {
    props.editor.chain().focus().setImage({ src: url }).run()
  }
}
</script>

<style lang="scss" scoped>
.toolbar {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;
  padding: 8px;
  border-bottom: 1px solid var(--border-color);
  background-color: var(--bg-color);
  position: sticky;
  top: 0;
  z-index: 10;
}

.toolbar-group {
  display: flex;
  gap: 2px;
}

.divider {
  width: 1px;
  height: 20px;
  background-color: var(--border-color);
  margin: 0 4px;
}

button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px;
  border-radius: 4px;
  color: var(--text-color);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background-color: var(--hover-color);
  }

  &.is-active {
    background-color: rgba(var(--primary-color), 0.1);
    color: var(--primary-color);
    /* Since we are using hex for primary color variable, we can't easily use rgba with it directly in CSS variable unless we change definition.
       For now let's just use a slightly different approach or rely on hover color.
       Let's use a solid background with opacity or just the hover color but darker/different.
    */
    background-color: var(--hover-color);
    color: var(--primary-color);
  }
}
</style>
