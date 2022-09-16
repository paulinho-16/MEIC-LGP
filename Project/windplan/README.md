# Instalation and Setup

## Prerequisites
- `Node.js` version 12, 14 or 16
- On some linux distributions `.Net SDK 3.1` may need to be installed manually

## Alternative 1 - vscode
1. Install `Teams Toolkit` extension
2. Apply to the [developer program](https://developer.microsoft.com/en-us/microsoft-365/dev-program)
3. Login in the Teams Toolkit extension with your new credentials
4. Press `f5` to run the application

## Alternative 2 - command line
1. Apply to the [developer program](https://developer.microsoft.com/en-us/microsoft-365/dev-program)
2. Install [teamsfx](https://github.com/OfficeDev/TeamsFx/tree/main/packages/cli) node package with: `$ npm install -g @microsoft/teamsfx-cli`
3. Run `$ teamsfx preview` inside `windplan` directory

More detailed instructions can be found at the [Microsoft tutorial](https://docs.microsoft.com/en-us/microsoftteams/platform/sbs-gs-javascript?tabs=vscode%2Cvsc%2Cviscode%2Cvcode&tutorial-step=3)