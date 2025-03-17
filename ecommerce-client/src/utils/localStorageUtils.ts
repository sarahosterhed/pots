export const saveTolocalStorage = (
    name: string,
    data: unknown,
) => {
    const cachedData = {
        cart: data,
    };
    localStorage.setItem(name, JSON.stringify(cachedData))
}