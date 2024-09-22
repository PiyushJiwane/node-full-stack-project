const whiteList = [
    "http://127.0.0.1:3000",
    "http://127.0.0.1:5000",
    "http://localhost:5000"
]

const crosOptions = {
    origin: (origin, callback) => {
        console.log(`origin : ${origin}`);
        if (whiteList.indexOf(origin) !== -1 || !origin) {
            callback(null,true)
        } else {
            callback(new Error("not allowed by cors"))
        }
    },
    methods: ['GET', 'POST','PUT','DELETE'], // Define allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
  optionsSuccessStatus: 200, // Some legacy browsers choke on 204
}

module.exports= crosOptions