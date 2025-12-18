<template>
  <div class="table-popup" @click.stop>
    <div class="grid-container">
      <div v-for="row in 8" :key="`row-${row}`" class="grid-row">
        <div
          v-for="col in 5"
          :key="`col-${col}`"
          class="grid-cell"
          :class="{ active: row <= hoverRow && col <= hoverCol }"
          @mouseover="handleMouseOver(row, col)"
          @click="handleSelect(row, col)"
        ></div>
      </div>
    </div>
    <div class="status-text">{{ hoverRow }} x {{ hoverCol }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['select'])

const hoverRow = ref(1)
const hoverCol = ref(1)

const handleMouseOver = (row, col) => {
  hoverRow.value = row
  hoverCol.value = col
}

const handleSelect = (row, col) => {
  emit('select', { rows: row, cols: col })
}
</script>

<style lang="scss" scoped>
.table-popup {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 10px;
  z-index: 20;
  margin-top: 4px;
}

.grid-container {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.grid-row {
  display: flex;
  gap: 2px;
}

.grid-cell {
  width: 16px;
  height: 16px;
  border: 1px solid var(--border-color);
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.1s;
  background-color: var(--bg-color);

  &.active {
    background-color: var(--primary-color);
    border-color: var(--primary-color);
    opacity: 0.7;
  }

  &:hover {
    opacity: 1;
  }
}

.status-text {
  text-align: center;
  margin-top: 8px;
  font-size: 12px;
  color: var(--text-color);
}
</style>
