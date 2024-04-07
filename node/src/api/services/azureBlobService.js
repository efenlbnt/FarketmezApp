// services/azureBlobService.js

const { BlobServiceClient } = require('@azure/storage-blob');
const connectionString = 'DefaultEndpointsProtocol=https;AccountName=csb100320005814de98;AccountKey=IlbMowk7MomA7Sf2ViBT5KYc5UKNM9+93Oo9WbabUHMhd6dSAEbjzro394qLuk+PIz/OMGlwycFS+AStmJl7rQ==;EndpointSuffix=core.windows.net'; // Replace with your connection string

async function uploadFileToBlob(file, containerName) {
    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    const containerClient = blobServiceClient.getContainerClient(containerName);

    const blobName = `${Date.now()}-${file.originalname}`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    const uploadBlobResponse = await blockBlobClient.uploadData(file.buffer);

    return blockBlobClient.url; // Returns the URL of the uploaded file
}

module.exports = { uploadFileToBlob };
