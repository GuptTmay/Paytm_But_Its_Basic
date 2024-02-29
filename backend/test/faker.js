const { faker } = require('@faker-js/faker');
const axios = require('axios');

for (let i = 0; i < 100; i++) {
    let bodyData = {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        username: faker.internet.email(),
        password: "123456"
    }

    axios.post("http://localhost:3000/api/v1/user/signup", bodyData)
    .then((response) => {
        console.log(JSON.stringify(bodyData) + " " + response.data.message);
    })
}