// import { DefaultAzureCredential } from '@azure/identity';
import { BlobServiceClient } from '@azure/storage-blob';

// const credential = new DefaultAzureCredential();

const blobServiceClient = new BlobServiceClient(
  'https://dartrobotlabstorage-microsoftrouting.blob.core.windows.net/?sv=2020-02-10&ss=b&srt=c&sp=rwdlacx&se=2022-04-07T01:08:18Z&st=2021-04-06T17:08:18Z&spr=https&sig=Uwz0rvBcmi2791fwQg7I8wIMdRTwgLv0584SHVG89DA%3D',
  // credential,
);

export default class FileProvider {
  private static async upload(data: Blob, blobName: string, container: string) {
    const client = blobServiceClient.getContainerClient(container);

    const blockBlobClient = client.getBlockBlobClient(blobName);

    return blockBlobClient.uploadData(data);
  }
}
