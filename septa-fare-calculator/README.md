# SEPTA Rail Fare Calculator Challenge

Hello! This code challenge using the latest versions of React + Vite (as of 25/09/2025) w/ Typescript on Node (22.17.0).

## Setup

```bash
npm install
```

## Running the calculator

```bash
npm run dev
```

## Timeline

* Fork repo
* Initialize Vite-based React project
* Use provided "design" to build HTML prototype
* Style HTML prototype to match "design"
* Break down individual components into modules
* Pull in data locally, then add interactivity to modules/inputs
* Add some user-friendly functionality/notices
* Swap local data for async data (from this repo)

## Thoughts

The design and challenge were straight forward, but some things were omitting for the sake of the time constraints. If this were a real project (and with more time), I would recommend going to the "design/copywriting" team and work out the specific wording on the non-SEPTA provided helper text, as well as some user-friendly additions like a savings notice for onboard vs kiosk purchases.

## Outstanding issues

* Lack of proper testing. Most was done in-situ by hand while developing.
* Some of the values are hard-coded or decentralized. Expanding the extra `data.json` file could prove beneficial for centralized updates parallel to potential `fares.json` updates.
* The number input has themed, but non-working sliding buttons due to time constraints.
* Additionally, the number input has a max value, but no limit on user input.
* CSS is not modular, but should still be widget-friendly.
* At least one explicit use of "any" type to save time.
