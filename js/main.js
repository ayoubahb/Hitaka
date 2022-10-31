// -----------------Option select------------------

var select = document.getElementById('choix');
var cards = document.getElementsByClassName('items');

select.onchange = function () {
	var selectedValue = select.value;
	for (let index = 0; index < cards.length; index++) {
		if (selectedValue == 'tous') {
			cards[index].style.display = 'flex';
		} else if (!cards[index].classList.contains(selectedValue)) {
			cards[index].style.display = 'none';
		} else {
			cards[index].style.display = 'flex';
		}
	}
};
// ----------------------card-------------------------
var key = true;
var icon = document.getElementById('icon');
var card = document.getElementById('cart');

icon.onclick = function () {
	if (key) {
		card.style.transform = 'translateY(0)';
	} else {
		card.style.transform = 'translateY(-1000px)';
	}
	key = !key;
};
// -----------------------------------------------

let ajout = document.querySelectorAll('.ajout');
let table = document.querySelector('table tbody');
let itemNum = document.querySelector('.num-items');

for (let element of ajout) {
	element.addEventListener('click', addToCartd);
}
// -----------------------------------------------
var btnDelete = document.querySelectorAll('.delete');
for (let element of btnDelete) {
	element.addEventListener('click', rmv);
}
// -----------------------------------------------
var inputQty = document.querySelectorAll('.qty');
for (let element of inputQty) {
	element.addEventListener('change', inputUpdt);
}
// -----------------------------------------------
let checkout = document.querySelector('.checkout');
checkout.addEventListener('click', function () {
	let validItems = table.querySelectorAll('tr');
	if (validItems.length == 0) return;
	for (let element of validItems) {
		element.remove();
	}
	itemNum.textContent = '0';
	itemNum.style.display = 'none';
	updateCartTotal();
	alert('Votre commande est effectue');
});

//------------functions--------------
function addToCartd(event) {
	let existItems = document.querySelectorAll('tr .itemName');
	let childs = event.target.parentNode.parentNode.childNodes;
	for (let i = 0; i < existItems.length; i++) {
		if (existItems[i].textContent == childs[3].textContent) {
			table.childNodes[i].childNodes[5].firstChild.value++;
			updateCartTotal();
			return;
		}
	}
	let newItem = document.createElement('tr');
	newItem.innerHTML = `
				<td><img src="${childs[1].attributes[0].nodeValue}" width="70px" height="70px" /></td>
				<td>
					<h4 style="text-align: left;" class = "itemName">${childs[3].textContent}</h4>
				</td>
				<td><input class="qty" type="number" value="1" /></td>
				<td class="price">${childs[7].childNodes[1].textContent}</td>
				<td><i class="fa-solid fa-trash fa-1x delete" style="color: #fff"></i></td>
			`;
	table.appendChild(newItem);
	newItem.querySelector('.delete').addEventListener('click', rmv);
	newItem.querySelector('.qty').addEventListener('change', inputUpdt);
	itemNum.style.display = 'unset';
	itemNum.textContent++;
	updateCartTotal();
}
function inputUpdt(event) {
	if (isNaN(event.target.value) || event.target.value == 0) {
		rmv(event);
	}
	updateCartTotal();
}
function rmv(event) {
	event.target.parentElement.parentElement.remove();
	itemNum.textContent--;
	if (itemNum.textContent == '0') {
		itemNum.style.display = 'none';
	}
	updateCartTotal();
}
function updateCartTotal() {
	var tableRows = table.querySelectorAll('tr');
	var total = 0;
	for (let element of tableRows) {
		var priceElement = element.querySelector('.price');
		var quantityElement = element.querySelector('.qty');
		var price = parseFloat(priceElement.innerHTML.replace('$', ''));
		var quantity = quantityElement.value;

		total = total + price * quantity;
	}
	document.querySelector('.totalprice').innerHTML = total;
}
