Klaviyo App Setup Instructions
===

## Using Private API Key

Follow these steps to install and configure the Klaviyo app using either a Private API Key or OAuth credentials.

To install the Klaviyo App you must first create a __Private API Key__. Head over to your Klaviyo account to get started.

Once you've logged in, click on your avatar at the bottom left of the screen and choose "Settings"

[![](/docs/assets/setup/setup-klaviyo-01.png)](/docs/assets/setup/setup-klaviyo-01.png)

Navigate to the __API keys__ and click __"Create Private API Key"__

[![](/docs/assets/setup/setup-klaviyo-02.png)](/docs/assets/setup/setup-klaviyo-02.png)

Give the API key a name - this can be anything, something like "Deskpro App" will do.

For the __Access Level__, select __"Custom Key"__ and choose the following scopes:
* Account: __read__;
* Events: __read__;
* List: __read__;
* Metrics: __read__;
* Profiles: __full access__;
* Segments: __read__.

[![](/docs/assets/setup/setup-klaviyo-03.png)](/docs/assets/setup/setup-klaviyo-03.png)

Click __"Create"__ and copy __Your Private Key__. And __keep this API key private, safe and secure__.

[![](/docs/assets/setup/setup-klaviyo-04.png)](/docs/assets/setup/setup-klaviyo-04.png)

When you install the Klaviyo App in Deskpro, enter this key into the settings tab of the app.

To configure who can see and use the Klaviyo app, head to the "Permissions" tab and select those users and/or groups you'd like to have access.

When you're happy, click "Install".


## Using OAuth

To use OAuth authentication, you will need to retrieve your __Client ID__ and __Client Secret__ from Klaviyo.

Head over to `https://www.klaviyo.com/oauth/client` and ensure you're logged into your Klaviyo account with appropriate permissions.

[![](/docs/assets/setup/setup-oauth-klaviyo-01.png)](/docs/assets/setup/setup-klaviyo-oauth-01.png)

Click on "Create app" and provide a unique and descriptive name for your application, such as "Deskpro App".


After naming your application, Klaviyo will generate your Client ID and Client Secret. Make sure to securely store both credentials immediately, as you won't be able to view the Client Secret again after this step.

[![](/docs/assets/setup/setup-oauth-klaviyo-02.png)](/docs/assets/setup/setup-klaviyo-oauth-02.png)

After creating your app, click the "Edit" button in the top right of your screen and navigate to the "Scopes" section and define the necessary permissions for your app. Choose the following scopes: `accounts:read` `events:read` `lists:read` `metrics:read` `profiles:read` `profiles:write` `segments:read`


In the "Redirect URLs" section, enter the callback URL provided in the Deskpro settings drawer. Save your changes.

[![](/docs/assets/setup/setup-oauth-klaviyo-03.png)](/docs/assets/setup/setup-klaviyo-oauth-03.png)

To configure who can access the app, go to the "Permissions" tab and select the users and/or groups that should have access. Once you're satisfied with the settings, click "Install" to complete the setup.