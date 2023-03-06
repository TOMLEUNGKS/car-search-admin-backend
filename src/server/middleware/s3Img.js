

const S3handler = require('../helpers/S3handler.js')
const moment = require('moment')
const path = require('path');
const fs = require('fs');

const uuid = require('uuid');

const uploadS3Img = (bucketFolder, uniqueKey = null) => async (ctx, next) => {

    const itemKey = ctx.state.ukey || ctx.request.body[uniqueKey]

    const folderPath = bucketFolder + "/" + itemKey + "/"

    if (Object.entries(ctx.request.files).length == 0) {
        throw Error("No file upload...")
    }

    const key = Object.keys(ctx.request.files)[0]
    let files = ctx.request.files[key];
    if (!Array.isArray(files)) {
        files = [ctx.request.files[key]]
    }

    let resultImg = []
    let resultImgPath = []

    for (let file of files) {
        let fileName = uuid.v4();
        let tail = file.name == 'blob' ? 'png' : file.originalFilename.split('.').pop()
        let uplaod_img = fileName + '.' + tail //get the basename 
        let filePath = folderPath + uplaod_img; //Stitching file names according to time

        const body = fs.createReadStream(file.filepath);

        const { success } = await S3handler.uploadImg(filePath, body)
        if (success) {
            const url = await S3handler.getImgUrl(filePath)
            resultImg.push(uplaod_img)
            resultImgPath.push(url)
            console.log("Remove origin file at: ", file.filepath);
            fs.unlinkSync(file.filepath);
        }
    }

    ctx.state.uplaod_img = resultImg
    ctx.state.uplaod_img_path = resultImgPath

}


const getS3Img = async (ctx, next) => {
    try {
        const url = await S3handler.getImgUrl(ctx.request.query.key);

        ctx.status = 200;
        ctx.body = {
            success: true,
            url
        };
    } catch (err) {
        console.log(err)
    }


}


const deleteS3folder = (bucketFolder, uniqueKey) => async (ctx, next) => {
    const folderPath = bucketFolder + "/" + ctx.state.brand[uniqueKey]
    await S3handler.deleteFolder(folderPath);
}

const deleteS3Img = (bucketFolder, uniqueKey) => async (ctx, next) => {
    const itemKey = ctx.state.ukey + "/" + ctx.state.img
    const imgfullPath = bucketFolder + "/" + itemKey
    const data = await S3handler.deleteImg(imgfullPath);
    console.log("data from delete", data);
}

module.exports = {
    uploadS3Img,
    getS3Img,
    deleteS3Img
};