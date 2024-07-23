// import swaggerJsdoc from 'swagger-jsdoc'
const swaggerJsdoc=require("swagger-jsdoc")
// import swaggerUi from 'swagger-ui-express'
const swaggerUi=require("swagger-ui-express")
const YAML = require("yamljs");
const path = require("path");
const cors = require('cors');

const swaggerDocument = YAML.load(path.join(__dirname, "../backend/docs/output.yml"));

function swaggerDocs(app, port) {
    // Swagger Page
    app.use('/docs', cors(),swaggerUi.serve, swaggerUi.setup(swaggerDocument))
    // Documentation in JSON format
    app.get('/docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json')
        res.send(swaggerSpec)
    })
}
module.exports=swaggerDocs