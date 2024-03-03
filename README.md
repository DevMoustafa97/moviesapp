# MoviesApp Documentation

## Overview
MoviesApp is a React Native application that allows users to browse a list of movies fetched from an API (Natively) . It provides functionalities to view details of each movie and supports offline mode with caching.

## Features
- Fetches a list of movies from an API endpoint
- Displays movie details when a specific movie is clicked
- Works in offline mode by caching data
- Shows error state if no data or no internet connection
- Pull-to-refresh functionality to update the movie list

## Installation
To run the MoviesApp locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone <repository_url>
   ```

2. Navigate to the project directory:
   ```bash
   cd MoviesApp
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Run the application:
   ```bash
   npm start
   ```

## Usage
Once the application is running, you can:

- Browse the list of movies.
- Click on a movie to view its details.
- Pull down to refresh the movie list.
- The application will automatically switch to offline mode if there's no internet connection.

## Dependencies
The application relies on the following dependencies:

- `@react-native-async-storage/async-storage`: For caching data locally.
- `@react-native-community/netinfo`: For monitoring network connectivity.
- `react`: React library for building UI components.
- `react-native`: React Native framework for building mobile applications.
- `react-native-community/refresh-control`: For implementing pull-to-refresh functionality.
- `react-native-vector-icons`: For displaying icons in the application.

## Structure
The application is structured as follows:

- `src/`: Contains the source code of the application.
  - `components/`: Contains reusable UI components.
  - `hooks/`: Contains custom React hooks.
  - `screens/`: Contains the main screens of the application.
  - `types/`: Contains TypeScript type definitions.
  - `App.tsx`: Entry point of the application.
- `ios/`: Contains iOS-specific configuration and code.
- `android/`: Contains Android-specific configuration and code.

## Contributing
Contributions to the MoviesApp project are welcome! If you find any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request on GitHub.

## License
This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
