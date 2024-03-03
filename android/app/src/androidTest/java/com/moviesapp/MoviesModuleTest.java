package com.moviesapp;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;

import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.io.IOException;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import okhttp3.ResponseBody;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

public class MoviesModuleTest {

    @Mock
    ReactApplicationContext reactContext;

    @Mock
    Promise promise;

    @Mock
    OkHttpClient client;

    @Mock
    Call call;

    @Mock
    Response response;

    @Mock
    ResponseBody responseBody;

    @Before
    public void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testGetMovies_Success() throws IOException {
        MoviesModule moviesModule = new MoviesModule(reactContext);

        // Mock the OkHttpClient and its behavior
        when(client.newCall(any(Request.class))).thenReturn(call);
        when(call.execute()).thenReturn(response);
        when(response.body()).thenReturn(responseBody);
        when(responseBody.string()).thenReturn("{'page':1,'results':[{'title':'Movie 1'},{'title':'Movie 2'}]}");

        // Mock the ReactPromise
        moviesModule.client = client;

        moviesModule.getMovies(promise);

        // Verify that the promise.resolve() method is called with the correct response
        verify(promise).resolve("{'page':1,'results':[{'title':'Movie 1'},{'title':'Movie 2'}]}");
    }

    @Test
    public void testGetMovies_NetworkError() throws IOException {
        MoviesModule moviesModule = new MoviesModule(reactContext);

        // Mock the OkHttpClient and its behavior to throw an IOException
        when(client.newCall(any(Request.class))).thenReturn(call);
        when(call.execute()).thenThrow(new IOException("Network error"));

        // Mock the ReactPromise
        moviesModule.client = client;

        moviesModule.getMovies(promise);

        // Verify that the promise.reject() method is called with the correct error message
        verify(promise).reject("Network error", "Network error");
    }
}
