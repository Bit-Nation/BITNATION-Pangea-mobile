/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import "RCCManager.h"
#import <React/RCTRootView.h>

#import "RCCManager.h"

#import <Realm/Realm.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
  NSURL *jsCodeLocation;
#ifdef DEBUG
  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
  
  // ReactNativeNavigation integration part (see https://wix.github.io/react-native-navigation/#/installation-ios)
  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  self.window.backgroundColor = [UIColor whiteColor];
  [[RCCManager sharedInstance] initBridgeWithBundleURL:jsCodeLocation launchOptions:launchOptions];
  
  RLMRealmConfiguration *config = [RLMRealmConfiguration defaultConfiguration];
  config.fileURL = [[[config.fileURL URLByDeletingLastPathComponent]
                     URLByAppendingPathComponent:@"pangea"]
                    URLByAppendingPathExtension:@""];
  config.schemaVersion = 3;
  
  [RLMRealmConfiguration setDefaultConfiguration:config];
  
  // -------> After run 1st time uncommente this code
  /*
   
   // Configuration to use Pangea's DB
   
   // Proof of reading from the DB
   RLMResults *results = [Account allObjectsInRealm:realm];
   NSLog(@"Number of Accounts: %li", (unsigned long)results.count);
   Account* dbAccount = results.firstObject;
   NSLog(@"Account's name: %@", dbAccount.name);
   
   // Proof of writing on the DB
   int value;
   value = (arc4random() % 99);
   Account *newAccount = [[Account alloc] init];
   newAccount.name = [NSString stringWithFormat:@"%@ Native", dbAccount.name];
   newAccount.id = [NSString stringWithFormat:@"%@-%i", dbAccount.id, value];
   newAccount.location = dbAccount.location;
   newAccount.description_ = dbAccount.description_;
   newAccount.profileImage = dbAccount.profileImage;
   newAccount.accountStore = dbAccount.accountStore;
   newAccount.confirmedMnemonic = dbAccount.confirmedMnemonic;
   newAccount.networkType = dbAccount.networkType;
   newAccount.DHT = dbAccount.DHT;
   [realm beginWriteTransaction];
   [realm addObject:newAccount];
   [realm commitWriteTransaction];
   
   RLMResults *results2 = [Account allObjectsInRealm:realm];
   NSLog(@"Number of Accounts: %li", (unsigned long)results2.count);
   
   // Proof of Access to DB in Multi-threading
   dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
   @autoreleasepool {
   RLMRealm *otherRealm = [RLMRealm realmWithConfiguration:config error:nil];
   RLMResults *otherResults = [Account allObjectsInRealm:otherRealm];
   NSLog(@"Number of Accounts in other thread: %li", (unsigned long)otherResults.count);
   }
   });
   
   */
  // -------> After run 1st time uncommente this code here
  
  return YES;
}

@end
