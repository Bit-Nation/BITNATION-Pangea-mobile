package co.bitnation;

import com.bitgo.randombytes.RandomBytesPackage;
import com.facebook.react.ReactPackage;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import org.reactnative.camera.RNCameraPackage;
import com.robertsheao.RNZenDeskSupport.RNZenDeskSupport;
import java.util.Arrays;
import java.util.List;

import br.com.classapp.RNSensitiveInfo.RNSensitiveInfoPackage;
import io.realm.react.RealmReactPackage;

import com.reactnativenavigation.NavigationApplication;
import com.reactnativenavigation.react.NavigationReactNativeHost;
import com.reactnativenavigation.react.ReactGateway;

public class MainApplication extends NavigationApplication {

    protected ReactGateway createReactGateway() {
        NavigationReactNativeHost host = new NavigationReactNativeHost(this, isDebug(), createAdditionalReactPackages()) {
            protected String getJSMainModuleName() {
                return "index";
            }
        };
        return new ReactGateway(this, isDebug(), host);
    }

    public boolean isDebug() {
        // Make sure you are using BuildConfig from your own application
        return BuildConfig.DEBUG;
    }

    protected List<ReactPackage> getPackages() {
        return Arrays.<ReactPackage>asList(
                new PickerPackage(),
                new RNCameraPackage(),
                new PanthalassaPackage(),
                new RNZenDeskSupport(),
                new RealmReactPackage(),
                new RNSensitiveInfoPackage(),
                new RandomBytesPackage(),
                new ReactNativeConfigPackage()
        );
    }

    public List<ReactPackage> createAdditionalReactPackages() {
        return getPackages();
    }

}
