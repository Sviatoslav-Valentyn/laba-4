const express = require ('express');
const exphbs = require ('express-handlebars');
const bodyParser = require ('body-parser');
const cors = require ('cors');
const path = require('path');
const stripe = require('stripe')('sk_test_51M3LD2J2LnHVmgVlM1xV3djScWMksYcPXF6TElxRCovfts4Qo9T8ABZFKGiiOjbPUJtgDyGZPtQ7FXIWCHLtZbcu00nq74ynd1');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: '2mb' }));
app.use(cors());
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended : true }));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.static(path.join(__dirname, './views')));

const messagebird = require('messagebird')(process.env.MESSAGEBIRD_API_KEY);
const userRouter = require('./routes/user.js');
const feedbackRouter = require('./routes/feedback.js');

app.use('/user', userRouter);
app.use('/feedback', feedbackRouter);

app.get('/', function(req, res) {
    res.render('step1');
  });

app.post('/step2', function(req, res) {
  const number = req.body.number;
   messagebird.verify.create(number, {
       originator : 'Code',
       template : 'Your verification code is %token.'
   }, function (err, response) {
       if (err) {
           console.log(err);
           res.render('step1', {
               error : err.errors[0].description
           });
       } else {
           console.log(response);
           res.render('step2', {
               id : response.id
           });
       }
   })
});

app.post('/step3', function(req, res) {
  const id = req.body.id;
  const token = req.body.token;
    messagebird.verify.verify(id, token, function(err, response) {
      if (err) {
        console.log(err);
        res.render('step2', {
          error: err.errors[0].description,
          id: id,
        });
      } else {
        console.log(response);
        res.render('step3');
      }
    });
  });

  app.post("/charge", (req, res) => {
    try {
      stripe.customers
        .create({
          name: req.body.name,
          email: req.body.email,
          source: req.body.stripeToken
        })
        .then(customer =>
          stripe.charges.create({
            amount: req.body.amount * 100,
            currency: "usd",
            customer: customer.id
          })
        )
        .then(() => res.render("completed.html"))
        .catch(err => console.log(err));
    } catch (err) {
      res.send(err);
    }
  });
  
module.exports = app;