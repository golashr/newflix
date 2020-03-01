import { get } from './restapi';

const entity = 'http://localhost:3001/api/getmovies';
const headers = { 'x-access-token': 'sjd1HfkjU83ksdsm3802k' };

export const getFilmMaker = () => get({ url: entity, headers });
