/* 
    File upload 
 */
const fs = require('fs');
const path = require('path');
// const dateFormat = require('./utils/dateFormat.js')
const moment = require('moment')

const settings = require("settings");
const { nextTick } = require('process');


const upload = {
    UPLOAD: 'images',
    IMAGE: '/image/',
    FILE: '/file/',
    MAXFILESIZE: 200 * 1024 * 1024, //Upload file size
}
// Create a file directory
const mkdirFile = (path) => {
    let pathList = path.split('\\');
    let fileDir = settings.PROJECT_DIR
    pathList.forEach(i => {
        if (i) {
            fileDir += ('/' + i)
            if (!fs.existsSync(fileDir)) {
                fs.mkdirSync(fileDir, err => {
                    LogFile.info('Create failure', err)
                    return
                });
            }
        }
    })
}
//Save file
const saveFile = (file, path) => {
    return new Promise((resolve, reject) => {
        let render = fs.createReadStream(file);
        // Create a write stream
        let upStream = fs.createWriteStream(path);
        render.pipe(upStream);
        upStream.on('finish', () => {
            resolve({ file, path })
        });
        upStream.on('error', (err) => {
            console.log(err);
            reject(err)
        });
    })
}

/**
 * File upload
 * ps Generate file name SKD_date
 *     File paths are stored according to year and month
 */
const uploadImg = (extraDirPath, isMultiple = false) => async (ctx, next) => {

    // short & quick solution to  avoid store multiple images #what if need to update image 
    if (ctx.request.body.postID) {
        return next()
    }

    if (Object.entries(ctx.request.files).length == 0) {
        throw Error("No file upload...")
    }


    const key = Object.keys(ctx.request.files)[0]


    let files = ctx.request.files[key];
    //let fileName = 'SKD_ ' + upload.UPLOAD + upload.IMAGE //Upload and save directory
    if (!Array.isArray(files)) {
        files = [ctx.request.files[key]]
    }

    let resultImg = []


    for (let file of files) {
        let date = moment().format('yyyyMMDDhhmmssSS');

        let tail = file.name == 'blob' ? 'png' : file.originalFilename.split('.').pop()
        let dirPath = path.join(upload.UPLOAD, extraDirPath)
        let filePath = path.join(dirPath, date + '.' + tail); //Stitching file names according to time

        await mkdirFile(dirPath)         //Create a file directory

        try {

            const { _, path } = await saveFile(file.filepath, filePath)
            let uplaod_img = path.substring(dirPath.length + 1, path.length) //get the basename 

            resultImg.push(uplaod_img)
            //remove file 
            console.log("Remove origin file at: ", file.filepath);
            fs.unlinkSync(file.filepath);


        } catch (err) {
            console.log(err);
            ctx.body = {
                error_code: 20008,
                error_message: 'Failed to upload file!',
            }
        }
    }

    ctx.state.uplaod_img = resultImg.length > 1 ? resultImg : resultImg[0]
    return next()
}

module.exports = {
    uploadImg
};