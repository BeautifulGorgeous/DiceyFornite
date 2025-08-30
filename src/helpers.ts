/* eslint-disable @typescript-eslint/no-explicit-any */

export function getArray(data: any): Array<any> {
    if (Array.isArray(data)) return data as Array<any>;

    return [];
}


export const getRandomItem = (items: Array<any>): any | null => {
    if (items.length === 0) {
        return null;
    }

    return items[Math.floor(Math.random() * (items.length - 1))];
}

export const numWords = (count: number, words: Array<string>) => {
    // 0 игр
    // 1 игра
    // 2 игры
    // 3 игры
    // 4 игры
    // 5 игр
    // 6 игр
    // 7 игр
    // 8 игр
    // 9 игр
    // 10+ игр
    // 11 игр
    // 12 игр
    // 13 игр
    // 14 игр
    // 15 игр
    // 16 игр
    // 17 игр
    // 18 игр
    // 19 игр
    // 20 игр

    if (words.length !== 3) {
        return words[0];
    }

    if (count >= 5 && count < 20) {
        return words[1];
    }

    const outcome = count % 10;

    if (outcome >= 2 && outcome <= 4) {
        return words [2];
    } else if (outcome === 1) {
        return words [0];
    } else {
        return words [1];
    }
}
