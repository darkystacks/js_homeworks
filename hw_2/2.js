const goods = [
    {
        id: 1,
        name: 'Ботинки с дыркой',
        description: 'Крутые ботинки с дыркой',
        sizes: [43, 44, 45, 46],
        price: 1500,
        available: true,
    },
    {
        id: 2,
        name: 'Ботинки с большой дыркой',
        description: 'Крутые ботинки с огромной дыркой',
        sizes: [43, 44, 45, 46, 47, 48, 49, 50],
        price: 15000,
        available: false,
    },
    {
        id: 3,
        name: 'Швабра',
        description: 'Неплохая швабра',
        sizes: ['s', 'm', 'l'],
        price: 150,
        available: true,
    },
    {
        id: 4,
        name: 'Тряпочка',
        description: 'Мокрая тряпка',
        sizes: ['s', 'm', 'l'],
        price: 300,
        available: false,
    },
    {
        id: 5,
        name: 'Пена',
        description: 'Пена для бритья/монтажа',
        sizes: ['one sized'],
        price: 500,
        available: true,
    },
];

const basket = {
    1: {
        goodId: 1,
        amount: 5,
    },
    2: {
        goodId: 2,
        amount: 6,
    },
}
basket.addGood = (GoodId, amount) => {
    basket[GoodId] = {goodId: GoodId, amount: amount}
};
basket.delGood = (GoodId) => {
    delete basket[GoodId]
}

basket.totalAmount = () => {
    let result = 0;
    for (const good in basket) {
        if(basket[good].amount) result += basket[good].amount
    }
    return result
}

basket.totalSumm = () => {
    let result = 0;
    for (const good in basket) {
        if(basket[good].amount) result += basket[good].amount * goods[basket[good].goodId - 1].price
    }
    return result
}

console.log(basket)
basket.addGood(3, 10)
console.log(basket)
basket.delGood(2)
console.log(basket)

console.log(basket.totalAmount())
console.log(basket.totalSumm())

