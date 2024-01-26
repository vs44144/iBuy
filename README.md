# iBuy Ecommerce Website With Django + React + PostgreSQL

![DEMO](backend/static/images/demo/first_page_nologin.png)


# Features
* Full featured shopping cart
* Product reviews and ratings
* Top products carousel
* Product pagination
* Product search feature
* User profile with orders
* Admin product management
* Admin user management
* Admin Order details page
* Mark orders as delivered option
* Checkout process (shipping, payment method, etc)
* PayPal / credit card integration


### Download & Setup Instructions

#### 1. Clone project: 
- `git clone https://github.com/vs44144/iBuy.git`

#### 2. Setup environment
##### Create environment
- Linux, macOS: `python3 -m venv .env/`
- Windows: `python -m venv .env/`
##### Activate environment
- Linux, macOS: `source .env/bin/activate`
- Windows: `.env\Scripts\activate`
##### Install necessary requirementss 
- pip install -r requirements.txt
##### Migrate changes into database
- python manage.py migrate
##### Start the Backend
- python manage.py runserver


#### 3 Install react modules
##### Navigate into the frontend 
- cd backend/frontend
##### Install node modules
- npm install
##### Start the Frontend
- npm start