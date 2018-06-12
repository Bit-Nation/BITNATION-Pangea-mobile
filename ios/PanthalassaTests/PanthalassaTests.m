//
//  PanthalassaTests.m
//  PangeaTests
//
//  Created by Alberto R. Estarrona on 22/04/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import <XCTest/XCTest.h>
#import <panthalassa/panthalassa.h>

@interface PanthalassaTests : XCTestCase

@end

@implementation PanthalassaTests

- (void)setUp {
    [super setUp];
}

- (void)tearDown {
    [super tearDown];
}

- (void)testNewAccountKeys {
  
  NSError *error = nil;
  NSString* result = PanthalassaNewAccountKeys(@"testing", @"testing", &error);
  XCTAssertNotNil(result, @"Panthalassa lib error");
  
}

- (void)testPanthalassaStop {
  
  NSError *error = nil;
  XCTAssertTrue(PanthalassaStop(&error));
  
}

@end
