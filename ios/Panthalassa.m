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
  newAccount = PanthalassaNewAccountKeysFromMnemonic([RCTConvert NSString:config[@"mne"]],
                                         [RCTConvert NSString:config[@"pw"]],
                                         [RCTConvert NSString:config[@"pwConfirm"]],
                                         &error);
  
  if (error == nil) {
    resolve(newAccount);
  } else {
    reject(@"error", error.localizedDescription, error);
  }
}

RCT_REMAP_METHOD(PanthalassaEthPrivateKey,
                 ethPrivateKey:
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
  NSString* response;
  NSError *error = nil;
  
  response = PanthalassaEthPrivateKey(&error);
  
  if (error == nil) {
    resolve(response);
  } else {
    reject(@"error", error.localizedDescription, error);
  }
}

RCT_REMAP_METHOD(PanthalassaStartFromMnemonic,
                 parametersMnemonic:(NSDictionary *)config
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
  
  BOOL response;
  NSError *error = nil;

  response = PanthalassaStartFromMnemonic([RCTConvert NSString:config[@"accountStore"]],
                                                   [RCTConvert NSString:config[@"mnemonic"]],
                                                   &error);
  NSNumber *val = [NSNumber numberWithBool:response];
  
  if (error == nil) {
    resolve(val);
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

RCT_REMAP_METHOD(PanthalassaIsValidMnemonic,
                 validMnemonic:(NSString *)mnemonic
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
    
  BOOL response;
  NSError *error = nil;
  response = PanthalassaIsValidMnemonic(mnemonic);
  
  if (response) {
    resolve(@YES);
  } else {
    reject(@"error", @"Invalid mnemonic", error);
  }
}

RCT_REMAP_METHOD(PanthalassaExportAccountStore,
                 panthalassaExp:(NSDictionary *)parameters
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
  
  NSString *response;
  NSError *error = nil;
  response = PanthalassaExportAccountStore([RCTConvert NSString:parameters[@"pw"]],
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
  NSNumber *val = [NSNumber numberWithBool:response];
  
  if (error == nil) {
    resolve(val);
  } else {
    reject(@"error", error.localizedDescription, error);
  }
}

RCT_REMAP_METHOD(PanthalassaSendResponse,
                 sendResponse:(NSString *)resp
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
  
  BOOL response;
  NSError *error = nil;
  response = PanthalassaSendResponse(resp, &error);
  NSNumber *val = [NSNumber numberWithBool:response];
  
  if (error == nil) {
    resolve(val);
  } else {
    reject(@"error", @"Invalid mnemonic", error);
  }
}

RCT_REMAP_METHOD(PanthalassaStart,
                 start:(NSDictionary *)config
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
  
  BOOL response;
  NSError *error = nil;
  
  response = PanthalassaStart([RCTConvert NSString:config[@"accountStore"]],
                                          [RCTConvert NSString:config[@"password"]],
                                          &error);
  NSNumber *val = [NSNumber numberWithBool:response];
  
  if (error == nil) {
    resolve(val);
  } else {
    reject(@"error", error.localizedDescription, error);
  }
}

@end
