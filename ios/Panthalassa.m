//
//  Panthalassa.m
//  Pangea
//
//  Created by Alberto R. Estarrona on 18/04/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "Panthalassa.h"
#import <panthalassa/panthalassa.h>
#import <React/RCTConvert.h>

@implementation Panthalassa

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

RCT_EXPORT_MODULE();

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(PanthalassaNewAccountKeys:(NSDictionary *)parameters) {
  
  NSString *newAccount;
  NSError *error = nil;
  newAccount = PanthalassaNewAccountKeys([RCTConvert NSString:parameters[@"pw"]],
                                         [RCTConvert NSString:parameters[@"pwConfirm"]],
                                         &error);
  
  if (error == nil) {
    return newAccount;
  } else {
    return(error.localizedDescription);
  }
}

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(PanthalassaNewPanthalassa:(NSDictionary *)parameters) {
  
  PanthalassaPanthalassa *instance;
  NSError *error = nil;
  
  instance = PanthalassaNewPanthalassa([RCTConvert NSString:parameters[@"keyStore"]],
                                       [RCTConvert NSString:parameters[@"pw"]],
                                       &error);
  
  if (error == nil) {
    return instance;
  } else {
    return(error.localizedDescription);
  }
}

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(PanthalassaScryptDecrypt:(NSDictionary *)parameters) {
  
  NSString *response;
  NSError *error = nil;
  response = PanthalassaScryptDecrypt([RCTConvert NSString:parameters[@"data"]],
                                         [RCTConvert NSString:parameters[@"pw"]],
                                         &error);
  
  if (error == nil) {
    return response;
  } else {
    return(error.localizedDescription);
  }
}

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(PanthalassaScryptEncrypt:(NSDictionary *)parameters) {
  
  NSString *response;
  NSError *error = nil;
  response = PanthalassaScryptEncrypt([RCTConvert NSString:parameters[@"data"]],
                                      [RCTConvert NSString:parameters[@"pw"]],
                                      [RCTConvert NSString:parameters[@"pwConfirm"]],
                                      &error);
  
  if (error == nil) {
    return response;
  } else {
    return(error.localizedDescription);
  }
}

@end
