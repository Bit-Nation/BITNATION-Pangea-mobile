/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.api_proto = (function() {

    /**
     * Namespace api_proto.
     * @exports api_proto
     * @namespace
     */
    var api_proto = {};

    api_proto.Profile = (function() {

        /**
         * Properties of a Profile.
         * @memberof api_proto
         * @interface IProfile
         * @property {string|null} [name] Profile name
         * @property {string|null} [location] Profile location
         * @property {string|null} [image] Profile image
         * @property {Uint8Array|null} [identityPubKey] Profile identityPubKey
         * @property {Uint8Array|null} [ethereumPubKey] Profile ethereumPubKey
         * @property {Uint8Array|null} [chatIdentityPubKey] Profile chatIdentityPubKey
         * @property {number|Long|null} [timestamp] Profile timestamp
         * @property {number|null} [version] Profile version
         * @property {Uint8Array|null} [identityKeySignature] Profile identityKeySignature
         * @property {Uint8Array|null} [ethereumKeySignature] Profile ethereumKeySignature
         */

        /**
         * Constructs a new Profile.
         * @memberof api_proto
         * @classdesc Represents a Profile.
         * @implements IProfile
         * @constructor
         * @param {api_proto.IProfile=} [properties] Properties to set
         */
        function Profile(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Profile name.
         * @member {string} name
         * @memberof api_proto.Profile
         * @instance
         */
        Profile.prototype.name = "";

        /**
         * Profile location.
         * @member {string} location
         * @memberof api_proto.Profile
         * @instance
         */
        Profile.prototype.location = "";

        /**
         * Profile image.
         * @member {string} image
         * @memberof api_proto.Profile
         * @instance
         */
        Profile.prototype.image = "";

        /**
         * Profile identityPubKey.
         * @member {Uint8Array} identityPubKey
         * @memberof api_proto.Profile
         * @instance
         */
        Profile.prototype.identityPubKey = $util.newBuffer([]);

        /**
         * Profile ethereumPubKey.
         * @member {Uint8Array} ethereumPubKey
         * @memberof api_proto.Profile
         * @instance
         */
        Profile.prototype.ethereumPubKey = $util.newBuffer([]);

        /**
         * Profile chatIdentityPubKey.
         * @member {Uint8Array} chatIdentityPubKey
         * @memberof api_proto.Profile
         * @instance
         */
        Profile.prototype.chatIdentityPubKey = $util.newBuffer([]);

        /**
         * Profile timestamp.
         * @member {number|Long} timestamp
         * @memberof api_proto.Profile
         * @instance
         */
        Profile.prototype.timestamp = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Profile version.
         * @member {number} version
         * @memberof api_proto.Profile
         * @instance
         */
        Profile.prototype.version = 0;

        /**
         * Profile identityKeySignature.
         * @member {Uint8Array} identityKeySignature
         * @memberof api_proto.Profile
         * @instance
         */
        Profile.prototype.identityKeySignature = $util.newBuffer([]);

        /**
         * Profile ethereumKeySignature.
         * @member {Uint8Array} ethereumKeySignature
         * @memberof api_proto.Profile
         * @instance
         */
        Profile.prototype.ethereumKeySignature = $util.newBuffer([]);

        /**
         * Creates a new Profile instance using the specified properties.
         * @function create
         * @memberof api_proto.Profile
         * @static
         * @param {api_proto.IProfile=} [properties] Properties to set
         * @returns {api_proto.Profile} Profile instance
         */
        Profile.create = function create(properties) {
            return new Profile(properties);
        };

        /**
         * Encodes the specified Profile message. Does not implicitly {@link api_proto.Profile.verify|verify} messages.
         * @function encode
         * @memberof api_proto.Profile
         * @static
         * @param {api_proto.IProfile} message Profile message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Profile.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.name != null && message.hasOwnProperty("name"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
            if (message.location != null && message.hasOwnProperty("location"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.location);
            if (message.image != null && message.hasOwnProperty("image"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.image);
            if (message.identityPubKey != null && message.hasOwnProperty("identityPubKey"))
                writer.uint32(/* id 4, wireType 2 =*/34).bytes(message.identityPubKey);
            if (message.ethereumPubKey != null && message.hasOwnProperty("ethereumPubKey"))
                writer.uint32(/* id 5, wireType 2 =*/42).bytes(message.ethereumPubKey);
            if (message.chatIdentityPubKey != null && message.hasOwnProperty("chatIdentityPubKey"))
                writer.uint32(/* id 6, wireType 2 =*/50).bytes(message.chatIdentityPubKey);
            if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                writer.uint32(/* id 7, wireType 0 =*/56).int64(message.timestamp);
            if (message.version != null && message.hasOwnProperty("version"))
                writer.uint32(/* id 8, wireType 0 =*/64).uint32(message.version);
            if (message.identityKeySignature != null && message.hasOwnProperty("identityKeySignature"))
                writer.uint32(/* id 9, wireType 2 =*/74).bytes(message.identityKeySignature);
            if (message.ethereumKeySignature != null && message.hasOwnProperty("ethereumKeySignature"))
                writer.uint32(/* id 10, wireType 2 =*/82).bytes(message.ethereumKeySignature);
            return writer;
        };

        /**
         * Encodes the specified Profile message, length delimited. Does not implicitly {@link api_proto.Profile.verify|verify} messages.
         * @function encodeDelimited
         * @memberof api_proto.Profile
         * @static
         * @param {api_proto.IProfile} message Profile message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Profile.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Profile message from the specified reader or buffer.
         * @function decode
         * @memberof api_proto.Profile
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {api_proto.Profile} Profile
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Profile.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api_proto.Profile();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.name = reader.string();
                    break;
                case 2:
                    message.location = reader.string();
                    break;
                case 3:
                    message.image = reader.string();
                    break;
                case 4:
                    message.identityPubKey = reader.bytes();
                    break;
                case 5:
                    message.ethereumPubKey = reader.bytes();
                    break;
                case 6:
                    message.chatIdentityPubKey = reader.bytes();
                    break;
                case 7:
                    message.timestamp = reader.int64();
                    break;
                case 8:
                    message.version = reader.uint32();
                    break;
                case 9:
                    message.identityKeySignature = reader.bytes();
                    break;
                case 10:
                    message.ethereumKeySignature = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Profile message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof api_proto.Profile
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {api_proto.Profile} Profile
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Profile.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Profile message.
         * @function verify
         * @memberof api_proto.Profile
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Profile.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.name != null && message.hasOwnProperty("name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            if (message.location != null && message.hasOwnProperty("location"))
                if (!$util.isString(message.location))
                    return "location: string expected";
            if (message.image != null && message.hasOwnProperty("image"))
                if (!$util.isString(message.image))
                    return "image: string expected";
            if (message.identityPubKey != null && message.hasOwnProperty("identityPubKey"))
                if (!(message.identityPubKey && typeof message.identityPubKey.length === "number" || $util.isString(message.identityPubKey)))
                    return "identityPubKey: buffer expected";
            if (message.ethereumPubKey != null && message.hasOwnProperty("ethereumPubKey"))
                if (!(message.ethereumPubKey && typeof message.ethereumPubKey.length === "number" || $util.isString(message.ethereumPubKey)))
                    return "ethereumPubKey: buffer expected";
            if (message.chatIdentityPubKey != null && message.hasOwnProperty("chatIdentityPubKey"))
                if (!(message.chatIdentityPubKey && typeof message.chatIdentityPubKey.length === "number" || $util.isString(message.chatIdentityPubKey)))
                    return "chatIdentityPubKey: buffer expected";
            if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                if (!$util.isInteger(message.timestamp) && !(message.timestamp && $util.isInteger(message.timestamp.low) && $util.isInteger(message.timestamp.high)))
                    return "timestamp: integer|Long expected";
            if (message.version != null && message.hasOwnProperty("version"))
                if (!$util.isInteger(message.version))
                    return "version: integer expected";
            if (message.identityKeySignature != null && message.hasOwnProperty("identityKeySignature"))
                if (!(message.identityKeySignature && typeof message.identityKeySignature.length === "number" || $util.isString(message.identityKeySignature)))
                    return "identityKeySignature: buffer expected";
            if (message.ethereumKeySignature != null && message.hasOwnProperty("ethereumKeySignature"))
                if (!(message.ethereumKeySignature && typeof message.ethereumKeySignature.length === "number" || $util.isString(message.ethereumKeySignature)))
                    return "ethereumKeySignature: buffer expected";
            return null;
        };

        /**
         * Creates a Profile message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api_proto.Profile
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api_proto.Profile} Profile
         */
        Profile.fromObject = function fromObject(object) {
            if (object instanceof $root.api_proto.Profile)
                return object;
            var message = new $root.api_proto.Profile();
            if (object.name != null)
                message.name = String(object.name);
            if (object.location != null)
                message.location = String(object.location);
            if (object.image != null)
                message.image = String(object.image);
            if (object.identityPubKey != null)
                if (typeof object.identityPubKey === "string")
                    $util.base64.decode(object.identityPubKey, message.identityPubKey = $util.newBuffer($util.base64.length(object.identityPubKey)), 0);
                else if (object.identityPubKey.length)
                    message.identityPubKey = object.identityPubKey;
            if (object.ethereumPubKey != null)
                if (typeof object.ethereumPubKey === "string")
                    $util.base64.decode(object.ethereumPubKey, message.ethereumPubKey = $util.newBuffer($util.base64.length(object.ethereumPubKey)), 0);
                else if (object.ethereumPubKey.length)
                    message.ethereumPubKey = object.ethereumPubKey;
            if (object.chatIdentityPubKey != null)
                if (typeof object.chatIdentityPubKey === "string")
                    $util.base64.decode(object.chatIdentityPubKey, message.chatIdentityPubKey = $util.newBuffer($util.base64.length(object.chatIdentityPubKey)), 0);
                else if (object.chatIdentityPubKey.length)
                    message.chatIdentityPubKey = object.chatIdentityPubKey;
            if (object.timestamp != null)
                if ($util.Long)
                    (message.timestamp = $util.Long.fromValue(object.timestamp)).unsigned = false;
                else if (typeof object.timestamp === "string")
                    message.timestamp = parseInt(object.timestamp, 10);
                else if (typeof object.timestamp === "number")
                    message.timestamp = object.timestamp;
                else if (typeof object.timestamp === "object")
                    message.timestamp = new $util.LongBits(object.timestamp.low >>> 0, object.timestamp.high >>> 0).toNumber();
            if (object.version != null)
                message.version = object.version >>> 0;
            if (object.identityKeySignature != null)
                if (typeof object.identityKeySignature === "string")
                    $util.base64.decode(object.identityKeySignature, message.identityKeySignature = $util.newBuffer($util.base64.length(object.identityKeySignature)), 0);
                else if (object.identityKeySignature.length)
                    message.identityKeySignature = object.identityKeySignature;
            if (object.ethereumKeySignature != null)
                if (typeof object.ethereumKeySignature === "string")
                    $util.base64.decode(object.ethereumKeySignature, message.ethereumKeySignature = $util.newBuffer($util.base64.length(object.ethereumKeySignature)), 0);
                else if (object.ethereumKeySignature.length)
                    message.ethereumKeySignature = object.ethereumKeySignature;
            return message;
        };

        /**
         * Creates a plain object from a Profile message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api_proto.Profile
         * @static
         * @param {api_proto.Profile} message Profile
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Profile.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.name = "";
                object.location = "";
                object.image = "";
                if (options.bytes === String)
                    object.identityPubKey = "";
                else {
                    object.identityPubKey = [];
                    if (options.bytes !== Array)
                        object.identityPubKey = $util.newBuffer(object.identityPubKey);
                }
                if (options.bytes === String)
                    object.ethereumPubKey = "";
                else {
                    object.ethereumPubKey = [];
                    if (options.bytes !== Array)
                        object.ethereumPubKey = $util.newBuffer(object.ethereumPubKey);
                }
                if (options.bytes === String)
                    object.chatIdentityPubKey = "";
                else {
                    object.chatIdentityPubKey = [];
                    if (options.bytes !== Array)
                        object.chatIdentityPubKey = $util.newBuffer(object.chatIdentityPubKey);
                }
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.timestamp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.timestamp = options.longs === String ? "0" : 0;
                object.version = 0;
                if (options.bytes === String)
                    object.identityKeySignature = "";
                else {
                    object.identityKeySignature = [];
                    if (options.bytes !== Array)
                        object.identityKeySignature = $util.newBuffer(object.identityKeySignature);
                }
                if (options.bytes === String)
                    object.ethereumKeySignature = "";
                else {
                    object.ethereumKeySignature = [];
                    if (options.bytes !== Array)
                        object.ethereumKeySignature = $util.newBuffer(object.ethereumKeySignature);
                }
            }
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            if (message.location != null && message.hasOwnProperty("location"))
                object.location = message.location;
            if (message.image != null && message.hasOwnProperty("image"))
                object.image = message.image;
            if (message.identityPubKey != null && message.hasOwnProperty("identityPubKey"))
                object.identityPubKey = options.bytes === String ? $util.base64.encode(message.identityPubKey, 0, message.identityPubKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.identityPubKey) : message.identityPubKey;
            if (message.ethereumPubKey != null && message.hasOwnProperty("ethereumPubKey"))
                object.ethereumPubKey = options.bytes === String ? $util.base64.encode(message.ethereumPubKey, 0, message.ethereumPubKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.ethereumPubKey) : message.ethereumPubKey;
            if (message.chatIdentityPubKey != null && message.hasOwnProperty("chatIdentityPubKey"))
                object.chatIdentityPubKey = options.bytes === String ? $util.base64.encode(message.chatIdentityPubKey, 0, message.chatIdentityPubKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.chatIdentityPubKey) : message.chatIdentityPubKey;
            if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                if (typeof message.timestamp === "number")
                    object.timestamp = options.longs === String ? String(message.timestamp) : message.timestamp;
                else
                    object.timestamp = options.longs === String ? $util.Long.prototype.toString.call(message.timestamp) : options.longs === Number ? new $util.LongBits(message.timestamp.low >>> 0, message.timestamp.high >>> 0).toNumber() : message.timestamp;
            if (message.version != null && message.hasOwnProperty("version"))
                object.version = message.version;
            if (message.identityKeySignature != null && message.hasOwnProperty("identityKeySignature"))
                object.identityKeySignature = options.bytes === String ? $util.base64.encode(message.identityKeySignature, 0, message.identityKeySignature.length) : options.bytes === Array ? Array.prototype.slice.call(message.identityKeySignature) : message.identityKeySignature;
            if (message.ethereumKeySignature != null && message.hasOwnProperty("ethereumKeySignature"))
                object.ethereumKeySignature = options.bytes === String ? $util.base64.encode(message.ethereumKeySignature, 0, message.ethereumKeySignature.length) : options.bytes === Array ? Array.prototype.slice.call(message.ethereumKeySignature) : message.ethereumKeySignature;
            return object;
        };

        /**
         * Converts this Profile to JSON.
         * @function toJSON
         * @memberof api_proto.Profile
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Profile.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Profile;
    })();

    return api_proto;
})();

module.exports = $root;
