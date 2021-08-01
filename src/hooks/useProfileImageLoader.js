import React, { useEffect } from 'react';
import firebase from 'firebase';

export const useProfileImageLoader = setDefaultUri => {
  useEffect(() => {
    async function loadProfileImage() {
      const ref = firebase.storage().ref().child('profileImage');
      setDefaultUri(await ref.getDownloadURL());
    }

    (async function loadLocalImage() {
      const ref = firebase.database().ref().child('profileImage');
      ref.on('value', async snapshot => {
        // 로컬 이미지 경로 가져오기
        const uri = snapshot.val();

        if (!uri) {
          // 경로가 없으면 바로 원본 이미지 가져오기
          await loadProfileImage();
        }

        // 로컬 이미지 경로로 현재 기기에 사진이 있는지 확인
        const dirInfo = await FileSystem.getInfoAsync(uri);

        // 파일 존재, 바로 사용
        if (dirInfo.exists) {
          setDefaultUri(uri);
        } else {
          await loadProfileImage();
        }
      });
    })();
  }, []);
};