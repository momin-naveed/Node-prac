const stripe = require('stripe')(
  'sk_test_51NhITvLNmr3eLXMKodbLOShNh1EF19evgh9xT3zOGxl2r2JnFS4Fkjae4WiPz5rkxKMIiNB0mwjolR7mo0rOA2Hr00hMuEzkkg'
);
const paymentCharge = async (req, res) => {
  try {
    const customer = await stripe.customers.create({
      email: req.body.stripeEmail,
      source: req.body.stripeToken,
      name: 'Momin Naveed',
      address: {
        line1: 'House No 63 ',
        postal_code: '64000',
        city: 'Liaquatpur',
        country: 'Pakistan',
      },
    });

    const charge = await stripe.charges.create({
      amount: 7000,
      description: 'Web Development Product',
      currency: 'USD',
      customer: customer.id,
    });

    console.log(charge);
    res.send('success');
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while processing the payment.');
  }
};
module.exports = paymentCharge;
