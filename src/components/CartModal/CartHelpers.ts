const localStorageAddress: string = "cart";

function getCart(): Record<string, number> {
	const cart = localStorage.getItem(localStorageAddress);
	if (cart) {
		return JSON.parse(cart);
	} else {
		return {};
	}
}

function addToCart(productId: string): Record<string, number> {
	const cart = getCart();
	const productInCart = cart[productId];
	if (productInCart) {
		cart[productId] += 1;
	} else {
		cart[productId] = 1;
	}
	localStorage.setItem(localStorageAddress, JSON.stringify(cart));
	//console.log("Cart", cart)
	return cart;
}

function removeFromCart(productId: string): Record<string, number> {
	let cart = getCart();
	const productInCart = cart[productId];
	if (!productInCart) {
		return cart;
	}
	if (cart[productId] > 1) {
		cart[productId] -= 1;
	} else {
		cart = Object.fromEntries(Object.entries(cart).filter(([key]) => key !== productId));
	}
	localStorage.setItem(localStorageAddress, JSON.stringify(cart));
	return cart;
}

export { getCart, addToCart, removeFromCart };