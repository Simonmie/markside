<template>
  <div class="side-panel-container">
    <!-- 主编辑区 -->
    <div class="main-edit-area">
      <!-- 头部工具栏 -->
      <!-- markdown 编辑/渲染区域 -->
      <!-- 底部快捷方式 -->
    </div>
    <!-- 左侧抽屉 -->
    <div class="drawer-container">
      <!-- 抽屉内容 -->
    </div>
  </div>
</template>

<script setup>
defineOptions({
  name: 'SidePanel',
})
</script>

<style lang="scss" scoped>
.side-panel-container {
  display: flex;
}
</style>
