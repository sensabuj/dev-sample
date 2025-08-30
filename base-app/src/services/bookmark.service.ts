import { TokenHelper } from "@utils/TokenHelper";
import config from '@config/endpoints.config';
import { injectable } from "tsyringe";
import { AccountSummaryDTO } from "@models/accountsummary.models";
import { logger } from "@utils/logger";
import { Request, response, Response } from "express";
import { CacheWrapperService } from '@utils/CacheWrapperService';

@injectable()
export class BookMarkService {
    tokenHelper: TokenHelper;
    cache: CacheWrapperService = CacheWrapperService.getInstance();

    constructor(tokenHelper: TokenHelper) {
        this.tokenHelper = tokenHelper;
    }
    configs;
    public async commonHeader(){
        let accessToken = await this.tokenHelper.getAccessToken();
        this.configs = {
            'Authorization': accessToken,
            'Accept': 'application/json',
            'X-client-id': '1',
            'X-application-id': '1111',
            'X-ibm-client-id': config.APICClientId,
        };
    }
    
    public async getBookMarkList(req: Request, res: Response) {
        let response;
        try{
            await this.commonHeader();
            let axios = await this.tokenHelper.getAxiosInstance();
            let profileId = req.body.profileId;
            await axios({ method: 'get', url: config.BookmarkListURL+'?profile_id='+profileId, headers: this.configs}).then(result=>{
                response = result.data;
            })
        } catch(error) {
            if (error.response.status) {
                logger.error('Error recieved from DG ::' + error.response.status + '::' + JSON.stringify(error.response.data));
            }
        }
        return response;
    }   

    public async removeBookmark(req: Request, res: Response) {
        let response;
        try{
            await this.commonHeader();

            let axios = await this.tokenHelper.getAxiosInstance();
            await axios({ method: 'delete', url: config.BookmarkListURL+'?profile_id='+req.body.profileId+'&bookmark_id='+req.body.bookmarkId, headers: this.configs}).then(result=>{
                response = result.data;
            })
        } catch(error) {
            if (error.response.status) {
                logger.error('Error recieved from DG ::' + error.response.status + '::' + JSON.stringify(error.response.data));
            }
        }
        return response;
    } 

    public async updateBookmark(req: Request, res: Response) {
        let response;
        try{
            await this.commonHeader();

            let axios = await this.tokenHelper.getAxiosInstance();
            await axios({ method: 'post', url: config.BookmarkListURL,data: req.body,headers: this.configs})
            .then(result=>{
                response = result.data;
            })
        } catch (error) {
            if (error.response.status) {
                logger.error('Error recieved from DG ::' + error.response.status + '::' + JSON.stringify(error.response.data));
            }
        }
        return response;
    } 
}