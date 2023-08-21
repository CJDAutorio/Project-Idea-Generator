/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/




const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const OpenAI = require('openai')

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// configure openai api
let apiKey = process.env.OPENAI_API_KEY;
const openai = new OpenAI({ apiKey });

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

app.post('/openai', async function(req, res) {
  let { userRole, userSkill, industryType, projectScope } = req.body;

  if (userSkill === 'nopref') {
    userSkill = ''
  }

  if (industryType === 'nopref') {
    industryType = ''
  }

  if (projectScope === 'nopref') {
    projectScope = ''
  } else {
    projectScope = projectScope + '-scope'
  }
  
  // make openai request
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        "role": "user",
        "content": `I am a ${userSkill} ${userRole}. Generate a ${projectScope} project for a hypothetical ${industryType} company that I can use to practice my skills in a simulated professional environment. Format the project in the following JSON:\n\nproj_name: The name of the project. This must be a string.\nproj_company: The name of the hypothetical company. This must be a string.\nproj_desc: A short description of the project. This must be a string.\nproj_features: If the project is an app or website, what pages/features should be included? This must be an array with a max length of 6.\nproj_platform: The platform(s) the project will be on. This must be an array with a max length of 3.\nproj_deliverables: The deliverables expected from me. This must be an array with a max length of 4.\nproj_theme: The design theme(s) for the project. This must be a string.\nproj_colors: The project or company's color scheme. This must be an array with a max length of 3.  Colors must be in hex color code format.\nproj_add_info: Any additional information for the project. This must be a string.`
      }
    ],
    temperature: 1,
    max_tokens: 512,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  console.log('response:', response);

  console.log('response text:', response.choices[0].message.content);

  // parse message into appropriate JSON format
  const jsonResponse = JSON.parse(response.choices[0].message.content);

  console.log('jsonResponse:', jsonResponse);

  res.json({body: jsonResponse});
});

app.post('/openai/*', function(req, res) {
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
