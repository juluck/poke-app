export const getAllPokemon = (url) => {
    return new Promise((resolv, reject) => {
        fetch(url)
            .then((res) => res.json())
            .then((data) => resolv(data));
    });
};


export const getPokemon = (url) => {
    return new Promise((resolv, reject) => {
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                // console.log(data)
                resolv(data)
            });
    });

};
