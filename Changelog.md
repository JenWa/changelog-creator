## v0.2.1 
### chore 
*  chore: Release new version v0.2.1  


## v0.2.0 
### chore 
*  chore: Clean up dependencies and add prepublish script  


*  chore: Configure tsconfig for stricter rules  


*  chore: Add .vscode to .npmignore  


*  chore: Release new version v0.2.0  


*  chore: Add keywords to package.json  


*  chore: Add .npmignore file  


### docs 
*  docs(Readme): Add a description about usage and possible configurations  


*  docs(getCommits): Add a more detailed description  


### feat 
*  feat(cli): Add help flag in order to output arg information  


### fix 
*  fix(tagPrefix): Pass to semver and add prefix to package version  


*  fix(cli): Return changelog creation function  


*  fix(UpcomingSection): Move commits related to an undefined version to Upcoming section  


*  fix(getCommits): Add Conventional commit types  


### perf 
*  perf: Prefer string templates over concatenation  


### refactor 
*  refactor: Import functions and don't use alias  


*  refactor(getCommits): Extend error message for parsing failure of commit messages  


*  refactor: Reduce code and complexity  


*  refactor: Don't use arrow function too often and remove unneeded promise statements  


## v0.1.0 
### chore 
*  chore(package): Rename repo and add missing information  


*  chore(release): Release version v0.1.0  


*  chore: Add commitlint  


*  chore(eslint): Add rule for line ending errors  


*  chore: Add pre-commit hook and fine tune linter  


*  chore: Add settings for linter and prettier  


*  chore: Reinventing the wheel :)  


### feat 
*  feat(getCommits): Display html tags in commit messages as text in markdown  


*  feat: Add posibility to sort changes per version by angular commit types  


*  feat: Add option to display commits in Changelog which don't belong to a release version yet  


*  feat: Add cli option to toggle if pre-releases should be added in Changelog  


*  feat: Filter merge commits  


*  feat: Add option to define used tag prefix via cli  


*  feat: Retreive version to be released from package.json  


*  feat: Display commits as bullet points  


*  feat: Group commits by tags and write to Changelog file  


*  feat: Add cli for changelog generation  


*  feat: List commit messages and tags in Changelog.md  


### fix 
*  fix: Add unknown commit types to others for sorted changelog  


*  fix: Create each time a new Changelog file  


*  fix: Retreive correct commits for version to be released  


*  fix: Apply correct order of tags  


### refactor 
*  refactor(utils): Move logic to retreive commits and tags to dedicated functions  


*  refactor: Provide changelog creation logic as a function  


