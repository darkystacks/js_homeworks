class Good {
    constructor(id, name, description, sizes, price, available) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.sizes = sizes;
        this.price = price;
        this.available = available;
    }

    setAvailable(value) {
        this.available = value;
    }
}

let instancesOfBasketGoods = []; //не нашел иного решения помимо глоб переменной

class BasketGood extends Good {
    constructor(good, amount) {
        super();
        this.id = good.id;
        this.name = good.name;
        this.description = good.description;
        this.sizes = good.sizes;
        this.price = good.price;
        this.available = good.available;
        this.amount = amount;
        instancesOfBasketGoods.push(this);
    }
}

class GoodsList {
    #goods

    constructor(goods, filter, sortPrice, sortDir) {
        this.#goods = goods;
        this.filter = new RegExp(filter);
        this.sortPrice = sortPrice;
        this.sortDir = sortDir;
    }

    filSortsUsed() {
        let result;
        this.#goods = this.#goods.filter(good => this.filter.test(good.name))
        if (this.sortPrice && this.sortDir) {
            this.#goods.sort((good1, good2) => good1.price - good2.price);
        } else if (this.sortPrice && !this.sortDir) {
            this.#goods.sort((good1, good2) => good2.price - good1.price);
        }
        this.#goods = this.#goods.filter(good => good.available)
    }

    get list() {
        this.filSortsUsed();
        return this.#goods
    }

    add(good) {
        this.#goods.push(good);
    }

    remove(goodId) {
        this.#goods = this.#goods.filter((obj) => obj.id !== goodId)
    }
}


class Basket {
    amountResult;
    sumResult;
    gb;
    gbdel;
    addTest;
    add(good, amount) {
        this.gb = new BasketGood(good, amount);
        instancesOfBasketGoods.splice(instancesOfBasketGoods.length - 1);
        instancesOfBasketGoods.forEach((goodtest) => {
            if(this.gb.name === goodtest.name) {
                this.addTest = 1;
                goodtest.amount += this.gb.amount
            }
            });
        if(this.addTest === undefined) {
            instancesOfBasketGoods.push(this.gb)
        }
    }
    remove(good, amount) {
        this.gbdel = new BasketGood(good, amount);
        instancesOfBasketGoods.splice(instancesOfBasketGoods.length - 1);
        instancesOfBasketGoods.forEach((delTest) => {
            if(this.gbdel.name === delTest.name) {
                delTest.amount -= this.gbdel.amount;
                if(delTest.amount <= 0) {
                    instancesOfBasketGoods = instancesOfBasketGoods.filter((obj) => obj.id !== delTest.id)
                }
            }
        });
    }
    clear() {
        instancesOfBasketGoods = []
    }

    removeUnavailable() {
        instancesOfBasketGoods = instancesOfBasketGoods.filter((obj) => obj.available === 1)
    }


    get totalAmount() {
        this.amountResult = 0;
        instancesOfBasketGoods.forEach((good) => this.amountResult += good.amount)
        return this.amountResult
    }

    get totalSum() {
        this.sumResult = 0;
        instancesOfBasketGoods.forEach((good) => this.sumResult += good.amount * good.price)
        return this.sumResult
    }

}

g1 = new Good(1, 'Яблоко', 'Зеленое', ['s', 'm', 'l'], 100, 1);
g2 = new Good(2, 'Банан', 'Желтый', ['s', 'm', 'l'], 110, 1);
g3 = new Good(3, 'Морковь', 'Оранж', ['s', 'm', 'l'], 10, 1);
g4 = new Good(4, 'Арбуз', 'Зеленый', ['s', 'm', 'l'], 1000, 0);
g5 = new Good(5, 'Клубника', 'Красная', ['s', 'm', 'l'], 250, 1);

g1b = new BasketGood(g1, 10);
g2b = new BasketGood(g2, 5);
g5b = new BasketGood(g5, 1);

bas = new Basket
lst = new GoodsList([g1, g2, g4, g5], '', 1, 1); //вторым параметром можем задать регулярное выражение
// console.log(lst.list)
g5.setAvailable(0) // убираем клубнику со склада
console.log(lst.list)
lst.add(g3) //добавляем в каталог морковь
console.log(lst.list)
g5.setAvailable(1) //возвращаем клубнику
lst.add(g5) //добавляем клубнику
console.log(lst.list)
lst.remove(3) //убираем морковь
console.log(lst.list)
lst.add(g3) //снова добавляем морковь
console.log(lst.list)
console.log('================================================================')
console.log(instancesOfBasketGoods)

console.log(bas.totalAmount)
console.log(bas.totalSum)

bas.remove(g5, 1)
console.log(instancesOfBasketGoods)
bas.clear()
console.log(instancesOfBasketGoods)
bas.add(g3, 3)
bas.add(g4, 4)
console.log(instancesOfBasketGoods)
bas.removeUnavailable()
console.log(instancesOfBasketGoods)





