import fs from 'fs';
import { downloadImage } from './downloadImage';
import { stopAt, intervalId, endIndex } from './downloadNewImages';

interface IRunFunction {
    coinData: any;
    loopIndex: number;
}

/**
 * 
 * @param obj 
 * @returns 
 * @description This function is used to download images for the coins
 */
export const runFunctionDownloadImages = async (obj: IRunFunction) => {
    try {
        let { loopIndex, coinData } = obj;
        
        if (loopIndex === stopAt) {
            console.log(`Hit stopping`);
            clearInterval(intervalId);
            return;
        }

        if (fs.existsSync(`./images/${coinData[loopIndex].key}.png`)) {
            console.log(`Stopping as no new images to download`);
            clearInterval(intervalId);
            return; 
        }

        let coin = coinData[loopIndex];

        if (!coin) {
            console.log('Coin is undefined');
            clearInterval(intervalId);
            return;
        }

        await downloadImage(coin.image.native.replace('API_DOMAIN', 'cryptorank'), coin.key);

        console.log(`Downloaded image for ${coin.key}`);

        if (loopIndex >= endIndex) {
            console.log('All done');
            clearInterval(intervalId);
        }

        return; 
    } catch (error: any) {
        console.log('Error', error.message);
        clearInterval(intervalId);
    }
};
