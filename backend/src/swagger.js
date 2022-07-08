const swaggerAutogen = require('swagger-autogen')()
const path = require('path');

const outputFile = path.resolve(__dirname , '..' , 'swagger_output.json');
const endpoint = path.resolve(__dirname ,'router.js');
const endpointsFiles = [endpoint]
 
const doc = {
    info: {
        version: "1.0.0",
        title: "DevXSolutions",
        description: "Api desenvolvida para o desafio DevXSolutions "
    },
    host: "localhost:3000",
    basePath: "/",
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        {
            "name": "Usuarios",
            "description": "Endpoints para o controller de usuários"
        }
    ],
    definitions: { // Aquo informa as models e seus campos
        User: {
            name: "Jhon Doe edited",
            age: 29,
            parents: {
                father: "Simon Doe",
                mother: "Marie Doe"
            },
            diplomas: [
                {
                    school: "XYZ University",
                    year: 2020,
                    completed: true,
                    internship: {
                        hours: 290,
                        location: "XYZ Company"
                    }
                }
            ]
        },
        AddUser: {
            $name: "Jhon Doe",
            $age: 29,
            about: ""
        }
    }
}

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./index')
})