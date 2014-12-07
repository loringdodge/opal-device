/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */
"use strict";

var Instagram = require('../api/instagram/instagramModel');

Instagram.find({}).remove(function() {
  Instagram.create({
         "tags":[ "metadata", "lame"],
         "type":"image",
         "location": { "type": "Point", "coordinates": [ -122.406219472, 37.801738722 ] }, 
         "comments":{  
            "count":3,
            "data":[  
               {  
                  "created_time":"1417600277",
                  "text":"You're getting fat too. What's going on?",
                  "from":{  
                     "username":"jtinro",
                     "profile_picture":"https://instagramimages-a.akamaihd.net/profiles/profile_182565600_75sq_1375172579.jpg",
                     "id":"182565600",
                     "full_name":"jtinro"
                  },
                  "id":"867216437115619308"
               },
               {  
                  "created_time":"1417612681",
                  "text":"@jtinro all that tasty Cali food! lol!",
                  "from":{  
                     "username":"sabr1na___",
                     "profile_picture":"https://igcdn-photos-d-a.akamaihd.net/hphotos-ak-xap1/10727445_586269351479379_913091188_a.jpg",
                     "id":"30615163",
                     "full_name":"💲@br⚠n@"
                  },
                  "id":"867320497252599746"
               },
               {  
                  "created_time":"1417665037",
                  "text":"Slacking. Not even horizontal.",
                  "from":{  
                     "username":"aphung528",
                     "profile_picture":"https://instagramimages-a.akamaihd.net/profiles/profile_28969714_75sq_1332639489.jpg",
                     "id":"28969714",
                     "full_name":"aphung528"
                  },
                  "id":"867759690416129958"
               }
            ]
         }, 
         "filter":"Normal",
         "created_time":"1417596480",
         "link":"http://instagram.com/p/wI28p3KAbm/",
         "likes":{  
            "count":32,
            "data":[  
               {  
                  "username":"cmoto_",
                  "profile_picture":"https://igcdn-photos-b-a.akamaihd.net/hphotos-ak-xfp1/10802539_800574316651529_1313784380_a.jpg",
                  "id":"239103840",
                  "full_name":"Candi"
               },
               {  
                  "username":"beckyping",
                  "profile_picture":"https://igcdn-photos-f-a.akamaihd.net/hphotos-ak-xpa1/10644038_706529209434893_309350892_a.jpg",
                  "id":"1469135676",
                  "full_name":"Becky"
               },
               {  
                  "username":"joyce0426",
                  "profile_picture":"https://instagramimages-a.akamaihd.net/profiles/profile_736933_75sq_1367500938.jpg",
                  "id":"736933",
                  "full_name":"joyce0426"
               },
               {  
                  "username":"jossieb89",
                  "profile_picture":"https://instagramimages-a.akamaihd.net/profiles/profile_226536365_75sq_1349387315.jpg",
                  "id":"226536365",
                  "full_name":"jossieb89"
               }
            ]
         }
         ,
         "images":{
            "thumbnail":{
               "url":"http://scontent-b.cdninstagram.com/hphotos-xaf1/t51.2885-15/10809918_1517215325197608_2113086054_s.jpg",
               "width":150,
               "height":150
            },
            "standard_resolution":{
               "url":"http://scontent-b.cdninstagram.com/hphotos-xaf1/t51.2885-15/10809918_1517215325197608_2113086054_n.jpg",
               "width":640,
               "height":640
            }
         },
         "users_in_photo":[

         ],
         "caption":{
            "created_time":"1417596480",
            "text":"Getting weaker by the day. Can't even hold this for a second anymore.",
            "from":{
               "username":"floofydoug",
               "profile_picture":"https://instagramimages-a.akamaihd.net/profiles/profile_217257560_75sq_1395195658.jpg",
               "id":"217257560",
               "full_name":"Doug Phung"
            },
            "id":"867184591325628135"
         },
         "user_has_liked":false,
         "sentiment": {"type":"positive","score":0.823558987,"result_code":"200","result_msg":"Success"}
      },
      {  
         "attribution":null,
         "tags":[  

         ],
         "type":"image",
         "location": {"type": "Point", "coordinates": [-122.052116389, 37.404273972]},
         "comments":{  
            "count":0,
            "data":[  

            ]
         },
         "filter":"Normal",
         "created_time":"1416825847",
         "link":"http://instagram.com/p/vx5FOAKAXr/",
         "likes":{  
            "count":12,
            "data":[  
               {  
                  "username":"royboy359",
                  "profile_picture":"https://instagramimages-a.akamaihd.net/profiles/profile_216550832_75sq_1397363867.jpg",
                  "id":"216550832",
                  "full_name":"Roy Dysangco"
               },
               {  
                  "username":"superngova",
                  "profile_picture":"https://igcdn-photos-a-a.akamaihd.net/hphotos-ak-xfa1/10570006_271372409734624_1131764432_a.jpg",
                  "id":"21646610",
                  "full_name":"Monica Ngov"
               },
               {  
                  "username":"jykrem",
                  "profile_picture":"https://igcdn-photos-e-a.akamaihd.net/hphotos-ak-xaf1/10369566_1486805294888484_1494291670_a.jpg",
                  "id":"37991259",
                  "full_name":"Star-Lord"
               },
               {  
                  "username":"aphung528",
                  "profile_picture":"https://instagramimages-a.akamaihd.net/profiles/profile_28969714_75sq_1332639489.jpg",
                  "id":"28969714",
                  "full_name":"aphung528"
               }
            ]
         },
         "images":{  
            "low_resolution":{  
               "url":"http://scontent-b.cdninstagram.com/hphotos-xaf1/t51.2885-15/10362280_1713081485584392_1034950300_a.jpg",
               "width":306,
               "height":306
            },
            "thumbnail":{  
               "url":"http://scontent-b.cdninstagram.com/hphotos-xaf1/t51.2885-15/10362280_1713081485584392_1034950300_s.jpg",
               "width":150,
               "height":150
            },
            "standard_resolution":{  
               "url":"http://scontent-b.cdninstagram.com/hphotos-xaf1/t51.2885-15/10362280_1713081485584392_1034950300_n.jpg",
               "width":640,
               "height":640
            }
         },
         "users_in_photo":[  

         ],
         "caption":{  
            "created_time":"1416825847",
            "text":"Apple watch kit hackathon.",
            "from":{  
               "username":"floofydoug",
               "profile_picture":"https://instagramimages-a.akamaihd.net/profiles/profile_217257560_75sq_1395195658.jpg",
               "id":"217257560",
               "full_name":"Doug Phung"
            },
            "id":"860720051540985324"
         },
         "user_has_liked":false,
         "id":"860720051088000491_217257560",
         "user":{  
            "username":"floofydoug",
            "website":"",
            "profile_picture":"https://instagramimages-a.akamaihd.net/profiles/profile_217257560_75sq_1395195658.jpg",
            "full_name":"Doug Phung",
            "bio":"",
            "id":"217257560"
         }, 
         "sentiment": {"type":"negative","score":-0.071533022,"result_code":"200","result_msg":"Success"}
      },
       function() {
      console.log('finished making 2 instagram posts');
    }
  );
});
