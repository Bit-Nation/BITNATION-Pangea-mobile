package co.bitnation;

import android.os.Bundle;
import android.support.annotation.Nullable;

import com.reactnativenavigation.controllers.SplashActivity;

import io.realm.DynamicRealm;
import io.realm.RealmConfiguration;

public class MainActivity extends SplashActivity {

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Realm Java for POC
        RealmConfiguration config = new RealmConfiguration.Builder()
                .name("pangea")
                .schemaVersion(3)
                .build();
        DynamicRealm realm = DynamicRealm.getInstance(config);
    }
}

