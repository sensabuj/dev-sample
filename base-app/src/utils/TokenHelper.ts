import * as util from 'util';
import https, { Agent } from 'https';
import { injectable } from 'tsyringe';
import { URLSearchParams } from 'url';
import * as fs from 'fs';
import axios from "axios";
import config from '@config/endpoints.config';
import { logger } from './logger';
import {isEmpty} from '@utils/util';
import moment, { Moment } from 'moment';

@injectable()
export class TokenHelper {

    private authorization: any;
    private key: any;
    private cert: any;
    private accessToken:any;
    private tokenExpiresOn:Moment;
    private axiosInstance;
    constructor() {
    }

    public async getDetails() {
        let localkey: any;
        let localcert: any;

        if (this.key == undefined || this.cert == undefined) {

            const readFile = util.promisify(fs.readFile);
            localkey = await readFile(config.SSLKeyPath, 'utf-8').catch(function (e) {
                logger.info("Error reading file", e);
            });

            localcert = await readFile(config.SSLCertPath, 'utf-8').catch(function (e) {
                logger.info("Error reading file", e);
            });
            this.key = localkey;
            this.cert = localcert;
        } else {
            localkey = this.key;
            localcert = this.cert;
        }
        return { localkey, localcert };
    }

    public async getAxiosInstance() {
        await this.getDetails();
       if(typeof this.axiosInstance == 'undefined'){
        this.axiosInstance = axios.create({

            httpsAgent: new https.Agent({
                cert: this.cert,
                key: this.key,
                passphrase: config.PassPhrase,
                rejectUnauthorized: false
            })
        })
       } 
       return this.axiosInstance;
    }

    public async getAccessToken() {
        console.log('llll')
        if(isEmpty(this.authorization) || !(this.tokenExpiresOn> moment())){
        const params = new URLSearchParams();

        params.append('grant_type', config.ClientCredentials);
        params.append('scope', config.APICScope);
        params.append('client_id', config.APICClientId);
        params.append('client_secret', config.APICClientSecret);

        const configs = {
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            }

        }
        const modAxios = await this.getAxiosInstance();
        const resp = await modAxios.post(config.APICTokenURL, params, configs).
            then((result: { data: { token_type: string; access_token: string; expires_in: moment.DurationInputArg1; }; }) => {

                this.authorization = result.data.token_type + ' ' + result.data.access_token;
                this.tokenExpiresOn = moment().add(result.data.expires_in, "seconds")

            }).
            catch((err: any) => {
                logger.info('errored on ::', err);
            })
        }
          
        return this.authorization;
    }


}