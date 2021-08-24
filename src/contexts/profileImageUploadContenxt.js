import { useState, useCallback } from 'react';
import constate from 'constate';

const useProfileUploadContext = () => {
  const [defaultProfileImgUri, setDefaultProfileImgUri] = useState(undefined);
  const [isProfileImgUploaded, u1] = useState(false);
  const completeUploadProfileImg = useCallback(() => u1(prv => !prv), []);

  return {
    defaultProfileImgUri,
    setDefaultProfileImgUri,
    isProfileImgUploaded,
    completeUploadProfileImg,
  };
};

export const [
  ProfileUploadProvider,
  useDefaultProfileImgUri,
  useProfileImgUploaded,
] = constate(
  useProfileUploadContext,
  v => [v.defaultProfileImgUri, v.setDefaultProfileImgUri],
  v => [v.isProfileImgUploaded, v.completeUploadProfileImg],
);
