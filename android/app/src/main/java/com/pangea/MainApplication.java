package com.pangea;

import com.bitgo.randombytes.RandomBytesPackage;
import com.facebook.react.ReactPackage;

import java.util.Arrays;
import java.util.List;

import com.reactnativenavigation.NavigationApplication;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.reactlibrary.RNEthDaemonPackage;

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
                new RNEthDaemonPackage(),
                new RealmReactPackage(),
                new RNSensitiveInfoPackage(),
                new RandomBytesPackage()
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
