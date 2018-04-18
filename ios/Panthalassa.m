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

RCT_EXPORT_MODULE()

RCT_REMAP_METHOD(PanthalassaNewAccountKeys,
                 params:(NSDictionary *)parameters
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
  
  NSString *newAccount;
  NSError *error = nil;
  newAccount = PanthalassaNewAccountKeys([RCTConvert NSString:parameters[@"pw"]],
                                         [RCTConvert NSString:parameters[@"pwConfirm"]],
                                         &error);
  
  if (error == nil) {
    resolve(newAccount);
  } else {
    reject(@"error", error.localizedDescription, error);
  }
}

RCT_REMAP_METHOD(PanthalassaNewPanthalassa,
                 data:(NSDictionary *)parameters
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
  
  PanthalassaPanthalassa *instance;
  NSError *error = nil;
  
  instance = PanthalassaNewPanthalassa([RCTConvert NSString:parameters[@"keyStore"]],
                                       [RCTConvert NSString:parameters[@"pw"]],
                                       &error);
  
  if (error == nil) {
    resolve(instance);
  } else {
    reject(@"error", error.localizedDescription, error);
  }
}

RCT_REMAP_METHOD(PanthalassaScryptDecrypt,
                 dataDecrypt:(NSDictionary *)parameters
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
  
  NSString *response;
  NSError *error = nil;
  response = PanthalassaScryptDecrypt([RCTConvert NSString:parameters[@"data"]],
                                         [RCTConvert NSString:parameters[@"pw"]],
                                         &error);
  
  if (error == nil) {
    resolve(response);
  } else {
    reject(@"error", error.localizedDescription, error);
  }
}

RCT_REMAP_METHOD(PanthalassaScryptEncrypt,
                 dataEncrypt:(NSDictionary *)parameters
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
  
  NSString *response;
  NSError *error = nil;
  response = PanthalassaScryptEncrypt([RCTConvert NSString:parameters[@"data"]],
                                      [RCTConvert NSString:parameters[@"pw"]],
                                      [RCTConvert NSString:parameters[@"pwConfirm"]],
                                      &error);
  
  if (error == nil) {
    resolve(response);
  } else {
    reject(@"error", error.localizedDescription, error);
  }
}

@end
