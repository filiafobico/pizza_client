const items = getLocalStorage() || []
let discount = 1

function saveLocalStorage(items) {
    sessionStorage.setItem('items', JSON.stringify(items));
}

function getLocalStorage() {
    return JSON.parse(sessionStorage.getItem('items'))
}

function addItem({ name, value, qtd = 1 }) {
    items.push({ name, value, qtd })
    saveLocalStorage(items)
    return items.length
}

function getFinalPrice() {
    return (items.reduce((finalValue, { value, qtd }) => +finalValue + (+value*+qtd), 0) * discount).toFixed(2)
}

function removeItem(index) {
    items.splice(index, 1)
    saveLocalStorage(items)
    return items
}

function getItems() {
    return items
}

function getTotalItems() {
    return items.reduce((finalValue, { qtd }) => +finalValue +qtd, 0)
}

function updateCartFinalPrice({ total, finalValue }) {
    document.getElementsByClassName('cart-total')[0].innerText = `${total} items $${finalValue}`
}

function plusQtd(index) {
    items[index].qtd++
    saveLocalStorage(items)
}

function minusQtd(index) {
    const qtd = items[index].qtd--
    if (qtd === 1) {
        removeItem(index)
    }
    saveLocalStorage(items)
}

function setCupom(name) {
    console.log(name)
    if (name === 'UTFPR') {
        discount = 0.75
        return alert('Cupom applied')
    }
    discount = 1
    alert('Invalid Cupum')
}

function cleanItems() {
    items.length = 0
    discount = 1
    saveLocalStorage(items)
}