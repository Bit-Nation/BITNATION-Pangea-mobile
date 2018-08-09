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
         * @property {api_proto.Request.IRenderModal|null} [showModal] Request showModal
         * @property {api_proto.Request.ISendEthereumTransaction|null} [sendEthereumTransaction] Request sendEthereumTransaction
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
         * Request showModal.
         * @member {api_proto.Request.IRenderModal|null|undefined} showModal
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
            if (message.showModal != null && message.hasOwnProperty("showModal"))
                $root.api_proto.Request.RenderModal.encode(message.showModal, writer.uint32(/* id 8, wireType 2 =*/66).fork()).ldelim();
            if (message.sendEthereumTransaction != null && message.hasOwnProperty("sendEthereumTransaction"))
                $root.api_proto.Request.SendEthereumTransaction.encode(message.sendEthereumTransaction, writer.uint32(/* id 9, wireType 2 =*/74).fork()).ldelim();
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
                case 8:
                    message.showModal = $root.api_proto.Request.RenderModal.decode(reader, reader.uint32());
                    break;
                case 9:
                    message.sendEthereumTransaction = $root.api_proto.Request.SendEthereumTransaction.decode(reader, reader.uint32());
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
            if (message.showModal != null && message.hasOwnProperty("showModal")) {
                var error = $root.api_proto.Request.RenderModal.verify(message.showModal);
                if (error)
                    return "showModal." + error;
            }
            if (message.sendEthereumTransaction != null && message.hasOwnProperty("sendEthereumTransaction")) {
                var error = $root.api_proto.Request.SendEthereumTransaction.verify(message.sendEthereumTransaction);
                if (error)
                    return "sendEthereumTransaction." + error;
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
            if (object.showModal != null) {
                if (typeof object.showModal !== "object")
                    throw TypeError(".api_proto.Request.showModal: object expected");
                message.showModal = $root.api_proto.Request.RenderModal.fromObject(object.showModal);
            }
            if (object.sendEthereumTransaction != null) {
                if (typeof object.sendEthereumTransaction !== "object")
                    throw TypeError(".api_proto.Request.sendEthereumTransaction: object expected");
                message.sendEthereumTransaction = $root.api_proto.Request.SendEthereumTransaction.fromObject(object.sendEthereumTransaction);
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
                object.showModal = null;
                object.sendEthereumTransaction = null;
            }
            if (message.requestID != null && message.hasOwnProperty("requestID"))
                object.requestID = message.requestID;
            if (message.showModal != null && message.hasOwnProperty("showModal"))
                object.showModal = $root.api_proto.Request.RenderModal.toObject(message.showModal, options);
            if (message.sendEthereumTransaction != null && message.hasOwnProperty("sendEthereumTransaction"))
                object.sendEthereumTransaction = $root.api_proto.Request.SendEthereumTransaction.toObject(message.sendEthereumTransaction, options);
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

        Request.RenderModal = (function() {

            /**
             * Properties of a RenderModal.
             * @memberof api_proto.Request
             * @interface IRenderModal
             * @property {Uint8Array|null} [dAppPublicKey] RenderModal dAppPublicKey
             * @property {string|null} [uiID] RenderModal uiID
             * @property {string|null} [layout] RenderModal layout
             */

            /**
             * Constructs a new RenderModal.
             * @memberof api_proto.Request
             * @classdesc Represents a RenderModal.
             * @implements IRenderModal
             * @constructor
             * @param {api_proto.Request.IRenderModal=} [properties] Properties to set
             */
            function RenderModal(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * RenderModal dAppPublicKey.
             * @member {Uint8Array} dAppPublicKey
             * @memberof api_proto.Request.RenderModal
             * @instance
             */
            RenderModal.prototype.dAppPublicKey = $util.newBuffer([]);

            /**
             * RenderModal uiID.
             * @member {string} uiID
             * @memberof api_proto.Request.RenderModal
             * @instance
             */
            RenderModal.prototype.uiID = "";

            /**
             * RenderModal layout.
             * @member {string} layout
             * @memberof api_proto.Request.RenderModal
             * @instance
             */
            RenderModal.prototype.layout = "";

            /**
             * Creates a new RenderModal instance using the specified properties.
             * @function create
             * @memberof api_proto.Request.RenderModal
             * @static
             * @param {api_proto.Request.IRenderModal=} [properties] Properties to set
             * @returns {api_proto.Request.RenderModal} RenderModal instance
             */
            RenderModal.create = function create(properties) {
                return new RenderModal(properties);
            };

            /**
             * Encodes the specified RenderModal message. Does not implicitly {@link api_proto.Request.RenderModal.verify|verify} messages.
             * @function encode
             * @memberof api_proto.Request.RenderModal
             * @static
             * @param {api_proto.Request.IRenderModal} message RenderModal message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            RenderModal.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.dAppPublicKey != null && message.hasOwnProperty("dAppPublicKey"))
                    writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.dAppPublicKey);
                if (message.uiID != null && message.hasOwnProperty("uiID"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.uiID);
                if (message.layout != null && message.hasOwnProperty("layout"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.layout);
                return writer;
            };

            /**
             * Encodes the specified RenderModal message, length delimited. Does not implicitly {@link api_proto.Request.RenderModal.verify|verify} messages.
             * @function encodeDelimited
             * @memberof api_proto.Request.RenderModal
             * @static
             * @param {api_proto.Request.IRenderModal} message RenderModal message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            RenderModal.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a RenderModal message from the specified reader or buffer.
             * @function decode
             * @memberof api_proto.Request.RenderModal
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {api_proto.Request.RenderModal} RenderModal
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            RenderModal.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api_proto.Request.RenderModal();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.dAppPublicKey = reader.bytes();
                        break;
                    case 2:
                        message.uiID = reader.string();
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
             * Decodes a RenderModal message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof api_proto.Request.RenderModal
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {api_proto.Request.RenderModal} RenderModal
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            RenderModal.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a RenderModal message.
             * @function verify
             * @memberof api_proto.Request.RenderModal
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            RenderModal.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.dAppPublicKey != null && message.hasOwnProperty("dAppPublicKey"))
                    if (!(message.dAppPublicKey && typeof message.dAppPublicKey.length === "number" || $util.isString(message.dAppPublicKey)))
                        return "dAppPublicKey: buffer expected";
                if (message.uiID != null && message.hasOwnProperty("uiID"))
                    if (!$util.isString(message.uiID))
                        return "uiID: string expected";
                if (message.layout != null && message.hasOwnProperty("layout"))
                    if (!$util.isString(message.layout))
                        return "layout: string expected";
                return null;
            };

            /**
             * Creates a RenderModal message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof api_proto.Request.RenderModal
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {api_proto.Request.RenderModal} RenderModal
             */
            RenderModal.fromObject = function fromObject(object) {
                if (object instanceof $root.api_proto.Request.RenderModal)
                    return object;
                var message = new $root.api_proto.Request.RenderModal();
                if (object.dAppPublicKey != null)
                    if (typeof object.dAppPublicKey === "string")
                        $util.base64.decode(object.dAppPublicKey, message.dAppPublicKey = $util.newBuffer($util.base64.length(object.dAppPublicKey)), 0);
                    else if (object.dAppPublicKey.length)
                        message.dAppPublicKey = object.dAppPublicKey;
                if (object.uiID != null)
                    message.uiID = String(object.uiID);
                if (object.layout != null)
                    message.layout = String(object.layout);
                return message;
            };

            /**
             * Creates a plain object from a RenderModal message. Also converts values to other types if specified.
             * @function toObject
             * @memberof api_proto.Request.RenderModal
             * @static
             * @param {api_proto.Request.RenderModal} message RenderModal
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            RenderModal.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    if (options.bytes === String)
                        object.dAppPublicKey = "";
                    else {
                        object.dAppPublicKey = [];
                        if (options.bytes !== Array)
                            object.dAppPublicKey = $util.newBuffer(object.dAppPublicKey);
                    }
                    object.uiID = "";
                    object.layout = "";
                }
                if (message.dAppPublicKey != null && message.hasOwnProperty("dAppPublicKey"))
                    object.dAppPublicKey = options.bytes === String ? $util.base64.encode(message.dAppPublicKey, 0, message.dAppPublicKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.dAppPublicKey) : message.dAppPublicKey;
                if (message.uiID != null && message.hasOwnProperty("uiID"))
                    object.uiID = message.uiID;
                if (message.layout != null && message.hasOwnProperty("layout"))
                    object.layout = message.layout;
                return object;
            };

            /**
             * Converts this RenderModal to JSON.
             * @function toJSON
             * @memberof api_proto.Request.RenderModal
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            RenderModal.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return RenderModal;
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

        return Request;
    })();

    api_proto.Response = (function() {

        /**
         * Properties of a Response.
         * @memberof api_proto
         * @interface IResponse
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
            if (options.defaults)
                object.sendEthereumTransaction = null;
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
