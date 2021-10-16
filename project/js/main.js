

class ProductList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this._fetchProducts();
        // this.render();//вывод товаров на страницу
        this.sumAllProduct = 0;
        this.sumProducts();
    }
    _fetchProducts() {
        fetch('https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json')
            .then(data => data.json())
            .then(data => {
                data.forEach(el => {
                    this.goods.push({ id: el.id_product, title: el.product_name, price: el.price })
                });
                this.render();
                let all_button = document.querySelectorAll('.buy-btn')
                all_button.forEach(el => el.addEventListener('click', (e) => {
                    basket.addProduct(e.target)
                    basket.render()
                }))
            });

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
                <button data-id=${this.id} data-img="${this.img}" data-title="${this.title}" data-price="${this.price}" class="buy-btn">Купить</button>
            </div> `
    }
}


let list = new ProductList();

// Добавьте пустые классы для Корзины товаров и Элемента корзины товаров. Продумайте, какие методы понадобятся для работы с этими сущностями.
class Basket {
    constructor(n) {
        this.countProducts = n; // количество товаров
        this.product_list = [];
        this.sumAllProduct = 0; //сумма товаров
        // this.render();// вывод всех товаров в корзине
    }

    sumProducts() {
        this.product_list.forEach(el => this.sumAllProduct += Number(el.price))
        console.log(this.sumAllProduct)
    }

    addProduct(product) {
        this.id = product.dataset['id']
        this.img = product.dataset['img']
        this.title = product.dataset['title']
        this.price = product.dataset['price']
        this.product_list.push({ id: this.id, img: this.img, title: this.title, price: this.price });
        this.countProducts += 1;
        this.sumProducts()
        this.render();
    }

    render() {
        const block = document.querySelector('.cart-block');
        block.innerHTML = '';
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

let basket = new Basket(0);

document.querySelector('.btn-cart').addEventListener('click', () => {
    document.querySelector('.cart-block').classList.toggle('invisible');
});
