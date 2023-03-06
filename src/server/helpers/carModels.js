

const modelQuery = require("../db/queries/carModels")

function getName(model) {

    let builtYear
    if (model.yearStart && model.yearEnd) {
        builtYear = `${model.yearStart || ""}-${model.yearEnd || ""}`
    }
    const name = `${builtYear || ""} ${model.brand} ${model.model} ${model.series}`

    return { name, builtYear }
}


async function getFullModels() {
    let models = await modelQuery.getAllModels();
    const promises = models.map(async model => {

        const { name, builtYear } = getName(model)
        return { name, builtYear, ...model }
    });
    return await Promise.all(promises)
}

async function retriveCarModel(modelID) {
    let model = await modelQuery.getSingleModel(modelID);
    const name = getName(model)
    model = { name, ...model }
    return model
}

module.exports = {
    retriveCarModel,
    getFullModels

};