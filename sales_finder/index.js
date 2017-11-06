"use strict"
var request = require('request');
const req = require("tinyreq");
const cheerio = require("cheerio");
var fs = require('fs');
var converter = require('json-2-csv');

function display(){
    console.log("ddd")
    console.log(results)
}

var list = [
//seeds
    {url: "https://www.americanmeadows.com/wildflower-seeds/wildflower-mix/show/all"},
    {url: "https://www.americanmeadows.com/flower-seed-packets/ready-to-ship-packets/show/all"},
    {url: "https://www.americanmeadows.com/vegetables-seeds/herb-seeds/show/all"},

//grass-and-groundcover
    {url: "https://www.americanmeadows.com/grass-and-groundcover-seeds/cover-crop-seeds/show/all"},
    {url: "https://www.americanmeadows.com/grass-and-groundcover-seeds/ground-cover-seed/show/all"},
    {url: "https://www.americanmeadows.com/grass-and-groundcover-seeds/ornamental-grass-seed/show/all"},
    {url: "https://www.americanmeadows.com/grass-and-groundcover-seeds/cool-season-grass-seed/show/all"},
    {url: "https://www.americanmeadows.com/grass-and-groundcover-seeds/warm-season-grass-seed/show/all"},
    {url: "https://www.americanmeadows.com/grass-and-groundcover-seeds/lawn-grass-seed/show/all"},
    {url: "https://www.americanmeadows.com/grass-and-groundcover-seeds/pasture-grass-seeds/show/all"},
    {url: "https://www.americanmeadows.com/grass-and-groundcover-seeds/native-grass-seed/show/all"},

// //perennials
    {url: "https://www.americanmeadows.com/perennials/unique-perennials/show/all"},
    {url: "https://www.americanmeadows.com/perennials/agastache/show/all"},
    {url: "https://www.americanmeadows.com/perennials/ajuga/show/all"},
    {url: "https://www.americanmeadows.com/perennials/anemone/show/all"},
    {url: "https://www.americanmeadows.com/perennials/aster/show/all"},
    {url: "https://www.americanmeadows.com/perennials/astilbe/show/all"},
    {url: "https://www.americanmeadows.com/perennials/balloon-flower/show/all"},
    {url: "https://www.americanmeadows.com/perennials/baptisia/show/all"},
    {url: "https://www.americanmeadows.com/perennials/bee-balm/show/all"},
    {url: "https://www.americanmeadows.com/perennials/black-eyed-susan/show/all"},
    {url: "https://www.americanmeadows.com/perennials/bleeding-heart/show/all"},
    {url: "https://www.americanmeadows.com/perennials/brunnera/show/all"},
    {url: "https://www.americanmeadows.com/perennials/butterfly-bush/show/all"},
    {url: "https://www.americanmeadows.com/perennials/campanula/show/all"},
    {url: "https://www.americanmeadows.com/perennials/clematis-vines/show/all"},
    {url: "https://www.americanmeadows.com/perennials/columbine/show/all"},
    {url: "https://www.americanmeadows.com/perennials/coral-bells/show/all"},
    {url: "https://www.americanmeadows.com/perennials/coreopsis/show/all"},
    {url: "https://www.americanmeadows.com/perennials/daylily/show/all"},
    {url: "https://www.americanmeadows.com/perennials/delphinium/show/all"},
    {url: "https://www.americanmeadows.com/perennials/dianthus/show/all"},
    {url: "https://www.americanmeadows.com/perennials/echinacea/show/all"},
    {url: "https://www.americanmeadows.com/perennials/elderberry/show/all"},
    {url: "https://www.americanmeadows.com/perennials/euphorbia/show/all"},
    {url: "https://www.americanmeadows.com/perennials/ferns/show/all"},
    {url: "https://www.americanmeadows.com/perennials/foxglove/show/all"},
    {url: "https://www.americanmeadows.com/perennials/gaillardia/show/all"},
    {url: "https://www.americanmeadows.com/perennials/hardy-geranium/show/all"},
    {url: "https://www.americanmeadows.com/perennials/hardy-hibiscus/show/all"},
    {url: "https://www.americanmeadows.com/perennials/helenium/show/all"},
    {url: "https://www.americanmeadows.com/perennials/lenten-rose/show/all"},
    {url: "https://www.americanmeadows.com/perennials/hollyhock/show/all"},
    {url: "https://www.americanmeadows.com/perennials/honeysuckle-vine/show/all"},
    {url: "https://www.americanmeadows.com/perennials/hosta/show/all"},
    {url: "https://www.americanmeadows.com/perennials/hydrangea/show/all"},
    {url: "https://www.americanmeadows.com/perennials/delosperma/show/all"},
    {url: "https://www.americanmeadows.com/perennials/iris/show/all"},
    {url: "https://www.americanmeadows.com/perennials/lamium/show/all"},
    {url: "https://www.americanmeadows.com/perennials/lavender/show/all"},
    {url: "https://www.americanmeadows.com/perennials/lily/show/all"},
    {url: "https://www.americanmeadows.com/perennials/cardinal-flower/show/all"},
    {url: "https://www.americanmeadows.com/perennials/lungwort/show/all"},
    {url: "https://www.americanmeadows.com/perennials/lupine/show/all"},
    {url: "https://www.americanmeadows.com/perennials/milkweed/show/all"},
    {url: "https://www.americanmeadows.com/perennials/monkshood/show/all"},
    {url: "https://www.americanmeadows.com/perennials/ornamental-grass/show/all"},
    {url: "https://www.americanmeadows.com/perennials/penstemon/show/all"},
    {url: "https://www.americanmeadows.com/perennials/peony/show/all"},
    {url: "https://www.americanmeadows.com/perennials/phlox/show/all"},
    {url: "https://www.americanmeadows.com/perennials/primrose/show/all"},
    {url: "https://www.americanmeadows.com/perennials/russian-sage/show/all"},
    {url: "https://www.americanmeadows.com/perennials/salvia/show/all"},
    {url: "https://www.americanmeadows.com/perennials/sea-holly/show/all"},
    {url: "https://www.americanmeadows.com/perennials/sedum/show/all"},
    {url: "https://www.americanmeadows.com/perennials/shasta-daisy/show/all"},
    {url: "https://www.americanmeadows.com/perennials/shrubs/show/all"},
    {url: "https://www.americanmeadows.com/perennials/thyme/show/all"},
    {url: "https://www.americanmeadows.com/perennials/trillium/show/all"},
    {url: "https://www.americanmeadows.com/perennials/veronica/show/all"},
    {url: "https://www.americanmeadows.com/perennials/vines/show/all"},
    {url: "https://www.americanmeadows.com/perennials/viola/show/all"},
    {url: "https://www.americanmeadows.com/perennials/yarrow/show/all"},
    {url: "https://www.americanmeadows.com/perennials/woodland-wildflowers/show/all"},
//blubs
    {url: "https://www.americanmeadows.com/flower-bulbs/allium-flower-bulbs/show/all"},
    {url: "https://www.americanmeadows.com/flower-bulbs/buttercup-flower-bulbs/show/all"},
    {url: "https://www.americanmeadows.com/flower-bulbs/crocus-flower-bulbs/show/all"},
    {url: "https://www.americanmeadows.com/flower-bulbs/daffodil-flower-bulbs/show/all"},
    {url: "https://www.americanmeadows.com/flower-bulbs/fall-flowering-crocus-flower-bulbs/show/all"},
    {url: "https://www.americanmeadows.com/flower-bulbs/fritillaria-flower-bulbs/show/all"},
    {url: "https://www.americanmeadows.com/flower-bulbs/grape-hyacinth-flower-bulbs/show/all"},
    {url: "https://www.americanmeadows.com/flower-bulbs/hyacinth-flower-bulbs/show/all"},
    {url: "https://www.americanmeadows.com/flower-bulbs/iris-flower-bulbs/show/all"},
    {url: "https://www.americanmeadows.com/flower-bulbs/scilla-squill-flower-bulbs/show/all"},
    {url: "https://www.americanmeadows.com/flower-bulbs/snowdrop-flower-bulbs/show/all"},
    {url: "https://www.americanmeadows.com/flower-bulbs/spider-lily-flower-bulbs/show/all"},
    {url: "https://www.americanmeadows.com/flower-bulbs/starflower-flower-bulbs/show/all"},
    {url: "https://www.americanmeadows.com/flower-bulbs/tulip-flower-bulbs/show/all"},
    {url: "https://www.americanmeadows.com/flower-bulbs/other-fall-flower-bulbs/show/all"},
    {url: "https://www.americanmeadows.com/flower-bulbs/wood-hyacinth-flower-bulbs/show/all"},
    {url: "https://www.americanmeadows.com/flower-bulbs/anemone-flower-bulbs/show/all"},
    {url: "https://www.americanmeadows.com/flower-bulbs/begonia-flower-bulbs/show/all"},
    {url: "https://www.americanmeadows.com/flower-bulbs/caladium-bulbs/show/all"},
    {url: "https://www.americanmeadows.com/flower-bulbs/calla-lily-flower-bulbs/show/all"},
    {url: "https://www.americanmeadows.com/flower-bulbs/canna-lily-flower-bulbs/show/all"},
    {url: "https://www.americanmeadows.com/flower-bulbs/crocosmia-flower-bulbs/show/all"},
    {url: "https://www.americanmeadows.com/flower-bulbs/dahlia-flower-bulbs/show/all"},
    {url: "https://www.americanmeadows.com/flower-bulbs/elephant-ear/show/all"},
    {url: "https://www.americanmeadows.com/flower-bulbs/freesia-flower-bulbs/show/all"},
    {url: "https://www.americanmeadows.com/flower-bulbs/gladiolus-flower-bulbs/show/all"},
    {url: "https://www.americanmeadows.com/flower-bulbs/lily-flower-bulbs/show/all"},
    {url: "https://www.americanmeadows.com/flower-bulbs/nerine-guernsey-lily-flower-bulbs/show/all"},
    {url: "https://www.americanmeadows.com/flower-bulbs/rain-lily-zephyranthes-flower-bulbs/show/all"},
    {url: "https://www.americanmeadows.com/flower-bulbs/ranunculus-persian-buttercup-flower-bulbs/show/all"},
    {url: "https://www.americanmeadows.com/flower-bulbs/shamrock-flower-bulbs/show/all"},
    {url: "https://www.americanmeadows.com/flower-bulbs/other-spring-flower-bulbs/show/all"},

    //veg
    {url: "https://www.americanmeadows.com/vegetables-seeds/organic-vegetable-seeds/show/all"},
    {url: "https://www.americanmeadows.com/vegetables-seeds/heirloom-vegetable-seeds/show/all"},
    {url: "https://www.americanmeadows.com/vegetables-seeds/bean-seeds/show/all"},
    {url: "https://www.americanmeadows.com/vegetables-seeds/beet-seeds/show/all"},
    {url: "https://www.americanmeadows.com/vegetables-seeds/berries-and-grapes/show/all"},
    {url: "https://www.americanmeadows.com/vegetables-seeds/broccoli-seeds/show/all"},
    {url: "https://www.americanmeadows.com/vegetables-seeds/cabbage-seeds/show/all"},
    {url: "https://www.americanmeadows.com/vegetables-seeds/carrot-seeds/show/all"},
    {url: "https://www.americanmeadows.com/vegetables-seeds/eggplant-seeds/show/all"},
    {url: "https://www.americanmeadows.com/vegetables-seeds/cucumber-seeds/show/all"},
    {url: "https://www.americanmeadows.com/vegetables-seeds/corn-seeds/show/all"},
    {url: "https://www.americanmeadows.com/vegetables-seeds/cauliflower-seeds/show/all"},
  //  {url: "https://www.americanmeadows.com/vegetables-seeds/cauliflower-seeds/show/all"},
    {url: "https://www.americanmeadows.com/vegetables-seeds/lettuce-seeds/show/all"},
    {url: "https://www.americanmeadows.com/vegetables-seeds/melon-seeds/show/all"},
    {url: "https://www.americanmeadows.com/vegetables-seeds/mustard-seeds/show/all"},
    {url: "https://www.americanmeadows.com/vegetables-seeds/pepper-seeds/show/all"},
    {url: "https://www.americanmeadows.com/vegetables-seeds/pea-seeds/show/all"},
    {url: "https://www.americanmeadows.com/vegetables-seeds/onion-seeds/show/all"},
    {url: "https://www.americanmeadows.com/vegetables-seeds/okra-seeds/show/all"},
    {url: "https://www.americanmeadows.com/vegetables-seeds/pumpkin-seeds/show/all"},
    {url: "https://www.americanmeadows.com/vegetables-seeds/radish-seeds/show/all"},
    {url: "https://www.americanmeadows.com/vegetables-seeds/spinach-seeds/show/all"},
    {url: "https://www.americanmeadows.com/vegetables-seeds/squash-seeds/show/all"},
    {url: "https://www.americanmeadows.com/vegetables-seeds/watermelon-seeds/show/all"},
    {url: "https://www.americanmeadows.com/vegetables-seeds/turnip-seeds/show/all"},
    {url: "https://www.americanmeadows.com/vegetables-seeds/tomato-seeds/show/all"},
    {url: "https://www.americanmeadows.com/vegetables-seeds/swiss-chard-seeds/show/all"},
    {url: "https://www.americanmeadows.com/vegetables-seeds/bulk-vegetable-seeds/show/all"},
    {url: "https://www.americanmeadows.com/vegetables-seeds/bulk-herb-seeds/show/all"}
    
];
var promo_banner= [] ;
var results=[] ;
var count

list.forEach(function(index,i){

request(index.url, function (error, response, html) {
    if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html, {xml: {
            normalizeWhitespace: true,
          }
      });
      
    } 
    var banner= $('.promo-banner');
    var bjson={banner: banner.text()};
    var notdup=true;

    promo_banner.forEach(function(index,i){
    if(JSON.stringify(index)==JSON.stringify(bjson)){
        notdup=false;
        }
    })
    
    
    if(banner.text()&&notdup){
        promo_banner.push({banner: banner.text()})
    }
    //console.log(promo_banner.text()+"\n")
    var product = $('span.price').each(function(i, elem) {
        var a = $(this).prev();
        var product_shop = a.parent().parent().parent().parent().parent().attr();
        var title = a.parent().parent().parent().siblings().children().children().attr('title');
        var sale_price = a.siblings().text();
        var old_price = a.parent().siblings().text();
        var url = a.parent().parent().parent().siblings().next().next().children().children().attr('href');
        //console.log(url.text())
        //console.log(url)
        
        
        if(title){
            
            results.push({"title": title,"sale_price": sale_price,"old_price": old_price,"url": url})
            //console.log(results);
        }
        
    });
    if(i===list.length -1){

        var json2csvCallback = function (err, csv) {
            if (err) throw err;
           
            fs.writeFile("./results.csv", csv, function(err) {
                if(err) {
                    return console.log(err);
                }   
            });

        };
        
        converter.json2csv(results, json2csvCallback);
         
        
        fs.writeFile("./banners.json", JSON.stringify(promo_banner), function(err) {
                if(err) {
                    return console.log(err);
                }   
            });
    }
    }); 
    
    
    })

    
