#import "RCTMoviesAppModule.h"
#import <React/RCTLog.h>
#import <AFNetworking/AFNetworking.h>

@implementation RCTMoviesAppModule


RCT_EXPORT_METHOD(getMovies:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    NSString *baseUrl = @"https://api.themoviedb.org/3/discover/movie?";
    NSString *token = @"api_key=8a7a64e451a393f90a1ba924c9113c5d";
    NSString *queryParams = @"&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc";
    
    NSString *urlString = [NSString stringWithFormat:@"%@%@%@", baseUrl, token, queryParams];
  
    AFHTTPSessionManager *manager = [AFHTTPSessionManager manager];
    [manager GET:urlString parameters:nil headers:nil progress:nil success:^(NSURLSessionTask *task, id responseObject) {
        resolve(responseObject);
    } failure:^(NSURLSessionTask *operation, NSError *error) {
        reject(@"fetch_error", @"Failed to fetch movies", error);
    }];
}

RCT_EXPORT_MODULE();

@end


