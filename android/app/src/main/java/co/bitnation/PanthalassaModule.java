package co.bitnation;

import android.app.Activity;
import android.support.annotation.Nullable;
import android.util.Log;

import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

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
    public void PanthalassaNewAccountKeys(final ReadableMap jsonParams, final Promise promise) throws JSONException {
        new Thread(new Runnable() {
            public void run() {
                try {
                    String newAccount = Panthalassa.newAccountKeys(jsonParams.getString("pw"),
                                                                jsonParams.getString("pwConfirm"));
                    promise.resolve(newAccount);
                } catch (Exception e) {
                    e.printStackTrace();
                    promise.reject("error", e.getLocalizedMessage());
                }            }
        }).start();
    }


    @ReactMethod
    public void PanthalassaStart(final ReadableMap jsonParams, final Promise promise) throws JSONException {
        new Thread(new Runnable() {
            public void run() {
                try {
                    Panthalassa.start(jsonParams.getString("config"),
                            jsonParams.getString("password"),
                            PanthalassaModule.this);
                    promise.resolve(true);
                } catch (Exception e) {
                    e.printStackTrace();
                    promise.reject("error", e.getLocalizedMessage());
                }
            }
        }).start();
    }

    @ReactMethod
    public void PanthalassaStartFromMnemonic(final ReadableMap jsonParams, final Promise promise) throws JSONException {
        new Thread(new Runnable() {
            public void run() {
                try {
                    Panthalassa.startFromMnemonic(jsonParams.getString("config"),
                            jsonParams.getString("mnemonic"),
                            PanthalassaModule.this);
                    promise.resolve(true);
                } catch (Exception e) {
                    e.printStackTrace();
                    promise.reject("error", e.getLocalizedMessage());
                }
            }
        }).start();
    }

    @ReactMethod
    public void PanthalassaEthPrivateKey(final Promise promise) {
        new Thread(new Runnable() {
            public void run() {
                try {
                    String response = Panthalassa.ethPrivateKey();
                    promise.resolve(response);
                } catch (Exception e) {
                    e.printStackTrace();
                    promise.reject("error", e.getLocalizedMessage());
                }
            }
        }).start();
    }

    @ReactMethod
    public void PanthalassaEthAddress(final Promise promise) {
        new Thread(new Runnable() {
            public void run() {
                try {
                    String response = Panthalassa.ethAddress();
                    promise.resolve(response);
                } catch (Exception e) {
                    e.printStackTrace();
                    promise.reject("error", e.getLocalizedMessage());
                }
            }
        }).start();
    }

    @ReactMethod
    public void PanthalassaHandleInitialMessage(final ReadableMap jsonParams, final Promise promise) throws JSONException {
        new Thread(new Runnable() {
            public void run() {
                try {
                    String response = Panthalassa.handleInitialMessage(jsonParams.getString("message"),
                            jsonParams.getString("preKeyBundlePrivatePart"));
                    promise.resolve(response);
                } catch (Exception e) {
                    e.printStackTrace();
                    promise.reject("error", e.getLocalizedMessage());
                }
            }
        }).start();
    }

    @ReactMethod
    public void PanthalassaExportAccountStore(final ReadableMap jsonParams, final Promise promise) throws JSONException {
        new Thread(new Runnable() {
            public void run() {
                try {
                    String response = Panthalassa.exportAccountStore(jsonParams.getString("pw"),
                            jsonParams.getString("pwConfirm"));
                    promise.resolve(response);
                } catch (Exception e) {
                    e.printStackTrace();
                    promise.reject("error", e.getLocalizedMessage());
                }
            }
        }).start();
    }

    @ReactMethod
    public void PanthalassaNewAccountKeysFromMnemonic(final ReadableMap jsonParams, final Promise promise) throws JSONException {
        new Thread(new Runnable() {
            public void run() {
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
        }).start();
    }

    @ReactMethod
    public void PanthalassaStop(final Promise promise) {
        new Thread(new Runnable() {
            public void run() {
                try {
                    Panthalassa.stop();
                    promise.resolve(true);
                } catch (Exception e) {
                    e.printStackTrace();
                    promise.reject("error", e.getLocalizedMessage());
                }
            }
        }).start();
    }

    @ReactMethod
    public void PanthalassaIsValidMnemonic(final String mnemonic, final Promise promise) {
        new Thread(new Runnable() {
            public void run() {
                try {
                    Panthalassa.isValidMnemonic(mnemonic);
                    promise.resolve(true);
                } catch (Exception e) {
                    e.printStackTrace();
                    promise.reject("error", e.getLocalizedMessage());
                }
            }
        }).start();
    }

    @ReactMethod
    public void PanthalassaGetMnemonic(final Promise promise) {
        new Thread(new Runnable() {
            public void run() {
                try {
                    String response = Panthalassa.getMnemonic();
                    promise.resolve(response);
                } catch (Exception e) {
                    e.printStackTrace();
                    promise.reject("error", e.getLocalizedMessage());
                }
            }
        }).start();
    }

    @ReactMethod
    public void PanthalassaCreateHumanMessage(final ReadableMap jsonParams, final Promise promise) throws JSONException {
        new Thread(new Runnable() {
            public void run() {
                try {
                    String response = Panthalassa.createHumanMessage(jsonParams.getString("rawMsg"),
                            jsonParams.getString("secretID"),
                            jsonParams.getString("secret"),
                            jsonParams.getString("receiverIdKey"));
                    promise.resolve(response);
                } catch (Exception e) {
                    e.printStackTrace();
                    promise.reject("error", e.getLocalizedMessage());
                }
            }
        }).start();
    }

    @ReactMethod
    public void PanthalassaCreateDAppMessage(final ReadableMap jsonParams, final Promise promise) throws JSONException {
        new Thread(new Runnable() {
            public void run() {
                try {
                    String response = Panthalassa.createDAppMessage(jsonParams.getString("rawMsg"),
                            jsonParams.getString("secretID"),
                            jsonParams.getString("secret"),
                            jsonParams.getString("receiverIdKey"));
                    promise.resolve(response);
                } catch (Exception e) {
                    e.printStackTrace();
                    promise.reject("error", e.getLocalizedMessage());
                }
            }
        }).start();
    }

    @ReactMethod
    public void PanthalassaDecryptMessage(final ReadableMap jsonParams, final Promise promise) throws JSONException {
        new Thread(new Runnable() {
            public void run() {
                try {
                    String response = Panthalassa.decryptMessage(jsonParams.getString("message"),
                            jsonParams.getString("secret"));
                    promise.resolve(response);
                } catch (Exception e) {
                    e.printStackTrace();
                    promise.reject("error", e.getLocalizedMessage());
                }
            }
        }).start();
    }

    @ReactMethod
    public void PanthalassaGetIdentityPublicKey(final Promise promise) throws JSONException {
        new Thread(new Runnable() {
            public void run() {
                try {
                    String response = Panthalassa.getIdentityPublicKey();
                    promise.resolve(response);
                } catch (Exception e) {
                    e.printStackTrace();
                    promise.reject("error", e.getLocalizedMessage());
                }
            }
        }).start();
    }

    @ReactMethod
    public void PanthalassaIdentityPublicKey(final Promise promise) throws JSONException {
        new Thread(new Runnable() {
            public void run() {
                try {
                    String response = Panthalassa.identityPublicKey();
                    promise.resolve(response);
                } catch (Exception e) {
                    e.printStackTrace();
                    promise.reject("error", e.getLocalizedMessage());
                }
            }
        }).start();
    }

    @ReactMethod
    public void PanthalassaInitializeChat(final ReadableMap jsonParams, final Promise promise) throws JSONException {
        new Thread(new Runnable() {
            public void run() {
                try {
                    String response = Panthalassa.initializeChat(jsonParams.getString("identityPublicKey"),
                            jsonParams.getString("preKeyBundle"));
                    promise.resolve(response);
                } catch (Exception e) {
                    e.printStackTrace();
                    promise.reject("error", e.getLocalizedMessage());
                }
            }
        }).start();
    }

    @ReactMethod
    public void PanthalassaNewPreKeyBundle(final Promise promise) throws JSONException {
        new Thread(new Runnable() {
            public void run() {
                try {
                    String response = Panthalassa.newPreKeyBundle();
                    promise.resolve(response);
                } catch (Exception e) {
                    e.printStackTrace();
                    promise.reject("error", e.getLocalizedMessage());
                }
            }
        }).start();
    }

    @ReactMethod
    public void PanthalassaSendResponse(final ReadableMap jsonParams, final Promise promise) throws JSONException {
        new Thread(new Runnable() {
            public void run() {
                try {
                    Panthalassa.sendResponse(jsonParams.getString("id"),
                            jsonParams.getString("data"),
                            jsonParams.getString("responseError"),
                            jsonParams.getInt("timeout"));
                    promise.resolve(true);
                } catch (Exception e) {
                    e.printStackTrace();
                    promise.reject("error", e.getLocalizedMessage());
                }
            }
        }).start();
    }

    @ReactMethod
    public void PanthalassaSignProfile(final ReadableMap jsonParams, final Promise promise) throws JSONException {
        new Thread(new Runnable() {
            public void run() {
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
        }).start();
    }

    @ReactMethod
    public void PanthalassaSignProfileStandAlone(final ReadableMap jsonParams, final Promise promise) throws JSONException {
        new Thread(new Runnable() {
            public void run() {
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
        }).start();
    }

    @ReactMethod
    public void PanthalassaConnectToDAppDevHost(final ReadableMap jsonParams, final Promise promise) throws JSONException {
        new Thread(new Runnable() {
            public void run() {
                try {
                    Panthalassa.connectToDAppDevHost(jsonParams.getString("address"));
                    promise.resolve(true);
                } catch (Exception e) {
                    e.printStackTrace();
                    promise.reject("error", e.getLocalizedMessage());
                }
            }
        }).start();
    }

    @ReactMethod
    public void PanthalassaOpenDApp(final ReadableMap jsonParams, final Promise promise) throws JSONException {
        new Thread(new Runnable() {
            public void run() {
                try {
                    Panthalassa.openDApp(jsonParams.getString("id"),
                            jsonParams.getString("context"));
                    promise.resolve(true);
                } catch (Exception e) {
                    e.printStackTrace();
                    promise.reject("error", e.getLocalizedMessage());
                }
            }
        }).start();
    }

    @ReactMethod
    public void PanthalassaRenderMessage(final ReadableMap jsonParams, final Promise promise) throws JSONException {
        new Thread(new Runnable() {
            public void run() {
                try {
                    String response = Panthalassa.renderMessage(jsonParams.getString("id"),
                            jsonParams.getString("msg"),
                            jsonParams.getString("context"));
                    promise.resolve(response);
                } catch (Exception e) {
                    e.printStackTrace();
                    promise.reject("error", e.getLocalizedMessage());
                }
            }
        }).start();
    }

    @ReactMethod
    public void PanthalassaStartDApp(final ReadableMap jsonParams, final Promise promise) throws JSONException {
        new Thread(new Runnable() {
            public void run() {
                try {
                    Panthalassa.startDApp(jsonParams.getString("dApp"),
                            jsonParams.getInt("timeout"));
                    promise.resolve(true);
                } catch (Exception e) {
                    e.printStackTrace();
                    promise.reject("error", e.getLocalizedMessage());
                }
            }
        }).start();
    }

    @ReactMethod
    public void PanthalassaCallDAppFunction(final ReadableMap jsonParams, final Promise promise) throws JSONException {
        new Thread(new Runnable() {
            public void run() {
                try {
                    long id;
                    Panthalassa.callDAppFunction(jsonParams.getString("dAppId"),
                            jsonParams.getInt("id"),
                            jsonParams.getString("args"));
                    promise.resolve(true);
                } catch (Exception e) {
                    e.printStackTrace();
                    promise.reject("error", e.getLocalizedMessage());
                }
            }
        }).start();
    }

    //=====
    @Override
    public void send(String s) {
        Log.v("Upstream","Received from callback");

        WritableMap params = Arguments.createMap();
        params.putString("upstream", s);
        Activity activity = getCurrentActivity();
        if (activity != null) {
            MainApplication application = (MainApplication) activity.getApplication();
            ReactNativeHost reactNativeHost = application.getReactNativeHost();
            ReactInstanceManager reactInstanceManager = reactNativeHost.getReactInstanceManager();
            ReactContext reactContext = reactInstanceManager.getCurrentReactContext();

            if (reactContext != null) {
                sendEvent(reactContext, "PanthalassaUpStream", params);
            }
        }
    }

    private void sendEvent(ReactContext reactContext,
                           String eventName,
                           @Nullable WritableMap params) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }
}
