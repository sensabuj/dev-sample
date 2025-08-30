import { CacheModel } from "@models/cache.model";
import NodeCache from "node-cache";
import { injectable } from "tsyringe";
import { logger } from "./logger";

/**
 * wrapper class to provide caching service
 * put key value in cache,
 * get value of key from cache
 */
@injectable()
export class CacheWrapperService {

    private static instance:CacheWrapperService;
     private keyMap = new WeakMap()
    //TODO This is a temporary implementation to get the ball rolling
    inmemoryCache:NodeCache;
    constructor() {
    
    }
    public static getInstance(): CacheWrapperService{
        if(!CacheWrapperService.instance){
            CacheWrapperService.instance = new CacheWrapperService();
            CacheWrapperService.instance.inmemoryCache = new NodeCache( { stdTTL: 1800, checkperiod: 120 } );
        }
        return CacheWrapperService.instance;
    }
    
    public set(key:any, value:any){
        this.inmemoryCache.set(key, value);
    }

    public get(key:any){
        let returnValue:CacheModel = this.inmemoryCache.get<CacheModel>(key);
        return returnValue;
    }

}