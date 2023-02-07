
let title = document.getElementById('title')
let price = document.getElementById('price')
let taxes = document.getElementById('taxes')
let ads = document.getElementById('ads')
let descount = document.getElementById('descount')
let total = document.getElementById('total');
let count = document.getElementById('count')
let category = document.getElementById('category')
let submit = document.getElementById('submit')
let mood = 'create';
let temp;
let searchMood = 'title';
function getTotal() {
    if (price.value != "") {
        let result = (+price.value + +ads.value + +taxes.value)
            - +descount.value;
        total.innerHTML = result;
        total.style.backgroundColor = 'green'
    }
    else {
        total.innerHTML = "";
        total.style.backgroundColor = 'red';
    }
}
let dataProduct;
if (localStorage.product != null) {
    dataProduct = JSON.parse(localStorage.product)
}
else {
    dataProduct = [];
}

submit.onclick = function () {
    let newProduct = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        descount: descount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }
    if (title.value != '' &&
        price.value != '' &&
        category.value != '' &&
        count.value <= 100) {
        if (mood === 'create') {
            if (newProduct.count > 1) {
                for (let i = 0; i < newProduct.count; i++) {
                    dataProduct.push(newProduct);
                }
            }
            else {
                dataProduct.push(newProduct);
            }
        }
        else {
            dataProduct[temp] = newProduct;
            mood = 'create';
            submit.innerHTML = 'Create'
            count.style.display = 'block'
        }
        clear();
    }


    localStorage.setItem('product', JSON.stringify(dataProduct));

    showData();
    // updateData();
}
function clear() {
    title.value = "";
    price.value = '';
    ads.value = '';
    descount.value = '';
    taxes.value = '';
    total.innerHTML = '';
    category.value = '';
    count.value = '';
    getTotal();

}
function showData() {
    let table = '';

    for (let i = 0; i < dataProduct.length; i++) {
        table += `
       <tr>
       <td>${i}</td>
       <td>${dataProduct[i].title}</td>
       <td>${dataProduct[i].price}</td>
       <td>${dataProduct[i].taxes}</td>
       <td>${dataProduct[i].ads}</td>
       <td>${dataProduct[i].descount}</td>
       <td>${dataProduct[i].total}</td>
       <td>${dataProduct[i].category}</td>
       <td><button onclick="updateData(${i})" id="update">Update</button></td>
       <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
    </tr>`
    }
    document.getElementById('tbody').innerHTML = table;
    let deleteAllBtn = document.getElementById('delete-all')
    if (dataProduct.length > 0) {
        deleteAllBtn.innerHTML =
            `<button onclick="deleteAll()">Delete All (${dataProduct.length})</button>`
    }
    else {
        deleteAllBtn.innerHTML = '';
    }
    getTotal();
}

function deleteData(i) {
    dataProduct.splice(i, 1);
    localStorage.product = JSON.stringify(dataProduct);
    showData()
}
function deleteAll() {
    localStorage.clear();
    dataProduct.splice(0);
    showData();

}
function updateData(i) {
    title.value = dataProduct[i].title;
    price.value = dataProduct[i].price;
    taxes.value = dataProduct[i].taxes;
    ads.value = dataProduct[i].ads;
    descount.value = dataProduct[i].descount;
    category.value = dataProduct[i].category;
    getTotal()
    count.style.display = 'none';
    submit.innerHTML = 'Update';
    mood = 'Update';
    temp = i;
    scroll({
        top: 0,
        behavior: "smooth"
    })
    // console.log(i)
}
function getSearchMood(id) {
    let searching = document.getElementById('search');
    if (id == 'search-title') {

        searchMood = 'title';
        searching.placeholder = 'Search By Title';
    }
    else {
        searchMood = 'category';
        searching.placeholder = 'Search By category';
    }
    searching.focus();
    searching.value = '',
        showData();
}
function searchInData(value) {
    let table = '';
    if (searchMood == 'title') {
        for (let i = 0; i < dataProduct.length; i++) {
            if (dataProduct[i].title.includes(value.toLowerCase())) {
                table += `
                <tr>
                <td>${i}</td>
                <td>${dataProduct[i].title}</td>
                <td>${dataProduct[i].price}</td>
                <td>${dataProduct[i].taxes}</td>
                <td>${dataProduct[i].ads}</td>
                <td>${dataProduct[i].descount}</td>
                <td>${dataProduct[i].total}</td>
                <td>${dataProduct[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">Update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
                </tr>`
                // console.log(i)
            }
        }
    }
    else {
        for (let i = 0; i < dataProduct.length; i++) {
            if (dataProduct[i].category.includes(value.toLowerCase())) {
                table += `
                <tr>
                <td>${i}</td>
                <td>${dataProduct[i].title}</td>
                <td>${dataProduct[i].price}</td>
                <td>${dataProduct[i].taxes}</td>
                <td>${dataProduct[i].ads}</td>
                <td>${dataProduct[i].descount}</td>
                <td>${dataProduct[i].total}</td>
                <td>${dataProduct[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">Update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
                </tr>`
                // console.log(i)
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}

showData()
function changeMood(r) {
    var element = document.body;
    element.classList.toggle("dark-mode");
}
