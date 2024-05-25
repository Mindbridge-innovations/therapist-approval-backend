// utils/credentialUpload.js
const { getStorage } = require('firebase-admin/storage');
const { db } = require('../config/firebaseConfig');

const uploadCredentials = async (userId, fileData) => {
  const storage = getStorage();
  const credentialsRef = db.ref('credentials');
  const newCredentialRef = credentialsRef.push();

  let fileUrl = null;
  if (fileData) {
    const { fileBuffer, fileName, mimeType } = fileData;
    const fileRef = storage.bucket().file(`credentials/${userId}/${fileName}`);
    await fileRef.save(fileBuffer, { contentType: mimeType });
    const [url] = await fileRef.getSignedUrl({
      action: 'read',
      expires: '03-09-2491' // Far future date
    });
    fileUrl = url;
  }

  const newCredential = {
    userId: userId,
    fileUrl: fileUrl, // This will be null if no file was uploaded
    uploadedAt: new Date().toISOString()
  };

  await newCredentialRef.set(newCredential);

  return { success: true, message: 'Credentials uploaded successfully', credentialId: newCredentialRef.key };
};

module.exports = { uploadCredentials };