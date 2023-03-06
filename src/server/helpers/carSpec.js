

const specQuery = require("../db/queries/carSpecs")
const modelHelper = require("./carModels")

function getName(spec, model) {
    const shortDT = spec.Drivetrain?.split(" ")
        .map((word) => word.charAt(0).toUpperCase())
        .join("");

    let years
    if (model.yearStart && model.yearEnd) {
        years = `${model.yearStart || ""}-${model.yearEnd || ""}`
    }

    const name = `${years || ""} ${model.brand} ${model.model} ${spec.badge} ${spec.Transmission || ""
        } ${shortDT}`

    return name
}

async function getFullSpecs(limit) {
    let specs = await specQuery.getAllSpecs(limit);
    const promises = specs.map(async spec => {
        const model = await modelHelper.retriveCarModel(spec.modelID)
        const name = getName(spec, model)
        return { name, ...spec, model }
    });
    return await Promise.all(promises)
}


async function retriveCarSpec(carID) {
    let spec = await retriveBaseCarSpec(carID);
    const model = await modelHelper.retriveCarModel(spec.modelID)
    const name = getName(spec, model)
    spec = { name, ...spec, model }
    return spec

}

async function retriveBaseCarSpec(carID) {
    let spec = await specQuery.getSingleSpec(carID);
    return spec
}

module.exports = {
    retriveCarSpec,
    retriveBaseCarSpec,
    getFullSpecs

};