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
#import "PanthalassaUpStreamBridge.h"
#import <Realm/Realm.h>

@interface DHTValue : RLMObject
@property NSString *key;
@property NSData *value;
@property NSDate *ttl;
@end

@implementation DHTValue
+ (NSArray *)requiredProperties {
  return @[@"key", @"value", @"ttl"];
}
@end

RLM_ARRAY_TYPE(DHTValue)

@interface Account : RLMObject
@property NSString *id;
@property NSString *name;
@property NSString *location;
@property NSString *description_;
@property NSString *profileImage;
@property NSString *accountStore;
@property bool confirmedMnemonic;
@property NSString *networkType;
@property RLMArray <DHTValue> *DHT;
@end

@implementation Account
+ (NSString *)primaryKey {
  return @"id";
}
+ (NSArray *)requiredProperties {
  return @[@"id", @"name", @"location", @"description_", @"profileImage", @"accountStore", @"confirmedMnemonic", @"networkType", @"DHT"];
}
@end


@implementation Panthalassa
{
  bool hasListeners;
}

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

RCT_EXPORT_MODULE();
  
RCT_REMAP_METHOD(PanthalassaNewAccountKeys,
                 panthalassaNewAccountKeysWithParams:(NSDictionary *)config
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
                 panthalassaNewAccountKeysFromMnemonicWithParameters:(NSDictionary *)config
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

RCT_REMAP_METHOD(PanthalassaEthAddress,
                 PanthalassaEthPrivateAddressWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
  NSString* response;
  NSError *error = nil;
  
  response = PanthalassaEthAddress(&error);
  
  if (error == nil) {
    resolve(response);
  } else {
    reject(@"error", error.localizedDescription, error);
  }
}

RCT_REMAP_METHOD(PanthalassaEthPrivateKey,
                 PanthalassaEthPrivateKeyWithResolver:(RCTPromiseResolveBlock)resolve
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
                 parametersStartFromMnemonic:(NSDictionary *)config
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
  
  BOOL response;
  NSError *error = nil;

  upstream = [[PanthalassaUpStreamBridge alloc] init];
  [upstream setDelegate:self];
  
  response = PanthalassaStartFromMnemonic([RCTConvert NSString:config[@"config"]],
                                                   [RCTConvert NSString:config[@"mnemonic"]],
                                                   upstream,
                                                   &error);
  NSNumber *val = [NSNumber numberWithBool:response];
  
  if (error == nil) {
    resolve(val);
  } else {
    reject(@"error", error.localizedDescription, error);
  }
  
   [upstream send:@"Upstream created"];
}

RCT_REMAP_METHOD(PanthalassaIsValidMnemonic,
                 validMnemonic:(NSString *)mnemonic
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
  
  BOOL response;
  
  @try {
    response = PanthalassaIsValidMnemonic(mnemonic);
    NSNumber *val = [NSNumber numberWithBool:response];
    resolve(val);
  }
  @catch (NSException *exception) {
    NSMutableDictionary * info = [NSMutableDictionary dictionary];
    [info setValue:exception.name forKey:@"ExceptionName"];
    [info setValue:exception.reason forKey:@"ExceptionReason"];
    [info setValue:exception.callStackReturnAddresses forKey:@"ExceptionCallStackReturnAddresses"];
    [info setValue:exception.callStackSymbols forKey:@"ExceptionCallStackSymbols"];
    [info setValue:exception.userInfo forKey:@"ExceptionUserInfo"];
    
    NSError *error = [[NSError alloc] initWithDomain:@"co.bitnation" code:001 userInfo:info];
    reject(@"error", exception.reason, error);
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
                 stopPanthalassaWithResolver:(RCTPromiseResolveBlock)resolve
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

RCT_REMAP_METHOD(PanthalassaStart,
                 start:(NSDictionary *)config
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
  
  BOOL response;
  NSError *error = nil;
  
  upstream = [[PanthalassaUpStreamBridge alloc] init];
  [upstream setDelegate:self];
  
  response = PanthalassaStart([RCTConvert NSString:config[@"config"]],
                              [RCTConvert NSString:config[@"password"]],
                              upstream,
                              &error);
  
  NSNumber *val = [NSNumber numberWithBool:response];
  
  if (error == nil) {
    resolve(val);
  } else {
    reject(@"error", error.localizedDescription, error);
  }
  
  [upstream send:@"Upstream created"];
}

RCT_REMAP_METHOD(PanthalassaGetMnemonic,
                 PanthalassaGetMnemonicWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
  NSString* response;
  NSError *error = nil;
  
  response = PanthalassaGetMnemonic(&error);
  
  RLMRealm *realm = [RLMRealm defaultRealm];
  RLMResults *results = [Account allObjectsInRealm:realm];
  Account* dbAccount = results.firstObject;
  [realm beginWriteTransaction];
  dbAccount.name = @"Hey, new name!";
  [realm commitWriteTransaction];
  
  if (error == nil) {
    resolve(response);
  } else {
    reject(@"error", error.localizedDescription, error);
  }
}

RCT_REMAP_METHOD(PanthalassaGetIdentityPublicKey,
                 PanthalassaGetIdentityPublicKeyWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
  NSString* response;
  NSError *error = nil;
  
  response = PanthalassaGetIdentityPublicKey(&error);
  
  if (error == nil) {
    resolve(response);
  } else {
    reject(@"error", error.localizedDescription, error);
  }
}

RCT_REMAP_METHOD(PanthalassaIdentityPublicKey,
                 PanthalassaIdentityPublicKeyWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
  NSString* response;
  NSError *error = nil;
  
  response = PanthalassaIdentityPublicKey(&error);
  
  if (error == nil) {
    resolve(response);
  } else {
    reject(@"error", error.localizedDescription, error);
  }
}

RCT_REMAP_METHOD(PanthalassaNewPreKeyBundle,
                 PanthalassaNewPreKeyBundleWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
  NSString* response;
  NSError *error = nil;
  
  response = PanthalassaNewPreKeyBundle(&error);
  
  if (error == nil) {
    resolve(response);
  } else {
    reject(@"error", error.localizedDescription, error);
  }
}

RCT_REMAP_METHOD(PanthalassaCreateHumanMessage,
                 PanthalassaCreateHumanMessageWithResolver:(NSDictionary *)config
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
  
  NSString *response;
  NSError *error = nil;
  
  response = PanthalassaCreateHumanMessage([RCTConvert NSString:config[@"rawMsg"]],
                              [RCTConvert NSString:config[@"secret"]],
                              &error);
  
  if (error == nil) {
    resolve(response);
  } else {
    reject(@"error", error.localizedDescription, error);
  }
}

RCT_REMAP_METHOD(PanthalassaDecryptMessage,
                 PanthalassaDecryptMessageWithResolver:(NSDictionary *)config
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
  
  NSString *response;
  NSError *error = nil;
  
  response = PanthalassaDecryptMessage([RCTConvert NSString:config[@"message"]],
                                           [RCTConvert NSString:config[@"secret"]],
                                           &error);
  
  if (error == nil) {
    resolve(response);
  } else {
    reject(@"error", error.localizedDescription, error);
  }
}

RCT_REMAP_METHOD(PanthalassaInitializeChat,
                 PanthalassaInitializeChatWithResolver:(NSDictionary *)config
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
  
  NSString *response;
  NSError *error = nil;
  
  response = PanthalassaInitializeChat([RCTConvert NSString:config[@"identityPublicKey"]],
                                       [RCTConvert NSString:config[@"preKeyBundle"]],
                                       &error);
  
  if (error == nil) {
    resolve(response);
  } else {
    reject(@"error", error.localizedDescription, error);
  }
}

RCT_REMAP_METHOD(PanthalassaSendResponse,
                 PanthalassaSendResponseWithResolver:(NSDictionary *)config
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
  
  BOOL response;
  NSError *error = nil;
  
  response = PanthalassaSendResponse([RCTConvert NSString:config[@"id_"]],
                                          [RCTConvert NSString:config[@"data"]],
                                          &error);
  
  NSNumber *val = [NSNumber numberWithBool:response];
  
  if (error == nil) {
    resolve(val);
  } else {
    reject(@"error", error.localizedDescription, error);
  }
}

RCT_REMAP_METHOD(PanthalassaSignProfile,
                 PanthalassaSignProfileWithResolver:(NSDictionary *)config
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
  
  NSString *response;
  NSError *error = nil;
  
  response = PanthalassaSignProfile([RCTConvert NSString:config[@"name"]],
                                    [RCTConvert NSString:config[@"location"]],
                                    [RCTConvert NSString:config[@"image"]],
                                    &error);
  
  if (error == nil) {
    resolve(response);
  } else {
    reject(@"error", error.localizedDescription, error);
  }
}

RCT_REMAP_METHOD(PanthalassaSignProfileStandAlone,
                 PanthalassaSignProfileStandAloneWithResolver:(NSDictionary *)config
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
  
  NSString *response;
  NSError *error = nil;
  
  response = PanthalassaSignProfileStandAlone([RCTConvert NSString:config[@"name"]],
                                              [RCTConvert NSString:config[@"location"]],
                                              [RCTConvert NSString:config[@"image"]],
                                              [RCTConvert NSString:config[@"keyManagerStore"]],
                                              [RCTConvert NSString:config[@"password"]],
                                              &error);
  
  if (error == nil) {
    resolve(response);
  } else {
    reject(@"error", error.localizedDescription, error);
  }
}

// TEST FOR SEND  - https://facebook.github.io/react-native/docs/native-modules-ios.html#sending-events-to-javascript
- (NSArray<NSString *> *)supportedEvents
{
  return @[@"PanthalassaUpStream"];
}

- (void)receiveString:(NSString *)data {
  NSLog(@"************ Received from delegate!!!");
  if (hasListeners) {
    [self sendEventWithName:@"PanthalassaUpStream" body:@{@"upstream": data}];
  }
}

-(void)startObserving {
  hasListeners = YES;
}

-(void)stopObserving {
  hasListeners = NO;
}

@end
