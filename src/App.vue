<script setup lang="ts">
import { ref, computed } from "vue";
import type { BudgetLog } from "./types";
import MoneyInput from "./components/MoneyInput.vue";
import MoneyList from "./components/MoneyList.vue";
const items = ref<BudgetLog[]>([
  { id: 1, name: 'お年玉', amount: 5000, type: 'income' },
  { id: 2, name: 'マンガ', amount: 500, type: 'expense' }
])
const handleAdd = (newItem: BudgetLog) => {
  items.value.push(newItem)
}
const handleDelete = (id: number) => {
  items.value = items.value.filter(item => item.id !== id)
}
const totalAmount = computed(() => {
  return items.value.reduce((sum, item) => {
    return sum + (item.type === 'income' ? item.amount : -item.amount)
  }, 0)
})
</script>

<template>
  <div class = "container">
    <h1>家計簿アプリ</h1>
    <MoneyInput @add = "handleAdd" />
    <div class = "balance">
      <h2>残高: {{ totalAmount.toLocaleString() }}</h2>
    </div>
    <MoneyList :items = "items" @delete = "handleDelete" />
  </div>
</template>

<style scoped>
.container {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  font-family: sans-serif;
}
.balance {
  text-align: right;
  font-size: 24px;
  margin-bottom: 20px;
}
</style>