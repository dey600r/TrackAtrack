package org.apache.cordova.plugin;

import java.util.ArrayList;
import java.util.List;

import org.apache.cordova.api.CallbackContext;
import org.apache.cordova.api.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.annotation.SuppressLint;
import android.app.ActivityManager;
import android.app.ActivityManager.RunningAppProcessInfo;
import android.app.KeyguardManager;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.content.pm.PackageManager.NameNotFoundException;
import android.content.pm.ResolveInfo;

//PLUGIN APP RUNNING
public class PluginAppLauncher extends CordovaPlugin {

	//Metodo que se ejecuta desde phonegap para comunicarse con android y obtener las aplicaciones ejecutadas
	public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (action.equals("echo")) {
            String message = args.getString(0);
            try {
            	List<DataApp> apps=this.getPackages();
            	this.echo(message, callbackContext, apps);
			} catch (NameNotFoundException e) {
				e.printStackTrace();
			}
            return true;
        }
        
        return false;
    }

	//Android devuelve a Phonegap las aplicaciones ejecutandose en un determinado momento
	private void echo(String message, CallbackContext callbackContext, List<DataApp> apps) throws JSONException {
		JSONArray array=new JSONArray();
		JSONObject obj=new JSONObject();
		List<String> aux=new ArrayList<String>();
        if (message != null && message.length() > 0) { 
        	for(int i=0; i<apps.size(); i++) {
        		if(!aux.contains(apps.get(i).name)) { //Quitar apps repetidas
        			obj.put("name", apps.get(i).name);
        			obj.put("run", apps.get(i).run);
        			obj.put("back", apps.get(i).back);
        			obj.put("scr", apps.get(i).screen);
        			array.put(obj);
        			obj=new JSONObject();
        			aux.add(apps.get(i).name);
        		} 
        	}
        	callbackContext.success(array);
        } else {
            callbackContext.error("Expected one non-empty string argument.");
        }
    }
	
	class DataApp { //Estructura de una aplicacion ejecutandose
		private String name="";
		private boolean run=false;
		private boolean back=false;
		private boolean screen=false;
	}
	
	private List<DataApp> getPackages() throws NameNotFoundException { //Devuelve las aplicaciones instaladas en el telefono
	    List<DataApp> apps = this.getInstalledComponentList(); 
	    return apps;
	}
	
	private List<RunningAppProcessInfo> getAppRun() { //Devuelve las aplicaciones ejecutandose en el telefono
		@SuppressWarnings("static-access")
		ActivityManager actvityManager = (ActivityManager) this.cordova.getActivity().getSystemService( this.cordova.getActivity().ACTIVITY_SERVICE );
        List<RunningAppProcessInfo> procInfos = actvityManager.getRunningAppProcesses();
        return procInfos;
	}
	
	@SuppressLint("NewApi")
	private List<DataApp> getInstalledComponentList() throws NameNotFoundException { //Filtro de aplicaciones ejecutandose
        final Intent mainIntent = new Intent(Intent.ACTION_MAIN, null);
        mainIntent.addCategory(Intent.CATEGORY_LAUNCHER);
        PackageManager pm=this.cordova.getActivity().getPackageManager();
        List<ResolveInfo> ril = pm.queryIntentActivities(mainIntent, 0);
        List<DataApp> componentList = new ArrayList<DataApp>();
        List<RunningAppProcessInfo> procInfos = this.getAppRun();
        for (ResolveInfo ri : ril) { //Recorremos todas las aplicaciones para descubrir cual ha sido abierta por el usuario
            if (ri.activityInfo != null) {
            	DataApp data=new DataApp();
                KeyguardManager km = (KeyguardManager) cordova.getActivity().getSystemService(Context.KEYGUARD_SERVICE);;
                 for(RunningAppProcessInfo aux : procInfos) { //Hacemos un chequeo en el sistema para comparar procesos
                 	if(aux.processName.equals(ri.activityInfo.applicationInfo.processName) && aux.uid==ri.activityInfo.applicationInfo.uid) {
                		 data.name = ri.activityInfo.applicationInfo.loadLabel(pm).toString();
                		 if(aux.importance == RunningAppProcessInfo.IMPORTANCE_FOREGROUND) //Si el usuario la ha abierto
                           	 data.run=true;
                         else data.run=false;
                         if(aux.importance == RunningAppProcessInfo.IMPORTANCE_BACKGROUND) //Si esta en background
                          	 data.back=true;
                         else data.back=false;
                         data.screen=km.inKeyguardRestrictedInputMode(); //Si el usuario ha apagado la pantalla
                         componentList.add(data);
                	}
                }
            }
        }
        return componentList;
    }
}