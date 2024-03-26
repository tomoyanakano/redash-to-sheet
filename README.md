
# Google Sheets & Redash Data Integration Script

This project provides a Google Apps Script that integrates Google Sheets with Redash. It fetches data from Redash queries and updates the corresponding sheets automatically.

## Overview

This script allows for automatic synchronization of data from Redash into Google Sheets. It's designed to run as a Google Sheets script, making it easy to set up and use within your Google Drive environment.

## Features

- Fetches and refreshes data from specified Redash queries.
- Updates Google Sheets with the latest data on a configurable schedule.
- Utilizes the Redash API for data retrieval.
- Supports multiple sheets and queries.

## Getting Started

### Prerequisites

- Access to Google Sheets
- A Redash account with queries set up
- The Redash API Key

### Setup

1. Clone this repository or copy the script files into your Google Apps Script editor.
2. Replace `'API_KEY'` and `'REDASH_HOST'` in the `main` function with your actual Redash API key and host.
3. Adjust the `CONFIG_SHEETN_ANE` to the name of your index sheet.

### Configuration

Create an index sheet in your Google Sheets document with the following columns:

- `ColumnA: checkbox`: CheckBox to enable/disable the synchronization for the sheet. (executed on `refreshQueries`)
- `ColumnB: sheetName`: The name of the sheet where data will be updated.
- `ColumnC: queryId`: The ID of the Redash query to fetch data from.
- `ColumnD: keyColumnIndex`: The index of the column in your sheet that will act as the unique key for data updates.

![CleanShot 2024-03-26 at 11 03 28@2x](https://github.com/tomoyanakano/redash-to-sheet/assets/47712031/2b06d21f-99f7-45c4-8986-004c6861d57c)


### Deployment with Clasp

This project uses Clasp TypeScript Template for deployment.

#### Clasp

Add your script ID:

- **Dev Environment:** `.clasp.json.dev`
- **Prod Environment:** `.clasp.json.prod`

```json
{"scriptId":" YOUR SCRIPT ID "}
```

**appscript.json**

Modify `appscript.json` as needed:

- Time Zone (default: "Asia/Tokyo")
- OAuth

#### npm

Install packages:

```
npm install
```

Run linter:

```
npm run lint
```

Deploy:

```
npm run deploy:dev
npm run deploy:prod
```

### Usage

After setting up the script, you can run the `refreshSheet` function to start the synchronization process. You can also set up a trigger in Google Apps Script to run this function on a schedule.

## Contributing

Contributions are welcome, and any contributions you make are greatly appreciated.

## License

Distributed under the MIT License. See `LICENSE` for more information.
