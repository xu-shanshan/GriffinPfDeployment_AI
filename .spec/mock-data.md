# Mock Data 

Mock data simulates actual application data and lives in:  
`.spec/ReleaseMapping.json`

## Explanation

1. **ExpectedVEs**
 - Groups of VEs, defining **deployment scope** & organizational structure  
 - Frontend displays: available VEs + their Services  


2. **ExpectedServices**
  This represents the mapping from **VE → [Services]**.
  - **Key**: VE name
  - **Value**: Service list under that VE
  The frontend must use this data to dynamically show the VE details.

3. **Services**
  Contains detailed information for each Service (Build info, Pipeline, Drop URL, etc.).
  The frontend needs to display and operate on this information (e.g., trigger deployments, select builds, etc.).

