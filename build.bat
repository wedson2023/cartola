ionic cordova build android --release
&& del CampeoesCartolaFc.apk
&& jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore campeoes-cartola.keystore platforms/android/build/outputs/apk/release/android-release-unsigned.apk campeoes-cartola
&& C:\Users\Notbook\AppData\Local\Android\android-sdk\build-tools\27.0.0\zipalign -v 8 platforms/android/build/outputs/apk/release/android-release-unsigned.apk CampeoesCartolaFc.apk