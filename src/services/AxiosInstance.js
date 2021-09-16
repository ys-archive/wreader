import axios from 'axios';
import { BASE_URL, DEV_URL } from '@env';

export const instance = axios.create({
  baseURL: 'http://ec2-3-34-188-160.ap-northeast-2.compute.amazonaws.com/',
  // baseURL: 'http://ec2-18-219-42-64.us-east-2.compute.amazonaws.com/',
});
