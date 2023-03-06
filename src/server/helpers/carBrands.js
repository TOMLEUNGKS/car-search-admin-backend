

const queries = require('../db/queries/carBrands');
const S3handler = require('../helpers/S3handler.js')


async function getUrls(brand) {
    if (brand.imgs) {
        const promises = brand.imgs.map(async ele => {
            const key = "car_brands/" + brand.brand_name + "/" + ele
            return S3handler.getImgUrl(key)
        });
        return await Promise.all(promises)
    }
}


async function getFullBrands() {
    let result = await queries.getAllBrands();
    const promises = result.map(async ele => {
        const urls = await getUrls(ele) || ele.imgs
        return { ...ele, imgs_path: urls }
    });
    return await Promise.all(promises)
}

module.exports = {
    getFullBrands,

};