import dotenv from 'dotenv';
import { getNewTrendingArray } from './getNewTrendingArray';
import { runFunctionDownloadImages } from './runFunctionDownloadImages';
dotenv.config();

export let stopAt = 1000;
let waitTime = 2500;
export let loopIndex = 0;
export let intervalId:any;
export let endIndex = 1000;

/**
 * 
 * @returns 
 * @description This function is used to run the download images function
 */
async function run() {
    let latestCoins = await getNewTrendingArray();
    let coinData = latestCoins.data;
    intervalId = setInterval(async () => {
         await runFunctionDownloadImages({
            coinData: coinData,
            loopIndex: loopIndex
        });
        loopIndex++;
    }, waitTime);
}

run()