const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const parse_date = (timestamp) => {
    const date = new Date(timestamp * 1000);
    let day = date.getDate();
    let month = months[date.getMonth()];

    return `${day} ${month}`;
}


export {
    parse_date
}