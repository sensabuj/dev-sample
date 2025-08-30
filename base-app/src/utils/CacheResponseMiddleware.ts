import { CacheModel } from "@models/cache.model";
import { CacheWrapperService } from "./CacheWrapperService";
import { isEmpty } from "./util";
import config from '@config/endpoints.config';
import { logger } from "./logger";

let memCache = CacheWrapperService.getInstance();

/**
 * caching should be used along with the session portion as part of key to avoid crossreferences
 * @param duration 
 * @returns 
 */
let cacheControlAccountMiddleware = (duration) => {
    return (req, res, next) => {

        const { guid } = req.body;
        const model = <CacheModel>memCache.get(guid);
         //if cache is empty or if guid is empty throw error

         //Not sure if there is better key to be used for caching response
        let key =  guid + req.originalUrl || req.url
        let cacheContent = memCache.get(key);
        if(cacheContent && !(isEmpty(guid) || isEmpty(model))){
            res.set('content-type', 'application/json')
            res.send( cacheContent );
            return
        }else{
            res.sendResponse = res.send
            res.send = (body) => {
                if(res.statusCode === 200){
                    memCache.set(key,body);
                } else {
                    logger.info('got response as code ::', res.statusCode)
                }
                
                res.sendResponse(body)
            }
            next()
        }
    }
}


/**
 * caching should be used along with the session portion as part of key to avoid crossreferences
 * @param duration 
 * @returns 
 */
let cacheCompayProgramMiddleware = (duration) => {
    return (req, res, next) => {

        const x_client_id = <string>req.headers[config.XClientId]
        const company_id = <string>req.headers[config.CompanyId]
       
         //Not sure if there is better key to be used for caching response
        let key =  x_client_id+company_id + req.originalUrl || req.url
        let cacheContent = memCache.get(key);
        if(cacheContent){
            res.set('content-type', 'application/json')
            res.send( cacheContent );
            return
        }else{
            res.sendResponse = res.send
            res.send = (body) => {
                if(res.statusCode === 200){
                    memCache.set(key,body);
                } else {
                    logger.info('got response as code ::', res.statusCode)
                }
                
                res.sendResponse(body)
            }
            next()
        }
    }
}

export {cacheCompayProgramMiddleware as cacheCompayProgram,cacheControlAccountMiddleware}