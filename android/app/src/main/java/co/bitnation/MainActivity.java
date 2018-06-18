package co.bitnation;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.util.Log;

import com.reactnativenavigation.controllers.SplashActivity;

import io.realm.DynamicRealm;
import io.realm.DynamicRealmObject;
import io.realm.RealmConfiguration;
import io.realm.RealmResults;

public class MainActivity extends SplashActivity {

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Realm Java for POC

        // Config to access to Pangea
        RealmConfiguration config = new RealmConfiguration.Builder()
                .name("pangea")
                .schemaVersion(3)
                .build();
        DynamicRealm realm = DynamicRealm.getInstance(config);

        // POC of reading the DB from Native
        RealmResults<DynamicRealmObject> results = realm.where("Account")
                .findAll();
        Log.v("REALM - Num. Accounts:", Integer.toString(results.size()));
        Log.v("REALM - Name Account:", results.first().getString("name"));

        // POC of writing on DB from Native
        realm.beginTransaction();
        DynamicRealmObject person = realm.createObject("Account", results.first().getString("id")+"ff");
        person.set("name", results.first().getString("name")+" Native");
        person.set("location", results.first().getString("location"));
        person.set("description_", results.first().getString("description_"));
        person.set("profileImage", results.first().getString("profileImage"));
        person.set("accountStore", results.first().getString("accountStore"));
        person.set("confirmedMnemonic", results.first().getBoolean("confirmedMnemonic"));
        person.set("networkType", results.first().getString("networkType"));
        person.set("DHT", results.first().getList("DHT"));
        realm.commitTransaction();
    }
}

