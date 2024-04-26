import {createClient} from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import 'dotenv/config';

export const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    useCdn: true,
    apiVersion: '2024-03-18',
    token: process.env.NEXT_PUBLIC_SANITY_SECRET_TOKEN,
    withCredentials: true
  });

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);