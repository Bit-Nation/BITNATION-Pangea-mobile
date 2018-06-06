package co.bitnation;

import android.util.Log;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;

import org.json.JSONException;

import panthalassa.Panthalassa;
import panthalassa.UpStream;

/**
 * Created by Estarrona on 19/04/18.
 */

public class PanthalassaModule extends ReactContextBaseJavaModule implements UpStream {
    final String TAG = "Panthalassa";

    public PanthalassaModule (ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "Panthalassa";
    }

    @ReactMethod
    public void PanthalassaNewAccountKeys(ReadableMap jsonParams, Promise promise) throws JSONException {
        try {
            String newAccount = Panthalassa.newAccountKeys(jsonParams.getString("pw"),
                                                            jsonParams.getString("pwConfirm"));
            promise.resolve(newAccount);
        } catch (Exception e) {
            e.printStackTrace();
            promise.reject("error", e.getLocalizedMessage());
        }
    }

    @ReactMethod
    public void PanthalassaStart(ReadableMap jsonParams, Promise promise) throws JSONException {
        try {
            UpStream upstream = new UpStream() {
                @Override
                public void send(String s) {
                    Log.v("Upstream","This is a test!");
                }
            };
            Panthalassa.start(jsonParams.getString("config"),
                                jsonParams.getString("password"),
                                upstream);
            promise.resolve(true);
        } catch (Exception e) {
            e.printStackTrace();
            promise.reject("error", e.getLocalizedMessage());
        }
    }

    @ReactMethod
    public void PanthalassaStartFromMnemonic(ReadableMap jsonParams, Promise promise) throws JSONException {
        try {
            UpStream upstream = new UpStream() {
                @Override
                public void send(String s) {
                    Log.v("Upstream","This is a test!");
                }
            };

            Panthalassa.startFromMnemonic(jsonParams.getString("config"),
                                            jsonParams.getString("mnemonic"),
                                            upstream);
            promise.resolve(true);
        } catch (Exception e) {
            e.printStackTrace();
            promise.reject("error", e.getLocalizedMessage());
        }
    }

    @ReactMethod
    public void PanthalassaEthPrivateKey(Promise promise) {
        try {
            String response = Panthalassa.ethPrivateKey();
            promise.resolve(response);
        } catch (Exception e) {
            e.printStackTrace();
            promise.reject("error", e.getLocalizedMessage());
        }
    }

    @ReactMethod
    public void PanthalassaExportAccountStore(ReadableMap jsonParams, Promise promise) throws JSONException {
        try {
            String response = Panthalassa.exportAccountStore(jsonParams.getString("pw"),
                                                                jsonParams.getString("pwConfirm"));
            promise.resolve(response);
        } catch (Exception e) {
            e.printStackTrace();
            promise.reject("error", e.getLocalizedMessage());
        }
    }

    @ReactMethod
    public void PanthalassaNewAccountKeysFromMnemonic(ReadableMap jsonParams, Promise promise) throws JSONException {
        try {
            String response = Panthalassa.newAccountKeysFromMnemonic(jsonParams.getString("mne"),
                                                                        jsonParams.getString("pw"),
                                                                        jsonParams.getString("pwConfirm"));
            promise.resolve(response);
        } catch (Exception e) {
            e.printStackTrace();
            promise.reject("error", e.getLocalizedMessage());
        }
    }

    @ReactMethod
    public void PanthalassaStop(Promise promise) {
        try {
            Panthalassa.stop();
            promise.resolve(true);
        } catch (Exception e) {
            e.printStackTrace();
            promise.reject("error", e.getLocalizedMessage());
        }
    }

    @ReactMethod
    public void PanthalassaIsValidMnemonic(String mnemonic, Promise promise) {
        try {
            Panthalassa.isValidMnemonic(mnemonic);
            promise.resolve(true);
        } catch (Exception e) {
            e.printStackTrace();
            promise.reject("error", e.getLocalizedMessage());
        }
    }

    @ReactMethod
    public void PanthalassaGetMnemonic(Promise promise) {
        try {
            String response = Panthalassa.getMnemonic();
            promise.resolve(response);
        } catch (Exception e) {
            e.printStackTrace();
            promise.reject("error", e.getLocalizedMessage());
        }
    }

    @ReactMethod
    public void PanthalassaCreateHumanMessage(ReadableMap jsonParams, Promise promise) throws JSONException {
        try {
            String response = Panthalassa.createHumanMessage(jsonParams.getString("rawMsg"),
                                                                jsonParams.getString("rawProfile"),
                                                                jsonParams.getString("secret"));
            promise.resolve(response);
        } catch (Exception e) {
            e.printStackTrace();
            promise.reject("error", e.getLocalizedMessage());
        }
    }

    @ReactMethod
    public void PanthalassaDecryptMessage(ReadableMap jsonParams, Promise promise) throws JSONException {
        try {
            String response = Panthalassa.decryptMessage(jsonParams.getString("encryptedMessage"),
                    jsonParams.getString("rawProfile"),
                    jsonParams.getString("secret"));
            promise.resolve(response);
        } catch (Exception e) {
            e.printStackTrace();
            promise.reject("error", e.getLocalizedMessage());
        }
    }

    @ReactMethod
    public void PanthalassaGetIdentityPublicKey(ReadableMap jsonParams, Promise promise) throws JSONException {
        try {
            String response = Panthalassa.getIdentityPublicKey();
            promise.resolve(response);
        } catch (Exception e) {
            e.printStackTrace();
            promise.reject("error", e.getLocalizedMessage());
        }
    }

    @ReactMethod
    public void PanthalassaIdentityPublicKey(ReadableMap jsonParams, Promise promise) throws JSONException {
        try {
            String response = Panthalassa.identityPublicKey();
            promise.resolve(response);
        } catch (Exception e) {
            e.printStackTrace();
            promise.reject("error", e.getLocalizedMessage());
        }
    }

    @ReactMethod
    public void PanthalassaInitializeChat(ReadableMap jsonParams, Promise promise) throws JSONException {
        try {
            String response = Panthalassa.initializeChat(jsonParams.getString("identityPublicKey"),
                                                        jsonParams.getString("preKeyBundle"));
            promise.resolve(response);
        } catch (Exception e) {
            e.printStackTrace();
            promise.reject("error", e.getLocalizedMessage());
        }
    }

    @ReactMethod
    public void PanthalassaNewPreKeyBundle(ReadableMap jsonParams, Promise promise) throws JSONException {
        try {
            String response = Panthalassa.newPreKeyBundle();
            promise.resolve(response);
        } catch (Exception e) {
            e.printStackTrace();
            promise.reject("error", e.getLocalizedMessage());
        }
    }

    @ReactMethod
    public void PanthalassaSendResponse(ReadableMap jsonParams, Promise promise) throws JSONException {
        try {
            Panthalassa.sendResponse(jsonParams.getString("id_"),
                                    jsonParams.getString("data"));
            promise.resolve(true);
        } catch (Exception e) {
            e.printStackTrace();
            promise.reject("error", e.getLocalizedMessage());
        }
    }

    @ReactMethod
    public void PanthalassaSignProfile(ReadableMap jsonParams, Promise promise) throws JSONException {
        try {
            String response = Panthalassa.signProfile(jsonParams.getString("name"),
                                                        jsonParams.getString("location"),
                                                        jsonParams.getString("image"));
            promise.resolve(response);
        } catch (Exception e) {
            e.printStackTrace();
            promise.reject("error", e.getLocalizedMessage());
        }
    }

    @ReactMethod
    public void PanthalassaSignProfileStandAlone(ReadableMap jsonParams, Promise promise) throws JSONException {
        try {
            String response = Panthalassa.signProfileStandAlone(jsonParams.getString("name"),
                                                                jsonParams.getString("location"),
                                                                jsonParams.getString("image"),
                                                                jsonParams.getString("keyManagerStore"),
                                                                jsonParams.getString("password"));
            promise.resolve(response);
        } catch (Exception e) {
            e.printStackTrace();
            promise.reject("error", e.getLocalizedMessage());
        }
    }

    //=====
    @Override
    public void send(String s) {
        Log.v("Upstream","Received from callback");
    }
}
