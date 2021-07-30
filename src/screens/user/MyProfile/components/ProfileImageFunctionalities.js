import firebase from 'firebase';

export const uploadLocalImagePath = async (dirName, uri) => {
  const ref = firebase.database().ref().child(dirName);
  await ref.set(uri);

  console.log('이미지 로컬경로 저장 성공!');
  return uri;
};

export const uploadImageFile = async (dirName, blob) => {
  const ref = firebase.storage().ref().child(dirName);
  await ref.put(blob);
  const downloadUrl = await ref.getDownloadURL();
  console.log(
    `이미지 데이터 저장 성공!~~~ 다운로드 링크 (업로드 테스트 용): ${downloadUrl}`,
  );
  return downloadUrl;
};
