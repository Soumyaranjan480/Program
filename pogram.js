function applyDiscountRules(cart) {
    const totalQuantity = Object.values(cart).reduce((acc, val) => acc + val, 0);
    const maxQuantity = Math.max(...Object.values(cart));

    if (totalQuantity > 30 && maxQuantity > 15) {
        return ["tiered_50_discount", 0.5];
    } else if (totalQuantity > 20) {
        return ["bulk_10_discount", 0.1];
    } else if (totalQuantity > 10) {
        return ["bulk_5_discount", 0.05];
    } else if (totalQuantity * maxQuantity > 200) {
        return ["flat_10_discount", 0.1];
    } else {
        return [null, 0];
    }
}

function main() {
    const products = { "Product A": 20, "Product B": 40, "Product C": 50 };
    const cart = {};
    const giftWrapFee = 1;
    const shippingFeePerPackage = 5;
    const productsPerPackage = 10;

    for (const [product, price] of Object.entries(products)) {
        const quantity = parseInt(prompt(`Enter the quantity of ${product}:`));
        const isGiftWrapped = prompt(`Is ${product} wrapped as a gift? (yes/no):`).toLowerCase() === 'yes';
        cart[product] = { quantity, price, isGiftWrapped };
    }

    let subtotal = 0;
    const [discountName, discountAmount] = applyDiscountRules(cart);

    for (const [product, details] of Object.entries(cart)) {
        const { quantity, price, isGiftWrapped } = details;
        const totalAmount = quantity * price;
        subtotal += totalAmount;

        if (isGiftWrapped) {
            subtotal += giftWrapFee * quantity;
        }

        console.log(`${product}: Quantity - ${quantity}, Total Amount - $${totalAmount}`);
    }

    console.log(`\nSubtotal: $${subtotal}`);

    if (discountName) {
        const discount = discountAmount * subtotal;
        console.log(`${discountName} applied: -$ ${discount}`);
        subtotal -= discount;
    }

    const shippingFee = Math.floor(totalQuantity / productsPerPackage) * shippingFeePerPackage;
    console.log(`Shipping Fee: $ ${shippingFee}`);

    const total = subtotal + shippingFee;
    console.log(`\nTotal: $ ${total}`);
}

main();
