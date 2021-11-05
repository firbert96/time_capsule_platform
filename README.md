# Time Capsule Platform

- Submit Code : https://github.com/firbert96/time_capsule_platform
- Backend Code : NodeJS(ExpressJS)
- Database : PostgreSQL
- Attach files : Multer and ImageKit (still have little bit problem if attachment is not required when create time capsule message)
- Send Email : MailTrap
- Documentation : postman collection (https://go.postman.co/workspace/My-Workspace~0e346384-5e7b-4b47-89ab-9a2d14617e89/collection/5431650-1ca8d34d-b6dd-47f1-85fc-e10d0a038a50)
- Test Implementation : - 
- Design Diagram : https://drive.google.com/file/d/1jyZcyb2EpbuR4pHq6LAxs-76H-ZNVo_U/view?usp=sharing

# Description
Definition:
A time capsule is a historic cache of goods or information, usually intended as a deliberate 
method of communication with future people, and to help future archaeologists, 
anthropologists, or historians. Wikipedia
* Features:
- New user can self-registration on platform by providing,
▪ Email
▪ Password
- User MUST login to call all APIs on platform.
- User can create new time capsule message,
▪ Subject
▪ Attach files (optional)
▪ Message
▪ Time Capsule Release Time 
- User can list all time capsule and filter by active/inactive and sort by release time.
- User can see specific time capsule ONLY after time release.
- User will get email notification once the time release happened.
* Tasks
- Design backend architecture to fulfil all features.
- Create APIs based on all features.
- Create unit test for all features (optional)
- Create local deployment documentation on readme.md
* Notes:
- Preferable stack: NodeJS, ExpressJS, PostgreSQL/MySQL. If you prefer to use other stack, 
please give justification for your decision.
- Container and unit test implementation are a plus.
- Submit code by using Git (You can use github, gitlab, etc)
- Submit endpoint documentation by using postman collection or swagger.
- Submit diagram by attach diagram on email.