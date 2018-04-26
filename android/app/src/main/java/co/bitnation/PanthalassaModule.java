package co.bitnation;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;

import org.json.JSONException;

import panthalassa.Panthalassa;
import panthalassa.Panthalassa_;

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
    public String PanthalassaNewAccountKeys(ReadableMap jsonParams) throws JSONException {
        try {
            String newAccount = Panthalassa.newAccountKeys(jsonParams.getString("pw"), jsonParams.getString("pwConfirm"));
            return newAccount;
        } catch (Exception e) {
            e.printStackTrace();
            return e.getLocalizedMessage();
        }
    }

    @ReactMethod
    public Panthalassa_ PanthalassaNewPanthalassa(ReadableMap jsonParams) throws JSONException {
        try {
            Panthalassa_ instance = Panthalassa.newPanthalassa(jsonParams.getString("keyStore"), jsonParams.getString("pw"));
            return instance;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @ReactMethod
    public String PanthalassaScryptDecrypt(ReadableMap jsonParams) throws JSONException {
        try {
            String response = Panthalassa.scryptDecrypt(jsonParams.getString("data"), jsonParams.getString("pw"));
            return response;
        } catch (Exception e) {
            e.printStackTrace();
            return e.getLocalizedMessage();
        }
    }

    @ReactMethod
    public String PanthalassaScryptEncrypt(ReadableMap jsonParams) throws JSONException {
        try {
            String response = Panthalassa.scryptEncrypt(jsonParams.getString("data"), jsonParams.getString("pw"), jsonParams.getString("pwConfirm"));
            return response;
        } catch (Exception e) {
            e.printStackTrace();
            return e.getLocalizedMessage();
        }
    }

    @ReactMethod
    public boolean PanthalassaIsValidCID(String cid) {
        boolean response = false;
        try {
            response = Panthalassa.isValidCID(cid);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return response;
    }

    @ReactMethod
    public String PanthalassaCIDSha256(String value) {
        try {
            String response = Panthalassa.cidSha256(value);
            return response;
        } catch (Exception e) {
            e.printStackTrace();
            return e.getLocalizedMessage();
        }
    }

    @ReactMethod
    public String PanthalassaCIDSha512(String value) {
        try {
            String response = Panthalassa.cidSha512(value);
            return response;
        } catch (Exception e) {
            e.printStackTrace();
            return e.getLocalizedMessage();
        }
    }
}
