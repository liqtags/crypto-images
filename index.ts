
/**
 * There is probs a better way to do this but I am just going to do it this way for now
 * @author
 */

import axios from 'axios';
import fs from 'fs';

// let categoryArray: any = []; // this is injected from the other file
// let tagsArray: any = []; // this is injected from the other file

import { categoryArray, tagsArray } from './scripts/arrays';

/**
 * 
 * @returns string
 * @description Injects the header container into the html
 */
const injectHeaderContainer = (): string => {
  return `
         <div class="container">
            <header class="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
                <a href="/crypto-images"
                    class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
                    <svg class="bi me-2" width="40" height="32">
                        <use xlink:href="#bootstrap"></use>
                    </svg>
                    <span class="fs-4">Crypto images</span>
                </a>

                <ul class="nav nav-pills">
                    <li class="nav-item"><a href="/crypto-images" class="nav-link active" aria-current="page">Home</a></li>
                </ul>
            </header>
        </div> 
  `;
}

/**
 * 
    * @param url string
    * @param name string
    * @returns Promise<any>
    * @description Download image from url and save it to images folder with name
 */
export async function downloadImage({ url, name }: { url: string; name: string; }): Promise<any> {
  const imagePath = './images/' + name + '.png' as string;
  const writer = fs.createWriteStream(imagePath);
  return axios({
    url,
    method: 'GET',
    responseType: 'stream',
  }).then((response: any) => {
    return new Promise((resolve, reject) => {
      response.data.pipe(writer);
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
  });
}

const namePMaker = (name: string) => {
  if (name.length > 20 && name.length < 30) {
    return `<p style="font-size: 14px;">${name}</p>`;
  } else if (name.length > 30) {
    return `<p style="font-size: 12px;">${name}</p>`;
  } else {
    return `<p>${name}</p>`;
  }
}

const loopArray = (array: any) => {
  for (let key in tagsArray) {
    console.log(key);
    let type = key;  
    let html_new = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Images</title>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
          integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
          crossorigin="anonymous"></script>
      <style>
          .image {
              margin: 8px;
              display: inline-block;
          }
          .image p {
              text-align: center;
              margin-top: 10px;
          }
          .image img {
              display: block;
              width: 100%;
              height: 100%;
              margin: 0 auto;
          }
          .image img:hover {
              transform: scale(1.1);
          }
          .image img:active {
              transform: scale(1);
          }
          .image img:focus {
              transform: scale(1.1);
          }
          .image img:visited {
              transform: scale(1.1);
          }
          .image img:link {
              transform: scale(1.1);
          }
      </style>
  </head>
  <body>
      <main>
          ${injectHeaderContainer()}
    <div class="container">
      <h1>${type} Images</h1>
      <div class="row">
          ${tagsArray[type].map((thing: any) => {
      let imagesrc = thing + '.png';
      let name = thing.replace(/-/g, ' ');
  
      name = name.split(' ').map((word: string) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }).join(' ');
  
      return `
          <div class="col-sm-4 col-6 col-lg-2">
              <div class="image">
                  <img src="/crypto-images/images/${imagesrc}" alt="placeholder" class="img-fluid">
                  <p>${name}</p>
              </div>
          </div>
                `
    }).join('')}
      </div>
  </div>
      </main>
  </body>
  </html>
  `;
  
    let lowercase = key.toLowerCase();
    // lowercase.split(' ').map((word: string) => {
    //   return word.charAt(0).toUpperCase() + word.slice(1);
    // }).join(' ');
  
    // replace spaces with _
    lowercase = lowercase.replace(/ /g, '_');
  
    fs.writeFileSync(`./pages/images_${lowercase}.html`, html_new);
  }
};

// const loopTags = (tagsArray: any) => {};

// let finalizedArr = [];
// for (let key in tagsArray) {
//   console.log(key);
//   let type = key;

//   // if the length of the key string is over 24 make font size smaller

//   let html_new = `
// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Images</title>
//     <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
//         integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
//     <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
//         integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
//         crossorigin="anonymous"></script>
//     <style>
//         .image {
//             margin: 8px;
//             display: inline-block;
//         }
//         .image p {
//             text-align: center;
//             margin-top: 10px;
//         }
//         .image img {
//             display: block;
//             width: 100%;
//             height: 100%;
//             margin: 0 auto;
//         }
//         .image img:hover {
//             transform: scale(1.1);
//         }
//         .image img:active {
//             transform: scale(1);
//         }
//         .image img:focus {
//             transform: scale(1.1);
//         }
//         .image img:visited {
//             transform: scale(1.1);
//         }
//         .image img:link {
//             transform: scale(1.1);
//         }
//     </style>
// </head>
// <body>
//     <main>
//         ${injectHeaderContainer()}
//   <div class="container">
//     <h1>${type} Images</h1>
//     <div class="row">
//         ${tagsArray[type].map((thing: any) => {
//     let imagesrc = thing + '.png';
//     let name = thing.replace(/-/g, ' ');

//     name = name.split(' ').map((word: string) => {
//       return word.charAt(0).toUpperCase() + word.slice(1);
//     }).join(' ');

//     return `
//         <div class="col-sm-4 col-6 col-lg-2">
//             <div class="image">
//                 <img src="/crypto-images/images/${imagesrc}" alt="placeholder" class="img-fluid">
//                 <p>${name}</p>
//             </div>
//         </div>
//               `
//   }).join('')}
//     </div>
// </div>
//     </main>
// </body>
// </html>
// `;

//   let lowercase = key.toLowerCase();
//   // lowercase.split(' ').map((word: string) => {
//   //   return word.charAt(0).toUpperCase() + word.slice(1);
//   // }).join(' ');

//   // replace spaces with _
//   lowercase = lowercase.replace(/ /g, '_');

//   fs.writeFileSync(`./pages/images_${lowercase}.html`, html_new);
// }

// for (let key in categoryArray) {
//   console.log(key);
//   let type = key;

//   let html_new = `
// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Images</title>
//     <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
//         integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
//     <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
//         integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
//         crossorigin="anonymous"></script>
//     <style>
//         .image {
//             margin: 8px;
//             display: inline-block;
//         }
//         .image p {
//             text-align: center;
//             margin-top: 20px;
//         }
//         .image img {
//             display: block;
//             height: 100%;
//             width: 100%;
//             margin: 0 auto;
//         }
//         .image img:hover {
//             transform: scale(1.1);
//         }
//         .image img:active {
//             transform: scale(1);
//         }
//         .image img:focus {
//             transform: scale(1.1);
//         }
//         .image img:visited {
//             transform: scale(1.1);
//         }
//         .image img:link {
//             transform: scale(1.1);
//         }
//     </style>
// </head>
// <body>
//     <main>
//         ${injectHeaderContainer()}
//       <div class="container">
//         <div class="row">
//           <div class="col">
//             <h1>${type} Images</h1>
//           </div>
//         </div>
//       </div>
//       <div class="container">
//         <div class="row">
//                     ${categoryArray[type].map((thing: any) => {
//     // imageName = imageName.toLowerCase().replace(/ /g, '-');
//     // put .png on the end
//     // get the key name of the object
//     let imagesrc = thing + '.png';
//     // let name = thing.name;
//     let name = thing.replace(/-/g, ' ');
//     // name = name.charAt(0).toUpperCase() + name.slice(1);
//     // if like bitcoin free cash make it Bitcoin Free Cash
//     name = name.split(' ').map((word: string) => {
//       return word.charAt(0).toUpperCase() + word.slice(1);
//     }).join(' ');

//     // let unslugifyedname = imageName.replace(/-/g, ' ');
//     // let chapitalizedname = imageName.charAt(0).toUpperCase() + imageName.slice(1);
//     // return `<div class="image"><img src="./images/${imageName}" alt="${imageName}" width="200" height="200"></div>`;
//     // with slug text
//   //   return `<div class="image"><img src="./images/${imagesrc}" alt="${name}" width="200" height="200">${namePMaker(name)}</div>`;
//   // }).join('')}
//   return `
//         <div class="col-sm-4 col-6 col-lg-2">
//             <div class="image">
//                 <img src="/crypto-images/images/${imagesrc}" alt="placeholder" class="img-fluid">
//                 <p>${name}</p>
//             </div>
//         </div>
//               `
//   }).join('')}
//         </div>
//       </div>
//     </main>
// </body>
// </html>
// `;

//   let lowercase = key.toLowerCase();
//   // lowercase.split(' ').map((word: string) => {
//   //   return word.charAt(0).toUpperCase() + word.slice(1);
//   // }).join(' ');

//   // replace spaces with _
//   lowercase = lowercase.replace(/ /g, '_');

//   // finalizedArr.push(lowercase);

//   fs.writeFileSync(`./pages/images_${lowercase}.html`, html_new);
// }

loopArray(tagsArray);
loopArray(categoryArray);