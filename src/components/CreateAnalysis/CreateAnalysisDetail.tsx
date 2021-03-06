import React, { Dispatch, SetStateAction, useContext, useEffect } from "react";
import avator from '../../assets/images/avator.png';
import { CreateAnalysisTypes } from "../../context/actions/types";
import { AppContext } from "../../context/context";
import RightArrowButton from "../../pages/CreateAnalysisPage/RightArrowButton";
import CreateAnalysisService, { StudyInstance } from "../../services/CreateAnalysisService";
import SelectedStudyDetail from "./SelectedStudyDetail";
import SelectionStudy from "./SelectionStudy";


interface CreateAnalysisDetailProps {
  setIsExpanded: Dispatch<SetStateAction<boolean>>,
  submitAnalysis: () => void
}

const CreateAnalysisDetail: React.FC<CreateAnalysisDetailProps> = (props) => {
  const { state: { dcmImages, createAnalysis }, dispatch } = useContext(AppContext);
  const { selectedStudyUIDs } = createAnalysis;

  useEffect(() => {
    const patientInfo = CreateAnalysisService.extractPatientPersonalInfo(dcmImages[0])
    dispatch({
      type: CreateAnalysisTypes.Update_patient_personal_info,
      payload: {
        ...patientInfo
      }
    })
  }, [dcmImages, dispatch])

  const studyInstances: StudyInstance[] = CreateAnalysisService.extractStudyInstances(dcmImages);
  const numOfSelectedImages: number = CreateAnalysisService.findTotalImages(selectedStudyUIDs);

  const { patientName, patientID, patientBirthdate, patientGender } = createAnalysis;
  const { submitAnalysis } = props;
  
  return (
    <React.Fragment>
      <div className="detail-wrapper">
        <div className="detail-top-wrapper">
          <div className="detail-top-left">
            <h1>Create a new predictive analysis</h1>
            <p>Select at least one image series below and select the "Analyze" button to receive COVID, pneumonia
            and normal predictions per image.</p>
            <div className="detail-patient">
              <div>
                <img src={avator} alt="avator" width="100px" height="100px"></img>
              </div>
              <div className="detail-patient-title">
                <h2>{patientName}</h2>
                <p>MRN#{patientID}</p>
              </div>
              <div className="detail-patient-name-age">
                <div className="detail-patient-name-age-title">
                  <h3>Patient Age</h3>
                  <h3>Patient Birthdate</h3>
                  <h3>Patient Gender</h3>
                </div>
                <div className="detail-patient-name-age-info">
                  <p> {CreateAnalysisService.calculatePatientAge(patientBirthdate)}y </p>
                  <p> {patientBirthdate} </p>
                  <p> {patientGender} </p>
                </div>
              </div>
            </div>
          </div>
          <div className="detail-top-right">
            <div className="detail-top-right-box">
              <div className="numberCircle">{numOfSelectedImages}</div>
              <h3>Series selected</h3>
              <a onClick={() => props.setIsExpanded(true)}>(More details)</a>
              <RightArrowButton click={submitAnalysis}>
                Analyze
              </RightArrowButton>
            </div>
          </div>
        </div>
        <div className="detail-bottom-wrapper">
          <div className="detail-select-studies">
            {studyInstances.map((study: StudyInstance, i) => (
              <SelectionStudy key={i} {...study}></SelectionStudy>
            ))}
          </div>
          <SelectedStudyDetail></SelectedStudyDetail>
        </div>
      </div>
    </React.Fragment>
  )
}

export default CreateAnalysisDetail;


/*
swift -A http://127.0.0.1:8080/auth/v1.0 -U chris:chris1234 -K testing upload users
/Users/jbernal/PACS/BCH/5296709-VITO.DANIEL/CT.Abdomen.thru.Symphysis.w..Contrast-20120602-1.2.840.113619.2.55.3.51037702.990.1338550396.599/COR.STD-20120602-1.2.840.113619.2.80.45556984.23031.1338680717.1.4.1/00020-1.2.840.113619.2.80.45556984.23031.1338680724.22.dcm --object-name "SERVICES/PACS/BCH/5296709-VITO.DANIEL/CT.Abdomen.thru.Symphysis.w..Contrast-20120602-1.2.840.113619.2.55.3.51037702.990.1338550396.599/COR.STD-20120602-1.2.840.113619.2.80.45556984.23031.1338680717.1.4.1/00020-1.2.840.113619.2.80.45556984.23031.1338680724.22.dcm"
*/