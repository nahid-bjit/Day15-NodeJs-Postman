// const fs = require("fs");
const fs = require('fs').promises; // Import the promises version of the 'fs' module
const { stringify } = require("querystring");
//const path = require("path");


class Product {
    getAll() {
        const data = fs.readFileSync("./data/manga.json", "utf-8");
        // console.log(JSON.parse(data));
        const jsonData = JSON.parse(data);
        return jsonData;

    }

    // ## add Product using Sync function ##

    // add(product) {

    //     const data = JSON.parse(fs.readFileSync("./data/manga.json", "utf-8"));
    //     // const jsonData = JSON.parse(data);
    //     const newData = { ...product, id: data[data.length - 1].id + 1 }
    //     data.push(newData);
    //     fs.writeFileSync("./data/manga.json", JSON.stringify(data));
    //     console.log("Product has been added successfully!!")

    //     // console.log(newData);
    //     // jsonData.push(newData);
    //     // console.log(jsonData)

    //     // data.push(newData);
    //     // console.log(data);

    //     // const totalData = jsonData.push(newData);
    //     // console.log(totalData)

    // }


    // ## add Product using Async function ##
    // async add(product) {


    //     const readFileAsync = await fs.readFile("./data/manga.json");
    //     const data = JSON.parse(readFileAsync);
    //     // const jsonData = JSON.parse(data);
    //     const newData = { ...product, id: data[data.length - 1].id + 1 }
    //     data.push(newData);

    //     await fs.writeFile("./data/manga.json", JSON.stringify(data))
    //    // fs.writeFileSync("./data/manga.json", JSON.stringify(data));
    //     console.log("Product has been added successfully!!")

    // }

    // ## corrected ##



    async add(product) {
        try {
            const readFileAsync = await fs.readFile("./data/manga.json", 'utf-8'); // Read the file as a string
            const data = JSON.parse(readFileAsync);
            const newData = { ...product, id: data[data.length - 1].id + 1 }
            data.push(newData);

            await fs.writeFile("./data/manga.json", JSON.stringify(data, null, 2), 'utf-8'); // Write back the formatted JSON data
            console.log("Product has been added successfully!!");
            return true;
        } catch (error) {
            console.error("Error:", error);
            return false;
        }
    }

    // Example usage
    // const newProduct = { /* ... */ };
    // add(newProduct);

    // ##shifu ends here##



    getOneById(id) {
        const data = fs.readFileSync("./data/manga.json", "utf-8");
        const jsonData = JSON.parse(data);
        return jsonData.find(x => x.id == id)
    }

    // ## update one by id ##

    // updateOneById (id) {
    //     const data = fs.readFileSync("./data/manga.json", "utf-8");
    //     const jsonData = JSON.parse(data);
    //     let updatedJsonData = jsonData.map(x=> {
    //         if(x.id == id) {
    //             x.name=x.name + " UPDATED ";
    //             console.log(x)
    //         }
    //         return x;

    //     })

    //     // data.push(updatedJsonData);
    //     fs.writeFileSync("./data/manga.json", JSON.stringify(updatedJsonData));

    // }

    // ## Update one by id and the given object ## 

    updateOneByIdAndObject(id, newData) {
        if (newData.hasOwnProperty('id')) {
            console.log("Object cannot be carry an id")
            return;
        }

        const data = fs.readFileSync("./data/manga.json", "utf-8");
        const jsonData = JSON.parse(data);

        let flag = 0;
        let updatedJsonData = jsonData.map(x => {
            if (x.id == id) {
                flag = 1;
                // console.log(x.id)
                x = { ...x, ...newData }
            }

            return x;

        });

        if (flag == 0) {
            console.log("There is no such data with this id,", id);
            return;
        }

        else {
            fs.writeFileSync("./data/manga.json", JSON.stringify(updatedJsonData));
            console.log("The object has been updated successfully")
        }

    }

    // ## delete by id ##

    deleteProduct(id) {
        const data = fs.readFileSync("./data/manga.json", "utf-8");
        const jsonData = JSON.parse(data);

        let isExist = jsonData.find(x => x.id == id)
        if (isExist) {
            let updatedJsonData = jsonData.filter(x => {
                if (x.id != id) {
                    return x;
                }
            })

            fs.writeFileSync("./data/manga.json", JSON.stringify(updatedJsonData));
            console.log("Successfully deleted product with id, ", id);


        }
        else {
            console.log("There is no such data with id ", id);
        }

    }

}

module.exports = new Product();

