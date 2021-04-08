Feature: additional feature

    Feature Description

    Scenario: Scenario name
        Given open url "http://localhost:3000"
        Then check "automation-test-name3" value not in "name" column in "Projects_Table" table on "Projects" wizard
        * create "automation-test-name3" MLRun Project with code 200
        Then click on "Refresh_Projects_Button" element on "Projects" wizard
        Then check "automation-test-name3" value in "name" column in "Projects_Table" table on "Projects" wizard
        Then remove "automation-test-name3" MLRun Project with code 204