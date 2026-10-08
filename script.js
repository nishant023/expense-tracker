// var STORAGE_KEY = "expenses";
// var expenses = [];

// try {
//   var saved = localStorage.getItem(STORAGE_KEY);
//   expenses = saved ? JSON.parse(saved) : [];
//   if (!Array.isArray(expenses)) expenses = [];
// } catch (e) {
//   expenses = [];
// }

// function saveExpenses() {
//   try {
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
//   } catch (e) {}
// }

// function renderExpenses() {
//   var list = document.getElementById("expenseList");
//   list.innerHTML = "";

//   expenses.forEach(function (expense, index) {
//     var li = document.createElement("li");
//     li.textContent = expense.amount + " - " + expense.category + " - " + expense.description + " ";

//     var delBtn = document.createElement("button");
//     delBtn.textContent = "Delete Expense";
//     delBtn.addEventListener("click", function () {
//       expenses.splice(index, 1);
//       saveExpenses();
//       renderExpenses();
//     });

//     var editBtn = document.createElement("button");
//     editBtn.textContent = "Edit Expense";
//     editBtn.addEventListener("click", function () {
//       var newAmount = prompt("Edit amount:", expense.amount);
//       if (newAmount === null) return;
//       var newCategory = prompt("Edit category:", expense.category);
//       if (newCategory === null) return;
//       var newDescription = prompt("Edit description:", expense.description);
//       if (newDescription === null) return;

//       if (newAmount.trim() !== "") expense.amount = newAmount.trim();
//       if (newCategory.trim() !== "") expense.category = newCategory.trim();
//       if (newDescription.trim() !== "") expense.description = newDescription.trim();

//       saveExpenses();
//       renderExpenses();
//     });

//     li.appendChild(delBtn);
//     li.appendChild(document.createTextNode(" "));
//     li.appendChild(editBtn);
//     list.appendChild(li);
//   });
// }

// document.getElementById("addBtn").addEventListener("click", function () {
//   var amountEl = document.getElementById("amount");
//   var descEl = document.getElementById("description");
//   var catEl = document.getElementById("category");

//   var amount = amountEl.value.trim();
//   var description = descEl.value.trim();
//   var category = catEl.value.trim();
//   if (amount === "" || description === "" || category === "") return;

//   expenses.push({
//     amount: amount,
//     description: description,
//     category: category
//   });

//   saveExpenses();
//   renderExpenses();

//   amountEl.value = "";
//   descEl.value = "";
//   catEl.value = "";
// });

// renderExpenses();


// Get saved expenses from localStorage (or start with an empty list)
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// Show expenses on the screen
function showExpenses() {
  let list = document.getElementById("expenseList");
  list.innerHTML = "";

  for (let i = 0; i < expenses.length; i++) {
    list.innerHTML += `
      <li class="list-group-item">
        ${expenses[i].amount} - ${expenses[i].category} - ${expenses[i].description}
        <button onclick="deleteExpense(${i})" class="btn btn-danger btn-sm">Delete Expense</button>
        <button onclick="editExpense(${i})" class="btn btn-warning btn-sm">Edit Expense</button>
      </li>
    `;
  }
}

// Add a new expense
function addExpense() {
  let amount = document.getElementById("amount").value;
  let description = document.getElementById("description").value;
  let category = document.getElementById("category").value;

  if (amount == "" || description == "" || category == "") {
    return;
  }

  expenses.push({ amount: amount, description: description, category: category });
  localStorage.setItem("expenses", JSON.stringify(expenses));
  showExpenses();

  document.getElementById("amount").value = "";
  document.getElementById("description").value = "";
  document.getElementById("category").value = "";
}

// Delete an expense
function deleteExpense(index) {
  expenses.splice(index, 1);
  localStorage.setItem("expenses", JSON.stringify(expenses));
  showExpenses();
}

// Edit an expense
function editExpense(index) {
  let newAmount = prompt("Edit amount:", expenses[index].amount);
  let newCategory = prompt("Edit category:", expenses[index].category);
  let newDescription = prompt("Edit description:", expenses[index].description);

  if (newAmount && newCategory && newDescription) {
    expenses[index].amount = newAmount;
    expenses[index].category = newCategory;
    expenses[index].description = newDescription;
    localStorage.setItem("expenses", JSON.stringify(expenses));
    showExpenses();
  }
}

// Show saved expenses when the page loads
showExpenses();