function getPatterns(cards) {
    const ranks = [
            "Ace",
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            "Page",
            "Knight",
            "Queen",
            "King",
        ],
        suits = ["Pentacles", "Swords", "Cups", "Wands"];

    return {
        size: cards.length,
        majors: cards.filter(({ is_major }) => is_major).length,
        reversed: cards.filter(({ name }) => name.includes(" reversed")).length,
        ranks: helper(ranks),
        suits: helper(suits),
    };

    function helper(arr) {
        return arr.reduce((acc, item) => {
            const { length } = cards.filter(({ name }) => name.includes(item));
            return {
                ...acc,
                ...(length > 1 ? { [item]: length } : {}),
            };
        }, {});
    }
}

export { getPatterns };
