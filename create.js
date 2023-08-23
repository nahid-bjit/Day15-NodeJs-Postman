const http = require("http");
const path = require("path");
const fs = require("fs");
const querystring = require("querystring");
const url = require("url");
const { success, failure } = require("./common");
const { add } = require("./product");
const product = require("./product");
const { insertInLog } = require("./log");

//log




// ##### attempt-2 ######


const server = http.createServer(function (req, res) {
    if (req.url === "/products/create" && req.method === "POST") {
        try {
            let body = " ";
            req.on("data", (buffer) => {
                body += buffer;
            });
            req.on("end", async () => {
                const parsedBody = JSON.parse(body);

                // Validate that 'title' property is present in the parsed body
                if (!parsedBody.hasOwnProperty('title')) {
                    res.writeHead(400, { "Content-Type": "application/json" });
                    res.write(JSON.stringify({ error: "Title is required in the request body" }));
                    return res.end();
                }

                console.log("data received: ", parsedBody);

                try {
                    // Call the product.add function
                    const result = await product.add(parsedBody);

                    if (result) {
                        // log file
                    

                        // log file code - ends

                        res.writeHead(200, { "Content-Type": "application/json" });
                        res.write(JSON.stringify({ message: "Product added successfully" }));
                        insertInLog()
                        res.end();
                    } else {
                        res.writeHead(500, { "Content-Type": "application/json" });
                        res.write(JSON.stringify({ error: "Internal Server Error" }));
                        return res.end();
                    }
                } catch (error) {
                    res.writeHead(500, { "Content-Type": "application/json" });
                    res.write(JSON.stringify({ error: "Error while adding product" }));
                    return res.end();
                }
            });

        } catch (error) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.write(JSON.stringify({ error: "Internal Server Error" }));
            return res.end();
        }
    } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.write(JSON.stringify({ error: "Not Found" }));
        return res.end();
    }
});

// ##### attempt-1 ##### 

// const server = http.createServer(function (req, res) {
//     if (req.url === "/products/create" && req.method === "POST") {
//         try {
//             let body = " ";
//             req.on("data", (buffer) => {
//                 body += buffer;
//             });
//             req.on("end", () => {
//                 const parsedBody = JSON.parse(body);
//                 console.log("data received: ", parsedBody);

//                 // here's my code

//                 //validation of the title starts
               
//                 if (!parsedBody.hasOwnProperty('title')) {
//                     res.writeHead(400, { "Content-Type": "application/json" });
//                     res.write(JSON.stringify({ message: "Title is required in the request body" }));
//                     return res.end();
//                 }

//                 console.log("data received: ", parsedBody);

//                 // validation of the title ended
                
//                 const result = product.add(JSON.parse(body))
//                 if (result) {
//                     res.writeHead(200, { "Content-Type": "application/json" });
//                     res.write(JSON.stringify({ message: "Product added successfully" }));
//                     res.end();
//                 }
//                 else {
//                     res.writeHead(500, { "Content-Type": "application/json" });
//                     res.write(JSON.stringify({ message: "Internal Server Error" }));
//                     return res.end();
//                 }

//             }
//             );

//         } catch (error) {
//             res.writeHead(500, { "Content-Type": "application/json" });
//             res.write(JSON.stringify({ message: "Internal Server Error" }));
//             return res.end();
//         }
//     }

//     else {

//         res.writeHead(500, { "Content-Type": "application/json" });
//         res.write(JSON.stringify({ message: "Request not found" }));
//         return res.end();
//     }



// });


// server.listen(8000, () => {
//     console.log("Server is running on 8000...");
// })


server.listen(8000, () => {
    console.log("Server is running on 8000...");
});
