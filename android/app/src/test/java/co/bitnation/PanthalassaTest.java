package co.bitnation;

import org.junit.Test;

import panthalassa.Panthalassa;
import panthalassa.Panthalassa_;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.core.IsNull.notNullValue;
import static org.junit.Assert.assertThat;

public class PanthalassaTest {
    static {
        System.loadLibrary("panthalassa");
    }

    @Test
    public void PanthalassaNewPanthalassa() {

        Panthalassa_ instance = null;

        try {
            instance = Panthalassa.newPanthalassa("testingString", "password");
        } catch (Exception e) {
            e.printStackTrace();
        }

        assertThat(instance, is(notNullValue()));
    }

    @Test
    public void PanthalassaNewAccountKeys() {

        String newAccount = null;

        try {
            newAccount = Panthalassa.newAccountKeys("testing", "testing");
        } catch (Exception e) {
            e.printStackTrace();
        }

        assertThat(newAccount, is(notNullValue()));
    }

    @Test
    public void PanthalassaIsValidCID() {

        Boolean isCid = null;

        try {
            isCid = Panthalassa.isValidCID("mAVUWIDAwU3dua7xpbnFfMuJGB3ydE8z6o/Oz8+bihw3lVhT1");
        } catch (Exception e) {
            e.printStackTrace();
        }

        assertThat(isCid, is(true));
    }

}
