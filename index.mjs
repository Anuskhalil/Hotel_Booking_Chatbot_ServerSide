import express from 'express'
const app = express()
import cors from 'cors'
const port = process.env.SERVER_PORT || 8080

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/webhook', (req, res, next) => {
  // console.log('req.body', req.body);
  // console.log('req.body.sessionInfo.parameters', req.body.sessionInfo.parameters);

  const params = req.body.sessionInfo.parameters;

  const { guestname, numberofguests, roomtype } = params;

  console.log("Guest Name", guestname)
  console.log("Number of Guest", numberofguests)
  console.log("Room Type", roomtype)


  const body = {
    detectIntentResponseId: '731cac51-df52-48dc-aae8-29184dab9335',
    intentInfo: {
      lastMatchedIntent: 'projects/chatbotdemo-400110/locations/us-central1/agents/cbfb4ffb-b450-4663-b52d-aaed78aa7eca/intents/07516987-647d-470d-8f68-b523464d5682',
      displayName: 'Confirmation.yes',
      confidence: 1
    },
    pageInfo: {
      currentPage: 'projects/chatbotdemo-400110/locations/us-central1/agents/cbfb4ffb-b450-4663-b52d-aaed78aa7eca/flows/00000000-0000-0000-0000-000000000000/pages/1dfaa911-281a-407f-af40-1fe6452e4d00',
      formInfo: {},
      displayName: 'Booking Confirmation Page'
    },
    sessionInfo: {
      session: 'projects/chatbotdemo-400110/locations/us-central1/agents/cbfb4ffb-b450-4663-b52d-aaed78aa7eca/sessions/bd8745-b7a-e7c-c0d-b06d878c5',
      parameters: { guestname: [Object], numberofguests: 2, roomtype: 'business' }
    },
    fulfillmentInfo: { tag: 'ServerDemo' },
    text: 'Yes',
    languageCode: 'en',
    languageInfo: {
      inputLanguageCode: 'en',
      resolvedLanguageCode: 'en',
      confidenceScore: 1
    }
  }

  res.send({
    "fulfillmentResponse": {
      "messages": [
        {
          "responseType": "RESPONSE_TYPE_UNSPECIFIED",

          // Union field message can be only one of the following:
          "text": {
            "text": [`Dear ${guestname.original} your ${roomtype} room for ${numberofguests} person is confirmed.`],
            "allowPlaybackInterruption": false
          }
        },
        {
          "responseType": "RESPONSE_TYPE_UNSPECIFIED",

          // Union field message can be only one of the following:
          "text": {
            "text": ["Enjoy your Check In till Check out with Us."],
            "allowPlaybackInterruption": false
          }
        }
      ],
      "mergeBehavior": "MERGE_BEHAVIOR_UNSPECIFIED"
    },
  })
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
