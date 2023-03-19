import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

export const GET_ONDEMAND_GROUPS_QUERY: DocumentNode = gql`
  query GetOndemandGroups($partnerIds: [Int], $pageNo: Int, $pageSize: Int) {
    getOndemandGroupInfoList(
      partnerIds: $partnerIds
      pageNo: $pageNo
      pageSize: $pageSize
    ) {
      size
      totalPages
      totalElements
      content {
        companyName
        deviceCnt
      }
    }
  }
`;

export const GET_ONDEMAND_SETTING_QUERY: DocumentNode = gql`
  query GetOndemandSetting($partnersId: Int!, $partitionType: Int!) {
    readOndemandPartset(
      partnersId: $partnersId
      partitionType: $partitionType
    ) {
      status
      message
      success
      result
      ondemandPartset {
        # id
        # partitionType
        # partnersId
        # serialNumber
        # useYn
        # DCA_EVENT_TYPE_HARSH_Left_Turn
        # DCA_EVENT_TYPE_HARSH_Right_Turn
        # DCA_EVENT_TYPE_HARSH_UTurn
        # DCA_EVENT_TYPE_HARSH_Switching_Lanes
        # DCA_EVENT_TYPE_HARSH_Over_Taking
        # DCA_EVENT_TYPE_RapidAccel
        # DCA_EVENT_TYPE_RapidDecel
        # DCA_EVENT_TYPE_SuddenStart
        # DCA_EVENT_TYPE_SuddenStop
        # DCA_EVENT_TYPE_Gsensor
        DCA_EVENT_TYPE_SMART_CollisionRisk
        DCA_EVENT_TYPE_SMART_TailGating
        DCA_EVENT_TYPE_SMART_RecklessDriving
        DCA_EVENT_TYPE_SMART_RedLightViolation
        DCA_EVENT_TYPE_SMART_StopSignViolation
        # DCA_EVENT_TYPE_SMART_BurstSpeed
        # DCA_EVENT_TYPE_SMART_IllegalUTurn
        # DCA_EVENT_TYPE_SMART_CentralLineViolation
        DCA_EVENT_TYPE_SMART_PhoneUse
        # DCA_EVENT_TYPE_SMART_Smoking
        DCA_EVENT_TYPE_SMART_Distraction
        DCA_EVENT_TYPE_SMART_Drowsy
        DCA_EVENT_TYPE_SMART_UnfastenSeatbelt
        # DCA_EVENT_TYPE_SMART_OneWayReversing
        DCA_EVENT_TYPE_EXTERNAL_Crash
        DCA_EVENT_TYPE_EXTERNAL_HarshAcceleration
        DCA_EVENT_TYPE_EXTERNAL_HarshBraking
        DCA_EVENT_TYPE_EXTERNAL_HarshLeft
        DCA_EVENT_TYPE_EXTERNAL_HarshRight
        DCA_EVENT_TYPE_EXTERNAL_HarshTurn
        DCA_EVENT_TYPE_EXTERNAL_Panic
        DCA_EVENT_TYPE_EXTERNAL_RollOver
      }
    }
  }
`;

export const UPDATE_ONDEMAND_SETTING_QUERY: DocumentNode = gql`
  mutation UpdateOndemandSetting(
    $partnersId: Int!
    $partitionType: Int!
    # $DCA_EVENT_TYPE_HARSH_Left_Turn: Int!
    # $DCA_EVENT_TYPE_HARSH_Right_Turn: Int!
    # $DCA_EVENT_TYPE_HARSH_UTurn: Int!
    # $DCA_EVENT_TYPE_HARSH_Switching_Lanes: Int!
    # $DCA_EVENT_TYPE_HARSH_Over_Taking: Int!
    # $DCA_EVENT_TYPE_RapidAccel: Int!
    # $DCA_EVENT_TYPE_RapidDecel: Int!
    # $DCA_EVENT_TYPE_SuddenStart: Int!
    # $DCA_EVENT_TYPE_SuddenStop: Int!
    # $DCA_EVENT_TYPE_Gsensor: Int!
    $DCA_EVENT_TYPE_SMART_CollisionRisk: Int!
    $DCA_EVENT_TYPE_SMART_TailGating: Int!
    $DCA_EVENT_TYPE_SMART_RecklessDriving: Int!
    $DCA_EVENT_TYPE_SMART_RedLightViolation: Int!
    $DCA_EVENT_TYPE_SMART_StopSignViolation: Int!
    # $DCA_EVENT_TYPE_SMART_BurstSpeed: Int!
    # $DCA_EVENT_TYPE_SMART_IllegalUTurn: Int!
    # $DCA_EVENT_TYPE_SMART_CentralLineViolation: Int!
    $DCA_EVENT_TYPE_SMART_PhoneUse: Int!
    # $DCA_EVENT_TYPE_SMART_Smoking: Int!
    $DCA_EVENT_TYPE_SMART_Distraction: Int!
    $DCA_EVENT_TYPE_SMART_Drowsy: Int!
    $DCA_EVENT_TYPE_SMART_UnfastenSeatbelt: Int!
    # $DCA_EVENT_TYPE_SMART_OneWayReversing: Int!
    $DCA_EVENT_TYPE_EXTERNAL_Crash: Int!
    $DCA_EVENT_TYPE_EXTERNAL_HarshAcceleration: Int!
    $DCA_EVENT_TYPE_EXTERNAL_HarshBraking: Int!
    $DCA_EVENT_TYPE_EXTERNAL_HarshLeft: Int!
    $DCA_EVENT_TYPE_EXTERNAL_HarshRight: Int!
    $DCA_EVENT_TYPE_EXTERNAL_HarshTurn: Int!
    $DCA_EVENT_TYPE_EXTERNAL_Panic: Int!
    $DCA_EVENT_TYPE_EXTERNAL_RollOver: Int!
  ) {
    registOndemandPartset(
      partnersId: $partnersId
      partitionType: $partitionType
      # DCA_EVENT_TYPE_HARSH_Left_Turn: $DCA_EVENT_TYPE_HARSH_Left_Turn
      # DCA_EVENT_TYPE_HARSH_Right_Turn: $DCA_EVENT_TYPE_HARSH_Right_Turn
      # DCA_EVENT_TYPE_HARSH_UTurn: $DCA_EVENT_TYPE_HARSH_UTurn
      # DCA_EVENT_TYPE_HARSH_Switching_Lanes: $DCA_EVENT_TYPE_HARSH_Switching_Lanes
      # DCA_EVENT_TYPE_HARSH_Over_Taking: $DCA_EVENT_TYPE_HARSH_Over_Taking
      # DCA_EVENT_TYPE_RapidAccel: $DCA_EVENT_TYPE_RapidAccel
      # DCA_EVENT_TYPE_RapidDecel: $DCA_EVENT_TYPE_RapidDecel
      # DCA_EVENT_TYPE_SuddenStart: $DCA_EVENT_TYPE_SuddenStart
      # DCA_EVENT_TYPE_SuddenStop: $DCA_EVENT_TYPE_SuddenStop
      # DCA_EVENT_TYPE_Gsensor: $DCA_EVENT_TYPE_Gsensor
      DCA_EVENT_TYPE_SMART_CollisionRisk: $DCA_EVENT_TYPE_SMART_CollisionRisk
      DCA_EVENT_TYPE_SMART_TailGating: $DCA_EVENT_TYPE_SMART_TailGating
      DCA_EVENT_TYPE_SMART_RecklessDriving: $DCA_EVENT_TYPE_SMART_RecklessDriving
      DCA_EVENT_TYPE_SMART_RedLightViolation: $DCA_EVENT_TYPE_SMART_RedLightViolation
      DCA_EVENT_TYPE_SMART_StopSignViolation: $DCA_EVENT_TYPE_SMART_StopSignViolation
      # DCA_EVENT_TYPE_SMART_BurstSpeed: $DCA_EVENT_TYPE_SMART_BurstSpeed
      # DCA_EVENT_TYPE_SMART_IllegalUTurn: $DCA_EVENT_TYPE_SMART_IllegalUTurn
      # DCA_EVENT_TYPE_SMART_CentralLineViolation: $DCA_EVENT_TYPE_SMART_CentralLineViolation
      DCA_EVENT_TYPE_SMART_PhoneUse: $DCA_EVENT_TYPE_SMART_PhoneUse
      # DCA_EVENT_TYPE_SMART_Smoking: $DCA_EVENT_TYPE_SMART_Smoking
      DCA_EVENT_TYPE_SMART_Distraction: $DCA_EVENT_TYPE_SMART_Distraction
      DCA_EVENT_TYPE_SMART_Drowsy: $DCA_EVENT_TYPE_SMART_Drowsy
      DCA_EVENT_TYPE_SMART_UnfastenSeatbelt: $DCA_EVENT_TYPE_SMART_UnfastenSeatbelt
      # DCA_EVENT_TYPE_SMART_OneWayReversing: $DCA_EVENT_TYPE_SMART_OneWayReversing
      DCA_EVENT_TYPE_EXTERNAL_Crash: $DCA_EVENT_TYPE_EXTERNAL_Crash
      DCA_EVENT_TYPE_EXTERNAL_HarshAcceleration: $DCA_EVENT_TYPE_EXTERNAL_HarshAcceleration
      DCA_EVENT_TYPE_EXTERNAL_HarshBraking: $DCA_EVENT_TYPE_EXTERNAL_HarshBraking
      DCA_EVENT_TYPE_EXTERNAL_HarshLeft: $DCA_EVENT_TYPE_EXTERNAL_HarshLeft
      DCA_EVENT_TYPE_EXTERNAL_HarshRight: $DCA_EVENT_TYPE_EXTERNAL_HarshRight
      DCA_EVENT_TYPE_EXTERNAL_HarshTurn: $DCA_EVENT_TYPE_EXTERNAL_HarshTurn
      DCA_EVENT_TYPE_EXTERNAL_Panic: $DCA_EVENT_TYPE_EXTERNAL_Panic
      DCA_EVENT_TYPE_EXTERNAL_RollOver: $DCA_EVENT_TYPE_EXTERNAL_RollOver
    ) {
      status
      message
      success
      result
    }
  }
`;
