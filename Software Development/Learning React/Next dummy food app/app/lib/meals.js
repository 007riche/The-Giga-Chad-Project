import sql from 'better-sqlite3';
const db = sql('meals.db');

export async function getAllMeals() {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    // throw new Error("Failed DB Request");
    return db.prepare('SELECT * FROM meals').all();
}

export async function getMeal(slug) {
    return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}