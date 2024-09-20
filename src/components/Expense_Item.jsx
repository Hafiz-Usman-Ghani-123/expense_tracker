import { useState } from "react";
import "./expense.css";

// Main Heading Component
let name = prompt("Enter Your Name");
if (name === "") {
  name = "Your's";
}
const Heading = () => {
  return <h1 className="heading">TODAY'S EXPENSES OF {name.toUpperCase()}</h1>;
};

// Expense Item Component
const ExpenseItem = ({ date, description, amount }) => {
  return (
    <div className="mainDiv">
      <div className="expense_desc">
        <p>Description : {description}</p>
        <p>Date : {date}</p>
        <p className="amount">Rs : {amount}</p>
      </div>
    </div>
  );
};

// AddExpense Form Component
const AddExpense = ({ onAddExpense }) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (ev) => {
    ev.preventDefault();

    // Create a new Date object
    const date = new Date();
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = date.toLocaleDateString("en-GB", options);

    //  new expense ko add krny k liye function call kiya hy
    onAddExpense({
      description,
      amount,
      date: formattedDate,
    });

    // Reset form fields
    setDescription("");
    setAmount("");
  };

  return (
    <form onSubmit={handleSubmit} id="form">
      <label>
        Description:
        <input
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={20}
          id="desc"
          required
        />
      </label>
      <label>
        Amount:
        <input
          type="number"
          name="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          id="amount"
          required
        />
      </label>
      <input type="submit" value="Submit" id="btn" />
    </form>
  );
};

// expenses ko manage krny k liye  Main Component
const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);

  const addExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };

  return (
    <div>
      <Heading />
      <AddExpense onAddExpense={addExpense} />
      <div>
        {expenses.map((expense, index) => (
          <ExpenseItem
            key={index}
            date={expense.date}
            description={expense.description}
            amount={expense.amount}
          />
        ))}
      </div>
    </div>
  );
};

export { ExpenseItem, Heading, AddExpense, ExpenseTracker };
