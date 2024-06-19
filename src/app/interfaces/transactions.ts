// export interface Transactions {
//   serialNumber: number;
//   transactionDate: string;
//   transactionRemark: string;
//   creditDebit: string;
//   amountUSD: number;
// }
export interface Transactions {
  date: string;
  bankname: string;
  transaction_type: string;
  transaction_value: number;
  new_balance: number;
}
