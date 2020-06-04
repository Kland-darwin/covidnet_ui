import { AnalysisTypes, ActionMap } from "../actions/types";

export type IAnalysis = {
  image: string;
  patientMRN: number;
  createdTime: string;
  study: string;
  predCovid: number;
  predPneumonia: number;
  predNormal: number;
}

export type IPrevAnalysesState = {
  listOfAnalyses: IAnalysis[];
  page: number;
  perpage: number;
  totalResults: number;
}

export let initialIPrevAnalysesState: IPrevAnalysesState = {
  listOfAnalyses: [
    // {
    //   image: "image name",
    //   patientMRN: 213231312312312,
    //   createdTime: "today bruh",
    //   study: "study Patient B",
    //   predCovid: 80,
    //   predPneumonia: 10,
    //   predNormal: 10
    // }
  ],
  page: 1,
  perpage: 10,
  totalResults: 50 // fake initial number
}

type AnalysesPayload = {
  [AnalysisTypes.Update_page]: { page: number },
  [AnalysisTypes.Update_perpage]: { perpage: number },
  [AnalysisTypes.Update_list]: { list: IAnalysis[] }
  [AnalysisTypes.Update_total]: { total: number }
}

export type AnalysisActions = ActionMap<AnalysesPayload>[
  keyof ActionMap<AnalysesPayload>
]

export const analysesReducer = (
  state: IPrevAnalysesState,
  action: AnalysisActions
) => {
  switch (action.type) {
    case AnalysisTypes.Update_page:
      return {
        ...state,
        page: action.payload.page
      }
    case AnalysisTypes.Update_perpage:
      return {
        ...state,
        perpage: action.payload.perpage
      }
    case AnalysisTypes.Update_list:
      return {
        ...state,
        listOfAnalyses: action.payload.list
      }
    case AnalysisTypes.Update_total:
      return {
        ...state,
        totalResults: action.payload.total
      }
    default:
      return state;
  }
}