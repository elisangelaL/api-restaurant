import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("products").del();

    // Inserts seed entries
    await knex("products").insert([
        { name: "nhoque 4 queijos", price: 100 },
        { name: "lasanha de frango", price: 150 },
        { name: "espaguete a carbonara", price: 120 },
        { name: "nhoque de batata", price: 80 },
        { name: "lasanha de carne", price: 130 },
        { name: "espaguete a bolonhesa", price: 100 },
        { name: "nhoque de mandioquinha", price: 90 },
        { name: "lasanha de queijo", price: 140 },
        { name: "espaguete ao alho e oleo", price: 110 },
        { name: "nhoque de abobora", price: 85 },
        { name: "lasanha de presunto e queijo", price: 135 },
        { name: "espaguete ao sugo", price: 95 },
        { name: "nhoque de ricota", price: 95 },
        { name: "lasanha de berinjela", price: 145 },
        { name: "espaguete ao pesto", price: 105 },
        { name: "nhoque de cenoura", price: 87 },
        { name: "lasanha de frango com catupiry", price: 155 },
        { name: "espaguete ao molho branco", price: 115 },
        { name: "nhoque de batata doce", price: 88 },
        { name: "lasanha de camarao", price: 160 },
        { name: "espaguete ao molho de tomate seco", price: 125 },
        { name: "nhoque de espinafre", price: 92 },
        { name: "lasanha de bacalhau", price: 165 },
        { name: "espaguete ao molho de funghi", price: 130 },
        { name: "nhoque de mandioca", price: 93 },
        { name: "lasanha de calabresa", price: 170 },
        { name: "espaguete ao molho de camarao", price: 135 },
        { name: "nhoque de batata baroa", price: 90 },
        { name: "lasanha de lombo", price: 175 },
        { name: "espaguete ao molho de frutos do mar", price: 140 },
        { name: "nhoque de batata salsa", price: 91 },
        { name: "lasanha de carne seca", price: 180 },      
        
    ]);
};
