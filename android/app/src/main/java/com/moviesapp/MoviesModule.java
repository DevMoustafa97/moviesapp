package com.moviesapp; // replace your-apps-package-name with your app’s package name
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;

import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import okhttp3.ResponseBody;

import java.io.IOException;


public class MoviesModule extends ReactContextBaseJavaModule {


    MoviesModule(ReactApplicationContext context) {
        super(context);
    }

    @Override
    public String getName() {
        return "MoviesApp";
    }

    @ReactMethod
    public void getMovies(Promise promise) {

        OkHttpClient client = new OkHttpClient();

        String baseUrl = "https://api.themoviedb.org/3/discover/movie?";
        String token = "api_key=8a7a64e451a393f90a1ba924c9113c5d";
        String queryParams = "&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc";

        String url = baseUrl + token + queryParams;


        Request request = new Request.Builder()
                .url(url)
                .build();
        
        try {
            Response response = client.newCall(request).execute();
            ResponseBody responseBody = response.body();
            if (responseBody != null) {
                promise.resolve(responseBody.string());
            } else {
                promise.reject("Empty response", "Received empty response");
            }
        } catch (IOException e) {
            promise.reject("Network error", e.getMessage());
        }
    }


}