export interface BudgetLog {
  id: number
  name: string
  amount: number
  type: 'income' | 'expense'
}