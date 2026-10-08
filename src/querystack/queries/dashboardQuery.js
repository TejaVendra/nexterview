import { useQuery } from "@tanstack/react-query";
import { dashboardAnalysisScoreHelper, getInterviews } from "../helpers/dashboardAnalysisScoreHelper.js";


export const useDashboardAnalysisScores = () =>{
    return useQuery({
        queryKey:["dashboard_analysis_scores"],
        queryFn:dashboardAnalysisScoreHelper,

    },

)
}


export const useDashboardInteviewsResult = () =>{
    return useQuery({
        queryKey:["dashboard_resume_interview_results"],
        queryFn:getInterviews,
    })
}