"use server";
import B2 from "backblaze-b2";

export async function uploadImage(formData: FormData) {
  const file = formData.get("image") as File;
  try {
    // rename the file before sending if you want
    const b2 = new B2({
      applicationKeyId: process.env.BACKBLAZE_KEY_ID as string,
      applicationKey: process.env.BACKBLAZE_APP_KEY as string,
    });

    const { data: authData } = await b2.authorize();
    const { data: uploadData } = await b2.getUploadUrl({
      bucketId: process.env.BACKBLAZE_BUCKET_ID as string,
    });

    const fileBuffer = Buffer.from(await file.arrayBuffer());

    const { data } = await b2.uploadFile({
      uploadUrl: uploadData.uploadUrl,
      uploadAuthToken: uploadData.authorizationToken,
      fileName: file.name,
      data: fileBuffer,
    });

    const bucketName = authData.allowed.bucketName;
    const parentPath = authData.downloadUrl;
    const downloadUrl = `${parentPath}/file/${bucketName}/${data.fileName}?timestamp=${data.uploadTimestamp}`;
    return downloadUrl;
  } catch (err) {
    console.log("File upload error from BackBlaze B2:", err);
  }
}
