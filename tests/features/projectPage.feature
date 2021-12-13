Feature: MLRun Project Page

    Testcases that verifies functionality on MLRun Project Page

    @passive
    @sanity
    Scenario: Check all mandatory components
        Given open url
        And click on cell with value "default" in "name" column in "Projects_Table" table on "Projects" wizard
        And wait load page
        Then verify "Create_New" element visibility on "Project" wizard
        Then verify "Refresh_Button" element visibility on "Project" wizard
        Then verify "Dashboard_Realtime_Functions_Table" element visibility on "Project" wizard
        Then verify "Jobs_And_Workflows" element visibility on "Project" wizard
        Then verify "Mono_Values_Cards" element visibility on "Project" wizard
        Then verify "Jobs_Info_Card_Statistics" element visibility on "Project" wizard
        Then verify "Real_Time_Functions_Card_Statistics" element visibility on "Project" wizard
        Then verify "General_Info_Quick_Links" element visibility on "Project" wizard

    @passive
    @inProgress
    @enabledProjectMembership
    Scenario: Check all mandatory components on Project Owner Popup
        Given open url
        And click on cell with value "default" in "name" column in "Projects_Table" table on "Projects" wizard
        And wait load page
        Then click on "Owner_Link" element on "Project" wizard
        Then verify if "Change_Project_Owner_Popup" popup dialog appears
        Then verify "Cross_Cancel_Button" element visibility on "Change_Project_Owner_Popup" wizard
        Then verify "Title" element visibility on "Change_Project_Owner_Popup" wizard
        Then verify "Discard_Button" element visibility on "Change_Project_Owner_Popup" wizard
        Then verify "Apply_Button" element visibility on "Change_Project_Owner_Popup" wizard
        Then verify "Footer_Annotation_Label" element visibility on "Change_Project_Owner_Popup" wizard

    @passive
    @inProgress
    @enabledProjectMembership
    Scenario: Check all mandatory components on Project Owner Popup
        Given open url
        And click on cell with value "default" in "name" column in "Projects_Table" table on "Projects" wizard
        And wait load page
        Then click on "Members_Link" element on "Project" wizard
        Then verify if "Project_Members_Popup" popup dialog appears
        Then verify "Member_Overview_Labels_Table" element visibility on "Project_Members_Popup" wizard
        Then verify "Member_Overview_Tooltip" on "Project_Members_Popup" wizard should display "Label_Hint"."Members_Hint"
        Then verify "Invite_New_Members_Button" element visibility on "Project_Members_Popup" wizard
        Then verify "Members_Filter_Input" element visibility on "Project_Members_Popup" wizard
        Then verify "Role_Filter_Dropdown" element visibility on "Project_Members_Popup" wizard
        Then verify "Members_Table" element visibility on "Project_Members_Popup" wizard
        Then verify "Notify_by_Email" element visibility on "Project_Members_Popup" wizard
        Then verify "Discard_Button" element visibility on "Project_Members_Popup" wizard
        Then verify "Apply_Button" element visibility on "Project_Members_Popup" wizard
        Then verify "Footer_Annotation_Label" element visibility on "Project_Members_Popup" wizard

    @passive
    Scenario: Check MLRun logo redirection
        Given open url
        And wait load page
        And click on cell with value "default" in "name" column in "Projects_Table" table on "Projects" wizard
        And wait load page
        And click on "MLRun_Logo" element on "commonPagesHeader" wizard
        And wait load page
        Then verify "Projects_Table" element visibility on "Projects" wizard

    @passive
    Scenario: Check all mandatory components on Register File Popup
        Given open url
        And click on cell with value "default" in "name" column in "Projects_Table" table on "Projects" wizard
        And wait load page
        Then verify "Create_New" element visibility on "Project" wizard
        Then verify "Create_New" dropdown element on "Project" wizard should contains "Project"."Create_New_Options"
        Then select "Register File" option in "Create_New" dropdown on "Project" wizard
        Then verify if "Register_File_Popup" popup dialog appears
        Then verify "Cross_Cancel_Button" element visibility on "Register_File_Popup" wizard
        Then verify "New_File_Name_Input" element visibility on "Register_File_Popup" wizard
        Then verify "New_File_Name_Input" on "Register_File_Popup" wizard should display "Input_Hint"."Artifact_Names_Unique"
        Then verify "New_File_Target_Path_Input" element visibility on "Register_File_Popup" wizard
        Then verify "New_File_Description_Input" element visibility on "Register_File_Popup" wizard
        Then verify "New_File_Type_Dropdown" element visibility on "Register_File_Popup" wizard
        Then verify "Cancel_Button" element visibility on "Register_File_Popup" wizard
        Then verify "Register_Button" element visibility on "Register_File_Popup" wizard
        Then click on "Register_Button" element on "Register_File_Popup" wizard
        Then verify "New_File_Name_Input" on "Register_File_Popup" wizard should display warning "Input_Hint"."Input_Field_Require"
        Then verify "New_File_Target_Path_Input" on "Register_File_Popup" wizard should display warning "Input_Hint"."Input_Field_Require"
        Then type value "   " to "New_File_Name_Input" field on "Register_File_Popup" wizard
        Then verify "New_File_Name_Input" on "Register_File_Popup" wizard should display warning "Input_Hint"."Input_Field_Invalid"
        Then type value "   " to "New_File_Target_Path_Input" field on "Register_File_Popup" wizard
        Then verify "New_File_Target_Path_Input" on "Register_File_Popup" wizard should display warning "Input_Hint"."Input_Field_Invalid"
        Then type value "   " to "New_File_Description_Input" field on "Register_File_Popup" wizard
        Then verify "New_File_Description_Input" on "Register_File_Popup" wizard should display warning "Input_Hint"."Input_Field_Invalid"
        Then verify "New_File_Type_Dropdown" dropdown element on "Register_File_Popup" wizard should contains "Register_File"."Type_Options"

    @passive
    Scenario: Check all mandatory components on Register Model Popup
        Given open url
        And click on cell with value "default" in "name" column in "Projects_Table" table on "Projects" wizard
        And wait load page
        Then verify "Create_New" element visibility on "Project" wizard
        Then verify "Create_New" dropdown element on "Project" wizard should contains "Project"."Create_New_Options"
        Then select "Register Model" option in "Create_New" dropdown on "Project" wizard
        Then verify if "Register_Model_Popup" popup dialog appears
        Then verify "Cross_Cancel_Button" element visibility on "Register_Model_Popup" wizard
        Then verify "New_File_Name_Input" element visibility on "Register_Model_Popup" wizard
        Then verify "New_File_Name_Input" on "Register_Model_Popup" wizard should display "Input_Hint"."Artifact_Names_Unique"
        Then verify "New_File_Target_Path_Input" element visibility on "Register_Model_Popup" wizard
        Then verify "New_File_Description_Input" element visibility on "Register_Model_Popup" wizard
        Then verify "Cancel_Button" element visibility on "Register_Model_Popup" wizard
        Then verify "Register_Button" element visibility on "Register_Model_Popup" wizard
        Then click on "Register_Button" element on "Register_Model_Popup" wizard
        Then verify "New_File_Name_Input" on "Register_Model_Popup" wizard should display warning "Input_Hint"."Input_Field_Require"
        Then verify "New_File_Target_Path_Input" on "Register_Model_Popup" wizard should display warning "Input_Hint"."Input_Field_Require"
        Then type value "   " to "New_File_Name_Input" field on "Register_Model_Popup" wizard
        Then verify "New_File_Name_Input" on "Register_Model_Popup" wizard should display warning "Input_Hint"."Input_Field_Invalid"
        Then type value "   " to "New_File_Target_Path_Input" field on "Register_Model_Popup" wizard
        Then verify "New_File_Target_Path_Input" on "Register_Model_Popup" wizard should display warning "Input_Hint"."Input_Field_Invalid"
        Then type value "   " to "New_File_Description_Input" field on "Register_Model_Popup" wizard
        Then verify "New_File_Description_Input" on "Register_Model_Popup" wizard should display warning "Input_Hint"."Input_Field_Invalid"

    @passive
    Scenario: Check all mandatory components on Register Dataset Popup
        Given open url
        And click on cell with value "default" in "name" column in "Projects_Table" table on "Projects" wizard
        And wait load page
        Then verify "Create_New" element visibility on "Project" wizard
        Then verify "Create_New" dropdown element on "Project" wizard should contains "Project"."Create_New_Options"
        Then select "Register Dataset" option in "Create_New" dropdown on "Project" wizard
        Then verify if "Register_Dataset" popup dialog appears
        Then verify "Name_Input" element visibility on "Register_Dataset" wizard
        Then verify "Name_Input" on "Register_Dataset" wizard should display "Input_Hint"."Artifact_Names_Unique"
        Then verify "Target_Path_Input" element visibility on "Register_Dataset" wizard
        Then verify "Description_Input" element visibility on "Register_Dataset" wizard
        Then verify "Cancel_Button" element visibility on "Register_Dataset" wizard
        Then verify "Register_Button" element visibility on "Register_Dataset" wizard
        Then click on "Register_Button" element on "Register_Dataset" wizard
        Then verify "Name_Input" on "Register_Dataset" wizard should display warning "Input_Hint"."Input_Field_Require"
        Then verify "Target_Path_Input" on "Register_Dataset" wizard should display warning "Input_Hint"."Input_Field_Require"
        Then type value "   " to "Name_Input" field on "Register_Dataset" wizard
        Then verify "Name_Input" on "Register_Dataset" wizard should display warning "Input_Hint"."Input_Field_Invalid"
        Then type value "   " to "Target_Path_Input" field on "Register_Dataset" wizard
        Then verify "Target_Path_Input" on "Register_Dataset" wizard should display warning "Input_Hint"."Input_Field_Invalid"
        Then type value "   " to "Description_Input" field on "Register_Dataset" wizard
        Then verify "Description_Input" on "Register_Dataset" wizard should display warning "Input_Hint"."Input_Field_Invalid"

    @passive
    Scenario: Check all mandatory components on Create New Job
        Given open url
        And click on cell with value "default" in "name" column in "Projects_Table" table on "Projects" wizard
        And wait load page
        Then verify "Create_New" element visibility on "Project" wizard
        Then verify "Create_New" dropdown element on "Project" wizard should contains "Project"."Create_New_Options"
        Then select "Job" option in "Create_New" dropdown on "Project" wizard
        When expand row with "Data Preparation" at "name" in "Functions_Templates_Table" in "Function_Templates_Accordion" on "Create_Job" wizard
        When select "aggregate" in subcolumn "name" at "templates_list" column in "Data Preparation" row by "name" at "Functions_Templates_Table" in "Function_Templates_Accordion" on "Create_Job" wizard
        And wait load page
        Then verify "Default_Input_Path_Input" element visibility in "Data_Inputs_Accordion" on "New_JobTemplate_Edit" wizard
        Then verify "Default_Artifact_Path_Input" element visibility in "Data_Inputs_Accordion" on "New_JobTemplate_Edit" wizard
        When collapse "Data_Inputs_Accordion" on "New_JobTemplate_Edit" wizard
        Then verify "Job_Predefined_Parameters_Table" element visibility in "Parameters_Accordion" on "New_JobTemplate_Edit" wizard
        Then verify "Job_Custom_Parameters_Table" element visibility in "Parameters_Accordion" on "New_JobTemplate_Edit" wizard
        Then verify "Parameters_Additional_Settings_Input" element visibility in "Parameters_Accordion" on "New_JobTemplate_Edit" wizard
        Then verify "Result_Input" element visibility in "Parameters_Accordion" on "New_JobTemplate_Edit" wizard
        Then verify "Turning_Strategy_Dropdown" element visibility in "Parameters_Accordion" on "New_JobTemplate_Edit" wizard
        Then verify "Criteria_Dropdown" element visibility in "Parameters_Accordion" on "New_JobTemplate_Edit" wizard
        When collapse "Parameters_Accordion" on "New_JobTemplate_Edit" wizard
        When expand "Resources_Accordion" on "New_JobTemplate_Edit" wizard
        Then verify "Volumes_Subheader" element visibility in "Resources_Accordion" on "New_JobTemplate_Edit" wizard
        Then verify "Volume_Paths_Table" element visibility in "Resources_Accordion" on "New_JobTemplate_Edit" wizard
        Then verify "Memory_Unit_Dropdown" element visibility in "Resources_Accordion" on "New_JobTemplate_Edit" wizard
        Then verify "Memory_Request_Number_Input" element visibility in "Resources_Accordion" on "New_JobTemplate_Edit" wizard
        Then verify "Memory_Limit_Number_Input" element visibility in "Resources_Accordion" on "New_JobTemplate_Edit" wizard
        Then verify "CPU_Unit_Dropdown" element visibility in "Resources_Accordion" on "New_JobTemplate_Edit" wizard
        Then verify "CPU_Request_Number_Input" element visibility in "Resources_Accordion" on "New_JobTemplate_Edit" wizard
        Then verify "CPU_Limit_Number_Input" element visibility in "Resources_Accordion" on "New_JobTemplate_Edit" wizard
        Then verify "GPU_Limit_Number_Input" element visibility in "Resources_Accordion" on "New_JobTemplate_Edit" wizard
        Then verify "Resources_Node_Selector_Table" element visibility in "Resources_Accordion" on "New_JobTemplate_Edit" wizard
        When collapse "Resources_Accordion" on "New_JobTemplate_Edit" wizard
        When expand "Advanced_Accordion" on "New_JobTemplate_Edit" wizard
        Then verify "Advanced_Environment_Variables_Table" element visibility in "Advanced_Accordion" on "New_JobTemplate_Edit" wizard
        Then verify "Access_Key_Checkbox" element visibility on "New_JobTemplate_Edit" wizard
        Then uncheck "Access_Key_Checkbox" element on "New_JobTemplate_Edit" wizard
        Then verify "Access_Key_Input" element visibility on "New_JobTemplate_Edit" wizard
        Then verify "Schedule_For_Later_Button" element visibility on "New_JobTemplate_Edit" wizard
        Then verify "Run_Now_Button" element visibility on "New_JobTemplate_Edit" wizard

    @passive
    Scenario: Check all mandatory components on Create ML Function
        Given open url
        And click on cell with value "default" in "name" column in "Projects_Table" table on "Projects" wizard
        And wait load page
        Then verify "Create_New" element visibility on "Project" wizard
        Then verify "Create_New" dropdown element on "Project" wizard should contains "Project"."Create_New_Options"
        Then select "ML Function" option in "Create_New" dropdown on "Project" wizard
        Then verify if "Create_ML_Function_Popup" popup dialog appears
        And verify "Cross_Cancel_Button" element visibility on "Create_ML_Function_Popup" wizard
        Then verify "New_Function_Name_Input" element visibility on "Create_ML_Function_Popup" wizard
        Then type value "   " to "New_Function_Name_Input" field on "Create_ML_Function_Popup" wizard
        Then verify "New_Function_Name_Input" on "Create_ML_Function_Popup" wizard should display warning "Input_Hint"."Input_Field_Invalid"
        Then verify "New_Function_Name_Input" on "Create_ML_Function_Popup" wizard should display "Input_Hint"."Function_Name_Hint"
        Then verify "New_Function_Name_Input" according hint rules on "Create_ML_Function_Popup" wizard
        Then type value "   " to "New_Function_Tag_Input" field on "Create_ML_Function_Popup" wizard
        Then verify "New_Function_Tag_Input" on "Create_ML_Function_Popup" wizard should display warning "Input_Hint"."Input_Field_Invalid"
        Then verify "New_Function_Runtime_Dropdown" element visibility on "Create_ML_Function_Popup" wizard
        Then verify "Cancel_Button" element visibility on "Create_ML_Function_Popup" wizard
        Then verify "Continue_Button" element visibility on "Create_ML_Function_Popup" wizard
        And type value "demo-function-02" to "New_Function_Name_Input" field on "Create_ML_Function_Popup" wizard
        And type value "latest" to "New_Function_Tag_Input" field on "Create_ML_Function_Popup" wizard
        And click on "Continue_Button" element on "Create_ML_Function_Popup" wizard
        Then verify "New_Function_Description_Text_Area" element visibility in "General_Accordion" on "New_Function" wizard
        Then verify "Labels_Table" element visibility in "General_Accordion" on "New_Function" wizard
        When collapse "General_Accordion" on "New_Function" wizard
        Then verify "New_Function_Code_Entry_Dropdown" element visibility in "Code_Accordion" on "New_Function" wizard
        Then verify "New_Function_Handler_Input" element visibility in "Code_Accordion" on "New_Function" wizard
        Then verify "Build_A_New_Image_Radiobutton" element visibility in "Code_Accordion" on "New_Function" wizard
        Then verify "Use_An_Existing_Image_Radiobutton" element visibility in "Code_Accordion" on "New_Function" wizard
        Then verify "New_Function_Image_Name_Input" element visibility in "Code_Accordion" on "New_Function" wizard
        Then verify "New_Function_Resulting_Image_Input" element visibility in "Code_Accordion" on "New_Function" wizard
        Then verify "New_Function_Build_Commands_Text_Area" element visibility in "Code_Accordion" on "New_Function" wizard
        Then verify "New_Function_Base_Image_Input" element visibility in "Code_Accordion" on "New_Function" wizard
        When collapse "Code_Accordion" on "New_Function" wizard
        Then verify "Volumes_Subheader" element visibility in "Resources_Accordion" on "New_Function" wizard
        Then verify "Volume_Paths_Table" element visibility in "Resources_Accordion" on "New_Function" wizard
        Then verify "Memory_Unit_Dropdown" element visibility in "Resources_Accordion" on "New_Function" wizard
        Then verify "Memory_Limit_Number_Input" element visibility in "Resources_Accordion" on "New_Function" wizard
        Then verify "Memory_Request_Number_Input" element visibility in "Resources_Accordion" on "New_Function" wizard
        Then verify "CPU_Unit_Dropdown" element visibility in "Resources_Accordion" on "New_Function" wizard
        Then verify "CPU_Request_Number_Input" element visibility in "Resources_Accordion" on "New_Function" wizard
        Then verify "CPU_Limit_Number_Input" element visibility in "Resources_Accordion" on "New_Function" wizard
        Then verify "GPU_Limit_Number_Input" element visibility in "Resources_Accordion" on "New_Function" wizard
        When collapse "Resources_Accordion" on "New_Function" wizard
        Then verify "Function_Environment_Variables_Table" element visibility in "Environment_Variables_Accordion" on "New_Function" wizard
        When collapse "Environment_Variables_Accordion" on "New_Function" wizard
        Then verify "Access_Key_Checkbox" element visibility on "New_Function" wizard
        Then verify "Cancel_Button" element visibility on "New_Function" wizard
        Then verify "Save_Button" element visibility on "New_Function" wizard
        Then verify "Deploy_Button" element visibility on "New_Function" wizard

    @passive
    @demo
    Scenario: Check all mandatory components on Create ML Function on Demo mode
        Given open url
        And turn on demo mode
        And click on cell with value "default" in "name" column in "Projects_Table" table on "Projects" wizard
        And wait load page
        Then verify "Create_New" element visibility on "Project" wizard
        Then verify "Create_New" dropdown element on "Project" wizard should contains "Project"."Create_New_Options"
        Then select "ML Function" option in "Create_New" dropdown on "Project" wizard
        Then verify if "Create_ML_Function_Popup" popup dialog appears
        And verify "Cross_Cancel_Button" element visibility on "Create_ML_Function_Popup" wizard
        Then verify "New_Function_Name_Input" element visibility on "Create_ML_Function_Popup" wizard
        Then type value "   " to "New_Function_Name_Input" field on "Create_ML_Function_Popup" wizard
        Then verify "New_Function_Name_Input" on "Create_ML_Function_Popup" wizard should display warning "Input_Hint"."Input_Field_Invalid"
        Then verify "New_Function_Name_Input" on "Create_ML_Function_Popup" wizard should display "Input_Hint"."Function_Name_Hint"
        Then verify "New_Function_Name_Input" according hint rules on "Create_ML_Function_Popup" wizard
        Then type value "   " to "New_Function_Tag_Input" field on "Create_ML_Function_Popup" wizard
        Then verify "New_Function_Tag_Input" on "Create_ML_Function_Popup" wizard should display warning "Input_Hint"."Input_Field_Invalid"
        Then verify "New_Function_Runtime_Dropdown" element visibility on "Create_ML_Function_Popup" wizard
        Then verify "Cancel_Button" element visibility on "Create_ML_Function_Popup" wizard
        Then verify "Continue_Button" element visibility on "Create_ML_Function_Popup" wizard
        And type value "demo-function-02" to "New_Function_Name_Input" field on "Create_ML_Function_Popup" wizard
        And type value "latest" to "New_Function_Tag_Input" field on "Create_ML_Function_Popup" wizard
        And select "Serving" option in "New_Function_Runtime_Dropdown" dropdown on "Create_ML_Function_Popup" wizard
        And click on "Continue_Button" element on "Create_ML_Function_Popup" wizard
        Then verify "New_Function_Description_Text_Area" element visibility in "General_Accordion" on "New_Function" wizard
        Then verify "Labels_Table" element visibility in "General_Accordion" on "New_Function" wizard
        When collapse "General_Accordion" on "New_Function" wizard
        Then verify "New_Function_Code_Entry_Dropdown" element visibility in "Code_Accordion" on "New_Function" wizard
        Then verify "New_Function_Default_Class_Input" element visibility in "Code_Accordion" on "New_Function" wizard
        Then verify "Build_A_New_Image_Radiobutton" element visibility in "Code_Accordion" on "New_Function" wizard
        Then verify "Use_An_Existing_Image_Radiobutton" element visibility in "Code_Accordion" on "New_Function" wizard
        Then verify "New_Function_Image_Name_Input" element visibility in "Code_Accordion" on "New_Function" wizard
        Then verify "New_Function_Resulting_Image_Input" element visibility in "Code_Accordion" on "New_Function" wizard
        Then verify "New_Function_Build_Commands_Text_Area" element visibility in "Code_Accordion" on "New_Function" wizard
        Then verify "New_Function_Base_Image_Input" element visibility in "Code_Accordion" on "New_Function" wizard
        When collapse "Code_Accordion" on "New_Function" wizard
        Then verify "Volumes_Subheader" element visibility in "Resources_Accordion" on "New_Function" wizard
        Then verify "Volume_Paths_Table" element visibility in "Resources_Accordion" on "New_Function" wizard
        Then verify "Memory_Unit_Dropdown" element visibility in "Resources_Accordion" on "New_Function" wizard
        Then verify "Memory_Limit_Number_Input" element visibility in "Resources_Accordion" on "New_Function" wizard
        Then verify "Memory_Request_Number_Input" element visibility in "Resources_Accordion" on "New_Function" wizard
        Then verify "CPU_Unit_Dropdown" element visibility in "Resources_Accordion" on "New_Function" wizard
        Then verify "CPU_Request_Number_Input" element visibility in "Resources_Accordion" on "New_Function" wizard
        Then verify "CPU_Limit_Number_Input" element visibility in "Resources_Accordion" on "New_Function" wizard
        Then verify "GPU_Limit_Number_Input" element visibility in "Resources_Accordion" on "New_Function" wizard
        When collapse "Resources_Accordion" on "New_Function" wizard
        Then verify "Function_Environment_Variables_Demo_Table" element visibility in "Environment_Variables_Accordion" on "New_Function" wizard
        When collapse "Environment_Variables_Accordion" on "New_Function" wizard
        Then verify "Topology_Router_Type_Dropdown" element visibility in "Serving_Runtime_Configuration_Accordion" on "New_Function" wizard
        Then verify "Serving_Runtime_Configuration_Model_Table" element visibility in "Serving_Runtime_Configuration_Accordion" on "New_Function" wizard
        Then verify "Model_Tracking_Checkbox" element visibility in "Serving_Runtime_Configuration_Accordion" on "New_Function" wizard
        Then verify "Secrets_Runtime_Configuration_Table" element visibility in "Serving_Runtime_Configuration_Accordion" on "New_Function" wizard
        Then verify "Stream_Path_Input" element visibility in "Serving_Runtime_Configuration_Accordion" on "New_Function" wizard
        Then verify "Stream_Path_Input" element in "Serving_Runtime_Configuration_Accordion" on "New_Function" wizard should display hint "Input_Hint"."Stream_Path_Hint"
        Then verify "Parameters_Runtime_Configuration_Table" element visibility in "Serving_Runtime_Configuration_Accordion" on "New_Function" wizard
        Then verify "Access_Key_Checkbox" element visibility on "New_Function" wizard
        Then verify "Cancel_Button" element visibility on "New_Function" wizard
        Then verify "Save_Button" element visibility on "New_Function" wizard
        Then verify "Deploy_Button" element visibility on "New_Function" wizard

    @passive
    Scenario: Check all mandatory components on Create New Job
        Given open url
        And click on cell with value "default" in "name" column in "Projects_Table" table on "Projects" wizard
        And wait load page
        Then verify "Create_New" element visibility on "Project" wizard
        Then verify "Create_New" dropdown element on "Project" wizard should contains "Project"."Create_New_Options"
        Then select "Feature Set" option in "Create_New" dropdown on "Project" wizard
        Then verify "Cross_Close_Button" element visibility on "New_Feature_Set" wizard
        Then verify "Feature_Set_Name_Input" element visibility on "New_Feature_Set" wizard
        Then verify "Version_Input" element visibility on "New_Feature_Set" wizard
        Then verify "Description_Input" element visibility on "New_Feature_Set" wizard
        Then verify "Labels_Table" element visibility on "New_Feature_Set" wizard
        Then verify "Accordion_Header" element visibility in "Data_Source_Accordion" on "New_Feature_Set" wizard
        Then verify "Collapse_Button" element visibility in "Data_Source_Accordion" on "New_Feature_Set" wizard
        Then verify "URL_Combobox" element visibility in "Data_Source_Accordion" on "New_Feature_Set" wizard
        Then verify "Attributes_Input" element visibility in "Data_Source_Accordion" on "New_Feature_Set" wizard
        Then type value "   " to "Attributes_Input" field on "Data_Source_Accordion" on "New_Feature_Set" wizard
        Then verify "Attributes_Input" element in "Data_Source_Accordion" on "New_Feature_Set" wizard should display warning "Input_Hint"."Input_Field_Invalid"
        When collapse "Data_Source_Accordion" on "New_Feature_Set" wizard
        Then verify "Data_Source_Accordion" is collapsed on "New_Feature_Set" wizard
        Then verify "Accordion_Header" element visibility in "Schema_Accordion" on "New_Feature_Set" wizard
        Then verify "Collapse_Button" element visibility in "Schema_Accordion" on "New_Feature_Set" wizard
        Then verify "Entities_Input" element visibility in "Schema_Accordion" on "New_Feature_Set" wizard
        Then verify "Timestamp_Input" element visibility in "Schema_Accordion" on "New_Feature_Set" wizard
        When collapse "Schema_Accordion" on "New_Feature_Set" wizard
        Then verify "Schema_Accordion" is collapsed on "New_Feature_Set" wizard
        Then verify "Accordion_Header" element visibility in "Target_Store_Accordion" on "New_Feature_Set" wizard
        Then verify "Collapse_Button" element visibility in "Target_Store_Accordion" on "New_Feature_Set" wizard
        Then verify "Online_Checkbox" element visibility in "Target_Store_Accordion" on "New_Feature_Set" wizard
        Then verify "Offline_Checkbox" element visibility in "Target_Store_Accordion" on "New_Feature_Set" wizard
        Then verify "External_Offline_Checkbox" element visibility in "Target_Store_Accordion" on "New_Feature_Set" wizard
        When collapse "Target_Store_Accordion" on "New_Feature_Set" wizard
        Then verify "Target_Store_Accordion" is collapsed on "New_Feature_Set" wizard
        Then verify "Access_Key_Checkbox" element visibility on "New_Feature_Set" wizard
        Then verify "Cancel_Button" element visibility on "New_Feature_Set" wizard
        Then verify "Save_Button" element visibility on "New_Feature_Set" wizard
        Then verify "Save_And_Ingest_Button" element visibility on "New_Feature_Set" wizard