import { menuArray } from '/data.js'

//----------------GLOBAL VARIABLES--------------

let orderedItems = []

// ------------EVENT LISTENERS----------------

document.addEventListener("click", function(e) {
    if (e.target.classList.value.includes("add-btn")) {
        document.getElementById("order-summary").classList.remove("hidden")
        getOrderItems(e.target.dataset.id)
    } else if (e.target.dataset.remove) {
        const removedItemId = e.target.dataset.remove
        
        for (let i = 0; i < orderedItems.length; i++) {
            if (orderedItems[i].id == removedItemId) {
                orderedItems.splice(i, 1)
            }
        }
    } else if (e.target.id === "complete-order-btn") {
        document.getElementById('payment-modal').style.display = "inline"
    }
    
    render()
})

document.getElementById('payment-form').addEventListener("submit", function(e) {
    e.preventDefault()
    
    const paymentFormData = new FormData(document.getElementById('payment-form'))
    const customerName = paymentFormData.get('name')
    
    document.getElementById('order-confirmation').classList.remove("hidden")
    document.getElementById('payment-modal').style.display = "none"
    document.getElementById('order-confirmation').innerHTML = getOrderConfirmationHtml(customerName)
    
    orderedItems = []

    // if this were a "real" form .submit() would be used instead of .reset().
    document.getElementById('payment-form').reset()
    
    render()
})
  
// --------------GENERAL FUNCTIONS-----------------------

    
function getOrderItems(itemId) {    
    const orderedItemObj = menuArray.filter(function(menuItem) {
        return menuItem.id == itemId
    })[0]
    
    if (!orderedItems.includes(orderedItemObj)) {
        orderedItems.push(orderedItemObj)
    }
    return orderedItems
}

function getTotalPrice() {
    let totalPrice = 0
    
    orderedItems.forEach(function(item) {
        totalPrice += item.price
    })
    
    return totalPrice
}

// When # of a given item is added, add # of item as separate variable to be multiplied by within the forEach instead of refactoring how orderedItems works.

// Addtional extra credit, maybe add ability to customize toppings on the pizza?  You'd want a variable to store the array of toppings, and that would need to be displayed in the order summary html.

//--------------HTML FUNCTIONS------------------


function getMenuHtml() {
    let menuHtml = ``
    
    menuArray.forEach(function(menuItem) {
        menuHtml += `
        <div class="menu-item-container">
            <div class="emoji-container">
                <p class="menu-item-emoji">${menuItem.emoji}</p>
            </div>
            <div class="menu-details-container">
                <h2 class="menu-item-name">${menuItem.name}</h2>
                <p class="menu-item-ingredients">${menuItem.ingredients.join(', ')}</p>
                <p class="menu-item-price">\$${menuItem.price}</p>
            </div>
            <div class="add-btn-container">
                <button class="add-btn" data-id="${menuItem.id}">+</button>
            </div>
        </div>
        <div class="menu-item-divider"></div>
        `
    })
    
    return menuHtml
}

function getOrderItemsHtml() {
    let orderItemsHtml = ``    
    
    // Extra Credit: change remove button to display number of item with increment and decrement buttons.  ACTUALLY don't change remove button since that can remove ALL instances of that item, and we won't have to refactor the event listener.
    
    orderedItems.forEach(function(item) {
        
        orderItemsHtml += `
        <div class="order-item-container">
            <p class="order-summary-title">${item.name}</p>
            <button class="remove-item-btn" data-remove="${item.id}">remove</button>
            <p class="price-title">\$${item.price}</p>
        </div>
        `
    })
    
    return orderItemsHtml
}

function getOrderSummaryHtml() {
    const orderSummaryHtml = `
    <h2 class="order-summary-title order-summary-header">Your order</h2>
    <div class="order-items-container">${getOrderItemsHtml()}</div>
    <div class="order-summary-divider"></div>
    <div class="order-total-container">
        <p class="order-summary-title">Total price:</p>
        <p class="price-title">\$${getTotalPrice()}</p>
    </div>
    <button id="complete-order-btn">Complete order</button>
    `
    return orderSummaryHtml
}

function getOrderConfirmationHtml(name) {
    const orderConfirmationHtml = `
    <div id="order-confirmation-container">
        <p id="order-confirmation-message">Thanks, ${name}! Your order is on its way!</p>
    </div>
    `
    return orderConfirmationHtml
}

//------------------RENDER FUNCTION-------------------------

function render() {
    document.getElementById('menu').innerHTML = getMenuHtml()
    document.getElementById('order-summary').innerHTML = getOrderSummaryHtml()
    
     if (orderedItems.length === 0) {
            document.getElementById("order-summary").classList.add("hidden")
        }
        
}

render()

// Exported from Scrimba 1/19/2023