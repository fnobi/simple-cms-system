# simple-cms-system

This is very simple & minimal template for NetlifyCMS.

## Install

### 1. Click 「Deploy to Netlify」

<!-- Markdown snippet -->
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/fnobi/simple-cms-system)

* public directory: `public`
* build command: `npm run build-post`

### 2. Add Netlify Identity Widget

* Open site admin `Settings` > `Build & deploy` > `Post processing` > `Snippet injection`, and add this snippet to receive invitation link.

```
<script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
```

* ref: https://www.netlifycms.org/docs/add-to-your-site/#add-the-netlify-identity-widget

### 3. Setup Identity

* Open site admin `Identity`, and set `Enable`.
* Open `Settings` > `Identity`
  - set `Invite Only`
  - Open `Services` > `Git Gateway`, and set `Enable Git gateway`.

* ref: https://www.netlifycms.org/docs/add-to-your-site/#authentication

### 4. Invite Yourself & Login CMS

* Open site admin `Identity`, and click `Invite Users`.
* Click link in invitation email.
