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

    api_proto.Response = (function() {

        /**
         * Properties of a Response.
         * @memberof api_proto
         * @interface IResponse
         * @property {api_proto.Response.IDRKeyStoreGet|null} [dRKeyStoreGet] Response dRKeyStoreGet
         * @property {api_proto.Response.IDRKeyStoreCount|null} [dRKeyStoreCount] Response dRKeyStoreCount
         * @property {api_proto.Response.IDRKeyStoreAll|null} [dRKeyStoreAll] Response dRKeyStoreAll
         * @property {api_proto.Response.ISendEthereumTransaction|null} [sendEthereumTransaction] Response sendEthereumTransaction
         */

        /**
         * Constructs a new Response.
         * @memberof api_proto
         * @classdesc Represents a Response.
         * @implements IResponse
         * @constructor
         * @param {api_proto.IResponse=} [properties] Properties to set
         */
        function Response(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Response dRKeyStoreGet.
         * @member {api_proto.Response.IDRKeyStoreGet|null|undefined} dRKeyStoreGet
         * @memberof api_proto.Response
         * @instance
         */
        Response.prototype.dRKeyStoreGet = null;

        /**
         * Response dRKeyStoreCount.
         * @member {api_proto.Response.IDRKeyStoreCount|null|undefined} dRKeyStoreCount
         * @memberof api_proto.Response
         * @instance
         */
        Response.prototype.dRKeyStoreCount = null;

        /**
         * Response dRKeyStoreAll.
         * @member {api_proto.Response.IDRKeyStoreAll|null|undefined} dRKeyStoreAll
         * @memberof api_proto.Response
         * @instance
         */
        Response.prototype.dRKeyStoreAll = null;

        /**
         * Response sendEthereumTransaction.
         * @member {api_proto.Response.ISendEthereumTransaction|null|undefined} sendEthereumTransaction
         * @memberof api_proto.Response
         * @instance
         */
        Response.prototype.sendEthereumTransaction = null;

        /**
         * Creates a new Response instance using the specified properties.
         * @function create
         * @memberof api_proto.Response
         * @static
         * @param {api_proto.IResponse=} [properties] Properties to set
         * @returns {api_proto.Response} Response instance
         */
        Response.create = function create(properties) {
            return new Response(properties);
        };

        /**
         * Encodes the specified Response message. Does not implicitly {@link api_proto.Response.verify|verify} messages.
         * @function encode
         * @memberof api_proto.Response
         * @static
         * @param {api_proto.IResponse} message Response message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Response.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.dRKeyStoreGet != null && message.hasOwnProperty("dRKeyStoreGet"))
                $root.api_proto.Response.DRKeyStoreGet.encode(message.dRKeyStoreGet, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.dRKeyStoreCount != null && message.hasOwnProperty("dRKeyStoreCount"))
                $root.api_proto.Response.DRKeyStoreCount.encode(message.dRKeyStoreCount, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            if (message.dRKeyStoreAll != null && message.hasOwnProperty("dRKeyStoreAll"))
                $root.api_proto.Response.DRKeyStoreAll.encode(message.dRKeyStoreAll, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
            if (message.sendEthereumTransaction != null && message.hasOwnProperty("sendEthereumTransaction"))
                $root.api_proto.Response.SendEthereumTransaction.encode(message.sendEthereumTransaction, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified Response message, length delimited. Does not implicitly {@link api_proto.Response.verify|verify} messages.
         * @function encodeDelimited
         * @memberof api_proto.Response
         * @static
         * @param {api_proto.IResponse} message Response message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Response.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Response message from the specified reader or buffer.
         * @function decode
         * @memberof api_proto.Response
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {api_proto.Response} Response
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Response.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api_proto.Response();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 3:
                    message.dRKeyStoreGet = $root.api_proto.Response.DRKeyStoreGet.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.dRKeyStoreCount = $root.api_proto.Response.DRKeyStoreCount.decode(reader, reader.uint32());
                    break;
                case 5:
                    message.dRKeyStoreAll = $root.api_proto.Response.DRKeyStoreAll.decode(reader, reader.uint32());
                    break;
                case 6:
                    message.sendEthereumTransaction = $root.api_proto.Response.SendEthereumTransaction.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Response message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof api_proto.Response
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {api_proto.Response} Response
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Response.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Response message.
         * @function verify
         * @memberof api_proto.Response
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Response.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.dRKeyStoreGet != null && message.hasOwnProperty("dRKeyStoreGet")) {
                var error = $root.api_proto.Response.DRKeyStoreGet.verify(message.dRKeyStoreGet);
                if (error)
                    return "dRKeyStoreGet." + error;
            }
            if (message.dRKeyStoreCount != null && message.hasOwnProperty("dRKeyStoreCount")) {
                var error = $root.api_proto.Response.DRKeyStoreCount.verify(message.dRKeyStoreCount);
                if (error)
                    return "dRKeyStoreCount." + error;
            }
            if (message.dRKeyStoreAll != null && message.hasOwnProperty("dRKeyStoreAll")) {
                var error = $root.api_proto.Response.DRKeyStoreAll.verify(message.dRKeyStoreAll);
                if (error)
                    return "dRKeyStoreAll." + error;
            }
            if (message.sendEthereumTransaction != null && message.hasOwnProperty("sendEthereumTransaction")) {
                var error = $root.api_proto.Response.SendEthereumTransaction.verify(message.sendEthereumTransaction);
                if (error)
                    return "sendEthereumTransaction." + error;
            }
            return null;
        };

        /**
         * Creates a Response message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api_proto.Response
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api_proto.Response} Response
         */
        Response.fromObject = function fromObject(object) {
            if (object instanceof $root.api_proto.Response)
                return object;
            var message = new $root.api_proto.Response();
            if (object.dRKeyStoreGet != null) {
                if (typeof object.dRKeyStoreGet !== "object")
                    throw TypeError(".api_proto.Response.dRKeyStoreGet: object expected");
                message.dRKeyStoreGet = $root.api_proto.Response.DRKeyStoreGet.fromObject(object.dRKeyStoreGet);
            }
            if (object.dRKeyStoreCount != null) {
                if (typeof object.dRKeyStoreCount !== "object")
                    throw TypeError(".api_proto.Response.dRKeyStoreCount: object expected");
                message.dRKeyStoreCount = $root.api_proto.Response.DRKeyStoreCount.fromObject(object.dRKeyStoreCount);
            }
            if (object.dRKeyStoreAll != null) {
                if (typeof object.dRKeyStoreAll !== "object")
                    throw TypeError(".api_proto.Response.dRKeyStoreAll: object expected");
                message.dRKeyStoreAll = $root.api_proto.Response.DRKeyStoreAll.fromObject(object.dRKeyStoreAll);
            }
            if (object.sendEthereumTransaction != null) {
                if (typeof object.sendEthereumTransaction !== "object")
                    throw TypeError(".api_proto.Response.sendEthereumTransaction: object expected");
                message.sendEthereumTransaction = $root.api_proto.Response.SendEthereumTransaction.fromObject(object.sendEthereumTransaction);
            }
            return message;
        };

        /**
         * Creates a plain object from a Response message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api_proto.Response
         * @static
         * @param {api_proto.Response} message Response
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Response.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.dRKeyStoreGet = null;
                object.dRKeyStoreCount = null;
                object.dRKeyStoreAll = null;
                object.sendEthereumTransaction = null;
            }
            if (message.dRKeyStoreGet != null && message.hasOwnProperty("dRKeyStoreGet"))
                object.dRKeyStoreGet = $root.api_proto.Response.DRKeyStoreGet.toObject(message.dRKeyStoreGet, options);
            if (message.dRKeyStoreCount != null && message.hasOwnProperty("dRKeyStoreCount"))
                object.dRKeyStoreCount = $root.api_proto.Response.DRKeyStoreCount.toObject(message.dRKeyStoreCount, options);
            if (message.dRKeyStoreAll != null && message.hasOwnProperty("dRKeyStoreAll"))
                object.dRKeyStoreAll = $root.api_proto.Response.DRKeyStoreAll.toObject(message.dRKeyStoreAll, options);
            if (message.sendEthereumTransaction != null && message.hasOwnProperty("sendEthereumTransaction"))
                object.sendEthereumTransaction = $root.api_proto.Response.SendEthereumTransaction.toObject(message.sendEthereumTransaction, options);
            return object;
        };

        /**
         * Converts this Response to JSON.
         * @function toJSON
         * @memberof api_proto.Response
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Response.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        Response.DRKeyStoreGet = (function() {

            /**
             * Properties of a DRKeyStoreGet.
             * @memberof api_proto.Response
             * @interface IDRKeyStoreGet
             * @property {Uint8Array|null} [messageKey] DRKeyStoreGet messageKey
             */

            /**
             * Constructs a new DRKeyStoreGet.
             * @memberof api_proto.Response
             * @classdesc Represents a DRKeyStoreGet.
             * @implements IDRKeyStoreGet
             * @constructor
             * @param {api_proto.Response.IDRKeyStoreGet=} [properties] Properties to set
             */
            function DRKeyStoreGet(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * DRKeyStoreGet messageKey.
             * @member {Uint8Array} messageKey
             * @memberof api_proto.Response.DRKeyStoreGet
             * @instance
             */
            DRKeyStoreGet.prototype.messageKey = $util.newBuffer([]);

            /**
             * Creates a new DRKeyStoreGet instance using the specified properties.
             * @function create
             * @memberof api_proto.Response.DRKeyStoreGet
             * @static
             * @param {api_proto.Response.IDRKeyStoreGet=} [properties] Properties to set
             * @returns {api_proto.Response.DRKeyStoreGet} DRKeyStoreGet instance
             */
            DRKeyStoreGet.create = function create(properties) {
                return new DRKeyStoreGet(properties);
            };

            /**
             * Encodes the specified DRKeyStoreGet message. Does not implicitly {@link api_proto.Response.DRKeyStoreGet.verify|verify} messages.
             * @function encode
             * @memberof api_proto.Response.DRKeyStoreGet
             * @static
             * @param {api_proto.Response.IDRKeyStoreGet} message DRKeyStoreGet message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DRKeyStoreGet.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.messageKey != null && message.hasOwnProperty("messageKey"))
                    writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.messageKey);
                return writer;
            };

            /**
             * Encodes the specified DRKeyStoreGet message, length delimited. Does not implicitly {@link api_proto.Response.DRKeyStoreGet.verify|verify} messages.
             * @function encodeDelimited
             * @memberof api_proto.Response.DRKeyStoreGet
             * @static
             * @param {api_proto.Response.IDRKeyStoreGet} message DRKeyStoreGet message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DRKeyStoreGet.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a DRKeyStoreGet message from the specified reader or buffer.
             * @function decode
             * @memberof api_proto.Response.DRKeyStoreGet
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {api_proto.Response.DRKeyStoreGet} DRKeyStoreGet
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DRKeyStoreGet.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api_proto.Response.DRKeyStoreGet();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
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
             * Decodes a DRKeyStoreGet message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof api_proto.Response.DRKeyStoreGet
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {api_proto.Response.DRKeyStoreGet} DRKeyStoreGet
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
             * @memberof api_proto.Response.DRKeyStoreGet
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            DRKeyStoreGet.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.messageKey != null && message.hasOwnProperty("messageKey"))
                    if (!(message.messageKey && typeof message.messageKey.length === "number" || $util.isString(message.messageKey)))
                        return "messageKey: buffer expected";
                return null;
            };

            /**
             * Creates a DRKeyStoreGet message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof api_proto.Response.DRKeyStoreGet
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {api_proto.Response.DRKeyStoreGet} DRKeyStoreGet
             */
            DRKeyStoreGet.fromObject = function fromObject(object) {
                if (object instanceof $root.api_proto.Response.DRKeyStoreGet)
                    return object;
                var message = new $root.api_proto.Response.DRKeyStoreGet();
                if (object.messageKey != null)
                    if (typeof object.messageKey === "string")
                        $util.base64.decode(object.messageKey, message.messageKey = $util.newBuffer($util.base64.length(object.messageKey)), 0);
                    else if (object.messageKey.length)
                        message.messageKey = object.messageKey;
                return message;
            };

            /**
             * Creates a plain object from a DRKeyStoreGet message. Also converts values to other types if specified.
             * @function toObject
             * @memberof api_proto.Response.DRKeyStoreGet
             * @static
             * @param {api_proto.Response.DRKeyStoreGet} message DRKeyStoreGet
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            DRKeyStoreGet.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    object.messageKey = options.bytes === String ? "" : [];
                if (message.messageKey != null && message.hasOwnProperty("messageKey"))
                    object.messageKey = options.bytes === String ? $util.base64.encode(message.messageKey, 0, message.messageKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.messageKey) : message.messageKey;
                return object;
            };

            /**
             * Converts this DRKeyStoreGet to JSON.
             * @function toJSON
             * @memberof api_proto.Response.DRKeyStoreGet
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            DRKeyStoreGet.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return DRKeyStoreGet;
        })();

        Response.DRKeyStoreCount = (function() {

            /**
             * Properties of a DRKeyStoreCount.
             * @memberof api_proto.Response
             * @interface IDRKeyStoreCount
             * @property {number|Long|null} [count] DRKeyStoreCount count
             */

            /**
             * Constructs a new DRKeyStoreCount.
             * @memberof api_proto.Response
             * @classdesc Represents a DRKeyStoreCount.
             * @implements IDRKeyStoreCount
             * @constructor
             * @param {api_proto.Response.IDRKeyStoreCount=} [properties] Properties to set
             */
            function DRKeyStoreCount(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * DRKeyStoreCount count.
             * @member {number|Long} count
             * @memberof api_proto.Response.DRKeyStoreCount
             * @instance
             */
            DRKeyStoreCount.prototype.count = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

            /**
             * Creates a new DRKeyStoreCount instance using the specified properties.
             * @function create
             * @memberof api_proto.Response.DRKeyStoreCount
             * @static
             * @param {api_proto.Response.IDRKeyStoreCount=} [properties] Properties to set
             * @returns {api_proto.Response.DRKeyStoreCount} DRKeyStoreCount instance
             */
            DRKeyStoreCount.create = function create(properties) {
                return new DRKeyStoreCount(properties);
            };

            /**
             * Encodes the specified DRKeyStoreCount message. Does not implicitly {@link api_proto.Response.DRKeyStoreCount.verify|verify} messages.
             * @function encode
             * @memberof api_proto.Response.DRKeyStoreCount
             * @static
             * @param {api_proto.Response.IDRKeyStoreCount} message DRKeyStoreCount message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DRKeyStoreCount.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.count != null && message.hasOwnProperty("count"))
                    writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.count);
                return writer;
            };

            /**
             * Encodes the specified DRKeyStoreCount message, length delimited. Does not implicitly {@link api_proto.Response.DRKeyStoreCount.verify|verify} messages.
             * @function encodeDelimited
             * @memberof api_proto.Response.DRKeyStoreCount
             * @static
             * @param {api_proto.Response.IDRKeyStoreCount} message DRKeyStoreCount message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DRKeyStoreCount.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a DRKeyStoreCount message from the specified reader or buffer.
             * @function decode
             * @memberof api_proto.Response.DRKeyStoreCount
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {api_proto.Response.DRKeyStoreCount} DRKeyStoreCount
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DRKeyStoreCount.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api_proto.Response.DRKeyStoreCount();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.count = reader.uint64();
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
             * @memberof api_proto.Response.DRKeyStoreCount
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {api_proto.Response.DRKeyStoreCount} DRKeyStoreCount
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
             * @memberof api_proto.Response.DRKeyStoreCount
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            DRKeyStoreCount.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.count != null && message.hasOwnProperty("count"))
                    if (!$util.isInteger(message.count) && !(message.count && $util.isInteger(message.count.low) && $util.isInteger(message.count.high)))
                        return "count: integer|Long expected";
                return null;
            };

            /**
             * Creates a DRKeyStoreCount message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof api_proto.Response.DRKeyStoreCount
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {api_proto.Response.DRKeyStoreCount} DRKeyStoreCount
             */
            DRKeyStoreCount.fromObject = function fromObject(object) {
                if (object instanceof $root.api_proto.Response.DRKeyStoreCount)
                    return object;
                var message = new $root.api_proto.Response.DRKeyStoreCount();
                if (object.count != null)
                    if ($util.Long)
                        (message.count = $util.Long.fromValue(object.count)).unsigned = true;
                    else if (typeof object.count === "string")
                        message.count = parseInt(object.count, 10);
                    else if (typeof object.count === "number")
                        message.count = object.count;
                    else if (typeof object.count === "object")
                        message.count = new $util.LongBits(object.count.low >>> 0, object.count.high >>> 0).toNumber(true);
                return message;
            };

            /**
             * Creates a plain object from a DRKeyStoreCount message. Also converts values to other types if specified.
             * @function toObject
             * @memberof api_proto.Response.DRKeyStoreCount
             * @static
             * @param {api_proto.Response.DRKeyStoreCount} message DRKeyStoreCount
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            DRKeyStoreCount.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, true);
                        object.count = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.count = options.longs === String ? "0" : 0;
                if (message.count != null && message.hasOwnProperty("count"))
                    if (typeof message.count === "number")
                        object.count = options.longs === String ? String(message.count) : message.count;
                    else
                        object.count = options.longs === String ? $util.Long.prototype.toString.call(message.count) : options.longs === Number ? new $util.LongBits(message.count.low >>> 0, message.count.high >>> 0).toNumber(true) : message.count;
                return object;
            };

            /**
             * Converts this DRKeyStoreCount to JSON.
             * @function toJSON
             * @memberof api_proto.Response.DRKeyStoreCount
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            DRKeyStoreCount.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return DRKeyStoreCount;
        })();

        Response.DRKeyStoreAll = (function() {

            /**
             * Properties of a DRKeyStoreAll.
             * @memberof api_proto.Response
             * @interface IDRKeyStoreAll
             * @property {Array.<api_proto.Response.DRKeyStoreAll.IKey>|null} [all] DRKeyStoreAll all
             */

            /**
             * Constructs a new DRKeyStoreAll.
             * @memberof api_proto.Response
             * @classdesc Represents a DRKeyStoreAll.
             * @implements IDRKeyStoreAll
             * @constructor
             * @param {api_proto.Response.IDRKeyStoreAll=} [properties] Properties to set
             */
            function DRKeyStoreAll(properties) {
                this.all = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * DRKeyStoreAll all.
             * @member {Array.<api_proto.Response.DRKeyStoreAll.IKey>} all
             * @memberof api_proto.Response.DRKeyStoreAll
             * @instance
             */
            DRKeyStoreAll.prototype.all = $util.emptyArray;

            /**
             * Creates a new DRKeyStoreAll instance using the specified properties.
             * @function create
             * @memberof api_proto.Response.DRKeyStoreAll
             * @static
             * @param {api_proto.Response.IDRKeyStoreAll=} [properties] Properties to set
             * @returns {api_proto.Response.DRKeyStoreAll} DRKeyStoreAll instance
             */
            DRKeyStoreAll.create = function create(properties) {
                return new DRKeyStoreAll(properties);
            };

            /**
             * Encodes the specified DRKeyStoreAll message. Does not implicitly {@link api_proto.Response.DRKeyStoreAll.verify|verify} messages.
             * @function encode
             * @memberof api_proto.Response.DRKeyStoreAll
             * @static
             * @param {api_proto.Response.IDRKeyStoreAll} message DRKeyStoreAll message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DRKeyStoreAll.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.all != null && message.all.length)
                    for (var i = 0; i < message.all.length; ++i)
                        $root.api_proto.Response.DRKeyStoreAll.Key.encode(message.all[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified DRKeyStoreAll message, length delimited. Does not implicitly {@link api_proto.Response.DRKeyStoreAll.verify|verify} messages.
             * @function encodeDelimited
             * @memberof api_proto.Response.DRKeyStoreAll
             * @static
             * @param {api_proto.Response.IDRKeyStoreAll} message DRKeyStoreAll message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DRKeyStoreAll.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a DRKeyStoreAll message from the specified reader or buffer.
             * @function decode
             * @memberof api_proto.Response.DRKeyStoreAll
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {api_proto.Response.DRKeyStoreAll} DRKeyStoreAll
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DRKeyStoreAll.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api_proto.Response.DRKeyStoreAll();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        if (!(message.all && message.all.length))
                            message.all = [];
                        message.all.push($root.api_proto.Response.DRKeyStoreAll.Key.decode(reader, reader.uint32()));
                        break;
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
             * @memberof api_proto.Response.DRKeyStoreAll
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {api_proto.Response.DRKeyStoreAll} DRKeyStoreAll
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
             * @memberof api_proto.Response.DRKeyStoreAll
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            DRKeyStoreAll.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.all != null && message.hasOwnProperty("all")) {
                    if (!Array.isArray(message.all))
                        return "all: array expected";
                    for (var i = 0; i < message.all.length; ++i) {
                        var error = $root.api_proto.Response.DRKeyStoreAll.Key.verify(message.all[i]);
                        if (error)
                            return "all." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a DRKeyStoreAll message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof api_proto.Response.DRKeyStoreAll
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {api_proto.Response.DRKeyStoreAll} DRKeyStoreAll
             */
            DRKeyStoreAll.fromObject = function fromObject(object) {
                if (object instanceof $root.api_proto.Response.DRKeyStoreAll)
                    return object;
                var message = new $root.api_proto.Response.DRKeyStoreAll();
                if (object.all) {
                    if (!Array.isArray(object.all))
                        throw TypeError(".api_proto.Response.DRKeyStoreAll.all: array expected");
                    message.all = [];
                    for (var i = 0; i < object.all.length; ++i) {
                        if (typeof object.all[i] !== "object")
                            throw TypeError(".api_proto.Response.DRKeyStoreAll.all: object expected");
                        message.all[i] = $root.api_proto.Response.DRKeyStoreAll.Key.fromObject(object.all[i]);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from a DRKeyStoreAll message. Also converts values to other types if specified.
             * @function toObject
             * @memberof api_proto.Response.DRKeyStoreAll
             * @static
             * @param {api_proto.Response.DRKeyStoreAll} message DRKeyStoreAll
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            DRKeyStoreAll.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.all = [];
                if (message.all && message.all.length) {
                    object.all = [];
                    for (var j = 0; j < message.all.length; ++j)
                        object.all[j] = $root.api_proto.Response.DRKeyStoreAll.Key.toObject(message.all[j], options);
                }
                return object;
            };

            /**
             * Converts this DRKeyStoreAll to JSON.
             * @function toJSON
             * @memberof api_proto.Response.DRKeyStoreAll
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            DRKeyStoreAll.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            DRKeyStoreAll.Key = (function() {

                /**
                 * Properties of a Key.
                 * @memberof api_proto.Response.DRKeyStoreAll
                 * @interface IKey
                 * @property {Uint8Array|null} [key] Key key
                 * @property {Object.<string,Uint8Array>|null} [messageKeys] Key messageKeys
                 */

                /**
                 * Constructs a new Key.
                 * @memberof api_proto.Response.DRKeyStoreAll
                 * @classdesc Represents a Key.
                 * @implements IKey
                 * @constructor
                 * @param {api_proto.Response.DRKeyStoreAll.IKey=} [properties] Properties to set
                 */
                function Key(properties) {
                    this.messageKeys = {};
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * Key key.
                 * @member {Uint8Array} key
                 * @memberof api_proto.Response.DRKeyStoreAll.Key
                 * @instance
                 */
                Key.prototype.key = $util.newBuffer([]);

                /**
                 * Key messageKeys.
                 * @member {Object.<string,Uint8Array>} messageKeys
                 * @memberof api_proto.Response.DRKeyStoreAll.Key
                 * @instance
                 */
                Key.prototype.messageKeys = $util.emptyObject;

                /**
                 * Creates a new Key instance using the specified properties.
                 * @function create
                 * @memberof api_proto.Response.DRKeyStoreAll.Key
                 * @static
                 * @param {api_proto.Response.DRKeyStoreAll.IKey=} [properties] Properties to set
                 * @returns {api_proto.Response.DRKeyStoreAll.Key} Key instance
                 */
                Key.create = function create(properties) {
                    return new Key(properties);
                };

                /**
                 * Encodes the specified Key message. Does not implicitly {@link api_proto.Response.DRKeyStoreAll.Key.verify|verify} messages.
                 * @function encode
                 * @memberof api_proto.Response.DRKeyStoreAll.Key
                 * @static
                 * @param {api_proto.Response.DRKeyStoreAll.IKey} message Key message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Key.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.key != null && message.hasOwnProperty("key"))
                        writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.key);
                    if (message.messageKeys != null && message.hasOwnProperty("messageKeys"))
                        for (var keys = Object.keys(message.messageKeys), i = 0; i < keys.length; ++i)
                            writer.uint32(/* id 2, wireType 2 =*/18).fork().uint32(/* id 1, wireType 0 =*/8).uint64(keys[i]).uint32(/* id 2, wireType 2 =*/18).bytes(message.messageKeys[keys[i]]).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified Key message, length delimited. Does not implicitly {@link api_proto.Response.DRKeyStoreAll.Key.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof api_proto.Response.DRKeyStoreAll.Key
                 * @static
                 * @param {api_proto.Response.DRKeyStoreAll.IKey} message Key message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Key.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a Key message from the specified reader or buffer.
                 * @function decode
                 * @memberof api_proto.Response.DRKeyStoreAll.Key
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {api_proto.Response.DRKeyStoreAll.Key} Key
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Key.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api_proto.Response.DRKeyStoreAll.Key(), key;
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.key = reader.bytes();
                            break;
                        case 2:
                            reader.skip().pos++;
                            if (message.messageKeys === $util.emptyObject)
                                message.messageKeys = {};
                            key = reader.uint64();
                            reader.pos++;
                            message.messageKeys[typeof key === "object" ? $util.longToHash(key) : key] = reader.bytes();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a Key message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof api_proto.Response.DRKeyStoreAll.Key
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {api_proto.Response.DRKeyStoreAll.Key} Key
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Key.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a Key message.
                 * @function verify
                 * @memberof api_proto.Response.DRKeyStoreAll.Key
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                Key.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.key != null && message.hasOwnProperty("key"))
                        if (!(message.key && typeof message.key.length === "number" || $util.isString(message.key)))
                            return "key: buffer expected";
                    if (message.messageKeys != null && message.hasOwnProperty("messageKeys")) {
                        if (!$util.isObject(message.messageKeys))
                            return "messageKeys: object expected";
                        var key = Object.keys(message.messageKeys);
                        for (var i = 0; i < key.length; ++i) {
                            if (!$util.key64Re.test(key[i]))
                                return "messageKeys: integer|Long key{k:uint64} expected";
                            if (!(message.messageKeys[key[i]] && typeof message.messageKeys[key[i]].length === "number" || $util.isString(message.messageKeys[key[i]])))
                                return "messageKeys: buffer{k:uint64} expected";
                        }
                    }
                    return null;
                };

                /**
                 * Creates a Key message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof api_proto.Response.DRKeyStoreAll.Key
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {api_proto.Response.DRKeyStoreAll.Key} Key
                 */
                Key.fromObject = function fromObject(object) {
                    if (object instanceof $root.api_proto.Response.DRKeyStoreAll.Key)
                        return object;
                    var message = new $root.api_proto.Response.DRKeyStoreAll.Key();
                    if (object.key != null)
                        if (typeof object.key === "string")
                            $util.base64.decode(object.key, message.key = $util.newBuffer($util.base64.length(object.key)), 0);
                        else if (object.key.length)
                            message.key = object.key;
                    if (object.messageKeys) {
                        if (typeof object.messageKeys !== "object")
                            throw TypeError(".api_proto.Response.DRKeyStoreAll.Key.messageKeys: object expected");
                        message.messageKeys = {};
                        for (var keys = Object.keys(object.messageKeys), i = 0; i < keys.length; ++i)
                            if (typeof object.messageKeys[keys[i]] === "string")
                                $util.base64.decode(object.messageKeys[keys[i]], message.messageKeys[keys[i]] = $util.newBuffer($util.base64.length(object.messageKeys[keys[i]])), 0);
                            else if (object.messageKeys[keys[i]].length)
                                message.messageKeys[keys[i]] = object.messageKeys[keys[i]];
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a Key message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof api_proto.Response.DRKeyStoreAll.Key
                 * @static
                 * @param {api_proto.Response.DRKeyStoreAll.Key} message Key
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                Key.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.objects || options.defaults)
                        object.messageKeys = {};
                    if (options.defaults)
                        object.key = options.bytes === String ? "" : [];
                    if (message.key != null && message.hasOwnProperty("key"))
                        object.key = options.bytes === String ? $util.base64.encode(message.key, 0, message.key.length) : options.bytes === Array ? Array.prototype.slice.call(message.key) : message.key;
                    var keys2;
                    if (message.messageKeys && (keys2 = Object.keys(message.messageKeys)).length) {
                        object.messageKeys = {};
                        for (var j = 0; j < keys2.length; ++j)
                            object.messageKeys[keys2[j]] = options.bytes === String ? $util.base64.encode(message.messageKeys[keys2[j]], 0, message.messageKeys[keys2[j]].length) : options.bytes === Array ? Array.prototype.slice.call(message.messageKeys[keys2[j]]) : message.messageKeys[keys2[j]];
                    }
                    return object;
                };

                /**
                 * Converts this Key to JSON.
                 * @function toJSON
                 * @memberof api_proto.Response.DRKeyStoreAll.Key
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                Key.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return Key;
            })();

            return DRKeyStoreAll;
        })();

        Response.SendEthereumTransaction = (function() {

            /**
             * Properties of a SendEthereumTransaction.
             * @memberof api_proto.Response
             * @interface ISendEthereumTransaction
             * @property {number|null} [nonce] SendEthereumTransaction nonce
             * @property {string|null} [gasPrice] SendEthereumTransaction gasPrice
             * @property {string|null} [gasLimit] SendEthereumTransaction gasLimit
             * @property {string|null} [to] SendEthereumTransaction to
             * @property {string|null} [value] SendEthereumTransaction value
             * @property {string|null} [data] SendEthereumTransaction data
             * @property {string|null} [v] SendEthereumTransaction v
             * @property {string|null} [r] SendEthereumTransaction r
             * @property {string|null} [s] SendEthereumTransaction s
             * @property {number|null} [chainID] SendEthereumTransaction chainID
             * @property {string|null} [from] SendEthereumTransaction from
             * @property {string|null} [hash] SendEthereumTransaction hash
             */

            /**
             * Constructs a new SendEthereumTransaction.
             * @memberof api_proto.Response
             * @classdesc Represents a SendEthereumTransaction.
             * @implements ISendEthereumTransaction
             * @constructor
             * @param {api_proto.Response.ISendEthereumTransaction=} [properties] Properties to set
             */
            function SendEthereumTransaction(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * SendEthereumTransaction nonce.
             * @member {number} nonce
             * @memberof api_proto.Response.SendEthereumTransaction
             * @instance
             */
            SendEthereumTransaction.prototype.nonce = 0;

            /**
             * SendEthereumTransaction gasPrice.
             * @member {string} gasPrice
             * @memberof api_proto.Response.SendEthereumTransaction
             * @instance
             */
            SendEthereumTransaction.prototype.gasPrice = "";

            /**
             * SendEthereumTransaction gasLimit.
             * @member {string} gasLimit
             * @memberof api_proto.Response.SendEthereumTransaction
             * @instance
             */
            SendEthereumTransaction.prototype.gasLimit = "";

            /**
             * SendEthereumTransaction to.
             * @member {string} to
             * @memberof api_proto.Response.SendEthereumTransaction
             * @instance
             */
            SendEthereumTransaction.prototype.to = "";

            /**
             * SendEthereumTransaction value.
             * @member {string} value
             * @memberof api_proto.Response.SendEthereumTransaction
             * @instance
             */
            SendEthereumTransaction.prototype.value = "";

            /**
             * SendEthereumTransaction data.
             * @member {string} data
             * @memberof api_proto.Response.SendEthereumTransaction
             * @instance
             */
            SendEthereumTransaction.prototype.data = "";

            /**
             * SendEthereumTransaction v.
             * @member {string} v
             * @memberof api_proto.Response.SendEthereumTransaction
             * @instance
             */
            SendEthereumTransaction.prototype.v = "";

            /**
             * SendEthereumTransaction r.
             * @member {string} r
             * @memberof api_proto.Response.SendEthereumTransaction
             * @instance
             */
            SendEthereumTransaction.prototype.r = "";

            /**
             * SendEthereumTransaction s.
             * @member {string} s
             * @memberof api_proto.Response.SendEthereumTransaction
             * @instance
             */
            SendEthereumTransaction.prototype.s = "";

            /**
             * SendEthereumTransaction chainID.
             * @member {number} chainID
             * @memberof api_proto.Response.SendEthereumTransaction
             * @instance
             */
            SendEthereumTransaction.prototype.chainID = 0;

            /**
             * SendEthereumTransaction from.
             * @member {string} from
             * @memberof api_proto.Response.SendEthereumTransaction
             * @instance
             */
            SendEthereumTransaction.prototype.from = "";

            /**
             * SendEthereumTransaction hash.
             * @member {string} hash
             * @memberof api_proto.Response.SendEthereumTransaction
             * @instance
             */
            SendEthereumTransaction.prototype.hash = "";

            /**
             * Creates a new SendEthereumTransaction instance using the specified properties.
             * @function create
             * @memberof api_proto.Response.SendEthereumTransaction
             * @static
             * @param {api_proto.Response.ISendEthereumTransaction=} [properties] Properties to set
             * @returns {api_proto.Response.SendEthereumTransaction} SendEthereumTransaction instance
             */
            SendEthereumTransaction.create = function create(properties) {
                return new SendEthereumTransaction(properties);
            };

            /**
             * Encodes the specified SendEthereumTransaction message. Does not implicitly {@link api_proto.Response.SendEthereumTransaction.verify|verify} messages.
             * @function encode
             * @memberof api_proto.Response.SendEthereumTransaction
             * @static
             * @param {api_proto.Response.ISendEthereumTransaction} message SendEthereumTransaction message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SendEthereumTransaction.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.nonce != null && message.hasOwnProperty("nonce"))
                    writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.nonce);
                if (message.gasPrice != null && message.hasOwnProperty("gasPrice"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.gasPrice);
                if (message.gasLimit != null && message.hasOwnProperty("gasLimit"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.gasLimit);
                if (message.to != null && message.hasOwnProperty("to"))
                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.to);
                if (message.value != null && message.hasOwnProperty("value"))
                    writer.uint32(/* id 5, wireType 2 =*/42).string(message.value);
                if (message.data != null && message.hasOwnProperty("data"))
                    writer.uint32(/* id 6, wireType 2 =*/50).string(message.data);
                if (message.v != null && message.hasOwnProperty("v"))
                    writer.uint32(/* id 7, wireType 2 =*/58).string(message.v);
                if (message.r != null && message.hasOwnProperty("r"))
                    writer.uint32(/* id 8, wireType 2 =*/66).string(message.r);
                if (message.s != null && message.hasOwnProperty("s"))
                    writer.uint32(/* id 9, wireType 2 =*/74).string(message.s);
                if (message.chainID != null && message.hasOwnProperty("chainID"))
                    writer.uint32(/* id 10, wireType 0 =*/80).uint32(message.chainID);
                if (message.from != null && message.hasOwnProperty("from"))
                    writer.uint32(/* id 11, wireType 2 =*/90).string(message.from);
                if (message.hash != null && message.hasOwnProperty("hash"))
                    writer.uint32(/* id 12, wireType 2 =*/98).string(message.hash);
                return writer;
            };

            /**
             * Encodes the specified SendEthereumTransaction message, length delimited. Does not implicitly {@link api_proto.Response.SendEthereumTransaction.verify|verify} messages.
             * @function encodeDelimited
             * @memberof api_proto.Response.SendEthereumTransaction
             * @static
             * @param {api_proto.Response.ISendEthereumTransaction} message SendEthereumTransaction message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SendEthereumTransaction.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a SendEthereumTransaction message from the specified reader or buffer.
             * @function decode
             * @memberof api_proto.Response.SendEthereumTransaction
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {api_proto.Response.SendEthereumTransaction} SendEthereumTransaction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SendEthereumTransaction.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api_proto.Response.SendEthereumTransaction();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.nonce = reader.uint32();
                        break;
                    case 2:
                        message.gasPrice = reader.string();
                        break;
                    case 3:
                        message.gasLimit = reader.string();
                        break;
                    case 4:
                        message.to = reader.string();
                        break;
                    case 5:
                        message.value = reader.string();
                        break;
                    case 6:
                        message.data = reader.string();
                        break;
                    case 7:
                        message.v = reader.string();
                        break;
                    case 8:
                        message.r = reader.string();
                        break;
                    case 9:
                        message.s = reader.string();
                        break;
                    case 10:
                        message.chainID = reader.uint32();
                        break;
                    case 11:
                        message.from = reader.string();
                        break;
                    case 12:
                        message.hash = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a SendEthereumTransaction message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof api_proto.Response.SendEthereumTransaction
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {api_proto.Response.SendEthereumTransaction} SendEthereumTransaction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SendEthereumTransaction.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a SendEthereumTransaction message.
             * @function verify
             * @memberof api_proto.Response.SendEthereumTransaction
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            SendEthereumTransaction.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.nonce != null && message.hasOwnProperty("nonce"))
                    if (!$util.isInteger(message.nonce))
                        return "nonce: integer expected";
                if (message.gasPrice != null && message.hasOwnProperty("gasPrice"))
                    if (!$util.isString(message.gasPrice))
                        return "gasPrice: string expected";
                if (message.gasLimit != null && message.hasOwnProperty("gasLimit"))
                    if (!$util.isString(message.gasLimit))
                        return "gasLimit: string expected";
                if (message.to != null && message.hasOwnProperty("to"))
                    if (!$util.isString(message.to))
                        return "to: string expected";
                if (message.value != null && message.hasOwnProperty("value"))
                    if (!$util.isString(message.value))
                        return "value: string expected";
                if (message.data != null && message.hasOwnProperty("data"))
                    if (!$util.isString(message.data))
                        return "data: string expected";
                if (message.v != null && message.hasOwnProperty("v"))
                    if (!$util.isString(message.v))
                        return "v: string expected";
                if (message.r != null && message.hasOwnProperty("r"))
                    if (!$util.isString(message.r))
                        return "r: string expected";
                if (message.s != null && message.hasOwnProperty("s"))
                    if (!$util.isString(message.s))
                        return "s: string expected";
                if (message.chainID != null && message.hasOwnProperty("chainID"))
                    if (!$util.isInteger(message.chainID))
                        return "chainID: integer expected";
                if (message.from != null && message.hasOwnProperty("from"))
                    if (!$util.isString(message.from))
                        return "from: string expected";
                if (message.hash != null && message.hasOwnProperty("hash"))
                    if (!$util.isString(message.hash))
                        return "hash: string expected";
                return null;
            };

            /**
             * Creates a SendEthereumTransaction message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof api_proto.Response.SendEthereumTransaction
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {api_proto.Response.SendEthereumTransaction} SendEthereumTransaction
             */
            SendEthereumTransaction.fromObject = function fromObject(object) {
                if (object instanceof $root.api_proto.Response.SendEthereumTransaction)
                    return object;
                var message = new $root.api_proto.Response.SendEthereumTransaction();
                if (object.nonce != null)
                    message.nonce = object.nonce >>> 0;
                if (object.gasPrice != null)
                    message.gasPrice = String(object.gasPrice);
                if (object.gasLimit != null)
                    message.gasLimit = String(object.gasLimit);
                if (object.to != null)
                    message.to = String(object.to);
                if (object.value != null)
                    message.value = String(object.value);
                if (object.data != null)
                    message.data = String(object.data);
                if (object.v != null)
                    message.v = String(object.v);
                if (object.r != null)
                    message.r = String(object.r);
                if (object.s != null)
                    message.s = String(object.s);
                if (object.chainID != null)
                    message.chainID = object.chainID >>> 0;
                if (object.from != null)
                    message.from = String(object.from);
                if (object.hash != null)
                    message.hash = String(object.hash);
                return message;
            };

            /**
             * Creates a plain object from a SendEthereumTransaction message. Also converts values to other types if specified.
             * @function toObject
             * @memberof api_proto.Response.SendEthereumTransaction
             * @static
             * @param {api_proto.Response.SendEthereumTransaction} message SendEthereumTransaction
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            SendEthereumTransaction.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.nonce = 0;
                    object.gasPrice = "";
                    object.gasLimit = "";
                    object.to = "";
                    object.value = "";
                    object.data = "";
                    object.v = "";
                    object.r = "";
                    object.s = "";
                    object.chainID = 0;
                    object.from = "";
                    object.hash = "";
                }
                if (message.nonce != null && message.hasOwnProperty("nonce"))
                    object.nonce = message.nonce;
                if (message.gasPrice != null && message.hasOwnProperty("gasPrice"))
                    object.gasPrice = message.gasPrice;
                if (message.gasLimit != null && message.hasOwnProperty("gasLimit"))
                    object.gasLimit = message.gasLimit;
                if (message.to != null && message.hasOwnProperty("to"))
                    object.to = message.to;
                if (message.value != null && message.hasOwnProperty("value"))
                    object.value = message.value;
                if (message.data != null && message.hasOwnProperty("data"))
                    object.data = message.data;
                if (message.v != null && message.hasOwnProperty("v"))
                    object.v = message.v;
                if (message.r != null && message.hasOwnProperty("r"))
                    object.r = message.r;
                if (message.s != null && message.hasOwnProperty("s"))
                    object.s = message.s;
                if (message.chainID != null && message.hasOwnProperty("chainID"))
                    object.chainID = message.chainID;
                if (message.from != null && message.hasOwnProperty("from"))
                    object.from = message.from;
                if (message.hash != null && message.hasOwnProperty("hash"))
                    object.hash = message.hash;
                return object;
            };

            /**
             * Converts this SendEthereumTransaction to JSON.
             * @function toJSON
             * @memberof api_proto.Response.SendEthereumTransaction
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            SendEthereumTransaction.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return SendEthereumTransaction;
        })();

        return Response;
    })();

    return api_proto;
})();

module.exports = $root;
