# festivalschedule

Priority TODO:
- build and create initial JSON db from 2019 data
- Read JSON db
    - Read & load JSON to store in client and server
    - in-memory DB should associate models from IDs, data files should not
- Render site as-is from here.
- Queue write to JSON
    - after validation checks
    - edit cache should NOT be in-memory data (maybe?)
- Navigation
    - should support Back
    - when I click on a DJ it should show me their page    

- Authentication
    - read session table
- Authorization
    - 

BUGS:
- what happens when a DJ edits their DJ name (and not an alias)?
    - this could destroy the original ID, we will need to update all IDs.

DEFINITIONS:
An "Event" is something that happens at a set time and optional location
A "Performer" is a "Person" that puts on a "Performance" on a "Stage"
A "Performance" is a type of event that has set "Performers"
A "Stage" is a Location where a real world "Performance" happens 
A "Performer" is a "Person" that puts on a "Performance" on a "Stage"
A "Schedule" is a chronologically ordered list of "Events"
A "Lineup" is a "Schedule" of "Performances" 




VIEWS:
    AuthorizationView
    - Select Association
        - to Performer Record
        - to Camp Record
    
    UserMainView
    - Show current user's data
    - allow for association workflows

    CampView
    - show camp's schedule / lineup

    AddEventView

    EventView
    - sits in a lineup 
    - show different things based on type of event

    MainView
    - allow filtering by type, genre

CONTROLLERS



- user login workflow
    - login controller
    - redirect from firefly
- user authorization workflow
    - your email is associated to...
    - or your email is not associated to anything
        - are you a performer or a camp leader? 
        - select performer and request authorization 
        - explain that once you are authenticated you will have access
            - need to send email!
    

- camp leader login workflow
    - add event to lineup
        - choose day
        - choose performer
            - or add new
        - add description
        - select genres (limit 3)
        - add keywords
    - show schedule 
        - use views
    - associate to existing camp
        - search by name
            - request auth
            - explain wait 

    - create camp / stage
        - 


- create DJ
    - 

FOMOVISION



