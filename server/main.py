from fastapi import FastAPI, HTTPException, Query
from typing import List
import json
import os
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this list based on your needs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load city data from JSON files
def load_city_data(month: str) -> List[dict]:
    try:
        with open('allCityData.json', 'r') as f:
            data = json.load(f)
        return data.get(month, [])
    except FileNotFoundError:
        raise HTTPException(status_code=500, detail="City data file not found")
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Error decoding JSON data")

@app.get("/api/city-data")
def get_city_data(month: str = Query(..., description="Month for which to fetch city data")):
    city_data = load_city_data(month)
    if not city_data:
        raise HTTPException(status_code=404, detail="No data found for the given month")
    return city_data


@app.get("/api/product-data")
def get_product_data(month: str):
    try:
        with open('allProductData.json', 'r') as file:
            all_product_data = json.load(file)
            return all_product_data.get(month, [])
    except FileNotFoundError:
        return {"error": "Data file not found"}
    except json.JSONDecodeError:
        return {"error": "Error decoding JSON"}
    

# Load customer data from JSON file
def load_customer_data(month: str) -> List[dict]:
    try:
        with open('allCountryData.json', 'r') as f:
            data = json.load(f)
        return data.get(month, [])
    except FileNotFoundError:
        raise HTTPException(status_code=500, detail="Customer data file not found")
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Error decoding JSON data")

@app.get("/api/customers")
def get_customer_data(month: str = Query(..., description="Month for which to fetch customer data")):
    customer_data = load_customer_data(month)
    if not customer_data:
        raise HTTPException(status_code=404, detail="No data found for the given month")
    return customer_data


@app.get("/api/dashboard_data")
def dashboard_data(month: str = Query(..., description="Month for which to fetch dashboard data")):
    customer_data = load_customer_data(month)

    try:
        with open('allProductData.json', 'r') as file:
            all_product_data = json.load(file)
    except FileNotFoundError:
        raise HTTPException(status_code=500, detail="Product data file not found")
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Error decoding JSON data")


    product_data = all_product_data[month]
    
    total_customer = len(customer_data)
    total_products = len(product_data)

    if total_products > 0:
        quantities = [i['quantity'] for i in product_data]
        sales = [i['sales'] for i in product_data]
        
        average_quantity = sum(quantities) / total_products
        average_sales = sum(sales) / total_products
        total_sales = sum(sales)
        total_quantity = sum(quantities)
    else:
        average_quantity = 0
        average_sales = 0
        total_sales = 0
        total_quantity = 0

    data = {
        'total_customer': total_customer,
        'total_products': total_products,
        'average_quantity': average_quantity,
        'average_sales': average_sales,
        'total_sales': total_sales,
        'total_quantity': total_quantity
    }

    return data