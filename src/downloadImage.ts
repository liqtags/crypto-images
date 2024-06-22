import fs from 'fs';
import axios from 'axios';

/**
 * 
 * @param name 
 * @returns 
 * @description This function is used to generate an image path
 */
let generateImagePath = async (name:any) => `./images/${name}.png`;

/**
 * 
 * @param imagePath 
 * @returns 
 * @description This function is used to create a file reader
 */
let createFileReader = async (imagePath:any) => fs.createWriteStream(imagePath);

/**
 * 
 * @param url 
 * @param name 
 * @returns 
 * @description This function is used to download an image
 */
export async function downloadImage(url: string, name: string) {
    const imagePath = await generateImagePath(name);
    const writer = await createFileReader(imagePath);

    let getBytes = await axios({
        url,
        method: 'GET',
        responseType: 'stream',
    });

    return await new Promise((resolve, reject) => {
        getBytes.data.pipe(writer);
        let error: any = null;
        writer.on('error', (err: any) => {
            error = err;
            writer.close();
            reject(err);
        });
        writer.on('close', () => {
            if (!error) {
                resolve(imagePath);
            }
        });
    });
}
