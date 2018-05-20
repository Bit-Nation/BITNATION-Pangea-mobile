package co.bitnation;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;

import org.json.JSONException;

import panthalassa.Panthalassa;

/**
 * Created by Estarrona on 19/04/18.
 */

public class PanthalassaModule extends ReactContextBaseJavaModule {
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
            String newAccount = Panthalassa.newAccountKeys(jsonParams.getString("pw"), jsonParams.getString("pwConfirm"));
            promise.resolve(newAccount);
        } catch (Exception e) {
            e.printStackTrace();
            promise.reject("error", e.getLocalizedMessage());
        }
    }

    @ReactMethod
    public void PanthalassaStart(ReadableMap jsonParams, Promise promise) throws JSONException {
        try {
            Panthalassa.start(jsonParams.getString("accountStore"), jsonParams.getString("password"));
            promise.resolve(true);
        } catch (Exception e) {
            e.printStackTrace();
            promise.reject("error", e.getLocalizedMessage());
        }
    }

    @ReactMethod
    public void PanthalassaStartFromMnemonic(ReadableMap jsonParams, Promise promise) throws JSONException {
        try {
            Panthalassa.startFromMnemonic(jsonParams.getString("accountStore"), jsonParams.getString("mnemonic"));
            promise.resolve(true);
        } catch (Exception e) {
            e.printStackTrace();
            promise.reject("error", e.getLocalizedMessage());
        }
    }

    @ReactMethod
    public void PanthalassaScryptDecrypt(ReadableMap jsonParams, Promise promise) throws JSONException {
        try {
            String response = Panthalassa.scryptDecrypt(jsonParams.getString("data"), jsonParams.getString("pw"));
            promise.resolve(response);
        } catch (Exception e) {
            e.printStackTrace();
            promise.reject("error", e.getLocalizedMessage());
        }
    }

    @ReactMethod
    public void PanthalassaScryptEncrypt(ReadableMap jsonParams, Promise promise) throws JSONException {
        try {
            String response = Panthalassa.scryptEncrypt(jsonParams.getString("data"), jsonParams.getString("pw"), jsonParams.getString("pwConfirm"));
            promise.resolve(response);
        } catch (Exception e) {
            e.printStackTrace();
            promise.reject("error", e.getLocalizedMessage());
        }
    }

    @ReactMethod
    public void PanthalassaIsValidCID(String cid, Promise promise) {
        boolean response = false;
        try {
            response = Panthalassa.isValidCID(cid);
            promise.resolve(response);
        } catch (Exception e) {
            e.printStackTrace();
            promise.reject("error", e.getLocalizedMessage());
        }
    }

    @ReactMethod
    public void PanthalassaCIDSha256(String value, Promise promise) {
        try {
            String response = Panthalassa.cidSha256(value);
            promise.resolve(response);
        } catch (Exception e) {
            e.printStackTrace();
            promise.reject("error", e.getLocalizedMessage());
        }
    }

    @ReactMethod
    public void PanthalassaCIDSha512(String value, Promise promise) {
        try {
            String response = Panthalassa.cidSha512(value);
            promise.resolve(response);
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
            String response = Panthalassa.exportAccountStore(jsonParams.getString("pw"), jsonParams.getString("pwConfirm"));
            promise.resolve(response);
        } catch (Exception e) {
            e.printStackTrace();
            promise.reject("error", e.getLocalizedMessage());
        }
    }

    @ReactMethod
    public void PanthalassaNewAccountKeysFromMnemonic(ReadableMap jsonParams, Promise promise) throws JSONException {
        try {
            String response = Panthalassa.newAccountKeysFromMnemonic(jsonParams.getString("mne"), jsonParams.getString("pw"), jsonParams.getString("pwConfirm"));
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
    public void PanthalassaSendResponse(String resp, Promise promise) {
        try {
            Panthalassa.sendResponse(resp);
            promise.resolve(true);
        } catch (Exception e) {
            e.printStackTrace();
            promise.reject("error", e.getLocalizedMessage());
        }
    }
}
