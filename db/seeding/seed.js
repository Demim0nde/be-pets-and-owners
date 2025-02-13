const format = require("pg-format");
const db = require("../connection")

const seed = ({ petsData, ownersData }) => { 
    return db.query(`DROP TABLE IF EXISTS pets;`).then(() => { 
        return db.query(`DROP TABLE IF EXISTS owners;`)
    }).then(() => { 
        return db.query(`CREATE TABLE owners (
            owner_id SERIAL PRIMARY KEY,
            name VARCHAR,
            age INT)`);
    }).then(() => { 
        return db.query(`CREATE TABLE pets (
            pet_id SERIAL PRIMARY KEY,
            name VARCHAR NOT NULL,
            avatar_url VARCHAR,
            faveFood VARCHAR,
            owner INT REFERENCES owners(owner_id) NOT NULL,
            age INT NOT NULL,
            temperament VARCHAR(50))`)
    }).then(() => { 
        const ownersQueryStr = format(`
            INSERT INTO owners (name, age) VALUES %L`, ownersData.map((owner) => { 
                return [owner.name, owner.age]
            })
        )
        return db.query(ownersQueryStr)
    }).then(() => { 
        const petsQueryStr = format(` INSERT INTO pets (name, avatar_url, faveFood, owner, age, temperament) VALUES %L`, petsData.map((pet) => { 
                return [pet.name, pet.avatar_url, pet.faveFood, pet.owner, pet.age, pet.temperament]
            })
        )
        return db.query(petsQueryStr)
    })
}

module.exports = seed