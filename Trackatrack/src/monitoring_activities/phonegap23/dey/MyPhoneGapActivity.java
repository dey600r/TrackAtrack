package monitoring_activities.phonegap23.dey;

import org.apache.cordova.DroidGap;

import android.os.Bundle;

public class MyPhoneGapActivity extends DroidGap {
	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		super.setIntegerProperty("splashscreen", R.drawable.init); //Imagen inicial
		super.loadUrl("file:///android_asset/www/presentation/gui/index.html", 10000); //Ejecutar html de la app
	}
}

