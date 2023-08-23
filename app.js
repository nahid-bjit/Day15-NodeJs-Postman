const http = require("http");
const path = require("path");
const fs = require("fs");
const querystring = require("querystring");
const url = require("url");

// const server = http.createServer((req, res) => {
//     if (req.url === "/products/all" && req.method === "GET") {
//         res.writeHead(200, {"Content-Type": "text/json"});
//         res.write(JSON.stringify({ message: "Hello World!"}));
//         res.end();
//     }
   
// });


const server = http.createServer(function(req, res) {
    if (req.url === "/products/all" && req.method === "GET") {
        try {
            const data = JSON.parse(fs.readFileSync("./data/products.json", "utf-8"));
            console.log(data);
            res.writeHead(200, {"Content-Type": "application/json"});
           res.write(JSON.stringify({ message: "Hello World!"}));
           res.write(
            JSON.stringify({ message: " Successfully received data", data: data})
           );
        return res.end();


        // ## Asynchronushly read the file - need to implement to the next class ##
        // fs.readFile(
        //     path.join(__dirname, "data", "prouducts.json"),
        //     (err, data) => {
        //         if (!err) {
        //             const jsonData = JSON.parse(data);
        //             res.write(JSON.stringify(jsonData));
        //             return res.end();
        //         }
        //     }
        // );
  
    } catch (error) {
        res.writeHead(500, {"Content-Type": "application/json"});
        res.write(JSON.stringify({ message: "Internal Server Error"}));
        return res.end();
    }
}
   
});

server.listen(8000, () => {
    console.log("Server is running on 8000...");
})