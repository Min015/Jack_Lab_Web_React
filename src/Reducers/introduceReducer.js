const initialState = {};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
	switch (action.type) {
		case "SAVE_LabIntroduce":
			return { ...state, LabIntroduceList: action.payload };
		case "SAVE_TeacherIntroduce":
			return { ...state, TeacherIntroduceList: action.payload };
		default:
			return state;
	}
};