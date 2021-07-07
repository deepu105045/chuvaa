
export interface Transaction{
  id?: string;
  userId?: string;
  transactionDate: Date;
  category: string;
  amount: number;
  type: string;
  createdAt: object;
}
