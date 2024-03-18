"use server";
import { StoredFile } from "@/types";
import B2 from "backblaze-b2";

export async function uploadFiles(
  uploadedFiles: FormData
): Promise<StoredFile[] | null> {
  let responses: StoredFile[] = [];
  const b2 = new B2({
    applicationKeyId: process.env.BACKBLAZE_KEY_ID as string,
    applicationKey: process.env.BACKBLAZE_APP_KEY as string,
  });

  const { data: authData } = await b2.authorize();
  const { data: uploadData } = await b2.getUploadUrl({
    bucketId: process.env.BACKBLAZE_BUCKET_ID as string,
  });
  for (const [fileName, file] of uploadedFiles.entries()) {
    try {
      // rename the file before sending if you want
      const fileBuffer = Buffer.from(await (file as File).arrayBuffer());

      const { data } = await b2.uploadFile({
        uploadUrl: uploadData.uploadUrl,
        uploadAuthToken: uploadData.authorizationToken,
        fileName: fileName,
        data: fileBuffer,
      });

      const bucketName = authData.allowed.bucketName;
      const parentPath = authData.downloadUrl;
      const downloadUrl = `${parentPath}/file/${bucketName}/${data.fileName}?timestamp=${data.uploadTimestamp}`;
      responses.push({
        id: data.fileId,
        name: data.fileName,
        url: downloadUrl,
      });
    } catch (err) {
      console.log(
        `File upload error for file ${fileName} from BackBlaze B2:\n ${err}"`
      );
    }
  }
  return responses;
}
