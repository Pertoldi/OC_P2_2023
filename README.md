# OlympicGames

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.1.3.

This project has been update to Angular CLI version 16.1.1.

It was build using `npm` version 9.7.1 and `typescript` version 5.1.3 (typescript is in the dev-dependencies)

### descrition

This project is on behalf of the **TéléSport** television channel.
It is a new interactive web application to prepare for the next Olympic Games.
The purpose of this application is to provide users with a dashboard allowing them to view information from previous Olympic Games (number of medals by country, etc.).

This project contain two main pages.

1 - Dashboard: Is the default route that show the context of the application,which show of the number of medals for each country, all combined years.

2 - Detail: This page displays details of a country's participations, medals and athletes.

## Development server

use `npm i` to install all dependencies

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Project organisation

- `components` folder: contains every reusable components
- `pages` folder: contains components used for routing
- `core` folder: contains the business logic (`services`, `models` and `utils` folders)
    - `services` contains API calls
    - `models` contains interfaces use all over the application
    - `utils` contains an error handler and scss variables

All chart are made with the package [ngx-charts](https://swimlane.gitbook.io/ngx-charts/).

All commits are written with [gitmoji](https://gitmoji.dev/) An emoji guide for commit messages.
