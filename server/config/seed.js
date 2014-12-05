/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */
"use strict";

var Instagram = require('../api/instagram/instagramModel');

Instagram.find({}).remove(function() {
  Instagram.create({
         "tags":[

         ],
         "type":"image",
         "location":{
            "latitude":37.801738722,
            "longitude":-122.406219472
         },
         "filter":"Normal",
         "created_time":"1417596480",
         "link":"http://instagram.com/p/wI28p3KAbm/",
         "likes":{
            "count":32,
            "data":[
               {
                  "username":"cmoto_"
               },
               {
                  "username":"beckyping"
               },
               {
                  "username":"joyce0426",
               },
               {
                  "username":"jossieb89",
               }
            ]
         },
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
      }, function() {
      console.log('finished making 1 instagram posts');
    }
  );
});
