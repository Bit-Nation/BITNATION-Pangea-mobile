//
//  PanthalassaUpStreamBridge.h
//  Pangea
//
//  Created by Alberto R. Estarrona on 15/05/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <panthalassa/panthalassa.h>

@protocol UpStreamProtocolDelegate

- (void)receiveString:(NSString *)data withDelegate:(id<UpStreamProtocolDelegate>)delegate;

@end

@interface PanthalassaUpStreamBridge : NSObject <PanthalassaUpStream> {
  id<UpStreamProtocolDelegate> delegate;
}

- (void)setDelegate:(id<UpStreamProtocolDelegate>)delegate;
- (void)send:(NSString *)data;

@end
