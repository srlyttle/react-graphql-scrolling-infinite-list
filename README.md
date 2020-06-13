This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Overview
A simple UI to demonstrate scrolling an infinite list

## Tech Stack
* Bootstrapped with Create React App using Typescript.
* Component Library used is Ant Design, because I believe it looks fresher than any of its competitors.
* Graph ql to interact with the github api
* Apollo client - hooks version with useQuery to make requests
* waypoint - To hook into scroll events and fetch additional data as required.
* Testing Library for snapshot tests - At time of dev CRA has a compatibality issue with jest and Testing Library, hence npm test using --env=jest-environment-jsdom-sixteen
* Cyprus - e2e test to check scrolling and filtering of results

## Usage
* clone repo
* yarn
* Rename src/config/keys.copy.ts to keys.ts and add your github access token
* How to generate token : https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line