var isAppForeground = true;

function initAds() {
    if (admob) {
        var adPublisherIds = {
            ios : {
                banner : "ca-app-pub-4737748955520576/8602767669",
                interstitial : "ca-app-pub-xx/xx"
            },
            android : {
                banner : "ca-app-pub-4737748955520576/5649301266",
                interstitial : "ca-app-pub-xx/xx"
            }
        };

        var admobid = (/(android)/i.test(navigator.userAgent)) ? adPublisherIds.android : adPublisherIds.ios;

        admob.setOptions({
            publisherId:      admobid.banner,
            interstitialAdId: admobid.interstitial,
            tappxIdiOs:       "/XXXXXXXXX/Pub-XXXX-iOS-IIII",
            tappxIdAndroid:   "/XXXXXXXXX/Pub-XXXX-Android-AAAA",
            tappxShare:       0.5,

        });

        registerAdEvents();

    } else {
        alert('AdMobAds plugin not ready');
    }
}

function onAdLoaded(e) {
    if (isAppForeground) {
        if (e.adType === admob.AD_TYPE.INTERSTITIAL) {
            console.log("An interstitial has been loaded and autoshown. If you want to load the interstitial first and show it later, set 'autoShowInterstitial: false' in admob.setOptions() and call 'admob.showInterstitialAd();' here");
        } else if (e.adType === admob.AD_TYPE_BANNER) {
            console.log("New banner received");
        }
    }
}

function onPause() {
    if (isAppForeground) {
        admob.destroyBannerView();
        isAppForeground = false;
    }
}

function onResume() {
    if (!isAppForeground) {
        setTimeout(admob.createBannerView, 1);
     //   setTimeout(admob.requestInterstitialAd, 1);
        isAppForeground = true;
    }
}

// optional, in case respond to events
function registerAdEvents() {
    document.addEventListener(admob.events.onAdLoaded, onAdLoaded);
    document.addEventListener(admob.events.onAdFailedToLoad, function (e) {});
    document.addEventListener(admob.events.onAdOpened, function (e) {});
    document.addEventListener(admob.events.onAdClosed, function (e) {});
    document.addEventListener(admob.events.onAdLeftApplication, function (e) {});
    document.addEventListener(admob.events.onInAppPurchaseRequested, function (e) {});

    document.addEventListener("pause", onPause, false);
    document.addEventListener("resume", onResume, false);
}

function onDeviceReady() {
    document.removeEventListener('deviceready', onDeviceReady, false);
    initAds();

    // display a banner at startup
    admob.createBannerView();

    // request an interstitial
  //  admob.requestInterstitialAd();
}

document.addEventListener("deviceready", onDeviceReady, false);