
export interface Transaction{
  id?: string;
  userId?: string;
  transactionDate: Date;
  category: string;
  amount: string;
  type: string;
  createdAt: object;
}
