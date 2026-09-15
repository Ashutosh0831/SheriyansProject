require("dotenv").config()
const ImageKit = require("@imagekit/nodejs").default;

const client = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function uploadFile({buffer, filename, folder = ""}){
    const file = await client.files.upload({
        file: ImageKit.toFile(Buffer.from(buffer)),
        fileName: filename,
        folder
    })

    return file
}

module.exports = {uploadFile}