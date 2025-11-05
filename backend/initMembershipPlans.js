require('dotenv').config();
const mongoose = require('mongoose');
const Membership = require('./models/Membership');

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/saeif')
  .then(async () => {
    console.log('Connected to MongoDB');
    
    const plans = [
      {
        planType: '6-month',
        name: '6-Month Plan',
        price: 6000,
        duration: 6,
        features: [
          'Access to our Communication Skills Course',
          'Dedicated Mentorship and Guidance',
          'Monthly Industry-Academia Connect Sessions',
          'Access to Monthly Community Meetups & progress tracking',
          'Course Completion Certificate',
          'Peer Learning Circle via WhatsApp/Telegram',
          'Access to Select Live Events and Webinars'
        ],
        isPopular: false,
        isActive: true
      },
      {
        planType: '1-year',
        name: '1-Year Plan',
        price: 11000,
        duration: 12,
        features: [
          'Access to our Communication Skills Course',
          'Dedicated Mentorship and Guidance',
          'Monthly Industry-Academia Connect Sessions',
          'Access to Monthly Community Meetups & progress tracking',
          'Course Completion Certificate',
          'Peer Learning Circle via WhatsApp/Telegram',
          'Access to Select Live Events and Webinars',
          'Year-long access to exclusive events',
          'Quarterly One-on-One Mentorship Sessions',
          'Advanced Certification',
          'Behind-the-Scenes Access to Skill Aid Projects',
          'Extended Access to Community Forum and Digital Library'
        ],
        isPopular: true,
        isActive: true
      },
      {
        planType: 'lifetime',
        name: 'Lifetime Plan',
        price: 110000,
        duration: 0,
        features: [
          'Access to our Communication Skills Course',
          'Dedicated Mentorship and Guidance',
          'Monthly Industry-Academia Connect Sessions',
          'Access to Monthly Community Meetups & progress tracking',
          'Course Completion Certificate',
          'Peer Learning Circle via WhatsApp/Telegram',
          'Access to Select Live Events and Webinars',
          'Year-long access to exclusive events',
          'Quarterly One-on-One Mentorship Sessions',
          'Advanced Certification',
          'Behind-the-Scenes Access to Skill Aid Projects',
          'Extended Access to Community Forum and Digital Library',
          'Lifetime access to all current and future courses',
          'Lifetime invitations to all events',
          'Premium networking circles',
          'Full access to all recorded masterclasses',
          'Free entry to new Skill Aid initiatives',
          'Lifetime mentorship access',
          'Lifetime Communication Portfolio Development Support',
          'Lifetime Honorary Certificate',
          'Opportunities to co-host, volunteer or collaborate with Skill Aid teams'
        ],
        isPopular: false,
        isActive: true
      }
    ];

    for (const plan of plans) {
      await Membership.findOneAndUpdate(
        { planType: plan.planType },
        plan,
        { upsert: true, new: true }
      );
      console.log(`Plan ${plan.name} initialized`);
    }

    console.log('All membership plans initialized successfully');
    process.exit(0);
  })
  .catch(err => {
    console.error('Error initializing membership plans:', err);
    process.exit(1);
  }); 