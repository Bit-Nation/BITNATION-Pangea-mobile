/*eslint-disable block-scoped-var, no-redeclare, no-control-regex, no-prototype-builtins*/
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

    api_proto.Request = (function() {

        /**
         * Properties of a Request.
         * @memberof api_proto
         * @interface IRequest
         * @property {string|null} [requestID] Request requestID
         * @property {api_proto.Request.IDRKeyStoreGet|null} [dRKeyStoreGet] Request dRKeyStoreGet
         * @property {api_proto.Request.IDRKeyStorePut|null} [dRKeyStorePut] Request dRKeyStorePut
         * @property {api_proto.Request.IDRKeyStoreDeleteMK|null} [dRKeyStoreDeleteMK] Request dRKeyStoreDeleteMK
         * @property {api_proto.Request.IDRKeyStoreDeleteKeys|null} [dRKeyStoreDeleteKeys] Request dRKeyStoreDeleteKeys
         * @property {api_proto.Request.IDRKeyStoreCount|null} [dRKeyStoreCount] Request dRKeyStoreCount
         * @property {api_proto.Request.IDRKeyStoreAll|null} [dRKeyStoreAll] Request dRKeyStoreAll
         * @property {api_proto.Request.IShowModal|null} [showModal] Request showModal
         */

        /**
         * Constructs a new Request.
         * @memberof api_proto
         * @classdesc Represents a Request.
         * @implements IRequest
         * @constructor
         * @param {api_proto.IRequest=} [properties] Properties to set
         */
        function Request(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Request requestID.
         * @member {string} requestID
         * @memberof api_proto.Request
         * @instance
         */
        Request.prototype.requestID = "";

        /**
         * Request dRKeyStoreGet.
         * @member {api_proto.Request.IDRKeyStoreGet|null|undefined} dRKeyStoreGet
         * @memberof api_proto.Request
         * @instance
         */
        Request.prototype.dRKeyStoreGet = null;

        /**
         * Request dRKeyStorePut.
         * @member {api_proto.Request.IDRKeyStorePut|null|undefined} dRKeyStorePut
         * @memberof api_proto.Request
         * @instance
         */
        Request.prototype.dRKeyStorePut = null;

        /**
         * Request dRKeyStoreDeleteMK.
         * @member {api_proto.Request.IDRKeyStoreDeleteMK|null|undefined} dRKeyStoreDeleteMK
         * @memberof api_proto.Request
         * @instance
         */
        Request.prototype.dRKeyStoreDeleteMK = null;

        /**
         * Request dRKeyStoreDeleteKeys.
         * @member {api_proto.Request.IDRKeyStoreDeleteKeys|null|undefined} dRKeyStoreDeleteKeys
         * @memberof api_proto.Request
         * @instance
         */
        Request.prototype.dRKeyStoreDeleteKeys = null;

        /**
         * Request dRKeyStoreCount.
         * @member {api_proto.Request.IDRKeyStoreCount|null|undefined} dRKeyStoreCount
         * @memberof api_proto.Request
         * @instance
         */
        Request.prototype.dRKeyStoreCount = null;

        /**
         * Request dRKeyStoreAll.
         * @member {api_proto.Request.IDRKeyStoreAll|null|undefined} dRKeyStoreAll
         * @memberof api_proto.Request
         * @instance
         */
        Request.prototype.dRKeyStoreAll = null;

        /**
         * Request showModal.
         * @member {api_proto.Request.IShowModal|null|undefined} showModal
         * @memberof api_proto.Request
         * @instance
         */
        Request.prototype.showModal = null;

        /**
         * Creates a new Request instance using the specified properties.
         * @function create
         * @memberof api_proto.Request
         * @static
         * @param {api_proto.IRequest=} [properties] Properties to set
         * @returns {api_proto.Request} Request instance
         */
        Request.create = function create(properties) {
            return new Request(properties);
        };

        /**
         * Encodes the specified Request message. Does not implicitly {@link api_proto.Request.verify|verify} messages.
         * @function encode
         * @memberof api_proto.Request
         * @static
         * @param {api_proto.IRequest} message Request message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Request.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.requestID != null && message.hasOwnProperty("requestID"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.requestID);
            if (message.dRKeyStoreGet != null && message.hasOwnProperty("dRKeyStoreGet"))
                $root.api_proto.Request.DRKeyStoreGet.encode(message.dRKeyStoreGet, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.dRKeyStorePut != null && message.hasOwnProperty("dRKeyStorePut"))
                $root.api_proto.Request.DRKeyStorePut.encode(message.dRKeyStorePut, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.dRKeyStoreDeleteMK != null && message.hasOwnProperty("dRKeyStoreDeleteMK"))
                $root.api_proto.Request.DRKeyStoreDeleteMK.encode(message.dRKeyStoreDeleteMK, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            if (message.dRKeyStoreDeleteKeys != null && message.hasOwnProperty("dRKeyStoreDeleteKeys"))
                $root.api_proto.Request.DRKeyStoreDeleteKeys.encode(message.dRKeyStoreDeleteKeys, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
            if (message.dRKeyStoreCount != null && message.hasOwnProperty("dRKeyStoreCount"))
                $root.api_proto.Request.DRKeyStoreCount.encode(message.dRKeyStoreCount, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
            if (message.dRKeyStoreAll != null && message.hasOwnProperty("dRKeyStoreAll"))
                $root.api_proto.Request.DRKeyStoreAll.encode(message.dRKeyStoreAll, writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
            if (message.showModal != null && message.hasOwnProperty("showModal"))
                $root.api_proto.Request.ShowModal.encode(message.showModal, writer.uint32(/* id 8, wireType 2 =*/66).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified Request message, length delimited. Does not implicitly {@link api_proto.Request.verify|verify} messages.
         * @function encodeDelimited
         * @memberof api_proto.Request
         * @static
         * @param {api_proto.IRequest} message Request message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Request.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Request message from the specified reader or buffer.
         * @function decode
         * @memberof api_proto.Request
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {api_proto.Request} Request
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Request.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api_proto.Request();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.requestID = reader.string();
                    break;
                case 2:
                    message.dRKeyStoreGet = $root.api_proto.Request.DRKeyStoreGet.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.dRKeyStorePut = $root.api_proto.Request.DRKeyStorePut.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.dRKeyStoreDeleteMK = $root.api_proto.Request.DRKeyStoreDeleteMK.decode(reader, reader.uint32());
                    break;
                case 5:
                    message.dRKeyStoreDeleteKeys = $root.api_proto.Request.DRKeyStoreDeleteKeys.decode(reader, reader.uint32());
                    break;
                case 6:
                    message.dRKeyStoreCount = $root.api_proto.Request.DRKeyStoreCount.decode(reader, reader.uint32());
                    break;
                case 7:
                    message.dRKeyStoreAll = $root.api_proto.Request.DRKeyStoreAll.decode(reader, reader.uint32());
                    break;
                case 8:
                    message.showModal = $root.api_proto.Request.ShowModal.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Request message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof api_proto.Request
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {api_proto.Request} Request
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Request.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Request message.
         * @function verify
         * @memberof api_proto.Request
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Request.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.requestID != null && message.hasOwnProperty("requestID"))
                if (!$util.isString(message.requestID))
                    return "requestID: string expected";
            if (message.dRKeyStoreGet != null && message.hasOwnProperty("dRKeyStoreGet")) {
                var error = $root.api_proto.Request.DRKeyStoreGet.verify(message.dRKeyStoreGet);
                if (error)
                    return "dRKeyStoreGet." + error;
            }
            if (message.dRKeyStorePut != null && message.hasOwnProperty("dRKeyStorePut")) {
                var error = $root.api_proto.Request.DRKeyStorePut.verify(message.dRKeyStorePut);
                if (error)
                    return "dRKeyStorePut." + error;
            }
            if (message.dRKeyStoreDeleteMK != null && message.hasOwnProperty("dRKeyStoreDeleteMK")) {
                var error = $root.api_proto.Request.DRKeyStoreDeleteMK.verify(message.dRKeyStoreDeleteMK);
                if (error)
                    return "dRKeyStoreDeleteMK." + error;
            }
            if (message.dRKeyStoreDeleteKeys != null && message.hasOwnProperty("dRKeyStoreDeleteKeys")) {
                var error = $root.api_proto.Request.DRKeyStoreDeleteKeys.verify(message.dRKeyStoreDeleteKeys);
                if (error)
                    return "dRKeyStoreDeleteKeys." + error;
            }
            if (message.dRKeyStoreCount != null && message.hasOwnProperty("dRKeyStoreCount")) {
                var error = $root.api_proto.Request.DRKeyStoreCount.verify(message.dRKeyStoreCount);
                if (error)
                    return "dRKeyStoreCount." + error;
            }
            if (message.dRKeyStoreAll != null && message.hasOwnProperty("dRKeyStoreAll")) {
                var error = $root.api_proto.Request.DRKeyStoreAll.verify(message.dRKeyStoreAll);
                if (error)
                    return "dRKeyStoreAll." + error;
            }
            if (message.showModal != null && message.hasOwnProperty("showModal")) {
                var error = $root.api_proto.Request.ShowModal.verify(message.showModal);
                if (error)
                    return "showModal." + error;
            }
            return null;
        };

        /**
         * Creates a Request message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api_proto.Request
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api_proto.Request} Request
         */
        Request.fromObject = function fromObject(object) {
            if (object instanceof $root.api_proto.Request)
                return object;
            var message = new $root.api_proto.Request();
            if (object.requestID != null)
                message.requestID = String(object.requestID);
            if (object.dRKeyStoreGet != null) {
                if (typeof object.dRKeyStoreGet !== "object")
                    throw TypeError(".api_proto.Request.dRKeyStoreGet: object expected");
                message.dRKeyStoreGet = $root.api_proto.Request.DRKeyStoreGet.fromObject(object.dRKeyStoreGet);
            }
            if (object.dRKeyStorePut != null) {
                if (typeof object.dRKeyStorePut !== "object")
                    throw TypeError(".api_proto.Request.dRKeyStorePut: object expected");
                message.dRKeyStorePut = $root.api_proto.Request.DRKeyStorePut.fromObject(object.dRKeyStorePut);
            }
            if (object.dRKeyStoreDeleteMK != null) {
                if (typeof object.dRKeyStoreDeleteMK !== "object")
                    throw TypeError(".api_proto.Request.dRKeyStoreDeleteMK: object expected");
                message.dRKeyStoreDeleteMK = $root.api_proto.Request.DRKeyStoreDeleteMK.fromObject(object.dRKeyStoreDeleteMK);
            }
            if (object.dRKeyStoreDeleteKeys != null) {
                if (typeof object.dRKeyStoreDeleteKeys !== "object")
                    throw TypeError(".api_proto.Request.dRKeyStoreDeleteKeys: object expected");
                message.dRKeyStoreDeleteKeys = $root.api_proto.Request.DRKeyStoreDeleteKeys.fromObject(object.dRKeyStoreDeleteKeys);
            }
            if (object.dRKeyStoreCount != null) {
                if (typeof object.dRKeyStoreCount !== "object")
                    throw TypeError(".api_proto.Request.dRKeyStoreCount: object expected");
                message.dRKeyStoreCount = $root.api_proto.Request.DRKeyStoreCount.fromObject(object.dRKeyStoreCount);
            }
            if (object.dRKeyStoreAll != null) {
                if (typeof object.dRKeyStoreAll !== "object")
                    throw TypeError(".api_proto.Request.dRKeyStoreAll: object expected");
                message.dRKeyStoreAll = $root.api_proto.Request.DRKeyStoreAll.fromObject(object.dRKeyStoreAll);
            }
            if (object.showModal != null) {
                if (typeof object.showModal !== "object")
                    throw TypeError(".api_proto.Request.showModal: object expected");
                message.showModal = $root.api_proto.Request.ShowModal.fromObject(object.showModal);
            }
            return message;
        };

        /**
         * Creates a plain object from a Request message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api_proto.Request
         * @static
         * @param {api_proto.Request} message Request
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Request.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.requestID = "";
                object.dRKeyStoreGet = null;
                object.dRKeyStorePut = null;
                object.dRKeyStoreDeleteMK = null;
                object.dRKeyStoreDeleteKeys = null;
                object.dRKeyStoreCount = null;
                object.dRKeyStoreAll = null;
                object.showModal = null;
            }
            if (message.requestID != null && message.hasOwnProperty("requestID"))
                object.requestID = message.requestID;
            if (message.dRKeyStoreGet != null && message.hasOwnProperty("dRKeyStoreGet"))
                object.dRKeyStoreGet = $root.api_proto.Request.DRKeyStoreGet.toObject(message.dRKeyStoreGet, options);
            if (message.dRKeyStorePut != null && message.hasOwnProperty("dRKeyStorePut"))
                object.dRKeyStorePut = $root.api_proto.Request.DRKeyStorePut.toObject(message.dRKeyStorePut, options);
            if (message.dRKeyStoreDeleteMK != null && message.hasOwnProperty("dRKeyStoreDeleteMK"))
                object.dRKeyStoreDeleteMK = $root.api_proto.Request.DRKeyStoreDeleteMK.toObject(message.dRKeyStoreDeleteMK, options);
            if (message.dRKeyStoreDeleteKeys != null && message.hasOwnProperty("dRKeyStoreDeleteKeys"))
                object.dRKeyStoreDeleteKeys = $root.api_proto.Request.DRKeyStoreDeleteKeys.toObject(message.dRKeyStoreDeleteKeys, options);
            if (message.dRKeyStoreCount != null && message.hasOwnProperty("dRKeyStoreCount"))
                object.dRKeyStoreCount = $root.api_proto.Request.DRKeyStoreCount.toObject(message.dRKeyStoreCount, options);
            if (message.dRKeyStoreAll != null && message.hasOwnProperty("dRKeyStoreAll"))
                object.dRKeyStoreAll = $root.api_proto.Request.DRKeyStoreAll.toObject(message.dRKeyStoreAll, options);
            if (message.showModal != null && message.hasOwnProperty("showModal"))
                object.showModal = $root.api_proto.Request.ShowModal.toObject(message.showModal, options);
            return object;
        };

        /**
         * Converts this Request to JSON.
         * @function toJSON
         * @memberof api_proto.Request
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Request.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        Request.DRKeyStoreGet = (function() {

            /**
             * Properties of a DRKeyStoreGet.
             * @memberof api_proto.Request
             * @interface IDRKeyStoreGet
             * @property {Uint8Array|null} [drKey] DRKeyStoreGet drKey
             * @property {number|Long|null} [messageNumber] DRKeyStoreGet messageNumber
             */

            /**
             * Constructs a new DRKeyStoreGet.
             * @memberof api_proto.Request
             * @classdesc Represents a DRKeyStoreGet.
             * @implements IDRKeyStoreGet
             * @constructor
             * @param {api_proto.Request.IDRKeyStoreGet=} [properties] Properties to set
             */
            function DRKeyStoreGet(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * DRKeyStoreGet drKey.
             * @member {Uint8Array} drKey
             * @memberof api_proto.Request.DRKeyStoreGet
             * @instance
             */
            DRKeyStoreGet.prototype.drKey = $util.newBuffer([]);

            /**
             * DRKeyStoreGet messageNumber.
             * @member {number|Long} messageNumber
             * @memberof api_proto.Request.DRKeyStoreGet
             * @instance
             */
            DRKeyStoreGet.prototype.messageNumber = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

            /**
             * Creates a new DRKeyStoreGet instance using the specified properties.
             * @function create
             * @memberof api_proto.Request.DRKeyStoreGet
             * @static
             * @param {api_proto.Request.IDRKeyStoreGet=} [properties] Properties to set
             * @returns {api_proto.Request.DRKeyStoreGet} DRKeyStoreGet instance
             */
            DRKeyStoreGet.create = function create(properties) {
                return new DRKeyStoreGet(properties);
            };

            /**
             * Encodes the specified DRKeyStoreGet message. Does not implicitly {@link api_proto.Request.DRKeyStoreGet.verify|verify} messages.
             * @function encode
             * @memberof api_proto.Request.DRKeyStoreGet
             * @static
             * @param {api_proto.Request.IDRKeyStoreGet} message DRKeyStoreGet message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DRKeyStoreGet.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.drKey != null && message.hasOwnProperty("drKey"))
                    writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.drKey);
                if (message.messageNumber != null && message.hasOwnProperty("messageNumber"))
                    writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.messageNumber);
                return writer;
            };

            /**
             * Encodes the specified DRKeyStoreGet message, length delimited. Does not implicitly {@link api_proto.Request.DRKeyStoreGet.verify|verify} messages.
             * @function encodeDelimited
             * @memberof api_proto.Request.DRKeyStoreGet
             * @static
             * @param {api_proto.Request.IDRKeyStoreGet} message DRKeyStoreGet message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DRKeyStoreGet.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a DRKeyStoreGet message from the specified reader or buffer.
             * @function decode
             * @memberof api_proto.Request.DRKeyStoreGet
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {api_proto.Request.DRKeyStoreGet} DRKeyStoreGet
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DRKeyStoreGet.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api_proto.Request.DRKeyStoreGet();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.drKey = reader.bytes();
                        break;
                    case 2:
                        message.messageNumber = reader.uint64();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a DRKeyStoreGet message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof api_proto.Request.DRKeyStoreGet
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {api_proto.Request.DRKeyStoreGet} DRKeyStoreGet
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DRKeyStoreGet.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a DRKeyStoreGet message.
             * @function verify
             * @memberof api_proto.Request.DRKeyStoreGet
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            DRKeyStoreGet.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.drKey != null && message.hasOwnProperty("drKey"))
                    if (!(message.drKey && typeof message.drKey.length === "number" || $util.isString(message.drKey)))
                        return "drKey: buffer expected";
                if (message.messageNumber != null && message.hasOwnProperty("messageNumber"))
                    if (!$util.isInteger(message.messageNumber) && !(message.messageNumber && $util.isInteger(message.messageNumber.low) && $util.isInteger(message.messageNumber.high)))
                        return "messageNumber: integer|Long expected";
                return null;
            };

            /**
             * Creates a DRKeyStoreGet message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof api_proto.Request.DRKeyStoreGet
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {api_proto.Request.DRKeyStoreGet} DRKeyStoreGet
             */
            DRKeyStoreGet.fromObject = function fromObject(object) {
                if (object instanceof $root.api_proto.Request.DRKeyStoreGet)
                    return object;
                var message = new $root.api_proto.Request.DRKeyStoreGet();
                if (object.drKey != null)
                    if (typeof object.drKey === "string")
                        $util.base64.decode(object.drKey, message.drKey = $util.newBuffer($util.base64.length(object.drKey)), 0);
                    else if (object.drKey.length)
                        message.drKey = object.drKey;
                if (object.messageNumber != null)
                    if ($util.Long)
                        (message.messageNumber = $util.Long.fromValue(object.messageNumber)).unsigned = true;
                    else if (typeof object.messageNumber === "string")
                        message.messageNumber = parseInt(object.messageNumber, 10);
                    else if (typeof object.messageNumber === "number")
                        message.messageNumber = object.messageNumber;
                    else if (typeof object.messageNumber === "object")
                        message.messageNumber = new $util.LongBits(object.messageNumber.low >>> 0, object.messageNumber.high >>> 0).toNumber(true);
                return message;
            };

            /**
             * Creates a plain object from a DRKeyStoreGet message. Also converts values to other types if specified.
             * @function toObject
             * @memberof api_proto.Request.DRKeyStoreGet
             * @static
             * @param {api_proto.Request.DRKeyStoreGet} message DRKeyStoreGet
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            DRKeyStoreGet.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.drKey = options.bytes === String ? "" : [];
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, true);
                        object.messageNumber = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.messageNumber = options.longs === String ? "0" : 0;
                }
                if (message.drKey != null && message.hasOwnProperty("drKey"))
                    object.drKey = options.bytes === String ? $util.base64.encode(message.drKey, 0, message.drKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.drKey) : message.drKey;
                if (message.messageNumber != null && message.hasOwnProperty("messageNumber"))
                    if (typeof message.messageNumber === "number")
                        object.messageNumber = options.longs === String ? String(message.messageNumber) : message.messageNumber;
                    else
                        object.messageNumber = options.longs === String ? $util.Long.prototype.toString.call(message.messageNumber) : options.longs === Number ? new $util.LongBits(message.messageNumber.low >>> 0, message.messageNumber.high >>> 0).toNumber(true) : message.messageNumber;
                return object;
            };

            /**
             * Converts this DRKeyStoreGet to JSON.
             * @function toJSON
             * @memberof api_proto.Request.DRKeyStoreGet
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            DRKeyStoreGet.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return DRKeyStoreGet;
        })();

        Request.DRKeyStorePut = (function() {

            /**
             * Properties of a DRKeyStorePut.
             * @memberof api_proto.Request
             * @interface IDRKeyStorePut
             * @property {Uint8Array|null} [key] DRKeyStorePut key
             * @property {number|Long|null} [messageNumber] DRKeyStorePut messageNumber
             * @property {Uint8Array|null} [messageKey] DRKeyStorePut messageKey
             */

            /**
             * Constructs a new DRKeyStorePut.
             * @memberof api_proto.Request
             * @classdesc Represents a DRKeyStorePut.
             * @implements IDRKeyStorePut
             * @constructor
             * @param {api_proto.Request.IDRKeyStorePut=} [properties] Properties to set
             */
            function DRKeyStorePut(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * DRKeyStorePut key.
             * @member {Uint8Array} key
             * @memberof api_proto.Request.DRKeyStorePut
             * @instance
             */
            DRKeyStorePut.prototype.key = $util.newBuffer([]);

            /**
             * DRKeyStorePut messageNumber.
             * @member {number|Long} messageNumber
             * @memberof api_proto.Request.DRKeyStorePut
             * @instance
             */
            DRKeyStorePut.prototype.messageNumber = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

            /**
             * DRKeyStorePut messageKey.
             * @member {Uint8Array} messageKey
             * @memberof api_proto.Request.DRKeyStorePut
             * @instance
             */
            DRKeyStorePut.prototype.messageKey = $util.newBuffer([]);

            /**
             * Creates a new DRKeyStorePut instance using the specified properties.
             * @function create
             * @memberof api_proto.Request.DRKeyStorePut
             * @static
             * @param {api_proto.Request.IDRKeyStorePut=} [properties] Properties to set
             * @returns {api_proto.Request.DRKeyStorePut} DRKeyStorePut instance
             */
            DRKeyStorePut.create = function create(properties) {
                return new DRKeyStorePut(properties);
            };

            /**
             * Encodes the specified DRKeyStorePut message. Does not implicitly {@link api_proto.Request.DRKeyStorePut.verify|verify} messages.
             * @function encode
             * @memberof api_proto.Request.DRKeyStorePut
             * @static
             * @param {api_proto.Request.IDRKeyStorePut} message DRKeyStorePut message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DRKeyStorePut.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.key != null && message.hasOwnProperty("key"))
                    writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.key);
                if (message.messageNumber != null && message.hasOwnProperty("messageNumber"))
                    writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.messageNumber);
                if (message.messageKey != null && message.hasOwnProperty("messageKey"))
                    writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.messageKey);
                return writer;
            };

            /**
             * Encodes the specified DRKeyStorePut message, length delimited. Does not implicitly {@link api_proto.Request.DRKeyStorePut.verify|verify} messages.
             * @function encodeDelimited
             * @memberof api_proto.Request.DRKeyStorePut
             * @static
             * @param {api_proto.Request.IDRKeyStorePut} message DRKeyStorePut message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DRKeyStorePut.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a DRKeyStorePut message from the specified reader or buffer.
             * @function decode
             * @memberof api_proto.Request.DRKeyStorePut
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {api_proto.Request.DRKeyStorePut} DRKeyStorePut
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DRKeyStorePut.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api_proto.Request.DRKeyStorePut();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.key = reader.bytes();
                        break;
                    case 2:
                        message.messageNumber = reader.uint64();
                        break;
                    case 3:
                        message.messageKey = reader.bytes();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a DRKeyStorePut message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof api_proto.Request.DRKeyStorePut
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {api_proto.Request.DRKeyStorePut} DRKeyStorePut
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DRKeyStorePut.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a DRKeyStorePut message.
             * @function verify
             * @memberof api_proto.Request.DRKeyStorePut
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            DRKeyStorePut.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.key != null && message.hasOwnProperty("key"))
                    if (!(message.key && typeof message.key.length === "number" || $util.isString(message.key)))
                        return "key: buffer expected";
                if (message.messageNumber != null && message.hasOwnProperty("messageNumber"))
                    if (!$util.isInteger(message.messageNumber) && !(message.messageNumber && $util.isInteger(message.messageNumber.low) && $util.isInteger(message.messageNumber.high)))
                        return "messageNumber: integer|Long expected";
                if (message.messageKey != null && message.hasOwnProperty("messageKey"))
                    if (!(message.messageKey && typeof message.messageKey.length === "number" || $util.isString(message.messageKey)))
                        return "messageKey: buffer expected";
                return null;
            };

            /**
             * Creates a DRKeyStorePut message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof api_proto.Request.DRKeyStorePut
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {api_proto.Request.DRKeyStorePut} DRKeyStorePut
             */
            DRKeyStorePut.fromObject = function fromObject(object) {
                if (object instanceof $root.api_proto.Request.DRKeyStorePut)
                    return object;
                var message = new $root.api_proto.Request.DRKeyStorePut();
                if (object.key != null)
                    if (typeof object.key === "string")
                        $util.base64.decode(object.key, message.key = $util.newBuffer($util.base64.length(object.key)), 0);
                    else if (object.key.length)
                        message.key = object.key;
                if (object.messageNumber != null)
                    if ($util.Long)
                        (message.messageNumber = $util.Long.fromValue(object.messageNumber)).unsigned = true;
                    else if (typeof object.messageNumber === "string")
                        message.messageNumber = parseInt(object.messageNumber, 10);
                    else if (typeof object.messageNumber === "number")
                        message.messageNumber = object.messageNumber;
                    else if (typeof object.messageNumber === "object")
                        message.messageNumber = new $util.LongBits(object.messageNumber.low >>> 0, object.messageNumber.high >>> 0).toNumber(true);
                if (object.messageKey != null)
                    if (typeof object.messageKey === "string")
                        $util.base64.decode(object.messageKey, message.messageKey = $util.newBuffer($util.base64.length(object.messageKey)), 0);
                    else if (object.messageKey.length)
                        message.messageKey = object.messageKey;
                return message;
            };

            /**
             * Creates a plain object from a DRKeyStorePut message. Also converts values to other types if specified.
             * @function toObject
             * @memberof api_proto.Request.DRKeyStorePut
             * @static
             * @param {api_proto.Request.DRKeyStorePut} message DRKeyStorePut
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            DRKeyStorePut.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.key = options.bytes === String ? "" : [];
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, true);
                        object.messageNumber = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.messageNumber = options.longs === String ? "0" : 0;
                    object.messageKey = options.bytes === String ? "" : [];
                }
                if (message.key != null && message.hasOwnProperty("key"))
                    object.key = options.bytes === String ? $util.base64.encode(message.key, 0, message.key.length) : options.bytes === Array ? Array.prototype.slice.call(message.key) : message.key;
                if (message.messageNumber != null && message.hasOwnProperty("messageNumber"))
                    if (typeof message.messageNumber === "number")
                        object.messageNumber = options.longs === String ? String(message.messageNumber) : message.messageNumber;
                    else
                        object.messageNumber = options.longs === String ? $util.Long.prototype.toString.call(message.messageNumber) : options.longs === Number ? new $util.LongBits(message.messageNumber.low >>> 0, message.messageNumber.high >>> 0).toNumber(true) : message.messageNumber;
                if (message.messageKey != null && message.hasOwnProperty("messageKey"))
                    object.messageKey = options.bytes === String ? $util.base64.encode(message.messageKey, 0, message.messageKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.messageKey) : message.messageKey;
                return object;
            };

            /**
             * Converts this DRKeyStorePut to JSON.
             * @function toJSON
             * @memberof api_proto.Request.DRKeyStorePut
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            DRKeyStorePut.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return DRKeyStorePut;
        })();

        Request.DRKeyStoreDeleteMK = (function() {

            /**
             * Properties of a DRKeyStoreDeleteMK.
             * @memberof api_proto.Request
             * @interface IDRKeyStoreDeleteMK
             * @property {Uint8Array|null} [key] DRKeyStoreDeleteMK key
             * @property {number|Long|null} [msgNum] DRKeyStoreDeleteMK msgNum
             */

            /**
             * Constructs a new DRKeyStoreDeleteMK.
             * @memberof api_proto.Request
             * @classdesc Represents a DRKeyStoreDeleteMK.
             * @implements IDRKeyStoreDeleteMK
             * @constructor
             * @param {api_proto.Request.IDRKeyStoreDeleteMK=} [properties] Properties to set
             */
            function DRKeyStoreDeleteMK(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * DRKeyStoreDeleteMK key.
             * @member {Uint8Array} key
             * @memberof api_proto.Request.DRKeyStoreDeleteMK
             * @instance
             */
            DRKeyStoreDeleteMK.prototype.key = $util.newBuffer([]);

            /**
             * DRKeyStoreDeleteMK msgNum.
             * @member {number|Long} msgNum
             * @memberof api_proto.Request.DRKeyStoreDeleteMK
             * @instance
             */
            DRKeyStoreDeleteMK.prototype.msgNum = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

            /**
             * Creates a new DRKeyStoreDeleteMK instance using the specified properties.
             * @function create
             * @memberof api_proto.Request.DRKeyStoreDeleteMK
             * @static
             * @param {api_proto.Request.IDRKeyStoreDeleteMK=} [properties] Properties to set
             * @returns {api_proto.Request.DRKeyStoreDeleteMK} DRKeyStoreDeleteMK instance
             */
            DRKeyStoreDeleteMK.create = function create(properties) {
                return new DRKeyStoreDeleteMK(properties);
            };

            /**
             * Encodes the specified DRKeyStoreDeleteMK message. Does not implicitly {@link api_proto.Request.DRKeyStoreDeleteMK.verify|verify} messages.
             * @function encode
             * @memberof api_proto.Request.DRKeyStoreDeleteMK
             * @static
             * @param {api_proto.Request.IDRKeyStoreDeleteMK} message DRKeyStoreDeleteMK message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DRKeyStoreDeleteMK.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.key != null && message.hasOwnProperty("key"))
                    writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.key);
                if (message.msgNum != null && message.hasOwnProperty("msgNum"))
                    writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.msgNum);
                return writer;
            };

            /**
             * Encodes the specified DRKeyStoreDeleteMK message, length delimited. Does not implicitly {@link api_proto.Request.DRKeyStoreDeleteMK.verify|verify} messages.
             * @function encodeDelimited
             * @memberof api_proto.Request.DRKeyStoreDeleteMK
             * @static
             * @param {api_proto.Request.IDRKeyStoreDeleteMK} message DRKeyStoreDeleteMK message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DRKeyStoreDeleteMK.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a DRKeyStoreDeleteMK message from the specified reader or buffer.
             * @function decode
             * @memberof api_proto.Request.DRKeyStoreDeleteMK
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {api_proto.Request.DRKeyStoreDeleteMK} DRKeyStoreDeleteMK
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DRKeyStoreDeleteMK.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api_proto.Request.DRKeyStoreDeleteMK();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.key = reader.bytes();
                        break;
                    case 2:
                        message.msgNum = reader.uint64();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a DRKeyStoreDeleteMK message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof api_proto.Request.DRKeyStoreDeleteMK
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {api_proto.Request.DRKeyStoreDeleteMK} DRKeyStoreDeleteMK
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DRKeyStoreDeleteMK.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a DRKeyStoreDeleteMK message.
             * @function verify
             * @memberof api_proto.Request.DRKeyStoreDeleteMK
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            DRKeyStoreDeleteMK.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.key != null && message.hasOwnProperty("key"))
                    if (!(message.key && typeof message.key.length === "number" || $util.isString(message.key)))
                        return "key: buffer expected";
                if (message.msgNum != null && message.hasOwnProperty("msgNum"))
                    if (!$util.isInteger(message.msgNum) && !(message.msgNum && $util.isInteger(message.msgNum.low) && $util.isInteger(message.msgNum.high)))
                        return "msgNum: integer|Long expected";
                return null;
            };

            /**
             * Creates a DRKeyStoreDeleteMK message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof api_proto.Request.DRKeyStoreDeleteMK
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {api_proto.Request.DRKeyStoreDeleteMK} DRKeyStoreDeleteMK
             */
            DRKeyStoreDeleteMK.fromObject = function fromObject(object) {
                if (object instanceof $root.api_proto.Request.DRKeyStoreDeleteMK)
                    return object;
                var message = new $root.api_proto.Request.DRKeyStoreDeleteMK();
                if (object.key != null)
                    if (typeof object.key === "string")
                        $util.base64.decode(object.key, message.key = $util.newBuffer($util.base64.length(object.key)), 0);
                    else if (object.key.length)
                        message.key = object.key;
                if (object.msgNum != null)
                    if ($util.Long)
                        (message.msgNum = $util.Long.fromValue(object.msgNum)).unsigned = true;
                    else if (typeof object.msgNum === "string")
                        message.msgNum = parseInt(object.msgNum, 10);
                    else if (typeof object.msgNum === "number")
                        message.msgNum = object.msgNum;
                    else if (typeof object.msgNum === "object")
                        message.msgNum = new $util.LongBits(object.msgNum.low >>> 0, object.msgNum.high >>> 0).toNumber(true);
                return message;
            };

            /**
             * Creates a plain object from a DRKeyStoreDeleteMK message. Also converts values to other types if specified.
             * @function toObject
             * @memberof api_proto.Request.DRKeyStoreDeleteMK
             * @static
             * @param {api_proto.Request.DRKeyStoreDeleteMK} message DRKeyStoreDeleteMK
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            DRKeyStoreDeleteMK.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.key = options.bytes === String ? "" : [];
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, true);
                        object.msgNum = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.msgNum = options.longs === String ? "0" : 0;
                }
                if (message.key != null && message.hasOwnProperty("key"))
                    object.key = options.bytes === String ? $util.base64.encode(message.key, 0, message.key.length) : options.bytes === Array ? Array.prototype.slice.call(message.key) : message.key;
                if (message.msgNum != null && message.hasOwnProperty("msgNum"))
                    if (typeof message.msgNum === "number")
                        object.msgNum = options.longs === String ? String(message.msgNum) : message.msgNum;
                    else
                        object.msgNum = options.longs === String ? $util.Long.prototype.toString.call(message.msgNum) : options.longs === Number ? new $util.LongBits(message.msgNum.low >>> 0, message.msgNum.high >>> 0).toNumber(true) : message.msgNum;
                return object;
            };

            /**
             * Converts this DRKeyStoreDeleteMK to JSON.
             * @function toJSON
             * @memberof api_proto.Request.DRKeyStoreDeleteMK
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            DRKeyStoreDeleteMK.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return DRKeyStoreDeleteMK;
        })();

        Request.DRKeyStoreDeleteKeys = (function() {

            /**
             * Properties of a DRKeyStoreDeleteKeys.
             * @memberof api_proto.Request
             * @interface IDRKeyStoreDeleteKeys
             * @property {Uint8Array|null} [key] DRKeyStoreDeleteKeys key
             */

            /**
             * Constructs a new DRKeyStoreDeleteKeys.
             * @memberof api_proto.Request
             * @classdesc Represents a DRKeyStoreDeleteKeys.
             * @implements IDRKeyStoreDeleteKeys
             * @constructor
             * @param {api_proto.Request.IDRKeyStoreDeleteKeys=} [properties] Properties to set
             */
            function DRKeyStoreDeleteKeys(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * DRKeyStoreDeleteKeys key.
             * @member {Uint8Array} key
             * @memberof api_proto.Request.DRKeyStoreDeleteKeys
             * @instance
             */
            DRKeyStoreDeleteKeys.prototype.key = $util.newBuffer([]);

            /**
             * Creates a new DRKeyStoreDeleteKeys instance using the specified properties.
             * @function create
             * @memberof api_proto.Request.DRKeyStoreDeleteKeys
             * @static
             * @param {api_proto.Request.IDRKeyStoreDeleteKeys=} [properties] Properties to set
             * @returns {api_proto.Request.DRKeyStoreDeleteKeys} DRKeyStoreDeleteKeys instance
             */
            DRKeyStoreDeleteKeys.create = function create(properties) {
                return new DRKeyStoreDeleteKeys(properties);
            };

            /**
             * Encodes the specified DRKeyStoreDeleteKeys message. Does not implicitly {@link api_proto.Request.DRKeyStoreDeleteKeys.verify|verify} messages.
             * @function encode
             * @memberof api_proto.Request.DRKeyStoreDeleteKeys
             * @static
             * @param {api_proto.Request.IDRKeyStoreDeleteKeys} message DRKeyStoreDeleteKeys message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DRKeyStoreDeleteKeys.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.key != null && message.hasOwnProperty("key"))
                    writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.key);
                return writer;
            };

            /**
             * Encodes the specified DRKeyStoreDeleteKeys message, length delimited. Does not implicitly {@link api_proto.Request.DRKeyStoreDeleteKeys.verify|verify} messages.
             * @function encodeDelimited
             * @memberof api_proto.Request.DRKeyStoreDeleteKeys
             * @static
             * @param {api_proto.Request.IDRKeyStoreDeleteKeys} message DRKeyStoreDeleteKeys message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DRKeyStoreDeleteKeys.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a DRKeyStoreDeleteKeys message from the specified reader or buffer.
             * @function decode
             * @memberof api_proto.Request.DRKeyStoreDeleteKeys
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {api_proto.Request.DRKeyStoreDeleteKeys} DRKeyStoreDeleteKeys
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DRKeyStoreDeleteKeys.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api_proto.Request.DRKeyStoreDeleteKeys();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.key = reader.bytes();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a DRKeyStoreDeleteKeys message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof api_proto.Request.DRKeyStoreDeleteKeys
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {api_proto.Request.DRKeyStoreDeleteKeys} DRKeyStoreDeleteKeys
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DRKeyStoreDeleteKeys.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a DRKeyStoreDeleteKeys message.
             * @function verify
             * @memberof api_proto.Request.DRKeyStoreDeleteKeys
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            DRKeyStoreDeleteKeys.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.key != null && message.hasOwnProperty("key"))
                    if (!(message.key && typeof message.key.length === "number" || $util.isString(message.key)))
                        return "key: buffer expected";
                return null;
            };

            /**
             * Creates a DRKeyStoreDeleteKeys message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof api_proto.Request.DRKeyStoreDeleteKeys
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {api_proto.Request.DRKeyStoreDeleteKeys} DRKeyStoreDeleteKeys
             */
            DRKeyStoreDeleteKeys.fromObject = function fromObject(object) {
                if (object instanceof $root.api_proto.Request.DRKeyStoreDeleteKeys)
                    return object;
                var message = new $root.api_proto.Request.DRKeyStoreDeleteKeys();
                if (object.key != null)
                    if (typeof object.key === "string")
                        $util.base64.decode(object.key, message.key = $util.newBuffer($util.base64.length(object.key)), 0);
                    else if (object.key.length)
                        message.key = object.key;
                return message;
            };

            /**
             * Creates a plain object from a DRKeyStoreDeleteKeys message. Also converts values to other types if specified.
             * @function toObject
             * @memberof api_proto.Request.DRKeyStoreDeleteKeys
             * @static
             * @param {api_proto.Request.DRKeyStoreDeleteKeys} message DRKeyStoreDeleteKeys
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            DRKeyStoreDeleteKeys.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    object.key = options.bytes === String ? "" : [];
                if (message.key != null && message.hasOwnProperty("key"))
                    object.key = options.bytes === String ? $util.base64.encode(message.key, 0, message.key.length) : options.bytes === Array ? Array.prototype.slice.call(message.key) : message.key;
                return object;
            };

            /**
             * Converts this DRKeyStoreDeleteKeys to JSON.
             * @function toJSON
             * @memberof api_proto.Request.DRKeyStoreDeleteKeys
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            DRKeyStoreDeleteKeys.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return DRKeyStoreDeleteKeys;
        })();

        Request.DRKeyStoreCount = (function() {

            /**
             * Properties of a DRKeyStoreCount.
             * @memberof api_proto.Request
             * @interface IDRKeyStoreCount
             * @property {Uint8Array|null} [key] DRKeyStoreCount key
             */

            /**
             * Constructs a new DRKeyStoreCount.
             * @memberof api_proto.Request
             * @classdesc Represents a DRKeyStoreCount.
             * @implements IDRKeyStoreCount
             * @constructor
             * @param {api_proto.Request.IDRKeyStoreCount=} [properties] Properties to set
             */
            function DRKeyStoreCount(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * DRKeyStoreCount key.
             * @member {Uint8Array} key
             * @memberof api_proto.Request.DRKeyStoreCount
             * @instance
             */
            DRKeyStoreCount.prototype.key = $util.newBuffer([]);

            /**
             * Creates a new DRKeyStoreCount instance using the specified properties.
             * @function create
             * @memberof api_proto.Request.DRKeyStoreCount
             * @static
             * @param {api_proto.Request.IDRKeyStoreCount=} [properties] Properties to set
             * @returns {api_proto.Request.DRKeyStoreCount} DRKeyStoreCount instance
             */
            DRKeyStoreCount.create = function create(properties) {
                return new DRKeyStoreCount(properties);
            };

            /**
             * Encodes the specified DRKeyStoreCount message. Does not implicitly {@link api_proto.Request.DRKeyStoreCount.verify|verify} messages.
             * @function encode
             * @memberof api_proto.Request.DRKeyStoreCount
             * @static
             * @param {api_proto.Request.IDRKeyStoreCount} message DRKeyStoreCount message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DRKeyStoreCount.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.key != null && message.hasOwnProperty("key"))
                    writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.key);
                return writer;
            };

            /**
             * Encodes the specified DRKeyStoreCount message, length delimited. Does not implicitly {@link api_proto.Request.DRKeyStoreCount.verify|verify} messages.
             * @function encodeDelimited
             * @memberof api_proto.Request.DRKeyStoreCount
             * @static
             * @param {api_proto.Request.IDRKeyStoreCount} message DRKeyStoreCount message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DRKeyStoreCount.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a DRKeyStoreCount message from the specified reader or buffer.
             * @function decode
             * @memberof api_proto.Request.DRKeyStoreCount
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {api_proto.Request.DRKeyStoreCount} DRKeyStoreCount
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DRKeyStoreCount.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api_proto.Request.DRKeyStoreCount();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.key = reader.bytes();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a DRKeyStoreCount message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof api_proto.Request.DRKeyStoreCount
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {api_proto.Request.DRKeyStoreCount} DRKeyStoreCount
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DRKeyStoreCount.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a DRKeyStoreCount message.
             * @function verify
             * @memberof api_proto.Request.DRKeyStoreCount
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            DRKeyStoreCount.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.key != null && message.hasOwnProperty("key"))
                    if (!(message.key && typeof message.key.length === "number" || $util.isString(message.key)))
                        return "key: buffer expected";
                return null;
            };

            /**
             * Creates a DRKeyStoreCount message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof api_proto.Request.DRKeyStoreCount
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {api_proto.Request.DRKeyStoreCount} DRKeyStoreCount
             */
            DRKeyStoreCount.fromObject = function fromObject(object) {
                if (object instanceof $root.api_proto.Request.DRKeyStoreCount)
                    return object;
                var message = new $root.api_proto.Request.DRKeyStoreCount();
                if (object.key != null)
                    if (typeof object.key === "string")
                        $util.base64.decode(object.key, message.key = $util.newBuffer($util.base64.length(object.key)), 0);
                    else if (object.key.length)
                        message.key = object.key;
                return message;
            };

            /**
             * Creates a plain object from a DRKeyStoreCount message. Also converts values to other types if specified.
             * @function toObject
             * @memberof api_proto.Request.DRKeyStoreCount
             * @static
             * @param {api_proto.Request.DRKeyStoreCount} message DRKeyStoreCount
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            DRKeyStoreCount.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    object.key = options.bytes === String ? "" : [];
                if (message.key != null && message.hasOwnProperty("key"))
                    object.key = options.bytes === String ? $util.base64.encode(message.key, 0, message.key.length) : options.bytes === Array ? Array.prototype.slice.call(message.key) : message.key;
                return object;
            };

            /**
             * Converts this DRKeyStoreCount to JSON.
             * @function toJSON
             * @memberof api_proto.Request.DRKeyStoreCount
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            DRKeyStoreCount.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return DRKeyStoreCount;
        })();

        Request.DRKeyStoreAll = (function() {

            /**
             * Properties of a DRKeyStoreAll.
             * @memberof api_proto.Request
             * @interface IDRKeyStoreAll
             */

            /**
             * Constructs a new DRKeyStoreAll.
             * @memberof api_proto.Request
             * @classdesc Represents a DRKeyStoreAll.
             * @implements IDRKeyStoreAll
             * @constructor
             * @param {api_proto.Request.IDRKeyStoreAll=} [properties] Properties to set
             */
            function DRKeyStoreAll(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Creates a new DRKeyStoreAll instance using the specified properties.
             * @function create
             * @memberof api_proto.Request.DRKeyStoreAll
             * @static
             * @param {api_proto.Request.IDRKeyStoreAll=} [properties] Properties to set
             * @returns {api_proto.Request.DRKeyStoreAll} DRKeyStoreAll instance
             */
            DRKeyStoreAll.create = function create(properties) {
                return new DRKeyStoreAll(properties);
            };

            /**
             * Encodes the specified DRKeyStoreAll message. Does not implicitly {@link api_proto.Request.DRKeyStoreAll.verify|verify} messages.
             * @function encode
             * @memberof api_proto.Request.DRKeyStoreAll
             * @static
             * @param {api_proto.Request.IDRKeyStoreAll} message DRKeyStoreAll message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DRKeyStoreAll.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                return writer;
            };

            /**
             * Encodes the specified DRKeyStoreAll message, length delimited. Does not implicitly {@link api_proto.Request.DRKeyStoreAll.verify|verify} messages.
             * @function encodeDelimited
             * @memberof api_proto.Request.DRKeyStoreAll
             * @static
             * @param {api_proto.Request.IDRKeyStoreAll} message DRKeyStoreAll message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DRKeyStoreAll.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a DRKeyStoreAll message from the specified reader or buffer.
             * @function decode
             * @memberof api_proto.Request.DRKeyStoreAll
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {api_proto.Request.DRKeyStoreAll} DRKeyStoreAll
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DRKeyStoreAll.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api_proto.Request.DRKeyStoreAll();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a DRKeyStoreAll message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof api_proto.Request.DRKeyStoreAll
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {api_proto.Request.DRKeyStoreAll} DRKeyStoreAll
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DRKeyStoreAll.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a DRKeyStoreAll message.
             * @function verify
             * @memberof api_proto.Request.DRKeyStoreAll
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            DRKeyStoreAll.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                return null;
            };

            /**
             * Creates a DRKeyStoreAll message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof api_proto.Request.DRKeyStoreAll
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {api_proto.Request.DRKeyStoreAll} DRKeyStoreAll
             */
            DRKeyStoreAll.fromObject = function fromObject(object) {
                if (object instanceof $root.api_proto.Request.DRKeyStoreAll)
                    return object;
                return new $root.api_proto.Request.DRKeyStoreAll();
            };

            /**
             * Creates a plain object from a DRKeyStoreAll message. Also converts values to other types if specified.
             * @function toObject
             * @memberof api_proto.Request.DRKeyStoreAll
             * @static
             * @param {api_proto.Request.DRKeyStoreAll} message DRKeyStoreAll
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            DRKeyStoreAll.toObject = function toObject() {
                return {};
            };

            /**
             * Converts this DRKeyStoreAll to JSON.
             * @function toJSON
             * @memberof api_proto.Request.DRKeyStoreAll
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            DRKeyStoreAll.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return DRKeyStoreAll;
        })();

        Request.ShowModal = (function() {

            /**
             * Properties of a ShowModal.
             * @memberof api_proto.Request
             * @interface IShowModal
             * @property {string|null} [title] ShowModal title
             * @property {string|null} [layout] ShowModal layout
             */

            /**
             * Constructs a new ShowModal.
             * @memberof api_proto.Request
             * @classdesc Represents a ShowModal.
             * @implements IShowModal
             * @constructor
             * @param {api_proto.Request.IShowModal=} [properties] Properties to set
             */
            function ShowModal(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ShowModal title.
             * @member {string} title
             * @memberof api_proto.Request.ShowModal
             * @instance
             */
            ShowModal.prototype.title = "";

            /**
             * ShowModal layout.
             * @member {string} layout
             * @memberof api_proto.Request.ShowModal
             * @instance
             */
            ShowModal.prototype.layout = "";

            /**
             * Creates a new ShowModal instance using the specified properties.
             * @function create
             * @memberof api_proto.Request.ShowModal
             * @static
             * @param {api_proto.Request.IShowModal=} [properties] Properties to set
             * @returns {api_proto.Request.ShowModal} ShowModal instance
             */
            ShowModal.create = function create(properties) {
                return new ShowModal(properties);
            };

            /**
             * Encodes the specified ShowModal message. Does not implicitly {@link api_proto.Request.ShowModal.verify|verify} messages.
             * @function encode
             * @memberof api_proto.Request.ShowModal
             * @static
             * @param {api_proto.Request.IShowModal} message ShowModal message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ShowModal.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.title != null && message.hasOwnProperty("title"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.title);
                if (message.layout != null && message.hasOwnProperty("layout"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.layout);
                return writer;
            };

            /**
             * Encodes the specified ShowModal message, length delimited. Does not implicitly {@link api_proto.Request.ShowModal.verify|verify} messages.
             * @function encodeDelimited
             * @memberof api_proto.Request.ShowModal
             * @static
             * @param {api_proto.Request.IShowModal} message ShowModal message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ShowModal.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a ShowModal message from the specified reader or buffer.
             * @function decode
             * @memberof api_proto.Request.ShowModal
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {api_proto.Request.ShowModal} ShowModal
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ShowModal.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api_proto.Request.ShowModal();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.title = reader.string();
                        break;
                    case 2:
                        message.layout = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a ShowModal message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof api_proto.Request.ShowModal
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {api_proto.Request.ShowModal} ShowModal
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ShowModal.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a ShowModal message.
             * @function verify
             * @memberof api_proto.Request.ShowModal
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ShowModal.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.title != null && message.hasOwnProperty("title"))
                    if (!$util.isString(message.title))
                        return "title: string expected";
                if (message.layout != null && message.hasOwnProperty("layout"))
                    if (!$util.isString(message.layout))
                        return "layout: string expected";
                return null;
            };

            /**
             * Creates a ShowModal message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof api_proto.Request.ShowModal
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {api_proto.Request.ShowModal} ShowModal
             */
            ShowModal.fromObject = function fromObject(object) {
                if (object instanceof $root.api_proto.Request.ShowModal)
                    return object;
                var message = new $root.api_proto.Request.ShowModal();
                if (object.title != null)
                    message.title = String(object.title);
                if (object.layout != null)
                    message.layout = String(object.layout);
                return message;
            };

            /**
             * Creates a plain object from a ShowModal message. Also converts values to other types if specified.
             * @function toObject
             * @memberof api_proto.Request.ShowModal
             * @static
             * @param {api_proto.Request.ShowModal} message ShowModal
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ShowModal.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.title = "";
                    object.layout = "";
                }
                if (message.title != null && message.hasOwnProperty("title"))
                    object.title = message.title;
                if (message.layout != null && message.hasOwnProperty("layout"))
                    object.layout = message.layout;
                return object;
            };

            /**
             * Converts this ShowModal to JSON.
             * @function toJSON
             * @memberof api_proto.Request.ShowModal
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ShowModal.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return ShowModal;
        })();

        return Request;
    })();

    return api_proto;
})();

module.exports = $root;
