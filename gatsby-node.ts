export const createSchemaCustomization = ({ actions }) => {
    const { createTypes } = actions
    const typeDefs = `
      type CovidPatientsCsv implements Node {
        pref_n_patients: Int
        pref_n_current_patients: Int
        pref_n_current_heavy_patients: Int
        pref_patients_beds_ratio: Float
        pref_heavy_patients_beds_ratio: Float
      }
    `
    createTypes(typeDefs)
  }