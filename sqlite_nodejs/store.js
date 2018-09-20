const knex = require('knex')(require('./knexfile'))

module.exports = {
    getDates () {
        console.log(`retrieving dates`);
        return knex('Dates').select('*')
    },
    getUser(userId) {
        return knex('Dates')
            .where('User', userId)
            .select('Date');
    },
    addDates(userId, dates) {
        let dbFormated = dates.map(date => ({Date: date, User: userId}));
        return knex('Dates').insert(dbFormated);
    },
    deleteUser(userId) {
        return knex('Dates')
            .where('User', userId)
            .del();
    }
}