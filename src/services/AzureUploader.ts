// import { DefaultAzureCredential } from '@azure/identity';
import { BlobServiceClient } from '@azure/storage-blob';

// const credential = new DefaultAzureCredential();

const blobServiceClient = new BlobServiceClient(
  // 'https://dartrobotlabstorage.blob.core.windows.net/study-video-uploads?sp=acw&st=2021-04-07T02:19:35Z&se=2022-04-07T10:19:35Z&sv=2020-02-10&sr=c&sig=9fpKagbOjUqAjHF579%2FW7KiM4U8YcBrbI8J70tH35Y4%3D',
  // credential,
  'https://dartrobotlabstorage.blob.core.windows.net/study-video-uploads?sp=acw&st=2022-08-02T21:43:40Z&se=2024-08-03T05:43:40Z&spr=https&sv=2021-06-08&sr=c&sig=SwOP7nqXU21CAeFTS5UDD02uV72QSwuS2aGEdzdxZTc%3D',
);

export default class AzureUploader {
  public static async upload(data: Blob, blobName: string): Promise<void> {
    const client = blobServiceClient.getContainerClient('standalone-video-uploads');

    const blockBlobClient = client.getBlockBlobClient(blobName);

    await blockBlobClient.uploadData(data);
  }
}
