var generateMessage = (from, text) => {
    return {
        from,
        text,
        completedAt : new Date().toDateString()
    };
};

module.exports = {generateMessage};