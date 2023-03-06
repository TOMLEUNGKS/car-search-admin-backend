
import fs from "fs";
import csvParser from "csv-parser";
import * as modelQueries from '../server/db/queries/carModels.js';
import * as specQueries from '../server/db/queries/carSpecs.js';


import * as dotenv from 'dotenv'
dotenv.config()

import util, { isNullOrUndefined } from 'util';
import stream from 'stream';

const pipeline = util.promisify(stream.pipeline);


function withoutProperty(obj, property) {
    const { [property]: unused, ...rest } = obj

    return rest
}

const results = [];

const headersStr = ["brand", "model", "series", "Body type", "yearStart", "yearEnd", "badge", "Doors", "Seats", "Drivetrain", "Safety Rating", "Engine Code", "Engine Size", "Cylinder", "Engine Location", "Air Induction", "Horsepower", "Max Horsepower", "Torque", "Max Torque", "Power to Weight Ratio", "0-100 km/h", "1/4 Mile", "Fuel type", "RON Rating", "Combined Fuel Consumption", "Fuel Tank Capacity", "Approximated Range", "Length", "Width", "Height", "Wheelbase", "Turning Circle", "Curb Weight", "Boot Capacity", "Country Made"]
async function read_file(filePath) {
    await pipeline(
        fs.createReadStream(filePath, { encoding: "utf-8" })
            .pipe(csvParser({
                headers: headersStr,
                mapValues: ({ header, index, value }) => {
                    return value.trim() || null
                },
                skipLines: 1

            }))
            .on("data", (chunk) => {
                results.push(chunk)
            })
            .on("error", (error) => {
                console.log(error);
            }), results
    )
}

await read_file("..\\assets\\car_specs_batch_2_0929.csv")
//get all model first

const models = await modelQueries.getAllModels();
const modelMap = models.map((ele) => ({
    modelID: ele.modelID,
    modelStr: `${ele.brand}_${ele.model}_${ele.series}_${ele["Body type"]}`
}))


results.forEach(async row => {
    const modelStr = `${row.brand}_${row.model}_${row.series}_${row["Body type"]}`
    const findResult = modelMap.find((ele) => ele.modelStr == modelStr)
    if (findResult) {
        row.modelID = findResult.modelID
    } else {
        const modelDetail = {
            brand: row.brand,
            model: row.model,
            series: row.series,
            'Body type': row['Body type'],
            yearStart: row.yearStart || null,
            yearEnd: row.yearEnd || null,
        }
        //add to DB 
        const { err, result } = await modelQueries.addModel(modelDetail);
        if (result) {
            console.log("Inserted model");
            modelMap.push({
                modelID: result.modelID,
                modelStr
            })
            row.modelID = result.modelID
        }
    }
    console.log(row);

    row = withoutProperty(row, "brand")
    row = withoutProperty(row, "model")
    row = withoutProperty(row, "series")
    row = withoutProperty(row, "Body type")
    row = withoutProperty(row, "yearStart")
    row = withoutProperty(row, "yearEnd")



    const { err, result } = await specQueries.addSpec(row);
    if (result) {
        console.log("Inserted spec");
    }

})