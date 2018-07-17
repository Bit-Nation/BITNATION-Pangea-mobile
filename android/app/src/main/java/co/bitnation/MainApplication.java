package co.bitnation;

import com.bitgo.randombytes.RandomBytesPackage;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.reactlibrary.RNThreadPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.reactnativenavigation.NavigationApplication;

import org.reactnative.camera.RNCameraPackage;

import java.util.Arrays;
import java.util.List;

import br.com.classapp.RNSensitiveInfo.RNSensitiveInfoPackage;
import io.realm.react.RealmReactPackage;
public class MainApplication extends NavigationApplication implements ReactApplication {

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this){

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
                    new PickerPackage(),
                    new RNCameraPackage(),
                    new PanthalassaPackage(),
                    new RealmReactPackage(),
                    new RNSensitiveInfoPackage(),
                    new RandomBytesPackage(),
                    new ReactNativeConfigPackage(),
                    new RNThreadPackage(mReactNativeHost)
            );
        }

        @Override
        protected String getJSMainModuleName() {
            return "index";
        }
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

    };
    @Override
    public boolean isDebug() {
        // Make sure you are using BuildConfig from your own application
        return BuildConfig.DEBUG;
    }

    protected List<ReactPackage> getPackages() {
        return Arrays.<ReactPackage>asList(
                new PickerPackage(),
                new RNCameraPackage(),
                new PanthalassaPackage(),
                new RealmReactPackage(),
                new RNSensitiveInfoPackage(),
                new RandomBytesPackage(),
                new ReactNativeConfigPackage(),
                new RNThreadPackage(mReactNativeHost)
        );
    }

    @Override
    public List<ReactPackage> createAdditionalReactPackages() {
        return getPackages();
    }

    @Override
    public String getJSMainModuleName() {
        return "index";
    }
}
