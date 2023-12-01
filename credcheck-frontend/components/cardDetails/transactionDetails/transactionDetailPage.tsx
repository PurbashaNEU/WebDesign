export default function TransactionDetailPage ({transactionData}: any) {
    return (
        <tr>
            <td> {transactionData?.['amount_paid']} </td>
            <td> {transactionData?.['transaction_date']} </td>
            <td> {transactionData?.['status']} </td>
        </tr>
    )
}