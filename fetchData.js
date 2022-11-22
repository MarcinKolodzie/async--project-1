const fetchData = (url, options = {}) => {
    const {
        startCallback = () => console.log(`[${url}] Start fetching`),
        catchCallback = (error) => console.error('Failed to fetch data', error),
        endCallback = () => console.log(`[${url}] Stop fetching`)
    } = options
    
    startCallback()

    return fetch(url)
        .then((response) => response.json())
        // .then((data) => console.log(data))
        .catch(catchCallback)
        .finally(endCallback)
}
