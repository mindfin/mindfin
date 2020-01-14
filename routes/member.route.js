const express = require('express');
const fs = require('fs');
const router = express.Router();
var sha1 = require('sha1');
const multer = require('multer');
const { BlobServiceClient, StorageSharedKeyCredential } = require("@azure/storage-blob");
const MulterAzureStorage = require('multer-azure-blob-storage').MulterAzureStorage;
const knex = require('../knex/knex.js');
var defaultImg = 'admin.png';
const PDFParser = require("pdf2json");


router.post('/checkcurrentpwd', (req, res, next) => {
    console.log(req.body);
    var memid = req.body.idvalue;
    var currentpwd = req.body.bname;
    var pwd = (sha1(currentpwd));
    console.log(pwd);
    console.log(memid);
    knex.select()
        .from('employee')
        .where({ password: pwd })
        .where({ idemployee: memid })
        .then(function(result) {
            console.log(result);
            if (result == undefined || result == '' || result == null) {
                console.log("hi")
                res.json({ status: false, });
            } else {
                console.log("bye")
                res.json({
                    result: result,
                    status: true,
                });
            }
        });
});

router.post('/changepwd', function(req, res) {
    console.log(req.body);
    const pwd = (sha1(req.body.cpwd));
    console.log(pwd);

    knex('employee')
        .where({ idemployee: req.body.idvalue })
        .update({
            password: pwd,
            orgpassword: req.body.cpwd
        })
        .then(function(result) {
            if (result == undefined || result == '' || result == null) {
                res.json({ message: "Not Update", status: false });
            } else {
                res.json({
                    result: result,
                    status: true,
                });
            }
        });
});
const azureStorage = new MulterAzureStorage({
    connectionString: 'DefaultEndpointsProtocol=https;AccountName=mindfinfiles;AccountKey=4NrEY0vfXnyvJVohjkXXcBLZDfYnCCUqO/HfnaTnhmiYAYxj0n9cbVRvheeNcvdEwJFnh4DhA1Uf7Uxbcq4ocw==;EndpointSuffix=core.windows.net',
    accessKey: '4NrEY0vfXnyvJVohjkXXcBLZDfYnCCUqO/HfnaTnhmiYAYxj0n9cbVRvheeNcvdEwJFnh4DhA1Uf7Uxbcq4ocw==',
    accountName: 'mindfinfiles',
    containerName: 'mindfin-docment-scan',
    containerAccessLevel: 'blob',
    urlExpirationTime: 60,
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'application/pdf' || file.mimetype === 'text/csv' || file.mimetype === 'application/vnd.ms-excel' || file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || 'application/octet-stream' || 'application/zip') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: azureStorage,
    limits: {
        fileSize: 150 * 1024 * 1024
    },
    fileFilter: fileFilter,
});

router.post('/image-upload', upload.any(), (req, res) => {
    console.log(req.files)
    return res.json({ 'imageUrl': req.files });
});

router.post('/bankstatementcam', (req, res) => {


    console.log(req.body.bankstatement);

    // Enter your storage account name and shared key
    const account = "mindfinfiles";
    const accountKey = "4NrEY0vfXnyvJVohjkXXcBLZDfYnCCUqO/HfnaTnhmiYAYxj0n9cbVRvheeNcvdEwJFnh4DhA1Uf7Uxbcq4ocw==";
    var containerClient;
    var blobClient;
    var downloaded;
    var downloadBlockBlobResponse;
    let pdfParser = new PDFParser();
    // Use StorageSharedKeyCredential with storage account and account key
    // StorageSharedKeyCredential is only avaiable in Node.js runtime, not in browsers
    const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
    const blobServiceClient = new BlobServiceClient(
        `https://${account}.blob.core.windows.net`,
        sharedKeyCredential
    )
    const containerName = "mindfin-docment-scan";
    const blobName = req.body.bankstatement[0].blobName;

    async function main() {
        containerClient = blobServiceClient.getContainerClient(containerName);
        blobClient = containerClient.getBlobClient(blobName);
        // console.log("blob name ", blobClient);
        downloadBlockBlobResponse = await blobClient.download();
        downloaded = await streamToString(downloadBlockBlobResponse.readableStreamBody);
        // console.log("Downloaded blob content:", downloaded);


        // [Node.js only] A helper method used to read a Node.js readable stream into string
        async function streamToString(readableStream) {
            return new Promise((resolve, reject) => {
                const chunks = [];
                readableStream.on("data", (data) => {
                    chunks.push(data.toString());
                });
                readableStream.on("end", () => {
                    resolve(chunks.join(""));
                });
                readableStream.on("error", reject);
            });
        }
        let pdfParser = new PDFParser(this, 1);
        // Load the pdf document
        pdfParser.loadPDF(`${containerClient.getBlobClient(blobName)}`);
        pdfParser.on("pdfParser_dataReady", (pdfData) => {
            // The raw PDF data in text form
            const raw = pdfParser.getRawTextContent().replace(/\r\n/g, " ");
            console.log(raw);
            // Return the parsed data
            // resolve({
            //     name: /Name\s(.*?)Address/i.exec(raw)[1].trim(),
            //     address: /Address\s(.*?)Phone/i.exec(raw)[1].trim(),
            //     phone: /Phone\s(.*?)Birthday/i.exec(raw)[1].trim(),
            //     birthday: /Birthday\s(.*?)Email\sAddress/i.exec(raw)[1].trim(),
            //     emailAddress: /Email\sAddress\s(.*?)Blood\stype/i.exec(raw)[1].trim(),
            //     bloodType: /Blood\stype\s(.*?)Height/i.exec(raw)[1].trim(),
            //     height: /Height\s(.*?)Weight/i.exec(raw)[1].trim(),
            //     weight: /Weight\s(.*?)--/i.exec(raw)[1].trim()
            // });

        });
        // (async() => {
        //     // Set up the pdf parser
        //     let pdfParser = new PDFParser(this, 1);
        //     // Load the pdf document
        //     pdfParser.loadPDF(blobClient);
        //     // Parsed the statement
        //     let statement = await new Promise(async(resolve, reject) => {
        //         // On data ready
        //         pdfParser.on("pdfParser_dataReady", (pdfData) => {
        //             // The raw PDF data in text form
        //             const raw = pdfParser.getRawTextContent().replace(/\r\n/g, " ");
        //             console.log(raw);
        //             // Return the parsed data
        //             // resolve({
        //             //     name: /Name\s(.*?)Address/i.exec(raw)[1].trim(),
        //             //     address: /Address\s(.*?)Phone/i.exec(raw)[1].trim(),
        //             //     phone: /Phone\s(.*?)Birthday/i.exec(raw)[1].trim(),
        //             //     birthday: /Birthday\s(.*?)Email\sAddress/i.exec(raw)[1].trim(),
        //             //     emailAddress: /Email\sAddress\s(.*?)Blood\stype/i.exec(raw)[1].trim(),
        //             //     bloodType: /Blood\stype\s(.*?)Height/i.exec(raw)[1].trim(),
        //             //     height: /Height\s(.*?)Weight/i.exec(raw)[1].trim(),
        //             //     weight: /Weight\s(.*?)--/i.exec(raw)[1].trim()
        //             // });

        //         });
        //     });
        //     // Add the patient to the patients array
        //     // patients.push(patient);

        //     // }));

        //     // Save the extracted information to a json file
        //     // fs.writeFileSync("patients.json", JSON.stringify(patients));
        // })();
    }

    main();
});


module.exports = router;