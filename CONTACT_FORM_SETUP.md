# Contact Form Setup Guide

## To receive messages from your contact form, follow these steps:

### Step 1: Create Formspree Account
1. Go to **https://formspree.io**
2. Click "Sign Up" 
3. Use your email: **maryamsaid700@gmail.com**
4. Create a password
5. Verify your email

### Step 2: Create New Form
1. After logging in, click "New Form"
2. Give it a name like "Portfolio Contact Form"
3. Copy the form endpoint URL (looks like: `https://formspree.io/f/xxxxxxxxx`)

### Step 3: Update Your Contact Form
1. Open `contact.html` file
2. Find this line: `action="https://formspree.io/f/YOUR_FORM_ID"`
3. Replace `YOUR_FORM_ID` with your actual form ID from Formspree

### Step 4: Test Your Form
1. Deploy your updated website
2. Go to your contact form
3. Fill it out and submit
4. Check your email - you should receive the message!

### Alternative Options:

#### Option 1: Netlify Forms (if hosting on Netlify)
- Add `netlify` attribute to your form
- Deploy to Netlify instead of GitHub Pages

#### Option 2: EmailJS (client-side email service)
- More complex setup but works with GitHub Pages
- Requires JavaScript configuration

#### Option 3: Simple mailto link
- Add `action="mailto:maryamsaid700@gmail.com"` to form
- Opens user's email client (less reliable)

### Current Status:
✅ Form structure ready
✅ Success message implemented  
✅ Spam protection added
⏳ Waiting for Formspree setup

### Need Help?
Contact form will show success message after setup is complete!