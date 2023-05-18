var form = document.getElementById('addform');
var nameInput = document.getElementById('name');
var amountInput = document.getElementById('amount');
var categoryInput = document.getElementById('category');
var itemList = document.getElementById('users');

form.addEventListener('submit', addItem);

function addItem(e) {
  e.preventDefault();

  if (amountInput.value === '' || nameInput.value === '' || categoryInput.value === '') {
    alert('Please enter all fields');
    return;
  }

  var item = {
    name: nameInput.value,
    amount: amountInput.value,
    category: categoryInput.value
  };

  localStorage.setItem(item.name, JSON.stringify(item));

  var li = document.createElement('li');
  li.className = 'item';
  
  var itemText = document.createTextNode(`Name : ${item.name} - Amount : ${item.amount} - Category : ${item.category}`);
  li.appendChild(itemText);

  var delBtn = document.createElement('button');
  delBtn.className = 'delete-btn';
  delBtn.appendChild(document.createTextNode('Delete'));
  li.appendChild(delBtn);

  var editBtn = document.createElement('button');
  editBtn.className = 'edit-btn';
  editBtn.appendChild(document.createTextNode('Edit'));
  li.appendChild(editBtn);

  itemList.appendChild(li);

  delBtn.addEventListener('click', deleteItem);
  editBtn.addEventListener('click', editItem);

  // clear form inputs
  nameInput.value = '';
  amountInput.value = '';
  categoryInput.value = '';
}

function deleteItem(e) {
  if (confirm('Are you sure?')) {
    var li = e.target.parentElement;
    localStorage.removeItem(li.firstChild.textContent.split(':')[1].trim());
    itemList.removeChild(li);
  }
}

function editItem(e) {
  var li = e.target.parentElement;

  var itemText = li.firstChild.textContent.split(':');
  var name = itemText[1].trim();
  var amount = itemText[2].trim();
  var category = itemText[3].trim();

  nameInput.value = name;
  amountInput.value = amount;
  categoryInput.value = category;

  localStorage.removeItem(name);
  itemList.removeChild(li);
}
