const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const parse_date = (timestamp) => {
    const date = new Date(timestamp * 1000);
    let day = date.getDate();
    let month = months[date.getMonth()];

    return `${day} ${month}`;
}

const getWallet = async () => {
    const { ethereum } = window;

    return ethereum.request({ method: 'eth_requestAccounts' })
        .then((accounts) =>
            accounts[0]
        )
}

export {
    parse_date, getWallet
}