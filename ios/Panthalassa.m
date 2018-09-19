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
{
  bool hasListeners;
}

- (void)onNewQueue:(void (^)())block {
  dispatch_queue_t queue = dispatch_queue_create(NULL, DISPATCH_QUEUE_SERIAL);
  dispatch_async(queue, ^{
    block();
  });
}

- (instancetype)init {
  if (self = [super init]) {
    [self initUpstreams];
  }
  
  return self;
}

- (void)initUpstreams {
  upstreamClient = [[PanthalassaUpStreamBridge alloc] init];
  upstreamUI = [[PanthalassaUpStreamBridge alloc] init];
  [upstreamClient setDelegate:self];
  [upstreamUI setDelegate:self];
}

RCT_EXPORT_MODULE();

RCT_REMAP_METHOD(PanthalassaNewAccountKeys,
                 panthalassaNewAccountKeysWithParams:(NSDictionary *)config
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
  [self onNewQueue:^void() {
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
  }];
}

RCT_REMAP_METHOD(PanthalassaNewAccountKeysFromMnemonic,
                 panthalassaNewAccountKeysFromMnemonicWithParameters:(NSDictionary *)config
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
  [self onNewQueue:^void() {
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
  }];
}

RCT_REMAP_METHOD(PanthalassaEthAddress,
                 PanthalassaEthPrivateAddressWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
  [self onNewQueue:^void() {
    NSString* response;
    NSError *error = nil;
    
    response = PanthalassaEthAddress(&error);
    
    if (error == nil) {
      resolve(response);
    } else {
      reject(@"error", error.localizedDescription, error);
    }
  }];
}

RCT_REMAP_METHOD(PanthalassaEthPrivateKey,
                 PanthalassaEthPrivateKeyWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
  [self onNewQueue:^void() {
    NSString* response;
    NSError *error = nil;
    
    response = PanthalassaEthPrivateKey(&error);
    
    if (error == nil) {
      resolve(response);
    } else {
      reject(@"error", error.localizedDescription, error);
    }
  }];
}

RCT_REMAP_METHOD(PanthalassaStartFromMnemonic,
                 parametersStartFromMnemonic:(NSDictionary *)config
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
  [self onNewQueue:^void() {
    BOOL response;
    NSError *error = nil;
    
    NSString* path = [NSSearchPathForDirectoriesInDomains(NSDocumentDirectory,
                                                          NSUserDomainMask,
                                                          YES) firstObject];
    
    response = PanthalassaStartFromMnemonic(path, [RCTConvert NSString:config[@"config"]],
                                            [RCTConvert NSString:config[@"mnemonic"]],
                                            upstreamClient, upstreamUI,
                                            &error);
    NSNumber *val = [NSNumber numberWithBool:response];
    
    if (error == nil) {
      resolve(val);
    } else {
      reject(@"error", error.localizedDescription, error);
    }
  }];
}

RCT_REMAP_METHOD(PanthalassaIsValidMnemonic,
                 validMnemonic:(NSString *)mnemonic
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
  [self onNewQueue:^void() {
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
  }];
}

RCT_REMAP_METHOD(PanthalassaExportAccountStore,
                 panthalassaExp:(NSDictionary *)parameters
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
  [self onNewQueue:^void() {
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
  }];
}

RCT_REMAP_METHOD(PanthalassaStop,
                 stopPanthalassaWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
  [self onNewQueue:^void() {
    BOOL response;
    NSError *error = nil;
    response = PanthalassaStop(&error);
    NSNumber *val = [NSNumber numberWithBool:response];
    
    if (error == nil) {
      resolve(val);
    } else {
      reject(@"error", error.localizedDescription, error);
    }
  }];
}

RCT_REMAP_METHOD(PanthalassaStart,
                 start:(NSDictionary *)config
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
  [self onNewQueue:^void() {
    BOOL response;
    NSError *error = nil;
    
    NSString* path = [NSSearchPathForDirectoriesInDomains(NSDocumentDirectory,
                                                          NSUserDomainMask,
                                                          YES) firstObject];
    
    response = PanthalassaStart(path, [RCTConvert NSString:config[@"config"]],
                                [RCTConvert NSString:config[@"password"]],
                                upstreamClient, upstreamUI,
                                &error);
    
    NSNumber *val = [NSNumber numberWithBool:response];
    
    if (error == nil) {
      resolve(val);
    } else {
      reject(@"error", error.localizedDescription, error);
    }
  }];
}

RCT_REMAP_METHOD(PanthalassaGetMnemonic,
                 PanthalassaGetMnemonicWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
  [self onNewQueue:^void() {
    NSString* response;
    NSError *error = nil;
    
    response = PanthalassaGetMnemonic(&error);
    
    if (error == nil) {
      resolve(response);
    } else {
      reject(@"error", error.localizedDescription, error);
    }
  }];
}

RCT_REMAP_METHOD(PanthalassaGetIdentityPublicKey,
                 PanthalassaGetIdentityPublicKeyWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
  [self onNewQueue:^void() {
    NSString* response;
    NSError *error = nil;
    
    response = PanthalassaGetIdentityPublicKey(&error);
    
    if (error == nil) {
      resolve(response);
    } else {
      reject(@"error", error.localizedDescription, error);
    }
  }];
}

RCT_REMAP_METHOD(PanthalassaIdentityPublicKey,
                 PanthalassaIdentityPublicKeyWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
  [self onNewQueue:^void() {
    NSString* response;
    NSError *error = nil;
    
    response = PanthalassaIdentityPublicKey(&error);
    
    if (error == nil) {
      resolve(response);
    } else {
      reject(@"error", error.localizedDescription, error);
    }
  }];
}

RCT_REMAP_METHOD(PanthalassaSendResponse,
                 PanthalassaSendResponseWithResolver:(NSDictionary *)config
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
  [self onNewQueue:^void() {
    BOOL response;
    NSError *error = nil;
    
    response = PanthalassaSendResponse([RCTConvert NSString:config[@"id"]],
                                       [RCTConvert NSString:config[@"data"]],
                                       [RCTConvert NSString:config[@"responseError"]],
                                       [[RCTConvert NSNumber:config[@"timeout"]] longValue],
                                       &error);
    
    NSNumber *val = [NSNumber numberWithBool:response];
    
    if (error == nil) {
      resolve(val);
    } else {
      reject(@"error", error.localizedDescription, error);
    }
  }];
}

RCT_REMAP_METHOD(PanthalassaSignProfile,
                 PanthalassaSignProfileWithResolver:(NSDictionary *)config
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
  [self onNewQueue:^void() {
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
  }];
}

RCT_REMAP_METHOD(PanthalassaSignProfileStandAlone,
                 PanthalassaSignProfileStandAloneWithResolver:(NSDictionary *)config
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
  [self onNewQueue:^void() {
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
  }];
}

RCT_REMAP_METHOD(PanthalassaConnectToDAppDevHost,
                 PanthalassaConnectToDAppDevHostWithResolver:(NSDictionary *)config
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
  [self onNewQueue:^void() {
    BOOL response;
    NSError *error = nil;
    response = PanthalassaConnectToDAppDevHost([RCTConvert NSString:config[@"address"]],
                                               &error);
    
    NSNumber *val = [NSNumber numberWithBool:response];
    
    if (error == nil) {
      resolve(val);
    } else {
      reject(@"error", error.localizedDescription, error);
    }
  }];
}

RCT_REMAP_METHOD(PanthalassaOpenDApp,
                 PanthalassaOpenDAppWithResolver:(NSDictionary *)config
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
  [self onNewQueue:^void() {
    BOOL response;
    NSError *error = nil;
    
    response = PanthalassaOpenDApp([RCTConvert NSString:config[@"id"]],
                                   [RCTConvert NSString:config[@"context"]],
                                   &error);
    
    NSNumber *val = [NSNumber numberWithBool:response];
    
    if (error == nil) {
      resolve(val);
    } else {
      reject(@"error", error.localizedDescription, error);
    }
  }];
}

RCT_REMAP_METHOD(PanthalassaRenderMessage,
                 PanthalassaRenderMessageWithResolver:(NSDictionary *)config
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
  [self onNewQueue:^void() {
    NSString *response;
    NSError *error = nil;
    response = PanthalassaRenderMessage([RCTConvert NSString:config[@"signingKey"]],
                                        [RCTConvert NSString:config[@"payload"]],
                                        &error);
    
    if (error == nil) {
      resolve(response);
    } else {
      reject(@"error", error.localizedDescription, error);
    }
  }];
}

RCT_REMAP_METHOD(PanthalassaStartDApp,
                 PanthalassaStartDAppWithResolver:(NSDictionary *)config
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
  [self onNewQueue:^void() {
    BOOL response;
    NSError *error = nil;
    
    response = PanthalassaStartDApp([RCTConvert NSString:config[@"dAppSingingKeyStr"]],
                                    [[RCTConvert NSNumber:config[@"timeout"]] longValue],
                                    &error);
    
    NSNumber *val = [NSNumber numberWithBool:response];
    
    if (error == nil) {
      resolve(val);
    } else {
      reject(@"error", error.localizedDescription, error);
    }
  }];
}

RCT_REMAP_METHOD(PanthalassaCallDAppFunction,
                 PanthalassaCallDAppFunctiontWithResolver:(NSDictionary *)config
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
  [self onNewQueue:^void() {
    BOOL response;
    NSError *error = nil;
    response = PanthalassaCallDAppFunction([RCTConvert NSString:config[@"signingKey"]],
                                           [[RCTConvert NSNumber:config[@"id"]] longValue],
                                           [RCTConvert NSString:config[@"args"]],
                                           &error);
    
    NSNumber *val = [NSNumber numberWithBool:response];
    
    if (error == nil) {
      resolve(val);
    } else {
      reject(@"error", error.localizedDescription, error);
    }
  }];
}

RCT_REMAP_METHOD(PanthalassaEthPubToAddress,
                 PanthalassaEthPubToAddressWithResolver:(NSDictionary *)config
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
  [self onNewQueue:^void() {
    NSString *response;
    NSError *error = nil;
    
    response = PanthalassaEthPubToAddress([RCTConvert NSString:config[@"pub"]],
                                          &error);
    
    if (error == nil) {
      resolve(response);
    } else {
      reject(@"error", error.localizedDescription, error);
    }
  }];
}

RCT_REMAP_METHOD(PanthalassaAllChats,
                 PanthalassaAllChatsWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
  [self onNewQueue:^void() {
    NSString* response;
    NSError *error = nil;
    
    response = PanthalassaAllChats(&error);
    
    if (error == nil) {
      resolve(response);
    } else {
      reject(@"error", error.localizedDescription, error);
    }
  }];
}

RCT_REMAP_METHOD(PanthalassaConnectLogger,
                 PanthalassaConnectLoggerWithResolver:(NSDictionary *)config
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
  [self onNewQueue:^void() {
    BOOL response;
    NSError *error = nil;
    response = PanthalassaConnectLogger([RCTConvert NSString:config[@"address"]],
                                        &error);
    
    NSNumber *val = [NSNumber numberWithBool:response];
    
    if (error == nil) {
      resolve(val);
    } else {
      reject(@"error", error.localizedDescription, error);
    }
  }];
}

RCT_REMAP_METHOD(PanthalassaMessages,
                 PanthalassaMessagesWithResolver:(NSDictionary *)config
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
  [self onNewQueue:^void() {
    NSString *response;
    NSError *error = nil;
    
    response = PanthalassaMessages([[RCTConvert NSNumber:config[@"chatID"]] longValue],
                                   [RCTConvert NSString:config[@"startStr"]],
                                   [[RCTConvert NSNumber:config[@"amount"]] longValue],
                                   &error);
    
    if (error == nil) {
      resolve(response);
    } else {
      reject(@"error", error.localizedDescription, error);
    }
  }];
}

RCT_REMAP_METHOD(PanthalassaSendMessage,
                 PanthalassaSendMessageWithResolver:(NSDictionary *)config
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
  [self onNewQueue:^void() {
    BOOL response;
    NSError *error = nil;
    response = PanthalassaSendMessage([[RCTConvert NSNumber:config[@"chatID"]] longValue],
                                      [RCTConvert NSString:config[@"message"]],
                                      &error);
    
    NSNumber *val = [NSNumber numberWithBool:response];
    
    if (error == nil) {
      resolve(val);
    } else {
      reject(@"error", error.localizedDescription, error);
    }
  }];
}

RCT_REMAP_METHOD(PanthalassaSetLogger,
                 PanthalassaSetLoggerWithResolver:(NSDictionary *)config
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
  [self onNewQueue:^void() {
    BOOL response;
    NSError *error = nil;
    response = PanthalassaSetLogger([RCTConvert NSString:config[@"level"]],
                                    &error);
    
    NSNumber *val = [NSNumber numberWithBool:response];
    
    if (error == nil) {
      resolve(val);
    } else {
      reject(@"error", error.localizedDescription, error);
    }
  }];
}

RCT_REMAP_METHOD(PanthalassaStopDApp,
                 PanthalassaStopDAppWithResolver:(NSDictionary *)config
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
  [self onNewQueue:^void() {
    BOOL response;
    NSError *error = nil;
    response = PanthalassaStopDApp([RCTConvert NSString:config[@"dAppSingingKeyStr"]],
                                   &error);
    NSNumber *val = [NSNumber numberWithBool:response];
    
    if (error == nil) {
      resolve(val);
    } else {
      reject(@"error", error.localizedDescription, error);
    }
  }];
}

RCT_REMAP_METHOD(PanthalassaDApps,
                 PanthalassaDAppsWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
  [self onNewQueue:^void() {
    NSString* response;
    NSError *error = nil;
    
    response = PanthalassaDApps(&error);
    
    if (error == nil) {
      resolve(response);
    } else {
      reject(@"error", error.localizedDescription, error);
    }
  }];
}

RCT_REMAP_METHOD(PanthalassaMarkMessagesAsRead,
                 PanthalassaMarkMessagesAsReadWithResolver:(NSDictionary *)config
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
  [self onNewQueue:^void() {
    BOOL response;
    
    NSError *error = nil;
    response = PanthalassaMarkMessagesAsRead([[RCTConvert NSNumber:config[@"chatID"]] longValue], &error);
    NSNumber *val = [NSNumber numberWithBool:response];
    
    if (error == nil) {
      resolve(val);
    } else {
      reject(@"error", error.localizedDescription, error);
    }
  }];
}


RCT_REMAP_METHOD(PanthalassaCall,
                 PanthalassaCallWithResolver:(NSDictionary *)config
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
  [self onNewQueue:^void() {
    NSString *response;
    NSError *error = nil;
    
    response = PanthalassaCall([RCTConvert NSString:config[@"command"]],
                               [RCTConvert NSString:config[@"payload"]],
                               &error);
    
    if (error == nil) {
      resolve(response);
    } else {
      reject(@"error", error.localizedDescription, error);
    }
  }];
}

RCT_REMAP_METHOD(PanthalassaAddUsersToGroupChat,
                 PanthalassaAddUsersToGroupChatWithResolver:(NSDictionary *)config
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
  [self onNewQueue:^void() {
    BOOL response;
    
    NSError *error = nil;
    response = PanthalassaAddUsersToGroupChat([RCTConvert NSString:config[@"users"]],
                                              [[RCTConvert NSNumber:config[@"chatID"]] longValue],
                                              &error);
    NSNumber *val = [NSNumber numberWithBool:response];
    
    if (error == nil) {
      resolve(val);
    } else {
      reject(@"error", error.localizedDescription, error);
    }
  }];
}

RCT_REMAP_METHOD(PanthalassaCreateGroupChat,
                 PanthalassaCreateGroupChatWithResolver:(NSDictionary *)config
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
  [self onNewQueue:^void() {
    BOOL response;
    
    NSError *error = nil;
    long ret =  [[RCTConvert NSNumber:config[@"ret0"]] longValue];
    response = PanthalassaCreateGroupChat([RCTConvert NSString:config[@"users"]],
                                              &ret,
                                              &error);
    NSNumber *val = [NSNumber numberWithBool:response];
    
    if (error == nil) {
      resolve(val);
    } else {
      reject(@"error", error.localizedDescription, error);
    }
  }];
}

// TEST FOR SEND  - https://facebook.github.io/react-native/docs/native-modules-ios.html#sending-events-to-javascript
- (NSArray<NSString *> *)supportedEvents
{
  return @[@"PanthalassaUpStream"];
}

-(void)startObserving {
  hasListeners = YES;
}

-(void)stopObserving {
  hasListeners = NO;
}

- (void)receiveString:(NSString *)data withUpStream:(id<PanthalassaUpStream>)upStream {
  NSLog(@"************ Received from go!");
  if (hasListeners && data != nil) {
    if (upStream == upstreamClient) {
      [self sendEventWithName:@"PanthalassaUpStream" body:@{@"client": data}];
    } else {
      [self sendEventWithName:@"PanthalassaUpStream" body:@{@"ui": data}];
    }
  }
}

@end
