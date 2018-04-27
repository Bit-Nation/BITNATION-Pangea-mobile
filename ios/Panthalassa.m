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

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(PanthalassaNewAccountKeysFromMnemonic:(NSDictionary *)parameters) {
  
  NSString *newAccount;
  NSError *error = nil;
  newAccount = PanthalassaNewAccountKeysFromMnemonic([RCTConvert NSString:parameters[@"mnemonic"]],
                                         [RCTConvert NSString:parameters[@"pw"]],
                                         [RCTConvert NSString:parameters[@"pwConfirm"]],
                                         &error);
  
  if (error == nil) {
    return newAccount;
  } else {
    return(error.localizedDescription);
  }
}

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(PanthalassaNewPanthalassa:(NSDictionary *)parameters) {
  
  BOOL response;
  NSError *error = nil;
  
  response = PanthalassaNewPanthalassa([RCTConvert NSString:parameters[@"accountStore"]],
                                       [RCTConvert NSString:parameters[@"pw"]],
                                       &error);
  
  if (response) {
    return @YES;
  } else {
    return @NO;
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

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(PanthalassaIsValidCID:(NSString *)cid) {
  
  BOOL response;
  response = PanthalassaIsValidCID(cid);
  
  if (response) {
    return @YES;
  } else {
    return @NO;
  }
}

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(PanthalassaCIDSha256:(NSString *)value) {
  
  NSString *response;
  NSError *error = nil;
  response = PanthalassaCIDSha256(value, &error);
  
  if (error == nil) {
    return response;
  } else {
    return(error.localizedDescription);
  }
}

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(PanthalassaCIDSha512:(NSString *)value) {
  
  NSString *response;
  NSError *error = nil;
  response = PanthalassaCIDSha512(value, &error);
  
  if (error == nil) {
    return response;
  } else {
    return(error.localizedDescription);
  }
}

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(PanthalassaEthereumPrivateKey) {
  
  NSString *response;
  NSError *error = nil;
  response = PanthalassaEthereumPrivateKey(&error);
  
  if (error == nil) {
    return response;
  } else {
    return(error.localizedDescription);
  }
}

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(PanthalassaExport:(NSDictionary *)parameters) {
  
  NSString *response;
  NSError *error = nil;
  response = PanthalassaExport([RCTConvert NSString:parameters[@"pw"]],
                                           [RCTConvert NSString:parameters[@"pwConfirm"]],
                                           &error);
  
  if (error == nil) {
    return response;
  } else {
    return(error.localizedDescription);
  }
}

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(PanthalassaStop) {
  
  BOOL response;
  NSError *error = nil;
  response = PanthalassaStop(&error);
  
  if (response) {
    return @YES;
  } else {
    return @NO;
  }
}

@end
