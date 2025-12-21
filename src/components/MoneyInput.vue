<script setup lang = "ts">
import { reactive, ref } from "vue";
import type { BudgetLog } from "../types";
const emit = defineEmits<{
  (e: 'add', item: BudgetLog): void
}>()
const error = ref('')
const form = reactive({
  name: '',
  amount: null as number | null,
  type: 'expense' as 'income' | 'expense'
})
const onInputAmount = () => {
  error.value = ''
  if (form.amount) {
    if (!Number.isInteger(form.amount) || form.amount <= 0) {
      error.value = '1以上の整数を入力してください'
    } 
  }
}
const onAdd = () => {
  error.value = ''
  if (!form.name || !form.amount) {
    error.value = '項目と金額を入力してください'
    return
  }
  
  const newItem: BudgetLog = {
    id: Date.now(),
    name: form.name,
    amount: form.amount,
    type: form.type
  }
  emit('add', newItem)
  form.name = ''
  form.amount = null
}
</script>

<template>
  <div class = "input-card">
    <div class = "form-group">
      <input type = "text"
        v-model = "form.name"
        placeholder = "項目名"
      >
      <input
        type = "number"
        v-model = "form.amount"
        placeholder = "金額"
        min = "1"
        step = "1"
        @input = "onInputAmount"
      >
    </div>
    <div class = "radio-group">
      <label><input type = "radio" value = "income" v-model = "form.type">収入</label>
      <label><input type = "radio" value = "expense" v-model = "form.type">支出</label>
    </div>
    <div class = "button-area">
      <button @click = "onAdd">追加</button>
      <span v-if = "error" class = "error-message">{{ error }}</span>
    </div>
  </div>
</template>

<style scoped>
.input-card {
  background: #fff;
  padding: 20px;
  border-radius: 12px; /* 角丸 */
  box-shadow: 0 4px 10px rgba(0,0,0,0.05); /* ほんのり影をつける */
  margin-bottom: 20px;
}
.input-button {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}
.form-group {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}
.button-area {
  display: flex;
  align-items: center;
  gap: 15px
}
.error-message {
  color: red;
  font-size: 14px;
  font-weight: bold;
}
input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
}
.radio-group {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 15px;
}
.income-text {
  color: #007bff;
  font-weight: bold;
}
.expense-text {
  color: #dc3545;
  font-weight: bold;
}
</style>