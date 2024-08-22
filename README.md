# Data Visualization Dashboard

This project is a data visualization dashboard built using React.js for the frontend and FastAPI for the backend. The dashboard provides an interactive interface for visualizing various sales and customer data.

## Tech Stack

- **Frontend:** React.js
- **Backend:** FastAPI
- **Charting Library:** Highcharts
- **Styling:** Material-UI

## Environment Variables

For the frontend, you need to set the following environment variable:

- **`REACT_APP_API_URL`**: The base URL of the backend API.

## Installation and Setup

### Prerequisites

- Node.js and npm installed on your machine.
- Python installed on your machine.
- Git installed on your machine.

### Backend Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name/server
    ```

2. Create and activate a virtual environment:

    ```bash
    python -m venv .venv
    source .venv/bin/activate  # On Windows use .venv\Scripts\activate
    ```

3. Install the required Python packages:

    ```bash
    pip install -r requirements.txt
    ```

4. Run the FastAPI server:

    ```bash
    uvicorn main:app --reload
    ```

   The server will be running at `http://localhost:8000`.

### Frontend Setup

1. Navigate to the frontend directory:

    ```bash
    cd ../client
    ```

2. Install the required npm packages:

    ```bash
    npm install
    ```

3. Create a `.env` file in the root of the client directory and add the `REACT_APP_API_URL` environment variable:

    ```env
    REACT_APP_API_URL=http://localhost:8000
    ```

4. Run the React development server:

    ```bash
    npm start
    ```

   The frontend will be running at `http://localhost:3000`.

## Project Details

This dashboard is designed to provide insightful visualizations of sales data and customer trends. Below are the main features and components of the project:

### Features

- **Responsive Design:** The dashboard adapts to different screen sizes, providing a seamless experience across devices.
- **Interactive Charts:** Users can explore sales trends with zoomable, interactive charts.
- **Data Sorting and Filtering:** Easily sort and filter customer data by various attributes like sales, quantity, and more.
- **API Integration:** Data is fetched from a FastAPI backend, which processes and serves data from JSON files.

### Components

- **Customer Details:** Displays a table with customer information. Features sorting by different columns like country, sales, and quantity.
- **Sales by Location:** Displays a map of sales distribution by city. Includes a table with city names and corresponding sales data.
- **Daily Sales Trend:** Visualizes daily sales trends using a combination of column and line charts. Provides a comparison of current sales with the previous day.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contributing

If you’d like to contribute to this project, please fork the repository and use a feature branch. Pull requests are welcome.

## Acknowledgments

- React.js for the frontend framework.
- FastAPI for the backend framework.
- Material-UI for the UI components.
- Highcharts for the charting library.
