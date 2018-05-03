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
  
RCT_REMAP_METHOD(PanthalassaNewAccountKeys,
                 params:(NSDictionary *)config
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
  
  NSString *newAccount;
  NSError *error = nil;
  newAccount = PanthalassaNewAccountKeys([RCTConvert NSString:config[@"pw"]],
                                         [RCTConvert NSString:config[@"pwConfirm"]],
                                         &error);
  
  if (error == nil) {
    resolve(newAccount);
  } else {
    reject(@"error", error.localizedDescription, error);
  }
}

RCT_REMAP_METHOD(PanthalassaNewAccountKeysFromMnemonic,
                 parameters:(NSDictionary *)config
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
  
  NSString *newAccount;
  NSError *error = nil;
  newAccount = PanthalassaNewAccountKeysFromMnemonic([RCTConvert NSString:config[@"mnemonic"]],
                                         [RCTConvert NSString:config[@"pw"]],
                                         [RCTConvert NSString:config[@"pwConfirm"]],
                                         &error);
  
  if (error == nil) {
    resolve(newAccount);
  } else {
    reject(@"error", error.localizedDescription, error);
  }
}

RCT_REMAP_METHOD(PanthalassaNewPanthalassa,
                 parameter:(NSDictionary *)config
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
  BOOL response;
  NSError *error = nil;
  
  response = PanthalassaNewPanthalassa([RCTConvert NSString:config[@"accountStore"]],
                                       [RCTConvert NSString:config[@"pw"]],
                                       &error);
  
  if (response) {
    resolve(@YES);
  } else {
    reject(@"error", error.localizedDescription, error);
  }
}

RCT_REMAP_METHOD(PanthalassaNewPanthalassaFromMnemonic,
                 parametersMnemonic:(NSDictionary *)config
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
  
  BOOL response;
  NSError *error = nil;
  
  response = PanthalassaNewPanthalassaFromMnemonic([RCTConvert NSString:config[@"accountStore"]],
                                                   [RCTConvert NSString:config[@"mnemonic"]],
                                                   &error);
  
  if (response) {
    resolve(@YES);
  } else {
    reject(@"error", error.localizedDescription, error);
  }
}

RCT_REMAP_METHOD(PanthalassaScryptDecrypt,
                 scryptDecrypt:(NSDictionary *)parameters
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
                 scryptEncrypt:(NSDictionary *)parameters
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

RCT_REMAP_METHOD(PanthalassaIsValidCID,
                 validCid:(NSString *)cid
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
  
  NSError *error = nil;
  BOOL response;
  response = PanthalassaIsValidCID(cid);
  
  if (response) {
    resolve(@YES);
  } else {
    reject(@"error", @"No valid CID", error);
  }
}

RCT_REMAP_METHOD(PanthalassaCIDSha256,
                 value256:(NSString *)value
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
  
  NSString *response;
  NSError *error = nil;
  response = PanthalassaCIDSha256(value, &error);
  
  if (error == nil) {
    resolve(response);
  } else {
    reject(@"error", error.localizedDescription, error);
  }
}

RCT_REMAP_METHOD(PanthalassaCIDSha512,
                 value512:(NSString *)value
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
  NSString *response;
  NSError *error = nil;
  response = PanthalassaCIDSha512(value, &error);
  
  if (error == nil) {
    resolve(response);
  } else {
    reject(@"error", error.localizedDescription, error);
  }
}

RCT_REMAP_METHOD(PanthalassaEthereumPrivateKey,
                 privateEthKey:
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
    
  NSString *response;
  NSError *error = nil;
  response = PanthalassaEthereumPrivateKey(&error);
  
  if (error == nil) {
    resolve(response);
  } else {
    reject(@"error", error.localizedDescription, error);
  }
}

RCT_REMAP_METHOD(PanthalassaExport,
                 panthalassaExp:(NSDictionary *)parameters
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
  
  NSString *response;
  NSError *error = nil;
  response = PanthalassaExport([RCTConvert NSString:parameters[@"pw"]],
                                           [RCTConvert NSString:parameters[@"pwConfirm"]],
                                           &error);
  
  if (error == nil) {
    resolve(response);
  } else {
    reject(@"error", error.localizedDescription, error);
  }
}

RCT_REMAP_METHOD(PanthalassaStop,
                 panthStop:
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
    
  BOOL response;
  NSError *error = nil;
  response = PanthalassaStop(&error);
  
  if (response) {
    resolve(@YES);
  } else {
    reject(@"error", error.localizedDescription, error);
  }
}

@end
