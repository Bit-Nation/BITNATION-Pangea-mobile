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

- (void)receiveString:(NSString *)data;

@end

@interface PanthalassaUpStreamBridge : NSObject <PanthalassaUpStream> {
  id delegate;
}

- (void)setDelegate:(id)delegate;
- (void)send:(NSString *)data;

@end
