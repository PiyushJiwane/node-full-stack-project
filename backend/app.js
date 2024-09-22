const express = require("express");
const signup_route = require("./routes/signup.route");
const login_route = require("./routes/login.route");
const morgan = require("morgan");
const connectDB = require("./config/dbConnection")
const swaggerUi=require("swagger-ui-express")
const YAML = require("yamljs");
const path = require("path");
const cors = require('cors');
const todo_route = require("./routes/todo.route");
const crosOptions = require("./config/cors");
const cookieParser = require("cookie-parser");
const refreshToken_route = require("./routes/refreshToken.route");

const swaggerDocument = YAML.load(path.join(__dirname, "../backend/docs/output.yml"));

require('dotenv/config')

const app=express()
const PORT=process.env.PORT || 3000

app.use(morgan('tiny'))
app.use(express.json())
app.use(cors(crosOptions));
app.use(cookieParser())

app.use("/",signup_route)
app.use("/",login_route)
app.use("/",todo_route)
app.use("/",refreshToken_route)
app.use('/docs', cors(),swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).send(err.msg)
})

const startServer = async () => {
    try {
        await connectDB(process.env.CONNECTION_STRING)
        app.listen(PORT, () => {
            console.log(`server is listening on port : ${PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
}

// Handle 404 errors for undefined routes
app.all("*", (req, res) => {
    res.status(404).json({ error: "404 Not Found... !!!" });
});
startServer()

