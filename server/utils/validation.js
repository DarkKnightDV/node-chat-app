var isRealString = (value) => {
    return typeof value === 'string' && value.trim() !== "";
}

module.exports = {isRealString};