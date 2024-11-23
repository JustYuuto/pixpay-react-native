# Pixpay React Native

Recréation de l'appli Pixpay, avec [React Native](https://reactnative.dev/) et [React Native Paper](https://reactnativepaper.com/) pour l'UI.

Note aux devs de Pixpay : Pensez à sécuriser votre API je vous en supplie 

## Fonctionnalités implémentées

- [x] Connexion
- [ ] Onglet Dépenses
  - [ ] Liste des dépenses et détails
  - [ ] Argent à venir
- [ ] Activité
- [ ] Paramètres
  - [x] Informations personnelles
  - [x] RIB

## Build

```bash
yarn install
```

### Android

```bash
cd android
# Build avec Gradle
./gradlew assembleRelease
```

### iOS

```bash
cd ios
# Installation des dépendances CocoaPods
pod install
# Build avec xcodebuild
xcodebuild -workspace Pixpay.xcworkspace -scheme Pixpay -configuration Release
```
