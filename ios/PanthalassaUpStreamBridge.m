//
//  PanthalassaUpStreamBridge.m
//  Pangea
//
//  Created by Alberto R. Estarrona on 15/05/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "PanthalassaUpStreamBridge.h"

@implementation PanthalassaUpStreamBridge

- (void)setDelegate:(id<UpStreamProtocolDelegate>)aDelegate {
  delegate = aDelegate;
}

- (void)send:(NSString *)data {
  NSLog(@"Upstream: %@", data);
  [delegate receiveString:data];
}

@end
