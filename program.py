def apply_discount_rules(cart, total_quantity):
    max_quantity = max(cart.values())

    if total_quantity > 30 and max_quantity > 15:
        return "tiered_50_discount", 0.5
    elif total_quantity > 20:
        return "bulk_10_discount", 0.1
    elif total_quantity > 10:
        return "bulk_5_discount", 0.05
    elif total_quantity * max_quantity > 200:
        return "flat_10_discount", 0.1
    else:
        return None, 0


def main():
    products = {"Product A": 20, "Product B": 40, "Product C": 50}
    cart = {}
    gift_wrap_fee = 1
    shipping_fee_per_package = 5
    products_per_package = 10

    for product, price in products.items():
        quantity = int(input(f"Enter the quantity of {product}: "))
        is_gift_wrapped = input(f"Is {product} wrapped as a gift? (yes/no): ").lower() == 'yes'
        cart[product] = {"quantity": quantity, "price": price, "is_gift_wrapped": is_gift_wrapped}

    total_quantity = sum(cart[product]["quantity"] for product in cart)
    subtotal = 0
    discount_name, discount_amount = apply_discount_rules({product: details["quantity"] for product, details in cart.items()}, total_quantity)

    for product, details in cart.items():
        quantity = details["quantity"]
        price = details["price"]
        is_gift_wrapped = details["is_gift_wrapped"]

        total_amount = quantity * price
        subtotal += total_amount

        if is_gift_wrapped:
            total_amount += gift_wrap_fee * quantity

        print(f"{product}: Quantity - {quantity}, Total Amount - ${total_amount}")

    print("\nSubtotal: $", subtotal)

    if discount_name:
        discount = discount_amount * subtotal
        print(f"{discount_name} applied: -$ {discount}")

        subtotal -= discount

    shipping_fee = (total_quantity // products_per_package) * shipping_fee_per_package
    print(f"Shipping Fee: $ {shipping_fee}")

    total = subtotal + shipping_fee
    print(f"\nTotal: $ {total}")


if __name__ == "__main__":
    main()
