// import obj from "./page.js";
// $(function () {
//     const m = new obj();
//     m.logFn();
// }),
require("babel-core/register");
require("babel-polyfill");
$(function () {
  async function getJSON(url) {
    const promise = new Promise(function (resolve, reject) {
      console.log('getJSON撈資料');
      const handler = function () {
        if (this.readyState !== 4) {
          return;
        }
        if (this.status === 200) {
          resolve(this.response);
        } else {
          reject(new Error(this.statusText));
        }
      };
      const client = new XMLHttpRequest();
      client.open("GET", url);
      client.onreadystatechange = handler;
      client.responseType = "json";
      client.setRequestHeader("Accept", "application/json");
      client.send();

    });

    return promise;
  };
  // let getPolonix = setInterval(() => {
    getJSON("https://poloniex.com/public?command=returnTicker")
      .then(function (json) {
        let USDT_BTC = json.USDT_BTC.last;
        let BTC_ETH = json.BTC_ETH.last;

        console.log('我已經取回poloniex資料');
        //       console.log('1BTC =' + USDT_BTC + '美金');
        //       console.log('1ETH =' + BTC_ETH + 'btc' + '(也就是' + BTC_ETH*USDT_BTC +'美金)');
        document.getElementById('BTC').innerHTML = USDT_BTC;
        document.getElementById('ETH').innerHTML = BTC_ETH;
      }).catch((error) => {
        console.error('poloniex出错了', error);
      });
  // }, 2000);

  // let getblockchain = setInterval(() => {
    getJSON("https://blockchain.info/ticker").then(function (json) {
      console.log('我已經取回blockchain資料');
      let BTC_TWD_buy = json.TWD.symbol + json.TWD.buy;
      let BTC_USD_buy = json.USD.symbol + json.USD.buy;

      let BTC_TWD_sell = json.TWD.symbol + json.TWD.sell;
      let BTC_USD_sell = json.USD.symbol + json.USD.sell;

      document.getElementById('btcTWD_buy').innerHTML = BTC_TWD_buy + '買價';
      document.getElementById('btcUSD_buy').innerHTML = BTC_USD_buy + '買價';
      document.getElementById('btcTWD_sell').innerHTML = BTC_TWD_sell + '賣價';
      document.getElementById('btcUSD_sell').innerHTML = BTC_USD_sell + '賣價';
    }, function (error) {
      console.error('blockchain出错了', error);
    });
  // }, 2000);

  // let getbitoex = setInterval(() => {
    getJSON("https://www.bitoex.com/api/v1/get_rate")
      .then(function (json) {
        console.log('我已經取回bitoex資料');
        const Bitoex_buy = json.buy;
        const Bitoex_sell = json.sell;

        document.getElementById('BitoexBTC').innerHTML = Bitoex_buy;
        document.getElementById('BitoexETH').innerHTML = Bitoex_sell;
      }, function (error) {
        console.error('Bitoex出错了', error);
      });
  // }, 2000);
  
  document.getElementById("get").addEventListener('click', e=> {
    window.location.reload(true);
    
  });
  // async function getTitle(url) {
  //   console.log('getTitle撈資料');
  //   let response = await fetch(url);
  //   let html = await response.text();
  //   return html.match(/<title>([\s\S]+)<\/title>/i)[1];

  // };

  // getTitle('https://tc39.github.io/ecma262/')
  //   .then(console.log)
});