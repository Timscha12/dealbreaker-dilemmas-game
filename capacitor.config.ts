import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.dealbreaker.app',
  appName: 'Dealbreaker',
  webDir: 'dist',
  bundledWebRuntime: false,
  plugins: {
    AdMob: {
      appId: 'ca-app-pub-3940256099942544~1458002511', // Test-App-ID von Google
      bannerAdId: '',
      interstitialAdId: '',
      testingDevices: [],
      npa: true
    }
  }
};

export default config;