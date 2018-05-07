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

- (void)testNewPanthalassa {
  
  PanthalassaPanthalassa *instance;
  NSError *error = nil;
  
  instance = PanthalassaNewPanthalassa(@"testingString", @"password", &error);
  XCTAssertNotNil(instance, @"Panthalassa lib error");
  
}

- (void)testScryptDecrypt {
  
  NSString *response;
  NSError *error = nil;
  response = PanthalassaScryptDecrypt(@"I am the value", @"1111111111111111", &error);
  XCTAssertNotNil(response, @"Panthalassa lib error");
  
}

- (void)testScryptEncrypt {
  
  NSString *response;
  NSError *error = nil;
  response = PanthalassaScryptEncrypt(@"I am the value", @"1111111111111111", @"1111111111111111", &error);
  XCTAssertNotNil(response, @"Panthalassa lib error");
  
}

- (void)testIsValidCID {
  
  XCTAssertTrue(PanthalassaIsValidCID(@"mAVUWIDAwU3dua7xpbnFfMuJGB3ydE8z6o/Oz8+bihw3lVhT1"));
  XCTAssertFalse(PanthalassaIsValidCID(@"I should be invalid"));
  
}

- (void)testCIDSha256 {
  
  NSString *response;
  NSError *error = nil;
  response = PanthalassaCIDSha256(@"HI", &error);
  XCTAssertEqualObjects(response, @"mAVUWIDAwU3dua7xpbnFfMuJGB3ydE8z6o/Oz8+bihw3lVhT1", @"Panthalassa lib error");
  
}

- (void)testCIDSha512 {
  
  NSString *response;
  NSError *error = nil;
  response = PanthalassaCIDSha512(@"HI", &error);
  XCTAssertEqualObjects(response, @"UAVUUQEG8zpe5V7XbE9ZuG_0-q4q0ujKrksvGUoJTCs2fTjXSUvfOE6Z4f9ePhYante_RzbqCZT5RADYOegO_Yiz8WJo=", @"Panthalassa lib error");
  
}

@end
