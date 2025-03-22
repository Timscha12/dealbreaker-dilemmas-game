
// Flag to track if we're in a Capacitor environment
const isCapacitorApp = 'Capacitor' in window;

// AdMob configuration
const adConfig = {
  appId: 'ca-app-pub-9403941304964602~4394927614',
  bannerUnitId: 'ca-app-pub-9403941304964602/8097335064',
  interstitialUnitId: 'ca-app-pub-9403941304964602/6513824497',
  // Testing IDs
  testBannerUnitId: 'ca-app-pub-3940256099942544/6300978111',
  testInterstitialUnitId: 'ca-app-pub-3940256099942544/1033173712'
};

// Track interstitial ad state
let interstitialAdLoaded = false;
let interstitialAdShowing = false;

// Helper to determine if we're in production
const isProduction = (): boolean => {
  const hostname = window.location.hostname;
  return hostname !== 'localhost' && !hostname.includes('lovable');
};

// Prepare an interstitial ad (will be ready to show later)
export const prepareInterstitialAd = async (): Promise<void> => {
  // Only proceed if we're in a Capacitor environment
  if (!isCapacitorApp) {
    console.log('Interstitial ad would be prepared in Capacitor environment');
    interstitialAdLoaded = true;
    return;
  }

  try {
    console.log('Preparing interstitial ad...');
    // This would be the place to integrate with the real AdMob
    // when building the app for mobile
    interstitialAdLoaded = true;
  } catch (error) {
    console.error('Error preparing interstitial ad:', error);
  }
};

// Show an interstitial ad if available
export const showInterstitialAd = async (): Promise<boolean> => {
  // If ad is already showing or not loaded, don't proceed
  if (interstitialAdShowing || !interstitialAdLoaded) {
    return false;
  }

  // Only proceed if we're in a Capacitor environment
  if (!isCapacitorApp) {
    console.log('Interstitial ad would be shown in Capacitor environment');
    interstitialAdLoaded = false;
    return true;
  }

  try {
    interstitialAdShowing = true;
    console.log('Showing interstitial ad...');
    
    // This would be the place to show the real ad with the AdMob SDK
    // when building the app for mobile
    
    // Reset states after showing
    interstitialAdLoaded = false;
    interstitialAdShowing = false;
    return true;
  } catch (error) {
    console.error('Error showing interstitial ad:', error);
    interstitialAdShowing = false;
    return false;
  }
};

// Initialize AdMob (should be called when app starts)
export const initializeAdMob = async (): Promise<void> => {
  if (!isCapacitorApp) {
    console.log('AdMob would be initialized in Capacitor environment');
    return;
  }

  try {
    console.log('Initializing AdMob...');
    // This would be the place to initialize the real AdMob SDK
    // when building the app for mobile
  } catch (error) {
    console.error('Error initializing AdMob:', error);
  }
};

export default {
  prepareInterstitialAd,
  showInterstitialAd,
  initializeAdMob,
  isProduction
};
