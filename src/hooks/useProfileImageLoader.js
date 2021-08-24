import React, { useEffect } from 'react';
import firebase from 'firebase';
import * as FileSystem from 'expo-file-system';

import { useStoreActions, useStoreState } from 'easy-peasy';
import { selectIsProfileImageUploaded } from '../store/selectors';
import { actionsSetProfileImageUrl } from '../store/actions';

export const useProfileImageLoader = () => {
  const setProfileImageUrl = useStoreActions(actionsSetProfileImageUrl);
  const isImageUploaded = useStoreState(selectIsProfileImageUploaded);

  useEffect(() => {
    async function loadProfileImage() {
      const ref = firebase.storage().ref().child('profileImage');
      setProfileImageUrl(await ref.getDownloadURL());
    }

    loadProfileImage();

    // (async function loadLocalImage() {
    //   const ref = firebase.database().ref().child('profileImage');
    //   ref.on('value', async snapshot => {
    //     // 로컬 이미지 경로 가져오기
    //     const uri = snapshot.val();

    //     if (!uri) {
    //       // 경로가 없으면 바로 원본 이미지 가져오기
    //       await loadProfileImage();
    //     }

    //     // 로컬 이미지 경로로 현재 기기에 사진이 있는지 확인
    //     const dirInfo = await FileSystem.getInfoAsync(uri).catch(async err => {
    //       console.log(err);
    //       await loadProfileImage();
    //     });

    //     // 파일 존재, 바로 사용
    //     if (dirInfo.exists) {
    //       setDefaultUri(uri);
    //     } else {
    //       await loadProfileImage();
    //     }
    //   });
    // })();
  }, [setProfileImageUrl, isImageUploaded]);
};
