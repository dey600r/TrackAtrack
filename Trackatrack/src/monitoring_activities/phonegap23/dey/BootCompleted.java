package monitoring_activities.phonegap23.dey;

import android.content.Context;
import android.content.BroadcastReceiver;
import android.content.Intent;
 
//Servicio que ejecuta la aplicacion cuando el movil se enciende
public class BootCompleted extends BroadcastReceiver{
     @Override
     public void onReceive(Context context, Intent intent) {
    	 if(intent.getAction().equalsIgnoreCase(Intent.ACTION_BOOT_COMPLETED)) {
    		 Intent serviceIntent = new Intent(context, MyPhoneGapActivity.class);
    		 serviceIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
    		 context.startActivity(serviceIntent); //Ejecutamos la aplicacion
    	 }
     }
}

