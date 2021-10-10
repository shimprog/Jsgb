class ProductList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this._fetchProducts();
        this.render();//вывод товаров на страницу
        this.sumAllProduct = 0;
        this.sumProducts();
    }
    _fetchProducts() {
        this.goods = [
            { id: 1, title: 'Notebook', price: 2000 },
            { id: 2, title: 'Mouse', price: 20 },
            { id: 3, title: 'Keyboard', price: 200 },
            { id: 4, title: 'Gamepad', price: 50 },
        ];
    }

    // добавьте для GoodsList метод, определяющий суммарную стоимость всех товаров.
    sumProducts() {
        this.goods.forEach(el => this.sumAllProduct += el.price)
        console.log(this.sumAllProduct)
    }

    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const item = new ProductItem(product);
            block.insertAdjacentHTML("beforeend", item.render());
            //           block.innerHTML += item.render();
        }
    }
}


class ProductItem {
    constructor(product, img = 'https://via.placeholder.com/200x150') {
        this.title = product.title;
        this.id = product.id;
        this.price = product.price;
        this.img = img;
    }

    render() {

        return `<div class="product-item">
                <img src="${this.img}">
                <h3>${this.title}</h3>
                <p>${this.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
    }
}


let list = new ProductList();

// Добавьте пустые классы для Корзины товаров и Элемента корзины товаров. Продумайте, какие методы понадобятся для работы с этими сущностями.
class Basket {
    constructor(n) {
        this.countProducts = n; // количество товаров
        this.product_list = [];
        this.sumAllProduct = 0; //сумма товаров
        this.render(); // вывод всех товаров в корзине
    }

    sumProducts() {
        this.product_list.forEach(el => this.sumAllProduct += Number(el.price))
        console.log(this.sumAllProduct)
    }

    addProduct(product) {
        product = product.split(/[\n\t]+/g)
        product.pop()
        this.countProducts += 1
        this.product_list.push({ title: product[0], price: product[1] })
        this.sumProducts()
    }

    render() {
        const block = document.querySelector('.basket');
        block.innerHTML = ''
        for (let product of this.product_list) {
            const item = new BasketItem(product);
            block.innerHTML += item.render();
        }
    }

}

class BasketItem {
    constructor(product, img = 'https://via.placeholder.com/200x150') {
        this.title = product.title;
        this.price = product.price;
        this.img = img;
    }

    render() {
        return `<div class="product-item">
                <img src="${this.img}">
                <h3>${this.title}</h3>
                <p>${this.price}</p>
            </div>`
    }
}

let basket = new Basket(0)
let all_button = document.querySelectorAll('.buy-btn')
all_button.forEach(el => el.addEventListener('click', (e) => {
    basket.addProduct(e.target.parentElement.innerText)
    basket.render()
}))


//const products = [
//    {id: 1, title: 'Notebook', price: 2000},
//    {id: 2, title: 'Mouse', price: 20},
//    {id: 3, title: 'Keyboard', price: 200},
//    {id: 4, title: 'Gamepad', price: 50},
//];
//
//const renderProduct = (product,img='https://placehold.it/200x150') => {
//    return `<div class="product-item">
//                <img src="${img}">
//                <h3>${product.title}</h3>
//                <p>${product.price}</p>
//                <button class="buy-btn">Купить</button>
//            </div>`
//};
//const renderPage = list => document.querySelector('.products').innerHTML = list.map(item => renderProduct(item)).join('');
//
//renderPage(products);