/* eslint-disable */
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
         * @property {api_proto.Request.ISendEthereumTransaction|null} [sendEthereumTransaction] Request sendEthereumTransaction
         * @property {api_proto.Request.ISaveDApp|null} [saveDApp] Request saveDApp
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
         * Request sendEthereumTransaction.
         * @member {api_proto.Request.ISendEthereumTransaction|null|undefined} sendEthereumTransaction
         * @memberof api_proto.Request
         * @instance
         */
        Request.prototype.sendEthereumTransaction = null;

        /**
         * Request saveDApp.
         * @member {api_proto.Request.ISaveDApp|null|undefined} saveDApp
         * @memberof api_proto.Request
         * @instance
         */
        Request.prototype.saveDApp = null;

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
            if (message.sendEthereumTransaction != null && message.hasOwnProperty("sendEthereumTransaction"))
                $root.api_proto.Request.SendEthereumTransaction.encode(message.sendEthereumTransaction, writer.uint32(/* id 9, wireType 2 =*/74).fork()).ldelim();
            if (message.saveDApp != null && message.hasOwnProperty("saveDApp"))
                $root.api_proto.Request.SaveDApp.encode(message.saveDApp, writer.uint32(/* id 10, wireType 2 =*/82).fork()).ldelim();
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
                case 9:
                    message.sendEthereumTransaction = $root.api_proto.Request.SendEthereumTransaction.decode(reader, reader.uint32());
                    break;
                case 10:
                    message.saveDApp = $root.api_proto.Request.SaveDApp.decode(reader, reader.uint32());
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
            if (message.sendEthereumTransaction != null && message.hasOwnProperty("sendEthereumTransaction")) {
                var error = $root.api_proto.Request.SendEthereumTransaction.verify(message.sendEthereumTransaction);
                if (error)
                    return "sendEthereumTransaction." + error;
            }
            if (message.saveDApp != null && message.hasOwnProperty("saveDApp")) {
                var error = $root.api_proto.Request.SaveDApp.verify(message.saveDApp);
                if (error)
                    return "saveDApp." + error;
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
            if (object.sendEthereumTransaction != null) {
                if (typeof object.sendEthereumTransaction !== "object")
                    throw TypeError(".api_proto.Request.sendEthereumTransaction: object expected");
                message.sendEthereumTransaction = $root.api_proto.Request.SendEthereumTransaction.fromObject(object.sendEthereumTransaction);
            }
            if (object.saveDApp != null) {
                if (typeof object.saveDApp !== "object")
                    throw TypeError(".api_proto.Request.saveDApp: object expected");
                message.saveDApp = $root.api_proto.Request.SaveDApp.fromObject(object.saveDApp);
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
                object.sendEthereumTransaction = null;
                object.saveDApp = null;
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
            if (message.sendEthereumTransaction != null && message.hasOwnProperty("sendEthereumTransaction"))
                object.sendEthereumTransaction = $root.api_proto.Request.SendEthereumTransaction.toObject(message.sendEthereumTransaction, options);
            if (message.saveDApp != null && message.hasOwnProperty("saveDApp"))
                object.saveDApp = $root.api_proto.Request.SaveDApp.toObject(message.saveDApp, options);
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
             * @property {Uint8Array|null} [dAppPublicKey] ShowModal dAppPublicKey
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
             * ShowModal dAppPublicKey.
             * @member {Uint8Array} dAppPublicKey
             * @memberof api_proto.Request.ShowModal
             * @instance
             */
            ShowModal.prototype.dAppPublicKey = $util.newBuffer([]);

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
                if (message.dAppPublicKey != null && message.hasOwnProperty("dAppPublicKey"))
                    writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.dAppPublicKey);
                if (message.title != null && message.hasOwnProperty("title"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.title);
                if (message.layout != null && message.hasOwnProperty("layout"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.layout);
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
                        message.dAppPublicKey = reader.bytes();
                        break;
                    case 2:
                        message.title = reader.string();
                        break;
                    case 3:
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
                if (message.dAppPublicKey != null && message.hasOwnProperty("dAppPublicKey"))
                    if (!(message.dAppPublicKey && typeof message.dAppPublicKey.length === "number" || $util.isString(message.dAppPublicKey)))
                        return "dAppPublicKey: buffer expected";
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
                if (object.dAppPublicKey != null)
                    if (typeof object.dAppPublicKey === "string")
                        $util.base64.decode(object.dAppPublicKey, message.dAppPublicKey = $util.newBuffer($util.base64.length(object.dAppPublicKey)), 0);
                    else if (object.dAppPublicKey.length)
                        message.dAppPublicKey = object.dAppPublicKey;
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
                    object.dAppPublicKey = options.bytes === String ? "" : [];
                    object.title = "";
                    object.layout = "";
                }
                if (message.dAppPublicKey != null && message.hasOwnProperty("dAppPublicKey"))
                    object.dAppPublicKey = options.bytes === String ? $util.base64.encode(message.dAppPublicKey, 0, message.dAppPublicKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.dAppPublicKey) : message.dAppPublicKey;
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

        Request.SendEthereumTransaction = (function() {

            /**
             * Properties of a SendEthereumTransaction.
             * @memberof api_proto.Request
             * @interface ISendEthereumTransaction
             * @property {string|null} [value] SendEthereumTransaction value
             * @property {string|null} [to] SendEthereumTransaction to
             * @property {string|null} [data] SendEthereumTransaction data
             */

            /**
             * Constructs a new SendEthereumTransaction.
             * @memberof api_proto.Request
             * @classdesc Represents a SendEthereumTransaction.
             * @implements ISendEthereumTransaction
             * @constructor
             * @param {api_proto.Request.ISendEthereumTransaction=} [properties] Properties to set
             */
            function SendEthereumTransaction(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * SendEthereumTransaction value.
             * @member {string} value
             * @memberof api_proto.Request.SendEthereumTransaction
             * @instance
             */
            SendEthereumTransaction.prototype.value = "";

            /**
             * SendEthereumTransaction to.
             * @member {string} to
             * @memberof api_proto.Request.SendEthereumTransaction
             * @instance
             */
            SendEthereumTransaction.prototype.to = "";

            /**
             * SendEthereumTransaction data.
             * @member {string} data
             * @memberof api_proto.Request.SendEthereumTransaction
             * @instance
             */
            SendEthereumTransaction.prototype.data = "";

            /**
             * Creates a new SendEthereumTransaction instance using the specified properties.
             * @function create
             * @memberof api_proto.Request.SendEthereumTransaction
             * @static
             * @param {api_proto.Request.ISendEthereumTransaction=} [properties] Properties to set
             * @returns {api_proto.Request.SendEthereumTransaction} SendEthereumTransaction instance
             */
            SendEthereumTransaction.create = function create(properties) {
                return new SendEthereumTransaction(properties);
            };

            /**
             * Encodes the specified SendEthereumTransaction message. Does not implicitly {@link api_proto.Request.SendEthereumTransaction.verify|verify} messages.
             * @function encode
             * @memberof api_proto.Request.SendEthereumTransaction
             * @static
             * @param {api_proto.Request.ISendEthereumTransaction} message SendEthereumTransaction message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SendEthereumTransaction.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.value != null && message.hasOwnProperty("value"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.value);
                if (message.to != null && message.hasOwnProperty("to"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.to);
                if (message.data != null && message.hasOwnProperty("data"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.data);
                return writer;
            };

            /**
             * Encodes the specified SendEthereumTransaction message, length delimited. Does not implicitly {@link api_proto.Request.SendEthereumTransaction.verify|verify} messages.
             * @function encodeDelimited
             * @memberof api_proto.Request.SendEthereumTransaction
             * @static
             * @param {api_proto.Request.ISendEthereumTransaction} message SendEthereumTransaction message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SendEthereumTransaction.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a SendEthereumTransaction message from the specified reader or buffer.
             * @function decode
             * @memberof api_proto.Request.SendEthereumTransaction
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {api_proto.Request.SendEthereumTransaction} SendEthereumTransaction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SendEthereumTransaction.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api_proto.Request.SendEthereumTransaction();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.value = reader.string();
                        break;
                    case 2:
                        message.to = reader.string();
                        break;
                    case 3:
                        message.data = reader.string();
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
             * @memberof api_proto.Request.SendEthereumTransaction
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {api_proto.Request.SendEthereumTransaction} SendEthereumTransaction
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
             * @memberof api_proto.Request.SendEthereumTransaction
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            SendEthereumTransaction.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.value != null && message.hasOwnProperty("value"))
                    if (!$util.isString(message.value))
                        return "value: string expected";
                if (message.to != null && message.hasOwnProperty("to"))
                    if (!$util.isString(message.to))
                        return "to: string expected";
                if (message.data != null && message.hasOwnProperty("data"))
                    if (!$util.isString(message.data))
                        return "data: string expected";
                return null;
            };

            /**
             * Creates a SendEthereumTransaction message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof api_proto.Request.SendEthereumTransaction
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {api_proto.Request.SendEthereumTransaction} SendEthereumTransaction
             */
            SendEthereumTransaction.fromObject = function fromObject(object) {
                if (object instanceof $root.api_proto.Request.SendEthereumTransaction)
                    return object;
                var message = new $root.api_proto.Request.SendEthereumTransaction();
                if (object.value != null)
                    message.value = String(object.value);
                if (object.to != null)
                    message.to = String(object.to);
                if (object.data != null)
                    message.data = String(object.data);
                return message;
            };

            /**
             * Creates a plain object from a SendEthereumTransaction message. Also converts values to other types if specified.
             * @function toObject
             * @memberof api_proto.Request.SendEthereumTransaction
             * @static
             * @param {api_proto.Request.SendEthereumTransaction} message SendEthereumTransaction
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            SendEthereumTransaction.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.value = "";
                    object.to = "";
                    object.data = "";
                }
                if (message.value != null && message.hasOwnProperty("value"))
                    object.value = message.value;
                if (message.to != null && message.hasOwnProperty("to"))
                    object.to = message.to;
                if (message.data != null && message.hasOwnProperty("data"))
                    object.data = message.data;
                return object;
            };

            /**
             * Converts this SendEthereumTransaction to JSON.
             * @function toJSON
             * @memberof api_proto.Request.SendEthereumTransaction
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            SendEthereumTransaction.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return SendEthereumTransaction;
        })();

        Request.SaveDApp = (function() {

            /**
             * Properties of a SaveDApp.
             * @memberof api_proto.Request
             * @interface ISaveDApp
             * @property {string|null} [appName] SaveDApp appName
             * @property {string|null} [code] SaveDApp code
             * @property {string|null} [signature] SaveDApp signature
             * @property {string|null} [signingPublicKey] SaveDApp signingPublicKey
             */

            /**
             * Constructs a new SaveDApp.
             * @memberof api_proto.Request
             * @classdesc Represents a SaveDApp.
             * @implements ISaveDApp
             * @constructor
             * @param {api_proto.Request.ISaveDApp=} [properties] Properties to set
             */
            function SaveDApp(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * SaveDApp appName.
             * @member {string} appName
             * @memberof api_proto.Request.SaveDApp
             * @instance
             */
            SaveDApp.prototype.appName = "";

            /**
             * SaveDApp code.
             * @member {string} code
             * @memberof api_proto.Request.SaveDApp
             * @instance
             */
            SaveDApp.prototype.code = "";

            /**
             * SaveDApp signature.
             * @member {string} signature
             * @memberof api_proto.Request.SaveDApp
             * @instance
             */
            SaveDApp.prototype.signature = "";

            /**
             * SaveDApp signingPublicKey.
             * @member {string} signingPublicKey
             * @memberof api_proto.Request.SaveDApp
             * @instance
             */
            SaveDApp.prototype.signingPublicKey = "";

            /**
             * Creates a new SaveDApp instance using the specified properties.
             * @function create
             * @memberof api_proto.Request.SaveDApp
             * @static
             * @param {api_proto.Request.ISaveDApp=} [properties] Properties to set
             * @returns {api_proto.Request.SaveDApp} SaveDApp instance
             */
            SaveDApp.create = function create(properties) {
                return new SaveDApp(properties);
            };

            /**
             * Encodes the specified SaveDApp message. Does not implicitly {@link api_proto.Request.SaveDApp.verify|verify} messages.
             * @function encode
             * @memberof api_proto.Request.SaveDApp
             * @static
             * @param {api_proto.Request.ISaveDApp} message SaveDApp message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SaveDApp.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.appName != null && message.hasOwnProperty("appName"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.appName);
                if (message.code != null && message.hasOwnProperty("code"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.code);
                if (message.signature != null && message.hasOwnProperty("signature"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.signature);
                if (message.signingPublicKey != null && message.hasOwnProperty("signingPublicKey"))
                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.signingPublicKey);
                return writer;
            };

            /**
             * Encodes the specified SaveDApp message, length delimited. Does not implicitly {@link api_proto.Request.SaveDApp.verify|verify} messages.
             * @function encodeDelimited
             * @memberof api_proto.Request.SaveDApp
             * @static
             * @param {api_proto.Request.ISaveDApp} message SaveDApp message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SaveDApp.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a SaveDApp message from the specified reader or buffer.
             * @function decode
             * @memberof api_proto.Request.SaveDApp
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {api_proto.Request.SaveDApp} SaveDApp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SaveDApp.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api_proto.Request.SaveDApp();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.appName = reader.string();
                        break;
                    case 2:
                        message.code = reader.string();
                        break;
                    case 3:
                        message.signature = reader.string();
                        break;
                    case 4:
                        message.signingPublicKey = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a SaveDApp message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof api_proto.Request.SaveDApp
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {api_proto.Request.SaveDApp} SaveDApp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SaveDApp.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a SaveDApp message.
             * @function verify
             * @memberof api_proto.Request.SaveDApp
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            SaveDApp.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.appName != null && message.hasOwnProperty("appName"))
                    if (!$util.isString(message.appName))
                        return "appName: string expected";
                if (message.code != null && message.hasOwnProperty("code"))
                    if (!$util.isString(message.code))
                        return "code: string expected";
                if (message.signature != null && message.hasOwnProperty("signature"))
                    if (!$util.isString(message.signature))
                        return "signature: string expected";
                if (message.signingPublicKey != null && message.hasOwnProperty("signingPublicKey"))
                    if (!$util.isString(message.signingPublicKey))
                        return "signingPublicKey: string expected";
                return null;
            };

            /**
             * Creates a SaveDApp message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof api_proto.Request.SaveDApp
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {api_proto.Request.SaveDApp} SaveDApp
             */
            SaveDApp.fromObject = function fromObject(object) {
                if (object instanceof $root.api_proto.Request.SaveDApp)
                    return object;
                var message = new $root.api_proto.Request.SaveDApp();
                if (object.appName != null)
                    message.appName = String(object.appName);
                if (object.code != null)
                    message.code = String(object.code);
                if (object.signature != null)
                    message.signature = String(object.signature);
                if (object.signingPublicKey != null)
                    message.signingPublicKey = String(object.signingPublicKey);
                return message;
            };

            /**
             * Creates a plain object from a SaveDApp message. Also converts values to other types if specified.
             * @function toObject
             * @memberof api_proto.Request.SaveDApp
             * @static
             * @param {api_proto.Request.SaveDApp} message SaveDApp
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            SaveDApp.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.appName = "";
                    object.code = "";
                    object.signature = "";
                    object.signingPublicKey = "";
                }
                if (message.appName != null && message.hasOwnProperty("appName"))
                    object.appName = message.appName;
                if (message.code != null && message.hasOwnProperty("code"))
                    object.code = message.code;
                if (message.signature != null && message.hasOwnProperty("signature"))
                    object.signature = message.signature;
                if (message.signingPublicKey != null && message.hasOwnProperty("signingPublicKey"))
                    object.signingPublicKey = message.signingPublicKey;
                return object;
            };

            /**
             * Converts this SaveDApp to JSON.
             * @function toJSON
             * @memberof api_proto.Request.SaveDApp
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            SaveDApp.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return SaveDApp;
        })();

        return Request;
    })();

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
