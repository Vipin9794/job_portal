import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
    name: "company",
    initialState: {
        singleCompany: null,
        companies: null,
        
        // selecteCompanyIdForJobPost: null,
         searchCompanyByText: ""
    },
    reducers: {
        
        setSingleCompany: (state, action) => {
            state.singleCompany = action.payload;
        },
        setCompanies: (state, action) => {
            state.companies = action.payload
        },
        // setSelectCompanyIdForJobPost: (state, action) => {
        //     state.selecteCompanyIdForJobPost = action.payload;
        // },
        setSearchCompanyByText: (state, action) => {
            state.searchCompanyByText = action.payload;
        }
    }
});
export const {
    setCompanies,
    setSingleCompany,
    // setSelectCompanyIdForJobPost,
     setSearchCompanyByText
} = companySlice.actions;

export default companySlice.reducer;