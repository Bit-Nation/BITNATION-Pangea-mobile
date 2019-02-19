package co.bitnation;

import org.junit.Test;

import panthalassa.Panthalassa;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.core.IsNull.notNullValue;
import static org.junit.Assert.assertThat;

public class PanthalassaTest {
    static {
        System.loadLibrary("panthalassa");
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

}
