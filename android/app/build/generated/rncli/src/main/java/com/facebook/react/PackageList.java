
package com.facebook.react;

import android.app.Application;
import android.content.Context;
import android.content.res.Resources;

import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainPackageConfig;
import com.facebook.react.shell.MainReactPackage;
import java.util.Arrays;
import java.util.ArrayList;

// @react-native-async-storage/async-storage
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
// @react-native-community/blur
import com.reactnativecommunity.blurview.BlurViewPackage;
// @react-native-community/voice
import com.wenkesj.voice.VoicePackage;
// @react-native-masked-view/masked-view
import org.reactnative.maskedview.RNCMaskedViewPackage;
// @react-native-picker/picker
import com.reactnativecommunity.picker.RNCPickerPackage;
// lottie-react-native
import com.airbnb.android.react.lottie.LottiePackage;
// react-native-date-picker
import com.henninghall.date_picker.DatePickerPackage;
// react-native-fs
import com.rnfs.RNFSPackage;
// react-native-gesture-handler
import com.swmansion.gesturehandler.RNGestureHandlerPackage;
// react-native-html-to-pdf
import com.christopherdro.htmltopdf.RNHTMLtoPDFPackage;
// react-native-image-picker
import com.imagepicker.ImagePickerPackage;
// react-native-image-resizer
import fr.bamlab.rnimageresizer.ImageResizerPackage;
// react-native-linear-gradient
import com.BV.LinearGradient.LinearGradientPackage;
// react-native-pager-view
import com.reactnativepagerview.PagerViewPackage;
// react-native-permissions
import com.zoontek.rnpermissions.RNPermissionsPackage;
// react-native-safe-area-context
import com.th3rdwave.safeareacontext.SafeAreaContextPackage;
// react-native-screens
import com.swmansion.rnscreens.RNScreensPackage;
// react-native-video
import com.brentvatne.react.ReactVideoPackage;
// react-native-webview
import com.reactnativecommunity.webview.RNCWebViewPackage;

public class PackageList {
  private Application application;
  private ReactNativeHost reactNativeHost;
  private MainPackageConfig mConfig;

  public PackageList(ReactNativeHost reactNativeHost) {
    this(reactNativeHost, null);
  }

  public PackageList(Application application) {
    this(application, null);
  }

  public PackageList(ReactNativeHost reactNativeHost, MainPackageConfig config) {
    this.reactNativeHost = reactNativeHost;
    mConfig = config;
  }

  public PackageList(Application application, MainPackageConfig config) {
    this.reactNativeHost = null;
    this.application = application;
    mConfig = config;
  }

  private ReactNativeHost getReactNativeHost() {
    return this.reactNativeHost;
  }

  private Resources getResources() {
    return this.getApplication().getResources();
  }

  private Application getApplication() {
    if (this.reactNativeHost == null) return this.application;
    return this.reactNativeHost.getApplication();
  }

  private Context getApplicationContext() {
    return this.getApplication().getApplicationContext();
  }

  public ArrayList<ReactPackage> getPackages() {
    return new ArrayList<>(Arrays.<ReactPackage>asList(
      new MainReactPackage(mConfig),
      new AsyncStoragePackage(),
      new BlurViewPackage(),
      new VoicePackage(),
      new RNCMaskedViewPackage(),
      new RNCPickerPackage(),
      new LottiePackage(),
      new DatePickerPackage(),
      new RNFSPackage(),
      new RNGestureHandlerPackage(),
      new RNHTMLtoPDFPackage(),
      new ImagePickerPackage(),
      new ImageResizerPackage(),
      new LinearGradientPackage(),
      new PagerViewPackage(),
      new RNPermissionsPackage(),
      new SafeAreaContextPackage(),
      new RNScreensPackage(),
      new ReactVideoPackage(),
      new RNCWebViewPackage()
    ));
  }
}
