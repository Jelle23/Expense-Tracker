export interface Transaction {
    id: string,
    text: string,
    type: 'income' | 'expense' | '',
    category: string,
    amount: number,
    date: Date;
}