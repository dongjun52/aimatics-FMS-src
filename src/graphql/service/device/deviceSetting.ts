import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

/**
 * Device Status 조회
 */
export const GET_DEVICE_STATUS: DocumentNode = gql`
  query GetDeviceStatus($serial: String) {
    getDeviceInfoData(serial: $serial) {
      devicesId
      serial
      deviceModelName
      partners {
        partnersId
        partnersName
      }
      devices {
        lastLogDate
        firmwareVersion
        firmwareDownloaded
        stmVersion
        stmDownloaded
      }
      installerRegistrations {
        updatedAt
      }
      isConnected
      lastDca {
        serialNumber
        deviceStatus {
          status
          message
          value
        }
        subCamStatus {
          status
          value
          recordMessage
          attachMessage
          installMessage
        }
        diskStatus {
          status
          sdStatus {
            value
            message
          }
          umsStatus {
            value
            message
          }
        }
      }
    }
  }
`;

/**
 * Device Reset WiFi
 */
export const UPDATE_WIFI_MODE: DocumentNode = gql`
  query UpdateWifiMode($serial: String!) {
    commandRestWifi(serial: $serial) {
      status
      message
      success
    }
  }
`;

/**
 * Device Set Calibration
 */
export const SET_CALIBRATION: DocumentNode = gql`
  query SetCalibration($serial: String!) {
    commandCalibration(serial: $serial) {
      status
      message
      success
    }
  }
`;

/**
 * Device Format
 */
export const FORMAT_DEVICE: DocumentNode = gql`
  mutation FormatDevice($serial: String!, $accountsId: Int!, $formatType: Int!) {
    formatDevice(
      serial: $serial
      accountsId: $accountsId
      formatType: $formatType
    ) {
      status
      message
      success
    }
  }
`;

/**
 * Device Setting 조회
 */
export const GET_DEVICE_SETTING: DocumentNode = gql`
  query GetDeviceSetting($serial: String!) {
    getDeviceSetting(serial: $serial) {
      status
      message
      success
      result {
        created_at
        creator_id
        updated_at
        updater_id
        creator_type
        use_yn
        settings {
          # Dimension / General Settings > INSTALL
          usInstall_CamHeight {
            title
            defaultValue
            range
            value
          }
          usInstall_CarWidth {
            title
            defaultValue
            range
            value
          }
          usInstall_BonnetLength {
            title
            defaultValue
            range
            value
          }
          usInstall_AttachedPos {
            title
            defaultValue
            range
            value
          }
          bDSM_DriverPos {
            title
            defaultValue
            range
            value
          }
          # Dimension / General Settings > OPX
          bSoundType {
            title
            defaultValue
            range
            value
          }
          # bitrateCam0 {
          #   title
          #   defaultValue
          #   range
          #   value
          # }
          # bitrateCam1 {
          #   title
          #   defaultValue
          #   range
          #   value
          # }
          bWatermark {
            title
            defaultValue
            range
            value
          }
          # DashCam > BB
          usInfiniteEnable {
            title
            defaultValue
            range
            value
          }
          usEventEnable {
            title
            defaultValue
            range
            value
          }
          usStillCutEnable {
            title
            defaultValue
            range
            value
          }
          usMicInEnable {
            title
            defaultValue
            range
            value
          }
          usAccTriggerX {
            title
            defaultValue
            range
            value
          }
          usAccTriggerY {
            title
            defaultValue
            range
            value
          }
          usAccTriggerZ {
            title
            defaultValue
            range
            value
          }
          usAccTriggerX2 {
            title
            defaultValue
            range
            value
          }
          usAccTriggerY2 {
            title
            defaultValue
            range
            value
          }
          usAccTriggerZ2 {
            title
            defaultValue
            range
            value
          }
          usAccLightTriggerX {
            title
            defaultValue
            range
            value
          }
          usAccLightTriggerY {
            title
            defaultValue
            range
            value
          }
          usAccLightTriggerZ {
            title
            defaultValue
            range
            value
          }
          usAccLightTriggerX2 {
            title
            defaultValue
            range
            value
          }
          usAccLightTriggerY2 {
            title
            defaultValue
            range
            value
          }
          usAccLightTriggerZ2 {
            title
            defaultValue
            range
            value
          }
          usResolution {
            title
            defaultValue
            range
            value
          }
          usRearResolution {
            title
            defaultValue
            range
            value
          }
          usDisplaySpeedUnit {
            title
            defaultValue
            range
            value
          }
          usSndLanguage {
            title
            defaultValue
            range
            value
          }
          usSoundVolume {
            title
            defaultValue
            range
            value
          }
          usEvt_SndEffect {
            title
            defaultValue
            range
            value
          }
          usEvt_SndVoice {
            title
            defaultValue
            range
            value
          }
          # # Edge AI / Driver Monitoring > LDW
          # usLdw_On {
          #   title
          #   defaultValue
          #   range
          #   value
          # }
          # sLdw_SensL {
          #   title
          #   defaultValue
          #   range
          #   value
          # }
          # sLdw_SensR {
          #   title
          #   defaultValue
          #   range
          #   value
          # }
          # bLDW_KphWarn {
          #   title
          #   defaultValue
          #   range
          #   value
          # }
          # Edge AI / Driver Monitoring > FCDA
          usBnw_On {
            title
            defaultValue
            range
            value
          }
          # # Edge AI / Driver Monitoring > FCW
          # usFcw_On {
          #   title
          #   defaultValue
          #   range
          #   value
          # }
          # usFcw_TTCSense {
          #   title
          #   defaultValue
          #   range
          #   value
          # }
          # Edge AI / Driver Monitoring > SDA
          usHmw_On {
            title
            defaultValue
            range
            value
          }
          usHMW_WarningDisplayTTT {
            title
            defaultValue
            range
            value
          }
          bHMW_KphWarn {
            title
            defaultValue
            range
            value
          }
          bHMW_WarningTTT1st {
            title
            defaultValue
            range
            value
          }
          usFcw_WarningStart {
            title
            defaultValue
            range
            value
          }
          # Edge AI / Driver Monitoring > VB
          usVb_On {
            title
            defaultValue
            range
            value
          }
          usVb_Sense {
            title
            defaultValue
            range
            value
          }
          # Edge AI / Driver Monitoring > AA
          bAAFunctionON {
            title
            defaultValue
            range
            value
          }
          bAA_SensLevel_StartSpeed {
            title
            defaultValue
            range
            value
          }
          bAA_SensLevel_tDriving {
            title
            defaultValue
            range
            value
          }
          bAA_SensLevel_tBreak {
            title
            defaultValue
            range
            value
          }
          # # Edge AI / Driver Monitoring > OSW
          # bOSWFunctionON {
          #   title
          #   defaultValue
          #   range
          #   value
          # }
          # bOSW_StartSpeed {
          #   title
          #   defaultValue
          #   range
          #   value
          # }
          # Edge AI / Driver Monitoring > DAW
          bDAWFunctionON {
            title
            defaultValue
            range
            value
          }
          bDAW_SensLevel_Phone {
            title
            defaultValue
            range
            value
          }
          bDAW_Phone_KphWarn {
            title
            defaultValue
            range
            value
          }
          # Edge AI / Driver Monitoring > DDW
          bDDWFunctionON {
            title
            defaultValue
            range
            value
          }
          bDDW_SensLevel_Distraction {
            title
            defaultValue
            range
            value
          }
          bDDW_Distraction_KphWarn {
            title
            defaultValue
            range
            value
          }
          bDDW_SensLevel_Drowsy {
            title
            defaultValue
            range
            value
          }
          bDDW_Drowsy_KphWarn {
            title
            defaultValue
            range
            value
          }
          # # Edge AI / Driver Monitoring > DBW
          # bSBWFunctionON {
          #   title
          #   defaultValue
          #   range
          #   value
          # }
          # bSBW_SensLevel_Seatbelt {
          #   title
          #   defaultValue
          #   range
          #   value
          # }
          # bSBW_KphWarn {
          #   title
          #   defaultValue
          #   range
          #   value
          # }
          # Smart Event > Smart Event(Front)
          usSmartEventRecordSenseTailGating {
            title
            defaultValue
            range
            value
          }
          usSmartEventRecordSenseCollisionRisk {
            title
            defaultValue
            range
            value
          }
          usSmartEventRecordSenseRecklessDriving {
            title
            defaultValue
            range
            value
          }
          usSmartEventRecordSenseStopSignViolation {
            title
            defaultValue
            range
            value
          }
          usSmartEventRecordSenseRedLightViolation {
            title
            defaultValue
            range
            value
          }
          # Smart Event > Smart Event(Cabin)
          bSMT_SensLevel_DriverDistraction {
            title
            defaultValue
            range
            value
          }
          bSMT_SensLevel_DriverDrowsy {
            title
            defaultValue
            range
            value
          }
          bSMT_SensLevel_DriverPhoneUse {
            title
            defaultValue
            range
            value
          }
          bSMT_SensLevel_UnfastenSeatbelt {
            title
            defaultValue
            range
            value
          }
        }
      }
    }
  }
`;

/**
 * Device Setting 수정
 */
export const UPDATE_DEVICE_GENERAL: DocumentNode = gql`
  mutation UpdateDeviceGeneral(
    $serial: String!
    $updaterId: Int!
    $usInstall_CamHeight: Int!
    $usInstall_CarWidth: Int!
    $usInstall_BonnetLength: Int!
    $usInstall_AttachedPos: Int!
    $bDSM_DriverPos: Int!
    $bSoundType: Int!
    # $bitrateCam0: Int!
    # $bitrateCam1: Int!
    $bWatermark: Int!
  ) {
    saveDeviceSettingsGeneral(
      serial: $serial
      updaterId: $updaterId
      usInstall_CamHeight: $usInstall_CamHeight
      usInstall_CarWidth: $usInstall_CarWidth
      usInstall_BonnetLength: $usInstall_BonnetLength
      usInstall_AttachedPos: $usInstall_AttachedPos
      bDSM_DriverPos: $bDSM_DriverPos
      bSoundType: $bSoundType
      # bitrateCam0: $bitrateCam0
      # bitrateCam1: $bitrateCam1
      bWatermark: $bWatermark
    ) {
      status
      message
      success
    }
  }
`;

export const UPDATE_DEVICE_DASH_CAM: DocumentNode = gql`
  mutation UpdateDeviceDashCam(
    $serial: String!
    $updaterId: Int!
    $usInfiniteEnable: Int!
    $usEventEnable: Int!
    $usStillCutEnable: Int!
    $usMicInEnable: Int!
    $usAccTriggerX: Int!
    $usAccTriggerY: Int!
    $usAccTriggerZ: Int!
    $usAccTriggerX2: Int!
    $usAccTriggerY2: Int!
    $usAccTriggerZ2: Int!
    $usAccLightTriggerX: Int!
    $usAccLightTriggerY: Int!
    $usAccLightTriggerZ: Int!
    $usAccLightTriggerX2: Int!
    $usAccLightTriggerY2: Int!
    $usAccLightTriggerZ2: Int!
    $usResolution: Int!
    $usRearResolution: Int!
    $usDisplaySpeedUnit: Int!
    $usSndLanguage: Int!
    $usSoundVolume: Int!
    $usEvt_SndEffect: Int!
    $usEvt_SndVoice: Int!
  ) {
    saveDeviceSettingsBB(
      serial: $serial
      updaterId: $updaterId
      usInfiniteEnable: $usInfiniteEnable
      usEventEnable: $usEventEnable
      usStillCutEnable: $usStillCutEnable
      usMicInEnable: $usMicInEnable
      usAccTriggerX: $usAccTriggerX
      usAccTriggerY: $usAccTriggerY
      usAccTriggerZ: $usAccTriggerZ
      usAccTriggerX2: $usAccTriggerX2
      usAccTriggerY2: $usAccTriggerY2
      usAccTriggerZ2: $usAccTriggerZ2
      usAccLightTriggerX: $usAccLightTriggerX
      usAccLightTriggerY: $usAccLightTriggerY
      usAccLightTriggerZ: $usAccLightTriggerZ
      usAccLightTriggerX2: $usAccLightTriggerX2
      usAccLightTriggerY2: $usAccLightTriggerY2
      usAccLightTriggerZ2: $usAccLightTriggerZ2
      usResolution: $usResolution
      usRearResolution: $usRearResolution
      usDisplaySpeedUnit: $usDisplaySpeedUnit
      usSndLanguage: $usSndLanguage
      usSoundVolume: $usSoundVolume
      usEvt_SndEffect: $usEvt_SndEffect
      usEvt_SndVoice: $usEvt_SndVoice
    ) {
      status
      message
      success
    }
  }
`;

export const UPDATE_DEVICE_EDGE_AI: DocumentNode = gql`
  mutation UpdateDeviceEdgeAI(
    $serial: String!
    $updaterId: Int!
    # $usLdw_On: Int!
    # $sLdw_SensL: Int!
    # $sLdw_SensR: Int!
    # $bLDW_KphWarn: Int!
    $usBnw_On: Int!
    # $usFcw_On: Int!
    # $usFcw_TTCSense: Int!
    $usHmw_On: Int!
    # $usHMW_WarningDisplayTTT: Int!
    $bHMW_KphWarn: Int!
    $bHMW_WarningTTT1st: Int!
    $usFcw_WarningStart: Int!
    $usVb_On: Int!
    $usVb_Sense: Int!
    $bAAFunctionON: Int!
    $bAA_SensLevel_StartSpeed: Int!
    $bAA_SensLevel_tDriving: Int!
    $bAA_SensLevel_tBreak: Int!
    # $bOSWFunctionON: Int!
    # $bOSW_StartSpeed: Int!
    $bDAWFunctionON: Int!
    $bDAW_SensLevel_Phone: Int!
    $bDAW_Phone_KphWarn: Int!
    $bDDWFunctionON: Int!
    $bDDW_SensLevel_Distraction: Int!
    $bDDW_Distraction_KphWarn: Int!
    $bDDW_SensLevel_Drowsy: Int!
    $bDDW_Drowsy_KphWarn: Int! # $bSBWFunctionON: Int! # $bSBW_SensLevel_Seatbelt: Int! # $bSBW_KphWarn: Int!
  ) {
    saveDeviceSettingsAI(
      serial: $serial
      updaterId: $updaterId
      # usLdw_On: $usLdw_On
      # sLdw_SensL: $sLdw_SensL
      # sLdw_SensR: $sLdw_SensR
      # bLDW_KphWarn: $bLDW_KphWarn
      usBnw_On: $usBnw_On
      # usFcw_On: $usFcw_On
      # usFcw_TTCSense: $usFcw_TTCSense
      usHmw_On: $usHmw_On
      # usHMW_WarningDisplayTTT: $usHMW_WarningDisplayTTT
      bHMW_KphWarn: $bHMW_KphWarn
      bHMW_WarningTTT1st: $bHMW_WarningTTT1st
      usFcw_WarningStart: $usFcw_WarningStart
      usVb_On: $usVb_On
      usVb_Sense: $usVb_Sense
      bAAFunctionON: $bAAFunctionON
      bAA_SensLevel_StartSpeed: $bAA_SensLevel_StartSpeed
      bAA_SensLevel_tDriving: $bAA_SensLevel_tDriving
      bAA_SensLevel_tBreak: $bAA_SensLevel_tBreak
      # bOSWFunctionON: $bOSWFunctionON
      # bOSW_StartSpeed: $bOSW_StartSpeed
      bDAWFunctionON: $bDAWFunctionON
      bDAW_SensLevel_Phone: $bDAW_SensLevel_Phone
      bDAW_Phone_KphWarn: $bDAW_Phone_KphWarn
      bDDWFunctionON: $bDDWFunctionON
      bDDW_SensLevel_Distraction: $bDDW_SensLevel_Distraction
      bDDW_Distraction_KphWarn: $bDDW_Distraction_KphWarn
      bDDW_SensLevel_Drowsy: $bDDW_SensLevel_Drowsy
      bDDW_Drowsy_KphWarn: $bDDW_Drowsy_KphWarn # bSBWFunctionON: $bSBWFunctionON # bSBW_SensLevel_Seatbelt: $bSBW_SensLevel_Seatbelt # bSBW_KphWarn: $bSBW_KphWarn
    ) {
      status
      message
      success
    }
  }
`;

export const UPDATE_DEVICE_SMARTEVENT: DocumentNode = gql`
  mutation UpdateDeviceSE(
    $serial: String!
    $updaterId: Int!
    $usSmartEventRecordSenseTailGating: Int!
    $usSmartEventRecordSenseCollisionRisk: Int!
    $usSmartEventRecordSenseRecklessDriving: Int!
    $usSmartEventRecordSenseStopSignViolation: Int!
    $usSmartEventRecordSenseRedLightViolation: Int!
    $bSMT_SensLevel_DriverDistraction: Int!
    $bSMT_SensLevel_DriverDrowsy: Int!
    $bSMT_SensLevel_DriverPhoneUse: Int!
    $bSMT_SensLevel_UnfastenSeatbelt: Int!
  ) {
    saveDeviceSettingsSE(
      serial: $serial
      updaterId: $updaterId
      usSmartEventRecordSenseTailGating: $usSmartEventRecordSenseTailGating
      usSmartEventRecordSenseCollisionRisk: $usSmartEventRecordSenseCollisionRisk
      usSmartEventRecordSenseRecklessDriving: $usSmartEventRecordSenseRecklessDriving
      usSmartEventRecordSenseStopSignViolation: $usSmartEventRecordSenseStopSignViolation
      usSmartEventRecordSenseRedLightViolation: $usSmartEventRecordSenseRedLightViolation
      bSMT_SensLevel_DriverDistraction: $bSMT_SensLevel_DriverDistraction
      bSMT_SensLevel_DriverDrowsy: $bSMT_SensLevel_DriverDrowsy
      bSMT_SensLevel_DriverPhoneUse: $bSMT_SensLevel_DriverPhoneUse
      bSMT_SensLevel_UnfastenSeatbelt: $bSMT_SensLevel_UnfastenSeatbelt
    ) {
      status
      message
      success
    }
  }
`;
