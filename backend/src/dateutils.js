function getDaysFromNow(date) {
    const now = new Date(Date.now());
    const days = now.getTime() - date.getTime();

    return Math.abs(Math.round(days / (1000 * 3600 * 24)));
};

function getDays(fromDate, toDate) {
    const days = toDate.getTime() - fromDate.getTime();

    return Math.abs(Math.round(days / (1000 * 3600 * 24)));
}

module.exports = {
    getDaysFromNow,
    getDays
}