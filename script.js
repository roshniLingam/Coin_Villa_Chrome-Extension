// a global map to store the data {coin: price}
const map = new Map();

// a function to get data
async function getData(){
    // a secret key to access the api
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'b205929acfmshb44094a9e5bda8cp1ceabdjsneb70c8d510c7',
            'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com'
        }
    };
 
    let price;
    
    /* fetching data of BTC and addind it to map*/
    response= await fetch('https://alpha-vantage.p.rapidapi.com/query?from_currency=BTC&function=CURRENCY_EXCHANGE_RATE&to_currency=USD', options);
    response = await response.json();
    price= await getPrice(response);
    price= convertToTwoDecimalPlaces(price);
    map.set('BTC', price);
    
    /* fetching data of ETH and adding it to map*/
    response= await fetch('https://alpha-vantage.p.rapidapi.com/query?from_currency=ETH&function=CURRENCY_EXCHANGE_RATE&to_currency=USD', options);
    response = await response.json();
    price= await getPrice(response);
    price= convertToTwoDecimalPlaces(price);
    map.set('ETH', price);
    
    /*fetching data of BNB and adding it to map*/
    response= await fetch('https://alpha-vantage.p.rapidapi.com/query?from_currency=BNB&function=CURRENCY_EXCHANGE_RATE&to_currency=USD', options);
    response = await response.json();
    price= await getPrice(response);
    price= convertToTwoDecimalPlaces(price);
    map.set('BNB', price);
  
}

// a function to display the data in the form of a list
async function display(){
    await getData();
    let html="";
    for(const [key, value] of map){
        html+= `<li>${key}&nbsp;&nbsp; &dollar;${value}</li>`;
    }  
    document.querySelector('.suggestions').innerHTML=html;
} 

// call the display function to display the data
display();

// a function to round the price to 2 decimal places
function convertToTwoDecimalPlaces(price){
    price= parseFloat(price);
    return price.toFixed(2);
}

// a function to get the price from the response
async function getPrice(response){
    return response['Realtime Currency Exchange Rate']['5. Exchange Rate'];
}