import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import { HTTP } from 'meteor/http'; 
import { Session } from 'meteor/session';
import {ObjectID} from 'mongodb';
 

S3.config = {
  key: Meteor.settings.private.AWS.AWS_ACCESS_KEY_ID,
  secret: Meteor.settings.private.AWS.AWS_SECRET_ACCESS_KEY,
  bucket: 'faxsimpleupload'
};
var FormData = require('form-data');
var fs = require('fs');

var AWS = require('aws-sdk');
var FileReader = require('filereader');
var reader = new FileReader();
AWS.config.update({ 
  accessKeyId: Meteor.settings.private.AWS.AWS_ACCESS_KEY_ID,
  secretAccessKey: Meteor.settings.private.AWS.AWS_SECRET_ACCESS_KEY,
  "region": "us-east-1" 
});
var files = [];
var s3 = new AWS.S3(); 

export default function () {
    Meteor.methods({
      'sendPhaxio'(number, url){
        var finalfiles = [];
        for(var i = 0;i<url.length;i++){
          if(url[i] != null){
            finalfiles.push(url[i]);
          }
        }
        for(var i = 0;i<files.length;i++){
          if(files[i] != null){
          finalfiles.push(files[i]);
          }
        }
        files = [];
        console.log(finalfiles);
        check(number, String)
        check(finalfiles, [String])
         return HTTP.call( 'POST', 'https://api.phaxio.com/v2/faxes', 
              {
                auth: 
                    Meteor.settings.private.phaxio
                ,
                data: {
                    "to": number,
                    "content_url": finalfiles
                    
                }
             
          })
        },

        'uploadAWS'(result){
            var resp;
            console.log(result);
            const id = ObjectID().toHexString();
            debugger;
            buf = Buffer.from(result.replace(/^data:application\/pdf;base64/, ""), 'base64');
            console.log(buf);
            var params = {
                Bucket: 'faxsimpleupload',
                Key: id,
                Body: buf,
                ACL: 'public-read',
                ContentType:'application/pdf'                
            };
            resp = s3.upload(params, function (err, res) {
                 if (err) {
                     resp =  err;
                     console.log(err);
                 } else {
                     resp = res;
                     files.push(resp.Location);
                     console.log(files);
                     return resp.Location;

                 }
            }
            );
        },
        
    })
  }
