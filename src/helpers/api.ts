import AsyncStorage from '@react-native-async-storage/async-storage';

const endpoint = 'https://prod-bo1.pixpay.app/graphql';
const userAgent = 'Dart/3.2 (dart:io)';

export async function getMe() {
  return fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': userAgent,
      Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
    },
    body: JSON.stringify({
      operationName: 'MeQuery',
      variables: {
        deviceId: await AsyncStorage.getItem('deviceId'),
        deviceUuid: await AsyncStorage.getItem('deviceId'),
      },
      query: `query MeQuery($deviceId: String!, $deviceUuid: String) {
  __typename
  me(deviceId: $deviceId, deviceUuid: $deviceUuid) {
    __typename
    id
    login
    email
    device {
      __typename
      id
      pushToken
      pushDesactivatedInSystem
    }
    isUnregistered
    pendingRegistrationId
    processingOrderId
    pushActivated
    parent {
      __typename
      id
      firstname
      lastname
      email
      phone
      birthdate
      civility
      mainWalletId
      address
      addressComplement
      addressState
      city
      zipcode
      createdDate
      country
      countryCode
      placeOfBirth
      countryOfBirthCode
      blocked
      verified
      blockedDate
      blockedStatus
      subscriptionStatus
      terminated
      updatedDate
      createdDate
      geo
      taxIdentificationNumber
      workFunction
      salaryIncome
      taxResidence
      personalAssets
      blockedKyc
      lastAddressModificationDate
      numberOfChildren
      nickname
    }
    parentUser {
      __typename
      id
      applicationUserId
      parentId
      isMainUser
      phone
      firstname
      lastname
      parentType
      email
      roles
      isSubscriptionFinished
      civility
      birthdate
      zendeskId
      avatarId
      isDeleted
      autoTopupEnabled
      allowRating
      picture
      lang
      hasDoneTopup
      nickname
      createdDate
    }
    children {
      __typename
      id
      firstname
      lastname
      birthdate
      phone
      email
      picture
      mainWalletId
      civility
      allowRating
      isOnboardingFinished
      isSelfOnboardingFinished
      unregistered
      isGift
      schoolId
      schoolGrade
      lang
      pixpayGo
      hasDoneMoneyRequest
      allowRating
      applicationUserId
      planId
      createdDate
      hasFreeCard
    }
    child {
      __typename
      id
      firstname
      lastname
      birthdate
      phone
      email
      picture
      mainWalletId
      civility
      allowRating
      isOnboardingFinished
      isSelfOnboardingFinished
      unregistered
      isGift
      schoolId
      schoolGrade
      lang
      pixpayGo
      hasDoneMoneyRequest
      allowRating
      applicationUserId
      planId
      createdDate
      hasFreeCard
    }
    childProspect {
      __typename
      id
      tenantId
      firstname
      lastname
      birthdate
      phone
      email
      userToken
      pushActivated
      isChildRegistrationDone
      countryCode
      cardPrint
      tailorMadeCardId
    }
  }
}`,
    }),
  }).then(r => r.json());
}

export async function getWallets() {
  return fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': userAgent,
      Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
    },
    body: JSON.stringify({
      operationName: null,
      variables: {
        lastSynchroDate: null,
      },
      query: `query SynchroWallets($lastSynchroDate: Date) {
  __typename
  synchroWallets(lastSynchroDate: $lastSynchroDate) {
    __typename
    wallets {
      __typename
      id
      balance
      currency
      authorizedBalance
      authorizedDisplayed
      nextBalance
      isMain
      isSaving
      isCashback
      isTravel
      name
      childUserId
      createdDate
      iban
      bic
      isDeleted
      externalId
      updatedDate
    }
    date
  }
}`,
    }),
  }).then(r => r.json());
}

export async function getNotifications() {
  return fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': userAgent,
      Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
    },
    body: JSON.stringify({
      operationName: null,
      variables: {},
      query: `query findInappNotification {
  __typename
  findInappNotification {
    __typename
    id
    title
    description
    linkTarget
    linkLabel
    modalId
    ctaTitle
    emoji
    storyId
    type
    readDate
    createdDate
  }
}`,
    }),
  }).then(r => r.json());
}
