package co.bitnation;

import com.bitgo.randombytes.RandomBytesPackage;
import com.facebook.react.ReactPackage;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.reactnativenavigation.NavigationApplication;
import com.lwansbrough.RCTCamera.*;
import java.util.Arrays;
import java.util.List;

import br.com.classapp.RNSensitiveInfo.RNSensitiveInfoPackage;
import io.realm.react.RealmReactPackage;

public class MainApplication extends NavigationApplication {

    @Override
    public boolean isDebug() {
        // Make sure you are using BuildConfig from your own application
        return BuildConfig.DEBUG;
    }

    protected List<ReactPackage> getPackages() {
        return Arrays.<ReactPackage>asList(
                new PickerPackage(),
                new RCTCameraPackage(),
                new PanthalassaPackage(),
                new RealmReactPackage(),
                new RNSensitiveInfoPackage(),
                new RandomBytesPackage(),
                new ReactNativeConfigPackage()
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
