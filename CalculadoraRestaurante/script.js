// Variáveis globais
var customers = [];
var products = [];

// Adicionar produto
function addProduct() {
    var productName = document.getElementById('product-name').value;
    var productPrice = parseFloat(document.getElementById('product-price').value);

    if (productName && !isNaN(productPrice)) {
        products.push({
            name: productName,
            price: productPrice
        });

        document.getElementById('product-name').value = '';
        document.getElementById('product-price').value = '';

        renderProductList();
    }
}

// Renderizar lista de produtos
function renderProductList() {
    var productList = document.getElementById('product-list');
    productList.innerHTML = '';

    products.forEach(function (product) {
        var productItem = document.createElement('div');
        productItem.className = 'form-group';

        var productName = document.createElement('span');
        productName.textContent = product.name;

        var productPrice = document.createElement('span');
        productPrice.textContent = ' - R$ ' + product.price.toFixed(2);

        productItem.appendChild(productName);
        productItem.appendChild(productPrice);

        productList.appendChild(productItem);
    });
}

// Calcular divisão da conta
function calculate() {
    var customerNames = document.getElementById('customer-names').value.split(',');

    customers = customerNames.map(function (name) {
        return name.trim();
    });

    var tipPercent = parseFloat(document.getElementById('tip-input').value) || 0;

    var total = 0;
    var resultHTML = '';

    customers.forEach(function (customer) {
        var subtotal = 0;

        products.forEach(function (product) {
            var consumedByCustomer = confirm('O cliente ' + customer + ' consumiu ' + product.name + '?');

            if (consumedByCustomer) {
                subtotal += product.price;
            }
        });

        var tipAmount = subtotal * (tipPercent / 100);
        var totalAmount = subtotal + tipAmount;

        resultHTML += '<li>' + customer + ': R$ ' + totalAmount.toFixed(2) + '</li>';

        total += totalAmount;
    });

    document.getElementById('result-list').innerHTML = resultHTML;

    document.getElementById('result').style.display = 'block';
}

// Adicionar evento de clique no botão "Adicionar Produto"
document.getElementById('add-product-btn').addEventListener('click', addProduct);

// Adicionar evento de clique no botão "Calcular"
document.getElementById('calculate-btn').addEventListener('click', calculate);