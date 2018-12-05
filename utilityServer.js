const express = require('express');
const app = express();
const axios = require('axios');
let responseObj = {};
let gifArr = []

const multiplyRes = (querys) => {
    let product = 1;
    let productString = ''
    for (let key in querys) {
        if (productString === '') {
            productString += querys[key];
        } else {
            productString = `${productString} * ${querys[key]}`
        }
        product *= parseInt(querys[key])
    }
    responseObj['input'] = querys;
    responseObj['productString'] = productString;
    responseObj['product'] = product;
}

const additionRes = (querys) => {
    let sum = 0;
    let sumString = ''
    for (let key in querys) {
        if (sumString === '') {
            sumString += querys[key];
        } else {
            sumString = `${sumString} + ${querys[key]}`
        }
        sum += parseInt(querys[key])
    }
    responseObj['input'] = querys;
    responseObj['sumString'] = sumString;
    responseObj['sum'] = sum;
}

const subtractionRes = (querys) => {
    let difference;
    let differenceString = ''
    for (let key in querys) {
        if (differenceString === '') {
            differenceString += querys[key];
        } else {
            differenceString = `${differenceString} - ${querys[key]}`
        }
        if (difference === undefined) {
            difference = parseInt(querys[key])
        } else {
            difference -= parseInt(querys[key])
        }
    }
    responseObj['input'] = querys;
    responseObj['differenceString'] = differenceString;
    responseObj['difference'] = difference;
}

const divisionRes = (querys) => {
    let quotient;
    let divisorString = ''
    for (let key in querys) {
        if (divisorString === '') {
            divisorString += querys[key];
        } else {
            divisorString = `${divisorString} / ${querys[key]}`
        }
        if (quotient === undefined) {
            quotient = parseInt(querys[key])
        } else {
            quotient /= parseInt(querys[key])
        }
    }
    responseObj['input'] = querys;
    responseObj['divisorString'] = divisorString;
    responseObj['quotient'] = quotient;
};


app.get('/math/:operator', (req, res) => {
    switch (req.params.operator) {
        case 'add':
            additionRes(req.query);
            break;
        case 'subtract':
            subtractionRes(req.query);
            break;
        case 'multiply':
            multiplyRes(req.query)
            break;
        case 'divide':
            divisionRes(req.query);
            break;
    }
    res.json(responseObj)
    responseObj = {}
});

app.get('/gif/', (req, res) => {
    axios
    .get(`http://api.giphy.com/v1/gifs/search?q=${req.query.search.toLowerCase()}&api_key=sadHBC83Mr8r0NPSyDUQ0M8RPGLTrw3m`)
    .then(response => {
        let arr = []
        response.data.data.forEach(el => {
            arr.push(el.images.original.url)
        })
        res.json(arr)
    });
    
})

app.listen(2000, (req, res) => {
    console.log('Server 2000 is working!')
})