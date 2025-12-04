<script setup lang = "ts">
import type { BudgetLog } from "../types";
defineProps<{
  items: BudgetLog[]
}>()
const emit = defineEmits<{
  (e: 'delete', id: number): void
}>()
</script>

<template>
  <ul class = "item-list">
    <li v-for="item in items" :key = "item.id" class = "item">
      <span>{{ item.name }}</span>
      <div class = "item-price">
        <span :class = "item.type === 'income' ? 'plus' : 'minus'">
          {{ item.amount.toLocaleString() }}円
        </span>
        <button @click = "emit('delete', item.id)">削除</button>
      </div>
    </li>
  </ul>
</template>

<style scoped>
.item-list {
  list-style: none;
  padding: 0;
}
.item {
  background: white;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 5px rgba(0,0,0,0.03);
}
.plus {
  color: blue;
  font-weight: bold;
}
.minus {
  color: red;
  font-weight: bold;
}
</style>