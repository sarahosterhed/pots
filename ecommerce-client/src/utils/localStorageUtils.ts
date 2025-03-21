export const saveTolocalStorage = (
    name: string,
    data: unknown,
    expirationTime: number = Date.now() + 1000 * 60 * 10
) => {
    const cachedCart = {
        cart: data,
        expiration: expirationTime
    }
    localStorage.setItem(name, JSON.stringify(cachedCart))
}

export const getFromLocalStorage = (name: string) => {
    const cachedCart = JSON.parse(localStorage.getItem(name) as string);

    if (!cachedCart) return null;

    const currentTime = Date.now();
    if (currentTime > cachedCart.expiration) {
        localStorage.removeItem(name);
        return null;
    }

    return cachedCart[name]
}