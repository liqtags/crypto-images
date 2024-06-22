import axios from 'axios';

/**
 * 
 * @returns any[]
 * @description This function is used to get the new trending array
 */
export async function getNewTrendingArray() {
    let date = new Date();
    let year = date.getFullYear();
    let month: any = date.getMonth();
    if (month < 10) {
        month = `0${month}`;
    }
    let day = date.getDate();
    let dateStr = `${year}-${month}-${day}`;
    let latestCoinsUrl = process.env.NEW_COINS_URL as string;
    latestCoinsUrl = latestCoinsUrl.replace('${dateStr}', dateStr);
    let latestCoinsResponse = await axios.get(latestCoinsUrl);
    return latestCoinsResponse.data;
}
