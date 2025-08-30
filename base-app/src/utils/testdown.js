'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const Download = require('sp-download').Download;
const { SPPull } = require('sppull');
var http = require('http');
var fs = require('fs');
var spauth = require('node-sp-auth');
var request = require('request-promise');

let saveToPath1 = 'C:projectsMember-ConnectprimaxconnectMemberConnect_Serverdownload';
let filePathToDownload =
  'http://solutions.pscu.net/OurSolutions/Projects/Primax Connect Content Migration/Billing Organization/822 Product Operations/Secure Remote Commerce/mastercard-src-faqs.pdf';
let saveToPath = '@C:projects\\Member-Connect\\primaxconnect\\MemberConnect_Server\\download';
let saveToPath11 = '@C:projects\\Member-ConnectprimaxconnectMemberConnect_Serverdownload\faqs.pdf';
async function calldownload() {
  const authContext = {
    username: 'FLesSud@pscu.com',
    password: 'Hjkj1188!!',
    domain: 'sp',
  };

  const context = {
    siteUrl: 'http://solutions.pscu.net/OurSolutions',
    creds: {
      username: 'FLesSud@pscu.com',
      password: 'Hjkj1188!!',
      online: true,
    },
  };
  const options = {
    spRootFolder: 'Projects',
    dlRootFolder: saveToPath,
  };
  try {
    let download = new Download(authContext);
    let downloads= await download.downloadFile(filePathToDownload, saveToPath);

    // await SPPull.download(context, options);
    console.log('Done', downloads);

    /*  .then(savedToPathFinal => {
        console.log(`${filePathToDownload} has been downloaded to ${savedToPathFinal}`);
      })
      .catch(error => {
        console.log(error);
      }); */
    return 'test';
  } catch (err) {}
}
exports.calldownload = calldownload;
