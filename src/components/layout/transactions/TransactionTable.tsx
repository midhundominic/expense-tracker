import { useApp } from "../../../context/AppContext";

const TransactionTable = () => {
  const { transactions, role } = useApp();

  return (
    <div className="bg-white p-4 rounded shadow">
      <table className="w-full">
        <thead>
          <tr className="text-left border-b">
            <th>Date</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Type</th>
            {role === "admin" && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx.id} className="border-b">
              <td>{tx.date}</td>
              <td>{tx.category}</td>
              <td>₹{tx.amount}</td>
              <td>{tx.type}</td>
              {role === "admin" && <td>Edit</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;