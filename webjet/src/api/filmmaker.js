import React from 'react';
import { get } from './restapi';

// const entity = 'http://134.209.100.116:3001/api/getmovies';
const entity = `http://${window.location.hostname}:3001/api/getmovies`;
console.log(entity);
const headers = { 'x-access-token': 'sjd1HfkjU83ksdsm3802k' };

export const getFilmMaker = () => get({ url: entity, headers });
